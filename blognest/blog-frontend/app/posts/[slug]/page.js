import { notFound } from "next/navigation";
import { getpost,getposts } from "@/lib/api";

export async function generateStaticParams(){
    const posts = await getposts();
    return posts.map((post) => ({slug : post.slug}));
}

export default async function getPost(params) {
    const {slug} = await params;
    let post;
    try{
        post = await getPost(slug); 
    }catch(err){
        if(err.message === "Post not found") notFound();
        throw err;
    }

    return (
        <>
        <article className="prose max-w-none rounded border bg-white p-6">
            <h1 className="text-3xl font-bold">{post.title}</h1>
            <p className="text-sm text-gray-400">{new Date(post.published_at).toDateString()}</p>
            <div className="mt-6 whitespace-pre-wrap text-gray-400">{post.body}</div>
        </article>
        </>
    )
}