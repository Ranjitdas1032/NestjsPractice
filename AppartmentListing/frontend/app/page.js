import { getListing } from "@/lib/api";
import Link from "next/link";
import FilterForm from "./components/filter-form";


export default async  function Home({searchParams}) {
  const params = await searchParams;
  const data = await getListing(params)

  return (
    <div>
        <h2>Propview - {data.count}</h2>
        <FilterForm current={params}/>
        <ul>
          {data.results.map((l) => (
            <li key={l.id}>
              <h3>{l.title}</h3>
              <p>{l.city} - {l.city} - {l.price.toLocaleString("en-IN")}</p>
            </li>
          ))}
        </ul>
        <div>
          {data.previous && (
            <Link href={`/?${new URLSearchParams({...params,page: (Number(params.page || 1)) -1 })}`}>prev</Link>
          )}
          {data.next && (
            <Link href={`/?${new URLSearchParams({...params,page: (Number(params.page || 1)) +1 })}`}>next</Link>
          )}
        </div>
    </div>
  );
}
