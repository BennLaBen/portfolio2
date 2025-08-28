"use client";
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useLocale } from 'next-intl';

type Project = {
  slug: string;
  title: string;
  summary: string;
  stack: string[];
  github?: string;
  live?: string;
  image: string;
};

export function ProjectCard({ project }: { project: Project }) {
  const locale = useLocale();
  return (
    <motion.article
      className="card overflow-hidden"
      initial={{ y: 12, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative aspect-video w-full bg-neutral-100 dark:bg-neutral-800">
        <Image src={project.image} alt={project.title} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover" unoptimized />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold">{project.title}</h3>
        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">{project.summary}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {project.stack.map((tag) => (
            <span key={tag} className="rounded-lg bg-neutral-100 px-2 py-1 text-xs dark:bg-neutral-800">
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-4 flex gap-3">
          {project.github && (
            <a className="text-primary underline" href={project.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
          )}
          {project.live && (
            <a className="text-primary underline" href={project.live} target="_blank" rel="noreferrer">
              Live
            </a>
          )}
          <Link href={`/projects/${project.slug}`} className="ml-auto text-sm text-neutral-500">
            Détails
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

