import Image from "next/image";
import { getposts } from "@/lib/api";

export default async function Home() {
  const posts = await getposts();
  return (
    <div>
      <h2>All Posts</h2>
      {posts.length === 0 ? (
        <p>There is no post to be shown !</p>
      ):(
        <ul>
          {posts.map((post) => (
            <li key={post.id}
            > 
              <Link href={`/posts/${post.slug}`} className="block rounded border bg-white p-4 hover:border-gray-400"></Link>
              <h2>{post.title}</h2>
              <p>{post.body}</p>
              <p>{new Date(post.published_at).toDateString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
