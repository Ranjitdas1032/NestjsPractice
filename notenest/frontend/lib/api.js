import { cache } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/";

const  handle =(res) =>{
    if(!res.ok){
        if(res.status == 404) throw new Error("Note not found");
        throw new Error(`Api error : ${res.status}`);
    }
    return res.status === 204 ? true : res.json(); 
}

export async function getnotes(){
    const data = await fetch(`${API_URL}/api/notes/`,{cache :"no-store"});
    return handle(data);
}

export async function getid(id){
     const data = await fetch(`${API_URL}/api/notes/${id}/`, {cache :"no-store"});
     return handle(data);
}

export async function createnote({title,body}) {
    const data = await fetch(`${API_URL}/api/notes/`, {
        method : "POST",
        headers : {"Content-Type" : "application/json"},
        body : JSON.stringify({title,body}),
    })
    return handle(data);
}

export async function updatenote(id,data) {
     const res = await fetch(`${API_URL}/api/notes/${id}/`, {
        method : "PATCH",
        headers : {"Content-Type" : "application/json"},
        body : JSON.stringify(data),
    })
    return handle(res);    
}

export async function deletenote(id) {
    const res = await fetch(`${API_URL}/api/notes/${id}/`, {
        method : "DELETE"})
    return handle(res); 
}