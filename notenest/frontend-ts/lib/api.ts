import { error } from "console";
import { Note } from "./type";
import { json } from "stream/consumers";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

async function handle<T>(res:Response) : Promise<T> {
    if(!res.ok){
        if(res.status === 404 ) throw new Error("Note not found")
        throw new Error(`API Error : ${res.status}`)
    }
    return res.json()
}

export async function getNotes() : Promise<Note[]> {
    const res = await fetch(`${API_URL}/api/notes/`, {cache : "no-store"});
    return handle<Note[]>(res);
}

export async function getNote(id : number) : Promise<Note> {
    const res = await fetch(`${API_URL}/api/notes/${id}/`, {cache : "no-store"});
    return handle<Note>(res);
}

export async function createNote(data:{title : string , body : string}) : Promise<Note> {
    const res = await fetch(`${API_URL}/api/notes/`,{
        method : "POST",
        headers : {"Content-Type" : "application/json"},
        body : JSON.stringify(data)
    })

    return handle<Note>(res);
}
