export default function SectionCard({ className, children }) {
  return (
    <div
      className={`bg-zinc-800 p-4 rounded-2xl shadow-inner border border-zinc-700 ${className}`}
    >
      {children}
    </div>
  );
}
