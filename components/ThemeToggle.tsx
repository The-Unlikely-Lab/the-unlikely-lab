"use client";
export default function ThemeToggle() {
  return (
    <button type="button" aria-label="Toggle theme" className="text-sm text-neutral-500 underline decoration-neutral-300 underline-offset-2 hover:text-black dark:text-neutral-400 dark:hover:text-white" onClick={() => document.documentElement.classList.toggle("dark")}>Theme</button>
  );
}

