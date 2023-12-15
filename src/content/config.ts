import { defineCollection } from 'astro:content';
import { docsSchema, i18nSchema } from '@astrojs/starlight/schema';
import { z } from 'zod';

export const collections = {
    docs: defineCollection({
        schema: docsSchema({
            extend: z.object({
                uid: z.string(),
            })
        }
        )
    }),
    i18n: defineCollection({ type: 'data', schema: i18nSchema() }),
};
