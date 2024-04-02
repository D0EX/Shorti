import { supabase } from "$lib/superbaseClient";

export async function load() {
    const { data } = await supabase.from("links").select().limit(5).order("created_at", { ascending: false });
    return {
        recents: data 
    }
}