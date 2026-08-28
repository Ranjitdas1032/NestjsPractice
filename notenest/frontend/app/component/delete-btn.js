"use client"
import {useRouter} from "next/navigation"
import { deletenote } from "@/lib/api"

export default function DeleteButton({id}){
    const router = useRouter();
    async function handleDelete() {
        if(!confirm("Delete this note permanently?")) return;
        try{
            await deletenote(id);
        }
        catch(err){
            alert(err.message);
            return;
        }
        router.push("/");
        router.refresh();
    }

    return(
        <button onClick={handleDelete} className="rounded border border-red-300 py-1 px-3 text-sm text-red-600 hover:bg-red-50">
            Delete
        </button>
    )
}