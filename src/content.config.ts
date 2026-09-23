import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Projects are authored as Markdown so the long-form write-up stays readable in
 * the repo, while the structured metadata is validated by Zod at build time.
 * A typo in a `category`, a missing `summary`, or a screenshot path that does not
 * resolve fails `npm run build` rather than shipping a broken card.
 */
const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.md' }),
  schema: ({ image }) =>
    z
      .object({
        title: z.string().min(1),
        /** Drives grouping, the filter control, and section order. */
        category: z.enum(['commercial', 'personal', 'university', 'earlier']),
        /** One sentence. Used on cards and in the meta description of any detail view. */
        summary: z.string().min(20).max(320),
        /** Sort key within a category — higher floats to the top. */
        order: z.number().int().default(0),
        /** Pins a project to the top of the page as the lead case study. */
        featured: z.boolean().default(false),
        period: z.string().optional(),
        role: z.string().optional(),
        /** Bullet list rendered under "What I did". */
        contributions: z.array(z.string().min(3)).default([]),
        /** Rendered as tags. Order is meaningful: most relevant first. */
        stack: z.array(z.string().min(1)).min(1),
        /**
         * Optional hard numbers, rendered as a small stat strip. `value` must read
         * as a quantity — "161", "1 in 8", "£0". An award or a word ("Best") does
         * not belong in a stat tile; put it in the summary instead.
         */
        metrics: z
          .array(z.object({ value: z.string(), label: z.string() }))
          .max(4)
          .default([]),
        gallery: z
          .array(
            z.object({
              src: image(),
              alt: z.string().min(5),
              caption: z.string().optional(),
            })
          )
          .default([]),
        /** Renders the gallery inside phone bezels rather than as flat figures. */
        galleryDevice: z.enum(['phone', 'flat']).default('flat'),
        links: z
          .array(z.object({ label: z.string(), href: z.string().url() }))
          .default([]),
        /** Set when the client cannot be named, so the UI can say so explicitly. */
        clientAnonymised: z.boolean().default(false),
      })
      .strict(),
});

export const collections = { projects };
