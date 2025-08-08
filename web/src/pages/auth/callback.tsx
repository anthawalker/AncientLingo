import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../lib/supabase";

export default function AuthCallback() {
    const router = useRouter();
    const [status, setStatus] = useState<"working" | "ok" | "error">("working");
    const [msg, setMsg] = useState<string>("Finishing sign-in…");

    useEffect(() => {
        const run = async () => {
            try {
                // 1) Try the modern flow: code in the query string (?code=...)
                const url = new URL(window.location.href);
                const code = url.searchParams.get("code");

                if (code) {
                    const { error } =
                        await supabase.auth.exchangeCodeForSession({ code });
                    if (error) throw error;
                    setStatus("ok");
                    setMsg("Signed in. Redirecting…");
                    router.replace("/");
                    return;
                }

                // 2) Fallback: legacy hash tokens (#access_token=...&refresh_token=...)
                if (window.location.hash) {
                    const hashParams = new URLSearchParams(
                        window.location.hash.slice(1)
                    );
                    const access_token = hashParams.get("access_token");
                    const refresh_token = hashParams.get("refresh_token");

                    if (access_token && refresh_token) {
                        const { error } = await supabase.auth.setSession({
                            access_token,
                            refresh_token,
                        });
                        if (error) throw error;
                        setStatus("ok");
                        setMsg("Signed in. Redirecting…");
                        router.replace("/");
                        return;
                    }
                }

                // If neither is present, just bounce home (maybe user opened the page directly)
                setStatus("ok");
                router.replace("/");
            } catch (e: any) {
                console.error(e);
                setStatus("error");
                setMsg(e.message || "Could not complete sign-in.");
            }
        };

        run();
    }, [router]);

    return (
        <div className="p-8">
            <h1 className="text-2xl font-semibold">Auth callback</h1>
            <p className="mt-2">{msg}</p>
            {status === "error" && (
                <p className="mt-2 text-red-600">
                    If this keeps happening, double-check your Supabase Auth URL
                    configuration.
                </p>
            )}
        </div>
    );
}
