import Link from "next/link";
import { notFound } from "next/navigation";
import { getid } from "@/lib/api";
import DeleteButton from "@/app/component/delete-btn";

export default async function NotePage({params}){
    const {id} = await params;

    let note;

    try{
        note = await getid(id);
    }catch (err) {
  console.error("getNote failed:", err);
  notFound();
  }

    return(
        <>
        <article className="rounded border bg-white p-6">
            <div className="mb-3 flex items-center justify-between">
                <h1 className="text-2xl font-bold">{note.title}</h1>
                <Link href={`/notes/${note.id}/edit`}  className="rounded border px-3 py-1 text-sm hover: bg-gray-400">
                    Edit
                </Link>
                <DeleteButton id={note.id}/>
            </div>
            <p className="whitespace-pre-wrap text-gray-700">{note.body}</p>
            <p className="mt-3 text-xs text-gray-400">
                created {new Date(note.created_at).toLocaleString()} . updated{" "}
                {new Date(note.updated_at).toLocaleString()}
            </p>
            <Link href="/" className="mt-4 inline-block text-sm text-blue-600">
                ← Back to all notes
            </Link>
        </article>
        </>
    )
}