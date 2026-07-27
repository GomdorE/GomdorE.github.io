// 카테고리 슬러그 → 화면에 보일 이름.
//
// 글의 frontmatter 에 `category: game` 처럼 영문 슬러그를 적는다.
// 주소가 /blog/category/game/ 이 되기 때문에 슬러그는 영문으로 쓴다.
// (한글로 적으면 주소가 %EA%B2%8C... 처럼 깨져 보인다.)
//
// 새 카테고리를 만들 땐 여기에 한 줄만 추가하면 된다.
// 깜빡하고 안 적어도 사이트는 정상 동작하며, 슬러그가 그대로 표시된다.
export const CATEGORY_LABELS: Record<string, string> = {
	note: '기록',
	work: '일',
	game: '게임',
};

export const categoryLabel = (slug: string) => CATEGORY_LABELS[slug] ?? slug;
