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
        const qs = new useParams();

        if(city) qs.set("city",city);
        if(bhk) qs.set("bedrooms",bhk);
        if(price) qs.set("price" , price);

        router.push(`/${qs.toString()}`);  
    }

    return(
        <div>
            <form onSubmit={handlesubmit}>
                <input value={city} onChange={(e) => setCity(e.value.target)} placeholder="Enter city"/>
                <input value={price} onChange={(e) => setPrice(e.value.target)} placeholder="Enter Price"/>
                <select value={bhk} onChange={(e) => setBhk(e.value.target)} placeholder="select bhk">
                    <option value=" ">Any bhk</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                </select>
                <button type="submit">select</button>
            </form>
        </div>
    )
}