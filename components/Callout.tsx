import type { ReactNode } from "react";
export default function Callout({ children }: { children: ReactNode }) {
  return <aside className="my-5 border-l-2 border-neutral-300 dark:border-neutral-700 pl-4 text-neutral-700 dark:text-neutral-300">{children}</aside>;
}

