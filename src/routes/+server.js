import { supabase } from "$lib/superbaseClient";
import { json } from "@sveltejs/kit";

export async function POST({ request }) {
    const data = await request.json();
    let { code, link } = data;

    const exp = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
    const regex = new RegExp(exp);

    if (!code || !link) {
        return json({status: 'error', message: "Missing code or link" }, { status: 400 })
    }

    if (!regex.test(link)) {
        return json({status: 'error', message: "Invalid link" }, { status: 400 })
    }

    if (!link.startsWith("http")) {
        link = `http://${link}`;
    }

    const { data: existingData } = await supabase
        .from("links")
        .select(`*`)
        .eq("code", code);

    if (existingData.length) {
        return json({status: 'error', message: "Code already exists" }, { status: 400 })
    }

    const { error } = await supabase.from("links").insert({ link: link, code: code });

    if (error) {
        return json({status: 'error', message: "Error adding link" }, { status: 500 })
    }

    return json({status: 'success', message: "Link added", code: code, link: link}, { status: 200 })
}