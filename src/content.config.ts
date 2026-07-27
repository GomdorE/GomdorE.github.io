import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			// Transform string to Date object
			pubDate: z.coerce.date(),
			// 분류. 안 적으면 '기록'으로 들어가므로 빠뜨려도 빌드가 깨지지 않는다.
			// 쓸 수 있는 값은 src/categories.ts 참고.
			category: z.string().default('note'),
			// 쿠팡 파트너스 등 제휴 링크가 들어간 글이면 true.
			// 본문 맨 위에 대가성 표기가 자동으로 붙는다. 표기는 법적 의무다.
			affiliate: z.boolean().default(false),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.optional(image()),
		}),
});

export const collections = { blog };
