import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';

export async function GET(context) {
	// 최신 글이 위로 오도록. 구독 프로그램 대부분은 알아서 정렬하지만,
	// 브라우저로 열었을 때 보이는 목록도 같은 순서여야 자연스럽다.
	const posts = (await getCollection('blog')).sort(
		(a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
	);

	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		// 브라우저로 열었을 때만 적용되는 안내 페이지. 피드 내용은 그대로다.
		stylesheet: '/rss/styles.xsl',
		items: posts.map((post) => ({
			...post.data,
			link: `/blog/${post.id}/`,
		})),
	});
}
