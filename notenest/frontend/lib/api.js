let notes = [
  { id: 1, title: "First note", body: "Hello NoteNest", created_at: "2026-08-24T10:00:00Z", updated_at: "2026-08-24T10:00:00Z" },
  { id: 2, title: "Nginx revision", body: "proxy_pass forwards requests to the app behind it", created_at: "2026-08-24T11:00:00Z", updated_at: "2026-08-24T11:00:00Z" },
  { id: 3, title: "Next.js rule", body: "Server components by default, use client only when needed", created_at: "2026-08-24T12:00:00Z", updated_at: "2026-08-24T12:00:00Z" },
];

const delay = (ms) => new Promise((r) => setTimeout(r,ms));

export async function getnotes(){
    await delay(500);
    return [...notes]
}

export async function getid(id){
    await delay(500);
    const note = notes.find((i) => i.id === Number(id));
    if(!note) throw new Error("Note not found");
    return note;
}

export async function createnote({title,body}) {
    await delay(500);
    const note = {
        id : Math.max(0,...notes.map((i) => i.id)) + 1,
        title,
        body,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    }
    notes.push(note);
    return note;
}

export async function updatenote(id,data) {
    await delay(500);
    const note = notes.find((i) => i.id === Number(id));
    if(!note) throw Error("Id not found ?");
    Object.assign(note,data,{updated_at: new Date().toISOString()});
    return note;    
}

export async function deletenote(id) {
    await delay(500);
    notes = notes.filter((i) => i.id !== Number(id));
    return true;
}