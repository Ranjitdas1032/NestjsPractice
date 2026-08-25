import Link from "next/link";

export default function NotFound() {
  return (
    <div className="rounded border bg-white p-6 text-center">
      <h2 className="text-xl font-semibold">Note not found</h2>
      <p className="mt-1 text-sm text-gray-500">
        It may have been deleted, or the link is wrong.
      </p>
      <Link href="/" className="mt-4 inline-block text-sm text-blue-600">
        ← Back to all notes
      </Link>
    </div>
  );
}