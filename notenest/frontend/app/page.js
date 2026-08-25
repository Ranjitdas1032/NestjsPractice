import Link from "next/link";
import { getnotes } from "@/lib/api";

export default async function Home() {
  const notes = await getnotes();
  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold"> My Notes</h1>
      {notes.length ===0 ? (
        <p className="text-gray-500">No Notes has created yet ?</p>
      ):(
        <ul className="space-y-3">
            {notes.map((note) => (
              <li key={note.id}>
                  <Link href={`/notes/${note.id}`} className="block rounded border bg-white p-4 hover:border-gray-400">
                  <h2 className="font-semibold">{note.title}</h2>
                  <p className="mt-2 line-clamp-2 text-sm text-gray-600">{note.body}</p>
                  <p>{new Date(note.updated_at).toLocaleString()}</p>
                  </Link>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
