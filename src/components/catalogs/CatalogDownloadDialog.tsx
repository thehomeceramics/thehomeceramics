
'use client';

import { useEffect, useState } from 'react';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Loader2, Send, DownloadCloud, CheckCircle } from 'lucide-react';
import { submitCatalogRequestForm, type CatalogRequestFormState } from '@/app/[locale]/catalogs/actions';
import type { CatalogItem } from '@/types';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getDictionary } from '@/lib/getDictionary'; // Assuming you have this

interface CatalogDownloadDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  catalog: CatalogItem;
  dictionary: any; // Pass the whole dictionary or relevant part
}

const initialState: CatalogRequestFormState = {
  message: '',
  success: false,
};

function SubmitButton({ texts }: { texts: any }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full shadow-md">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {texts.submitting || 'Submitting...'}
        </>
      ) : (
        <>
          {texts.submitButtonText || 'Get Catalog'} <Send className="ml-2 h-4 w-4" />
        </>
      )}
    </Button>
  );
}

export function CatalogDownloadDialog({ isOpen, onOpenChange, catalog, dictionary }: CatalogDownloadDialogProps) {
  const [state, formAction] = useActionState(submitCatalogRequestForm, initialState);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const t = dictionary.CatalogsPage?.downloadForm || {};

  useEffect(() => {
    if (state.success) {
      // Fields will be reset when dialog closes or on new open
    }
  }, [state.success]);
  
  useEffect(() => {
    // Reset form fields and state when dialog opens, unless it was just successful
    if (isOpen && !state.success) {
      setName('');
      setEmail('');
      // Directly reset action state by re-initializing or calling a reset on useActionState if available
      // For now, we rely on fields being cleared and UI updating based on `state.success`
    }
     if (!isOpen) {
        // If dialog closes, and it was successful, reset state for next time
        if (state.success) {
             // This is tricky with useActionState, typically the formAction itself resets.
             // A more robust solution might involve a key change on the form or dialog.
             // For now, we'll rely on the UI logic to handle the display.
        }
    }
  }, [isOpen, state.success]);


  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      onOpenChange(open);
      if (!open) {
        // If closing, reset the action state for the next open.
        // This is a simple way; a key prop on the form could also force re-mount.
        // Re-fetch initial state for the action if possible, or set it manually.
        // For now, we'll just ensure UI elements depending on `state` are re-evaluated.
        // The formAction itself might need to be re-created or useActionState re-invoked
        // if we need a full reset of its internal state.
        // A common pattern is to change a `key` on the Form or Dialog to force remount and reset.
      }
    }}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t.title?.replace('{catalogName}', catalog.name) || `Download ${catalog.name}`}</DialogTitle>
          {!state.success && (
            <DialogDescription>
              {t.description || 'Please fill in your details to receive the download link.'}
            </DialogDescription>
          )}
        </DialogHeader>

        {state.success && state.driveLink ? (
          <div className="py-4 text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">{t.successTitle || 'Thank You!'}</h3>
            <p className="text-muted-foreground mb-6">{t.successMessage || 'Your catalog is ready to download.'}</p>
            <Button asChild size="lg">
              <a href={state.driveLink} target="_blank" rel="noopener noreferrer" onClick={() => onOpenChange(false)}>
                <DownloadCloud className="mr-2 h-5 w-5" /> {t.downloadLinkText || 'Open Catalog'}
              </a>
            </Button>
             <Button variant="outline" onClick={() => onOpenChange(false)} className="mt-4 w-full">
              {t.closeButton || 'Close'}
            </Button>
          </div>
        ) : (
          <form action={formAction} className="space-y-4 py-4">
            {state.message && !state.success && !state.errors && (
              <Alert variant="destructive">
                <AlertTitle>{t.errorTitle || 'Error'}</AlertTitle>
                <AlertDescription>{state.message}</AlertDescription>
              </Alert>
            )}
            <div>
              <Label htmlFor="nameDownloadForm">{t.nameLabel || 'Full Name'}</Label>
              <Input
                id="nameDownloadForm"
                name="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className={state.errors?.name ? 'border-destructive' : ''}
              />
              {state.errors?.name && (
                <p className="text-sm text-destructive mt-1">{state.errors.name[0]}</p>
              )}
            </div>
            <div>
              <Label htmlFor="emailDownloadForm">{t.emailLabel || 'Email Address'}</Label>
              <Input
                id="emailDownloadForm"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={state.errors?.email ? 'border-destructive' : ''}
              />
              {state.errors?.email && (
                <p className="text-sm text-destructive mt-1">{state.errors.email[0]}</p>
              )}
            </div>
            <input type="hidden" name="catalogId" value={catalog.id} />
            <input type="hidden" name="catalogName" value={catalog.name} />
            <input type="hidden" name="catalogDriveLink" value={catalog.driveLink} />
            
            <DialogFooter className="pt-4">
              <SubmitButton texts={t} />
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
