// components/sign-out-form.tsx
import { signOut } from '@/app/(auth)/auth';

import { Button } from './ui/button';

export function SignOutForm() {
  return (
    <form
      action={async () => {
        'use server';
        await signOut();
      }}
    >
      <Button type="submit" variant="ghost" className="w-full justify-start">
        Sign out
      </Button>
    </form>
  );
}