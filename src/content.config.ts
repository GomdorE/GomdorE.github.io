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
			// 분류. 안 적으면 '생활 가이드'로 들어가므로 빠뜨려도 빌드가 깨지지 않는다.
			// 쓸 수 있는 값은 src/categories.ts 참고.
			category: z.string().default('guide'),
			// 검색 결과와 글 머리에서 글의 성격을 빠르게 구분한다.
			contentType: z
				.enum(['guide', 'review', 'comparison', 'news'])
				.default('guide'),
			// 본문을 읽기 전에 답부터 확인할 수 있는 2~4개의 요약 문장.
			summary: z.array(z.string()).min(2).max(4).optional(),
			// 정책, 사양, 가격처럼 외부 확인이 필요한 정보의 공식 근거.
			sources: z
				.array(
					z.object({
						title: z.string(),
						url: z.string().url(),
					}),
				)
				.optional(),
			// 홈의 주요 글 영역에 노출할 글. 여러 개면 최신 글을 사용한다.
			featured: z.boolean().default(false),
			// 쿠팡 파트너스 등 제휴 링크가 들어간 글이면 true.
			// 본문 맨 위에 대가성 표기가 자동으로 붙는다. 표기는 법적 의무다.
			affiliate: z.boolean().default(false),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.optional(image()),
		}),
});

export const collections = { blog };
