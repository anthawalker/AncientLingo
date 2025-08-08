// web/src/pages/login.tsx
import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function Login() {
    const [email, setEmail] = useState("");

    async function signIn() {
        try {
            const { error } = await supabase.auth.signInWithOtp({
                email,
                options: {
                    // Must match an entry in Supabase Auth -> URL Configuration -> Redirect URLs
                    emailRedirectTo: `${window.location.origin}/auth/callback`,
                },
            });

            if (error) {
                console.error("Sign-in error:", error);
                alert(`Sign-in failed: ${error.message}`);
            } else {
                alert("Magic link sent! Check your email.");
            }
        } catch (e: any) {
            console.error("Unexpected error:", e);
            alert(`Unexpected error: ${e.message || e}`);
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
            <button className="border px-3 py-2" onClick={signIn}>
                Send magic link
            </button>
        </div>
    );
}
