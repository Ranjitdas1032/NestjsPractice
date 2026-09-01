const API = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

async function handle(res){
    if(!res.ok){
        if(res.status == 404)
            throw new Error("Page not found ?");
            throw new Error(`Api error : ${res.status}`)
    }
    return res.json();
}


export async function getposts() {
    const res = await fetch(`${API}/api/posts/`);
    return handle(res);
}

export async function getpost(slug) {
    const res = await fetch(`${API}/api/posts/${slug}/`);
    return handle(res)
}

