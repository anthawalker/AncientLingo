export default function EnvCheck() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "undefined";
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "undefined";
    return (
        <div style={{ padding: 24 }}>
            <h1>Env Check</h1>
            <p>URL: {url}</p>
            <p>
                KEY:{" "}
                {key !== "undefined"
                    ? key.slice(0, 6) + "..." + key.slice(-6)
                    : "undefined"}
            </p>
            <p>
                (If undefined, move .env.local into /web, use NEXT_PUBLIC_
                names, and restart `npm run dev`)
            </p>
        </div>
    );
}
