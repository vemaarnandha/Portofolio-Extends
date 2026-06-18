export default function SkeletonCard() {
  return (
    <div className="glass-card rounded-2xl p-6 animate-pulse">
      <div className="h-48 bg-arcane-900/50 rounded-xl mb-4" />
      <div className="h-4 bg-arcane-900/50 rounded w-3/4 mb-3" />
      <div className="h-3 bg-arcane-900/50 rounded w-1/2 mb-3" />
      <div className="flex gap-2">
        <div className="h-6 w-16 bg-arcane-900/50 rounded-full" />
        <div className="h-6 w-16 bg-arcane-900/50 rounded-full" />
      </div>
    </div>
  );
}
