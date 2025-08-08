import { supabase } from "./supabase";

export async function uploadToUploads(file: File, userId: string) {
    const path = `${userId}/${Date.now()}_${file.name}`;
    const { error } = await supabase.storage.from("uploads").upload(path, file);
    if (error) throw error;
    return path;
}
