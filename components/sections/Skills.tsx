import { skills } from '@/data/skills';

export function Skills() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Object.entries(skills).map(([group, items]) => (
        <div key={group} className="card p-5">
          <h3 className="mb-2 font-semibold">{group}</h3>
          <div className="flex flex-wrap gap-2">
            {items.map((s) => (
              <span key={s} className="rounded-lg bg-neutral-100 px-2 py-1 text-sm dark:bg-neutral-800">
                {s}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

