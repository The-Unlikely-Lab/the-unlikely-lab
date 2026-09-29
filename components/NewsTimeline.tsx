export default function NewsTimeline({ items = [] as { title: string; date?: string }[] }) {
  return (<ul className="mt-4 space-y-2 text-[14px]">{items.map((i) => (<li key={i.title}><span className="font-medium">{i.title}</span>{i.date ? <span className="ml-2 text-neutral-500">{i.date}</span> : null}</li>))}</ul>);
}

