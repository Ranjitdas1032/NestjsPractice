export default function Loading() {
  return (
    <div className="space-y-3">
      <div className="h-8 w-40 animate-pulse rounded bg-gray-200" />
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-24 animate-pulse rounded bg-gray-200" />
      ))}
    </div>
  );
}