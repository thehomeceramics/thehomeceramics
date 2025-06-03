
'use server';

import { z } from 'zod';
import { Resend } from 'resend';
import type { CatalogItem } from '@/types'; // Assuming CatalogItem has driveLink

// Zod schema for catalog request form validation
const catalogRequestSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Invalid email address.'),
  catalogId: z.string().min(1, 'Catalog ID is required.'),
  catalogName: z.string().min(1, 'Catalog name is required.'),
  catalogDriveLink: z.string().url('Invalid catalog Drive link.'),
});

export type CatalogRequestFormState = {
  message: string;
  success: boolean;
  driveLink?: string;
  errors?: {
    name?: string[];
    email?: string[];
    catalogId?: string[];
    catalogName?: string[];
    catalogDriveLink?: string[];
  };
};

export async function submitCatalogRequestForm(
  prevState: CatalogRequestFormState,
  formData: FormData
): Promise<CatalogRequestFormState> {
  console.log('--- SERVER ACTION: submitCatalogRequestForm (Resend) initiated ---');

  const validatedFields = catalogRequestSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    catalogId: formData.get('catalogId'),
    catalogName: formData.get('catalogName'),
    catalogDriveLink: formData.get('catalogDriveLink'),
  });

  if (!validatedFields.success) {
    console.log('--- SERVER ACTION: Catalog request form validation failed ---', validatedFields.error.flatten().fieldErrors);
    return {
      message: 'CatalogsPage.downloadForm.validationFailed', // Dictionary key
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  console.log('--- SERVER ACTION: Catalog request form validation successful ---', validatedFields.data);

  const resendApiKey = process.env.RESEND_API_KEY;
  const emailTo = process.env.CONTACT_FORM_EMAIL_TO; // Reusing contact form recipient
  const emailFrom = process.env.CONTACT_FORM_EMAIL_FROM; // Reusing contact form sender

  if (!resendApiKey || !emailTo || !emailFrom) {
    console.error('--- SERVER ACTION ERROR: Resend environment variables for catalog request are not set correctly. ---');
    return {
      message: 'Could not process request. Server configuration error.', // Generic error for client
      success: false,
    };
  }

  const resend = new Resend(resendApiKey);

  try {
    const emailPayload = {
      from: emailFrom,
      to: [emailTo],
      subject: `New Catalog Request: ${validatedFields.data.catalogName}`,
      reply_to: validatedFields.data.email,
      html: `
        <h1>Catalog Request Lead</h1>
        <p><strong>Name:</strong> ${validatedFields.data.name}</p>
        <p><strong>Email:</strong> ${validatedFields.data.email}</p>
        <p><strong>Requested Catalog:</strong> ${validatedFields.data.catalogName} (ID: ${validatedFields.data.catalogId})</p>
        <p><strong>Catalog Drive Link (for reference):</strong> ${validatedFields.data.catalogDriveLink}</p>
        <hr>
        <p><em>Sent at: ${new Date().toLocaleString()}</em></p>
      `,
    };

    const { data, error } = await resend.emails.send(emailPayload);

    if (error) {
      console.error('--- SERVER ACTION: Resend API Error (Catalog Request) ---', error);
      return {
        message: `Resend API Error: ${error.message}`,
        success: false,
      };
    }

    console.log('--- SERVER ACTION: Resend Success (Catalog Request Lead) ---', data);
    return {
      message: 'CatalogsPage.downloadForm.successMessage', // Dictionary key
      success: true,
      driveLink: validatedFields.data.catalogDriveLink,
    };
  } catch (exception: any) {
    console.error('--- SERVER ACTION: Exception during Resend email sending (Catalog Request) ---', exception);
    return {
      message: 'Failed to process your request. Please try again later.',
      success: false,
    };
  }
}
