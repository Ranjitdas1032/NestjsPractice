import { getListing } from "@/lib/api";
import Link from "next/link";
import FilterForm from "./components/filter-form";


export default async  function Home({searchParams}) {
  const params = await searchParams;
  const data = await getListing(params)

  return (
    <div>
        <h2 className="mb-4 text-2xl font-bold">Propview - {data.count}</h2>
        <FilterForm current={params}/>
        <ul className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {data.results.map((l) => (
            <li key={l.id} className="rounded border bg-white p-4">
              <h3 className="font-semibold">{l.title}</h3>
              <p className="text-sm text-gray-600">{l.city} - {l.city} - {l.price.toLocaleString("en-IN")}</p>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex gap-2">
          {data.previous && (
            <Link href={`/?${new URLSearchParams({...params,page: (Number(params.page || 1)) -1 })}`} className="rounded border px-3 py-1 text-sm">prev</Link>
          )}
          {data.next && (
            <Link href={`/?${new URLSearchParams({...params,page: (Number(params.page || 1)) +1 })}`} className="rounded border px-3 py-1 text-sm">next</Link>
          )}
        </div>
    </div>
  );
}
