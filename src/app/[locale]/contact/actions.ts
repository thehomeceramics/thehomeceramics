
'use server';

import { z } from 'zod';
import { Resend } from 'resend';

// Zod schema for contact form validation
const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Invalid email address.'),
  subject: z.string().min(5, 'Subject must be at least 5 characters.'),
  message: z.string().min(10, 'Message must be at least 10 characters.'),
  phone: z.string()
    .min(1, 'Phone number is required.') // Made phone required
    .regex(/^\+?[0-9\s\-()]{7,20}$/, "Invalid phone number format. Please enter 7-20 digits, optionally with spaces, hyphens, or parentheses."), // Basic regex for phone numbers
});

export type ContactFormState = {
  message: string;
  success: boolean;
  errors?: {
    name?: string[];
    email?: string[];
    subject?: string[];
    message?: string[];
    phone?: string[];
  };
};

export async function submitContactForm(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  console.log('--- SERVER ACTION: submitContactForm (Resend) initiated ---');

  const validatedFields = contactFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    subject: formData.get('subject'),
    message: formData.get('message'),
    phone: formData.get('phone'),
  });

  if (!validatedFields.success) {
    console.log('--- SERVER ACTION: Form validation failed ---', validatedFields.error.flatten().fieldErrors);
    return {
      message: 'ContactPage.form.validationFailed', // This should be a key for dictionary lookup
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  console.log('--- SERVER ACTION: Form validation successful ---', validatedFields.data);

  const resendApiKey = process.env.RESEND_API_KEY;
  const emailTo = process.env.CONTACT_FORM_EMAIL_TO;
  const emailFrom = process.env.CONTACT_FORM_EMAIL_FROM;
  const emailCc = process.env.CONTACT_FORM_EMAIL_CC;

  console.log('--- SERVER ACTION: Attempting to read Resend environment variables: ---');
  console.log('--- SERVER ACTION: RESEND_API_KEY:', resendApiKey ? '********' : undefined);
  console.log('--- SERVER ACTION: CONTACT_FORM_EMAIL_TO:', emailTo);
  console.log('--- SERVER ACTION: CONTACT_FORM_EMAIL_FROM:', emailFrom);
  console.log('--- SERVER ACTION: CONTACT_FORM_EMAIL_CC:', emailCc);


  if (!resendApiKey || !emailTo || !emailFrom) {
    console.error('--- SERVER ACTION ERROR: Resend environment variables (RESEND_API_KEY, CONTACT_FORM_EMAIL_TO, CONTACT_FORM_EMAIL_FROM) are not set correctly or not loaded. ---');
    return {
      message: 'Could not send email. Server configuration error.',
      success: false,
    };
  }
  console.log('--- SERVER ACTION: Resend environment variables seem to be present. ---');

  const resend = new Resend(resendApiKey);

  try {
    console.log(`--- SERVER ACTION: Attempting to send email with Resend from ${emailFrom} to ${emailTo}${emailCc ? ` and CC to ${emailCc}` : ''} ---`);
    
    const emailPayload: {
      from: string;
      to: string[];
      cc?: string[];
      subject: string;
      reply_to: string;
      html: string;
    } = {
      from: emailFrom, // Must be from a verified domain in Resend for production
      to: [emailTo],
      subject: `New Contact Form Submission: ${validatedFields.data.subject}`,
      reply_to: validatedFields.data.email,
      html: `
        <h1>New Contact Form Submission</h1>
        <p><strong>Name:</strong> ${validatedFields.data.name}</p>
        <p><strong>Email:</strong> ${validatedFields.data.email}</p>
        <p><strong>Phone:</strong> ${validatedFields.data.phone}</p> 
        <p><strong>Subject:</strong> ${validatedFields.data.subject}</p>
        <p><strong>Message:</strong></p>
        <p>${validatedFields.data.message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><em>Sent at: ${new Date().toLocaleString()}</em></p>
      `,
    };

    if (emailCc && emailCc.trim() !== '') { // Ensure CC is not an empty string
      emailPayload.cc = [emailCc];
    }

    const { data, error } = await resend.emails.send(emailPayload);

    if (error) {
      console.error('--- SERVER ACTION: Resend API Error ---', error);
      // Log the full error object for detailed debugging
      console.error('--- SERVER ACTION: Full Resend error object: ---', JSON.stringify(error, null, 2));
      
      let clientErrorMessage = `Resend API Error: ${error.message}`;
      if (error.name) { // error.name often contains a more specific error type like 'missing_api_key' or 'validation_error'
        clientErrorMessage += ` (Type: ${error.name})`;
      }
      // @ts-ignore - statusCode might exist on ResendError types
      if (error.statusCode === 403 && error.message && error.message.includes("verify a domain")) {
        clientErrorMessage = "Resend Error: Domain not verified or sending to unverified recipient. Please check Resend account settings. " + error.message;
      }

      return {
        message: clientErrorMessage,
        success: false,
      };
    }

    console.log('--- SERVER ACTION: Resend Success ---', data);
    return {
      message: 'ContactPage.form.successMessage', // This should be a key for dictionary lookup
      success: true,
    };
  } catch (exception: any) {
    console.error('--- SERVER ACTION: Exception during Resend email sending ---', exception);
    let errorMessage = 'Failed to send your message. Please try again later.';
    
    if (exception && typeof exception.message === 'string') {
        errorMessage = exception.message;
    }
    return {
      message: errorMessage,
      success: false,
    };
  }
}
