"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { getid, updatenote } from "@/lib/api";

export default function EditNotePage() {
  const router = useRouter();
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    getid(id)
      .then((note) => {
        setTitle(note.title);
        setBody(note.body);
        setLoading(false);
      })
      .catch(() => setError("Could not load note"));
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) {
      setError("Title is required");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      await updatenote(id, { title, body });
      router.push(`/notes/${id}`);
      router.refresh();
    } catch (err) {
      setError(err.message);
      setSaving(false);
    }
  }

  if (loading && !error) return <p className="text-gray-500">Loading note…</p>;

  return (
    <form onSubmit={handleSubmit} className="rounded border bg-white p-6">
      <h1 className="mb-4 text-2xl font-bold">Edit note</h1>
      {error && (
        <p className="mb-3 rounded bg-red-50 p-2 text-sm text-red-600">{error}</p>
      )}
      <label className="mb-1 block text-sm font-medium">Title</label>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="mb-4 w-full rounded border p-2"
      />
      <label className="mb-1 block text-sm font-medium">Body</label>
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        rows={6}
        className="mb-4 w-full rounded border p-2"
      />
      <button
        type="submit"
        disabled={saving}
        className="rounded bg-gray-900 px-4 py-2 text-sm text-white disabled:opacity-50"
      >
        {saving ? "Saving..." : "Update note"}
      </button>
    </form>
  );
}