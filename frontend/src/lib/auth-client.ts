import {createAuthClient} from 'better-auth/react';

export const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_API_URL ?? '',
});

export const {signIn, signUp, signOut, useSession} = authClient;

const API_BASE = import.meta.env.VITE_API_URL ?? '';

export async function requestPasswordReset(email: string, redirectTo: string) {
  const res = await fetch(`${API_BASE}/api/auth/request-password-reset`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    credentials: 'include',
    body: JSON.stringify({email, redirectTo}),
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    const message =
      (body as {message?: string; error?: string}).message ??
      (body as {error?: string}).error ??
      'Failed to send reset email';
    throw new Error(message);
  }
  return body;
}

export async function resetPasswordWithToken(newPassword: string, token: string) {
  const res = await fetch(`${API_BASE}/api/auth/reset-password`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    credentials: 'include',
    body: JSON.stringify({newPassword, token}),
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error((body as {message?: string}).message ?? 'Failed to reset password');
  }
  return body;
}
