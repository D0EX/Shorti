import { supabase } from "$lib/superbaseClient";
import { redirect } from "@sveltejs/kit";

export const GET = async ({ params }) => {
    let { slug } = params;
    const { data } = await supabase.from("links").select(`*`).eq("code", slug)

    if (data.length) {
        await supabase.from("links").update({ count: data[0].count + 1 }).eq("code", slug);
        return redirect(303, data[0].link);
    } 
    throw redirect(303, "/");
}