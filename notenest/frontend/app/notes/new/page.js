"use client"

import { useState } from "react"
import { createnote} from "@/lib/api"
import {useRouter} from "next/navigation"


export default function NewNotePage(){
const router = useRouter()
const [title,setTitle] = useState("")
const [body, setBody] = useState("")
const [error,setError] = useState(null)
const [saving,setSaving] = useState(false)

async function handlesubmit(e) {
    e.preventDefault();
    if(!title.trim()){
        setError("Title is empty");
        return;
    }

    setSaving(true);
    setError(null);

    try{
        const note = await createnote({title,body});
        router.push(`/notes/${note.id}`);
        router.refresh();
    }catch(err){
       console.error("create failed:", err);   // ← add this line
    setError(err.message);
    setSaving(false);   
    }
}

return(
    <form onSubmit={handlesubmit} className="rounded border bg-white p-6">
      <h1 className="mb-4 text-2xl font-bold">New note</h1>

      {error && (
        <p className="mb-3 rounded bg-red-50 p-2 text-sm text-red-600">
          {error}
        </p>
      )}

      <label className="mb-1 block text-sm font-medium">Title</label>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="mb-4 w-full rounded border p-2"
        placeholder="Note title"
      />

      <label className="mb-1 block text-sm font-medium">Body</label>
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        rows={6}
        className="mb-4 w-full rounded border p-2"
        placeholder="Write your note..."
      />

      <button
        type="submit"
        disabled={saving}
        className="rounded bg-gray-900 px-4 py-2 text-sm text-white disabled:opacity-50"
      >
        {saving ? "Saving..." : "Save note"}
      </button>
    </form>
)
}


