// 카테고리 슬러그 → 화면에 보일 이름.
//
// 글의 frontmatter 에 `category: game` 처럼 영문 슬러그를 적는다.
// 주소가 /blog/category/game/ 이 되기 때문에 슬러그는 영문으로 쓴다.
// (한글로 적으면 주소가 %EA%B2%8C... 처럼 깨져 보인다.)
//
// 새 카테고리를 만들 땐 여기에 한 줄만 추가하면 된다.
// 깜빡하고 안 적어도 사이트는 정상 동작하며, 슬러그가 그대로 표시된다.
export const CATEGORY_LABELS: Record<string, string> = {
	guide: '생활 가이드',
	digital: '디지털',
	work: '업무 도구',
	game: '게임',
	beauty: '뷰티',
	review: '제품 리뷰',
};

export const categoryLabel = (slug: string) => CATEGORY_LABELS[slug] ?? slug;

export const CATEGORY_DESCRIPTIONS: Record<string, string> = {
	guide: '일상에서 바로 적용할 수 있는 방법과 선택 기준을 정리합니다.',
	digital: '앱과 디지털 서비스의 기능, 설정, 활용법을 설명합니다.',
	work: '집중, 기록, 생산성 도구를 실제 사용 조건과 함께 비교합니다.',
	game: '게임의 시스템과 과금 구조, 시작 전에 확인할 기준을 다룹니다.',
	beauty: '성분과 사용 조건, 피부 타입별 차이를 중심으로 살펴봅니다.',
	review: '제품의 장점뿐 아니라 한계와 적합한 사용자를 함께 정리합니다.',
};

export const categoryDescription = (slug: string) =>
	CATEGORY_DESCRIPTIONS[slug] ?? `${categoryLabel(slug)} 관련 정보를 정리합니다.`;
