import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { uploadToUploads } from "../lib/upload";

export default function UploadTest() {
    const [userId, setUserId] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [paths, setPaths] = useState<string[]>([]);

    useEffect(() => {
        supabase.auth
            .getSession()
            .then(({ data }) => setUserId(data.session?.user.id ?? null));
    }, []);

    const doUpload = async () => {
        if (!file || !userId) return alert("Sign in first and choose a file.");
        try {
            const p = await uploadToUploads(file, userId);
            setPaths((prev) => [p, ...prev]);
            alert("Uploaded!");
        } catch (e: any) {
            alert(e.message);
        }
    };

    return (
        <div className="p-6 space-y-4">
            <h1 className="text-2xl font-semibold">Upload test</h1>
            <input
                type="file"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />
            <button className="border px-3 py-2" onClick={doUpload}>
                Upload
            </button>
            <div>
                <h2 className="font-medium mt-4">Uploaded paths:</h2>
                <ul className="list-disc ml-6">
                    {paths.map((p) => (
                        <li key={p}>{p}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
