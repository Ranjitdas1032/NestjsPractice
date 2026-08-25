
import "./globals.css";

import Link from "next/link";

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
    >
      <body className="min-h-full bg-gray-50 text-gray-900">
      <header className="border-b bg-white">
        <nav className="mx-auto flex mx-width-3xl item-center justify-between p-4">
            <Link href='/' className="text-xl font-bold">
                NoteNest
            </Link>
            <Link href='/notes/new' className="rounded bg-gray-900 px-4 py-2 text-sm text-white">
                + New note
            </Link>
        </nav>
      </header>
      <main className="mx-auto max-w-3xl p-4">{children}</main>
      </body>
    </html>
  );
}
