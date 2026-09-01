"use client"

export default function Error({error,reset}){
    return(
        <div className="rounded border border-red-200 bg-red-50 p-6 text-center">
            <h2 className="font-semibold text-red-600">
                Something went wrong...
            </h2>
            <p className="mt-1 text-sm text-red-600">
                {error.message}
            </p>
            <button onClick={reset} className="mt-4 rounded bg-red-400 px-4 py-2 text-sm text-white">
                Try again
            </button>
        </div>
    )
}