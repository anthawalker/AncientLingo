import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const url =
        process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
    const key =
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
        process.env.SUPABASE_ANON_KEY;

    if (!url || !key) {
        return res
            .status(400)
            .json({
                ok: false,
                reason: "Missing envs",
                url,
                keyPresent: !!key,
            });
    }

    try {
        const r = await fetch(`${url}/auth/v1/settings`, {
            headers: { apikey: key, Authorization: `Bearer ${key}` },
        });
        const body = await r.text(); // usually JSON, but text avoids parse confusion
        return res.status(200).json({
            ok: r.ok,
            status: r.status,
            url,
            keyHead: key.slice(0, 8),
            keyTail: key.slice(-8),
            body: safeJson(body),
        });
    } catch (e: any) {
        return res
            .status(500)
            .json({ ok: false, error: e?.message || String(e) });
    }
}

function safeJson(s: string) {
    try {
        return JSON.parse(s);
    } catch {
        return s;
    }
}
