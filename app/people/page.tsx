import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "People",
  description:
    "Researchers at The Unlikely Lab — Hitesh Rasineni and Bhavishya Chebrolu, working on machine learning and high-energy physics.",
  alternates: { canonical: "/people" },
};

const people = [
  {
    name: "Hitesh Rasineni",
    affil: "VIT-AP University, Amaravati, India",
    role: "Undergraduate researcher — machine learning and high-energy physics; density estimation and mono-Z analyses.",
    resume: "/resume",
  },
  {
    name: "Bhavishya Chebrolu",
    affil: "Mohan Babu University, Tirupati, India",
    role: "Researcher — machine learning and high-energy physics; anomaly detection and collider analyses.",
    resume: "/resume/bhavishya",
  },
];

export default function PeoplePage() {
  return (
    <div>
      <header className="mb-8 border-b border-neutral-200 pb-6">
        <h1 className="text-2xl font-semibold text-black sm:text-3xl">People</h1>
        <p className="mt-3 max-w-prose text-[16px] leading-7 text-neutral-700">
          The Unlikely Lab is an independent research lab maintained by two
          researchers working at the intersection of machine learning and
          collider physics.
        </p>
      </header>
      <ul className="space-y-8">
        {people.map((p) => (
          <li key={p.name}>
            <h2 className="text-lg font-semibold">{p.name}</h2>
            <p className="mt-0.5 text-[14px] text-neutral-600">{p.affil}</p>
            <p className="mt-2 max-w-prose text-[15px] leading-6 text-neutral-700">{p.role}</p>
            <p className="mt-2 text-[15px]">
              <Link href={p.resume}>Resume</Link>
              {" · "}
              <a href="https://github.com/The-Unlikely-Lab/the-unlikely-lab" rel="noopener noreferrer">
                GitHub
              </a>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
