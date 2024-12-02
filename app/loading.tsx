export default function Loading() {
  return (
    <div className="h-full flex flex-col justify-start p-4 space-y-4">
      <div className="animate-pulse bg-neutral-700 h-10 w-2/3 rounded-2xl"></div>
      <div className="grid grid-cols-2 max-md:grid-cols-1 gap-4">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="bg-neutral-700 h-44 rounded-2xl animate-pulse"></div>
        ))}
      </div>
    </div>
  );
}
