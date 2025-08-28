import { timeline } from '@/data/timeline';

export function Timeline() {
  return (
    <ol className="relative border-s border-neutral-200 dark:border-neutral-700">
      {timeline.map((item, idx) => (
        <li key={idx} className="mb-10 ms-4">
          <div className="absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-primary dark:border-neutral-900" />
          <time className="mb-1 block text-sm font-medium text-primary">{item.year}</time>
          <h3 className="text-base font-semibold">{item.title}</h3>
          {item.details && <p className="text-sm text-neutral-600 dark:text-neutral-300">{item.details}</p>}
        </li>
      ))}
    </ol>
  );
}

