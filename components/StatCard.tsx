export default function StatCard({ label, value }: { label: string; value: string }) {
  return (<div className="border border-neutral-200 dark:border-neutral-800 p-4"><div className="text-xl font-semibold text-black dark:text-white">{value}</div><div className="text-[13px] text-neutral-500 dark:text-neutral-400">{label}</div></div>);
}

