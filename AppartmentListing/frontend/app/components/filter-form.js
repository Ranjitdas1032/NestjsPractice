"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";


export default function FilterForm({current}){
    const router = useRouter();
    const[city,setCity] = useState(current.state ||"");
    const[bhk,setBhk] = useState(current.bedrooms||"");
    const[price,setPrice] = useState(current.price || "");

    function handlesubmit(e){
        e.preventDefault()
        const qs = new URLSearchParams();

        if(city) qs.set("city",city);
        if(bhk) qs.set("bedrooms",bhk);
        if(price) qs.set("price" , price);

        router.push(`/?${qs.toString()}`);  
    }

    return(
        <div className="flex flex-wrap gap-2 rounded border bg-white p-4">
            <form onSubmit={handlesubmit} className="flex flex-wrap gap-2 rounded border bg-white p-4">
                <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="Enter city" className="rounded border p-2 text-sm"/>
                <input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Enter Price" className="rounded border p-2 text-sm"/>
                <select value={bhk} onChange={(e) => setBhk(e.target.value)} placeholder="select bhk" className="rounded border p-2 text-sm">
                    <option value=" ">Any bhk</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                </select>
                <button type="submit" className="rounded bg-gray-900 px-4 py-2 text-sm text-white">select</button>
            </form>
        </div>
    )
}