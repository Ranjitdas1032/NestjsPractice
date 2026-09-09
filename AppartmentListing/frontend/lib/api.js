const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"

export async function getListing(searchParams) {
    const qs = new URLSearchParams()

    if(searchParams.city) qs.set("city",searchParams.city);
    if(searchParams.price) qs.set("price",searchParams.price);
    if(searchParams.bedrooms) qs.set("bedrooms",searchParams.bedrooms);

    const res = await fetch(`${API_URL}/api/listings/?${qs.toString()}`)

    if(!res.ok) throw Error(`API Error : ${res.status}`)

    return res.json()
}