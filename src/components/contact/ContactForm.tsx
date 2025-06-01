
'use client';

import { useEffect } from 'react';
import { useActionState } from 'react'; // Changed from react-dom
import { useFormStatus } from 'react-dom'; // Remains from react-dom
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { submitContactForm, type ContactFormState } from '@/app/[locale]/contact/actions'; // Adjusted path to reflect locale structure
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Send } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";


const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Invalid email address.'),
  subject: z.string().min(5, 'Subject must be at least 5 characters.'),
  message: z.string().min(10, 'Message must be at least 10 characters.'),
  phone: z.string()
    .min(1, 'Phone number is required.') // Made phone required
    .regex(/^\+?[0-9\s\-()]{7,20}$/, { message: "Invalid phone number format. Please enter 7-20 digits, optionally with +, -, (, )." }),
});
type ContactFormData = z.infer<typeof contactFormSchema>;

const initialState: ContactFormState = {
  message: '',
  success: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full shadow-md">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Sending...
        </>
      ) : (
        <>
          Send Message <Send className="ml-2 h-4 w-4" />
        </>
      )}
    </Button>
  );
}

export function ContactForm() {
  const [state, formAction] = useActionState(submitContactForm, initialState);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors: clientErrors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast({
          title: 'Success!',
          description: state.message, // This should be the dictionary key, e.g., "ContactPage.form.successMessage"
        });
        reset();
      } else if (state.errors) {
         // Validation errors are shown inline, no global toast needed
      } else {
        toast({
          title: 'Error',
          description: state.message, // This could be a direct error message from the server or a dictionary key
          variant: 'destructive',
        });
      }
    }
  }, [state, toast, reset]);

  const displayErrors = state.errors || {};


  return (
    <form action={formAction} className="space-y-6">
      {!state.success && state.message && !state.errors && (
         <Alert variant="destructive">
           <AlertTitle>Submission Error</AlertTitle>
           <AlertDescription>{state.message}</AlertDescription>
         </Alert>
      )}

      <div>
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          type="text"
          {...register('name')}
          className={ (clientErrors.name || displayErrors.name) ? 'border-destructive' : ''}
          aria-invalid={!!(clientErrors.name || displayErrors.name)}
        />
        {(clientErrors.name || displayErrors.name) && (
          <p className="text-sm text-destructive mt-1">
            {clientErrors.name?.message || displayErrors.name?.[0]}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          type="email"
          {...register('email')}
          className={(clientErrors.email || displayErrors.email) ? 'border-destructive' : ''}
          aria-invalid={!!(clientErrors.email || displayErrors.email)}
        />
        {(clientErrors.email || displayErrors.email) && (
          <p className="text-sm text-destructive mt-1">
            {clientErrors.email?.message || displayErrors.email?.[0]}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="phone">Phone Number</Label> 
        <Input
          id="phone"
          type="tel"
          {...register('phone')}
          className={(clientErrors.phone || displayErrors.phone) ? 'border-destructive' : ''}
          aria-invalid={!!(clientErrors.phone || displayErrors.phone)}
          placeholder="+1 (555) 123-4567"
        />
        {(clientErrors.phone || displayErrors.phone) && (
          <p className="text-sm text-destructive mt-1">
            {clientErrors.phone?.message || displayErrors.phone?.[0]}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="subject">Subject</Label>
        <Input
          id="subject"
          type="text"
          {...register('subject')}
          className={(clientErrors.subject || displayErrors.subject) ? 'border-destructive' : ''}
          aria-invalid={!!(clientErrors.subject || displayErrors.subject)}
        />
        {(clientErrors.subject || displayErrors.subject) && (
          <p className="text-sm text-destructive mt-1">
            {clientErrors.subject?.message || displayErrors.subject?.[0]}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          rows={5}
          {...register('message')}
          className={(clientErrors.message || displayErrors.message) ? 'border-destructive' : ''}
          aria-invalid={!!(clientErrors.message || displayErrors.message)}
        />
        {(clientErrors.message || displayErrors.message) && (
          <p className="text-sm text-destructive mt-1">
            {clientErrors.message?.message || displayErrors.message?.[0]}
          </p>
        )}
      </div>
      
      <SubmitButton />
    </form>
  );
}
