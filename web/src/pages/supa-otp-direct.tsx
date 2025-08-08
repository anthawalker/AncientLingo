import { useState } from "react";

export default function DirectOTP() {
    const [email, setEmail] = useState("");

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

    async function send() {
        const r = await fetch(`${url}/auth/v1/otp`, {
            method: "POST",
            headers: {
                apikey: key,
                Authorization: `Bearer ${key}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                type: "magiclink",
                options: {
                    email_redirect_to: `${window.location.origin}/auth/callback`,
                },
            }),
        });
        const text = await r.text();
        alert(`status: ${r.status}\n${text}`);
    }

    return (
        <div style={{ padding: 24 }}>
            <h1>Direct OTP Test</h1>
            <div>URL: {url}</div>
            <div>
                KEY: {key.slice(0, 6)}...{key.slice(-6)}
            </div>
            <input
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                    border: "1px solid #ccc",
                    padding: 8,
                    width: 320,
                    marginTop: 12,
                }}
            />
            <div>
                <button
                    onClick={send}
                    style={{
                        marginTop: 12,
                        padding: "8px 12px",
                        border: "1px solid #333",
                    }}>
                    Send magic link
                </button>
            </div>
        </div>
    );
}
