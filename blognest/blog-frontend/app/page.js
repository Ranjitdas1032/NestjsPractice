import Image from "next/image";
import { getposts } from "@/lib/api";
import Link from "next/link";

export default async function Home() {
  const posts = await getposts();
  return (
    <div className="mx-auto max-w-4xl p-4">
      <h2 className="text-2xl font-bold mb-4">All Posts</h2>
      {posts.length === 0 ? (
        <p className="text-gray-500">There is no post to be shown !</p>
      ):(
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {posts.map((post) => (
            <li key={post.id}
            className="block rounded border bg-white p-4 hover:border-gray-400"> 
              <Link href={`/posts/${post.slug}`} className="block rounded border bg-white p-4 hover:border-gray-400">{post.title}</Link>
              <p className="text-gray-600">{post.body}</p>
              <p className="text-sm text-gray-500">{new Date(post.published_at).toDateString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
