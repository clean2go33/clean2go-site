import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const faq = z.array(z.object({ q: z.string(), a: z.string() })).default([]);

const seo = {
  title: z.string().max(70),
  description: z.string().min(80).max(175),
  noindex: z.boolean().default(false),
};

/** Prestations : /prestations/<slug>/ */
const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
  schema: z.object({
    ...seo,
    name: z.string(),
    short: z.string(),
    h1: z.string(),
    lead: z.string(),
    icon: z.string(),
    order: z.number(),
    formValue: z.string(),
    serviceType: z.string(),
    photo: z.string(),
    photoSeed: z.number().default(1),
    inclus: z.array(z.string()).default([]),
    faq,
    related: z.array(z.string()).default([]),
  }),
});

/** Zones + villes : /nettoyage-auto-<slug>/ (kind: pillar | city) */
const cities = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/cities' }),
  schema: z.object({
    ...seo,
    kind: z.enum(['pillar', 'city']),
    zone: z.enum(['metropole', 'bassin']),
    name: z.string(),
    h1: z.string(),
    lead: z.string(),
    angle: z.string(),
    photo: z.string(),
    photoSeed: z.number().default(1),
    nearby: z.array(z.string()).default([]),
    highlight: z.array(z.string()).default([]),
    order: z.number().default(50),
    faq,
    services: z.array(z.string()).default([]),
    blog: z.array(z.string()).default([]),
  }),
});

/** Articles de blog : /blog/<slug>/ */
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    ...seo,
    h1: z.string(),
    category: z.enum(['interieur', 'exterieur', 'vapeur', 'entretien', 'professionnels', 'restitution-vente', 'local']),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    author: z.string().default('L’équipe Clean2Go'),
    readingTime: z.number().default(5),
    photo: z.string(),
    photoSeed: z.number().default(1),
    excerpt: z.string(),
    service: z.string().optional(),
    cities: z.array(z.string()).default([]),
    faq,
    draft: z.boolean().default(false),
  }),
});

/** Pages éditoriales et légales : mentions, CGV, à propos… */
const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    ...seo,
    h1: z.string(),
    lead: z.string().optional(),
    kind: z.enum(['legal', 'page']).default('page'),
    updated: z.coerce.date().optional(),
    faq,
  }),
});

export const collections = { services, cities, blog, pages };
