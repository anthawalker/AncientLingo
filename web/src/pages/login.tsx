import { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function Login() {
  const [email, setEmail] = useState('');
  const [busy, setBusy] = useState(false);

  async function signIn() {
    setBusy(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) {
        console.error('Sign-in error:', error);
        alert(`Sign-in failed: ${error.message}`);
      } else {
        alert('Magic link sent. Check your email.');
      }
    } catch (e) {
      console.error(e);
      alert(e.message || 'Unexpected error');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="p-8 max-w-md mx-auto space-y-4">
      <h1 className="text-2xl font-semibold">Sign in</h1>
      <input
        className="border p-2 w-full"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
      />
      <button className="border px-3 py-2" onClick={signIn} disabled={busy}>
        {busy ? 'Sending…' : 'Send magic link'}
      </button>
    </div>
  );
}
