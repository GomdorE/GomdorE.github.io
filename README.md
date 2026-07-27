# gomdore.log

직접 써본 것들을 정리하는 정보 블로그. 글을 쓰고 `git push` 하면 자동으로 빌드되어 사이트에 반영된다.

| | |
|---|---|
| 블로그 주소 | https://blog.igomdori.com |
| 저장소 | `git@github.com:GomdorE/GomdorE.github.io.git` |
| 작업 브랜치 | `main` |

---

## 1. 새 글 쓰기

가장 자주 하게 될 작업. **파일 하나 만들고 push하면 끝이다.**

### 1) 파일 만들기

`src/content/blog/` 안에 `.md` 파일을 만든다. **파일 이름이 그대로 주소가 된다.**

```
src/content/blog/slow-morning.md   →   https://blog.igomdori.com/blog/slow-morning/
```

파일 이름은 영문 소문자와 하이픈으로만 쓰는 게 좋다. 한글로 지으면 주소가 `%EA%B8%80...` 처럼 알아볼 수 없게 인코딩된다.

### 2) 맨 위에 정보 세 줄

파일 맨 앞에 `---` 로 감싼 블록이 반드시 있어야 한다. 이게 없거나 형식이 틀리면 배포가 실패한다.

```markdown
---
title: '천천히 시작하는 아침'
description: '서두르지 않는 하루가 어떤 차이를 만드는지에 대해.'
pubDate: 'Jul 27 2026'
category: note
---

여기서부터 본문을 쓴다. 그냥 평소처럼 쓰면 된다.

## 소제목

문단 사이는 빈 줄로 나눈다.
```

| 항목 | 필수 | 설명 |
|---|:---:|---|
| `title` | O | 글 제목. 목록과 브라우저 탭에 나온다. |
| `description` | O | 한 줄 요약. 목록에서 제목 아래, 그리고 검색 결과에 노출된다. |
| `pubDate` | O | 발행일. `'Jul 27 2026'` 또는 `'2026-07-27'` 형식. |
| `category` | | 분류. 안 적으면 `note`(기록)로 들어간다. 아래 3번 참고. |
| `updatedDate` | | 수정일. 넣으면 글 상단에 `updated`로 표시된다. |
| `heroImage` | | 대표 이미지. SNS 공유 미리보기에도 이 사진이 쓰인다. |
| `affiliate` | | `true` 면 제휴 링크 안내 문구가 자동으로 붙는다. 아래 3번 참고. |

작은따옴표를 빠뜨리지 말 것. 제목에 `:` 이 들어가면 따옴표 없이는 오류가 난다.

### 3) 본문에 넣을 수 있는 것

**사진과 설명**

사진 파일은 `src/assets/` 에 넣는다. 사진 바로 아랫줄에 `*기울임*` 으로 한 문장을 쓰면 그게 사진 설명이 된다. 크기 조절과 WebP 변환은 자동이다.

```markdown
![대체 텍스트](../../assets/사진.jpg)
*사진 아래에 들어갈 설명*
```

**유튜브 영상**

이 한 줄만 적으면 된다. 영상 ID는 주소의 `watch?v=` 뒤에 붙는 부분이다.

```html
<div class="yt" data-id="영상ID" data-title="영상 제목"></div>
```

썸네일만 먼저 뜨고, 누를 때 재생기를 불러온다. 영상을 그냥 넣으면 재생하지도 않은 영상 때문에 페이지가 수백 KB 무거워져 속도 점수가 떨어진다. 누르기 전까지는 유튜브 쿠키도 심기지 않는다.

**제휴 링크가 들어간 글**

머리말에 한 줄 추가하면 본문 맨 위에 안내 문구가 자동으로 붙는다.

```markdown
affiliate: true
```

> 쿠팡 파트너스 링크를 넣으면서 이 표기를 빠뜨리면 **공정거래위원회 제재 대상**이다. 눈에 잘 띄는 위치여야 하므로 본문 맨 위에, 옅은 회색이 아니라 읽히는 밝기로 들어가게 해뒀다. 링크가 들어가는 글에는 잊지 말고 이 한 줄을 추가할 것.

### 4) 올리기

```bash
git add -A && git commit -m "새 글: 천천히 시작하는 아침" && git push
```

push하고 1~2분 뒤 사이트에 반영된다. 그게 전부다.

---

## 2. 다른 PC에서 작업하기

이 블로그는 **특정 컴퓨터에 묶여 있지 않다.** 빌드가 내 PC가 아니라 서버에서 돌기 때문이다.

새 PC에서는 이것만 하면 된다.

```bash
git clone git@github.com:GomdorE/GomdorE.github.io.git
```

받은 폴더에서 글을 쓰고 push하면 끝. **그 PC에 Node가 깔려 있지 않아도 배포는 정상적으로 된다.**

메모장이든 VS Code든 상관없고, 심지어 GitHub 웹사이트에서 직접 파일을 만들어도 똑같이 배포된다.

단, SSH 키가 없는 새 PC라면 clone이 안 될 수 있다. 그럴 땐 주소만 바꿔서 받으면 된다.

```bash
git clone https://github.com/GomdorE/GomdorE.github.io.git
```

### 로컬에서 미리보기 하고 싶을 때만

글이 어떻게 보이는지 올리기 전에 확인하고 싶다면 Node가 필요하다.

```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:4321` 을 열면 된다. 파일을 저장하는 순간 화면이 바로 바뀐다.

---

## 3. 카테고리로 분류하기

글이 쌓이면 한 줄로 주르륵 늘어서 찾기 어려워진다. 그래서 글마다 분류를 붙일 수 있게 해뒀다.

### 새 분류 만들기

**1)** 글의 머리말에 영문 슬러그를 적는다. 주소가 `/blog/category/game/` 이 되기 때문에 영문으로 쓴다. 한글로 적으면 주소가 `%EA%B2%8C...` 처럼 깨져 보인다.

```markdown
category: game
```

**2)** `src/categories.ts` 에 한 줄 추가해서 화면에 보일 이름을 정한다.

```ts
export const CATEGORY_LABELS: Record<string, string> = {
	note: '기록',
	work: '일',
	game: '게임',      // ← 추가
	beauty: '화장품',  // ← 추가
};
```

그게 전부다. push하면 `게임` 페이지가 저절로 생기고, Posts 페이지 위쪽 분류 줄에도 자동으로 추가된다. 목록은 `categories.ts` 가 아니라 **실제 쓴 글에서 만들어지기 때문에**, 글이 하나도 없는 분류는 메뉴에 나타나지 않는다.

2번을 깜빡해도 사이트는 정상 동작한다. 다만 이름이 `game` 처럼 슬러그 그대로 보인다.

### 알아둘 것

- 글 하나에 분류는 하나다. 여러 개를 달고 싶으면 말해달라 — 태그 방식으로 바꿔야 한다.
- 분류를 안 적은 글은 전부 `기록`으로 들어간다.
- 분류 이름(슬러그)을 바꾸면 그 주소로 걸어둔 링크가 끊긴다. 초반에 정해두는 게 좋다.

---

## 4. 명령어 모음

| 명령어 | 하는 일 |
|---|---|
| `npm install` | 필요한 패키지 설치 (새 PC에서 처음 한 번) |
| `npm run dev` | 로컬 미리보기 서버 실행 (`localhost:4321`) |
| `npm run build` | 실제 배포와 똑같이 빌드해서 `dist/` 에 생성 |
| `npm run preview` | 빌드 결과를 로컬에서 확인 |

`npm run build` 가 내 PC에서 성공하면 배포도 거의 확실히 성공한다. 불안할 때 미리 돌려보면 좋다.

---

## 5. 배포가 돌아가는 방식

```
글 작성  →  git push  →  Cloudflare가 자동 감지
                              ↓
                        서버에서 빌드
                              ↓
                    blog.igomdori.com 에 반영
```

내가 할 일은 push까지다. 나머지는 자동이다.

빌드 설정은 이미 저장소에 들어 있다.

- **Node 버전** — [`.nvmrc`](.nvmrc) 에 `22.12.0` 으로 고정. 이게 없으면 서버가 낮은 버전을 써서 빌드가 실패한다.
- **사이트 주소** — [`astro.config.mjs`](astro.config.mjs) 의 `site` 값. RSS와 사이트맵 주소를 만드는 기준이다.

---

## 6. 광고·수익화 준비 상태

붙이기 전에 확인할 것들. **`src/consts.ts` 하나만 고치면 되도록 만들어 뒀다.**

| 항목 | 상태 | 할 일 |
|---|---|---|
| 개인정보처리방침 | 있음 (`/privacy`) | 애드센스 신청 전 이메일 채우기 |
| 문의 이메일 | **비어 있음** | `consts.ts` 의 `CONTACT_EMAIL` 채우기 |
| 제휴 링크 표기 | 준비됨 | 글에 `affiliate: true` |
| 광고 문구 전환 | 꺼짐 | 광고 붙이는 커밋에서 `ADS_ENABLED = true` |

`ADS_ENABLED` 를 켜면 개인정보처리방침에 쿠키·광고 항목이 자동으로 추가된다. **광고를 달아놓고 이 값을 안 바꾸면 방침이 사실과 달라진다.** 애드센스 코드를 넣는 커밋에서 같이 바꿀 것.

문의 이메일이 비어 있으면 해당 문장이 자동으로 빠지므로 사이트는 깨지지 않는다. 다만 애드센스는 연락 수단을 요구하니 신청 전에는 채워야 한다.

---

## 7. 배포 세팅 (완료됨, 참고용)

Cloudflare Pages 연결은 이미 끝났다. 다시 만들 일이 생기면 이 순서대로 하면 된다.

**1) 프로젝트 만들기**
Cloudflare 대시보드 → **Workers & Pages** → Create → Pages → **Connect to Git**
GitHub 계정을 연결하고 `GomdorE/GomdorE.github.io` 저장소를 선택한다.

**2) 빌드 설정**

| 항목 | 값 |
|---|---|
| Framework preset | `Astro` |
| Build command | `npm run build` |
| Build output directory | `dist` |

Node 버전은 건드릴 필요 없다. `.nvmrc` 가 알아서 처리한다.

**3) 도메인 연결**
첫 배포가 끝나면 그 프로젝트의 **Custom domains** 탭 → Set up a custom domain → `blog.igomdori.com` 입력.

`igomdori.com` 이 같은 Cloudflare 계정에 있으므로 DNS 레코드는 자동으로 만들어지고, 인증서도 1~2분이면 발급된다. **CNAME을 직접 만들 필요 없다.**

---

## 8. 주소를 바꾸고 싶을 때

도메인을 바꾸면 [`astro.config.mjs`](astro.config.mjs) 의 `site` 값도 **반드시 같이** 바꿔야 한다.

```js
site: 'https://blog.igomdori.com',
```

여기를 안 고치면 사이트는 멀쩡히 뜨지만, RSS 구독 링크와 검색엔진에 넘기는 사이트맵이 옛 주소를 가리킨 채로 남는다.

---

## 9. 안 될 때

**글을 올렸는데 사이트에 안 보인다**
Cloudflare 대시보드의 프로젝트 → Deployments 에서 빌드가 실패했는지 본다. 대부분 원인은 맨 위 `---` 블록의 형식 오류다. 특히 `title` 에 따옴표를 안 씌운 경우.

**날짜가 이상하게 나온다**
`pubDate` 형식을 확인한다. `'2026-07-27'` 또는 `'Jul 27 2026'` 이어야 한다. `2026.07.27` 같은 형식은 인식하지 못한다.

**로컬에서 `npm run dev` 가 안 된다**
Node 버전이 22.12 미만이면 안 된다. `node -v` 로 확인한다.

**글 목록에 안 나온다**
파일이 `src/content/blog/` 안에 있는지, 확장자가 `.md` 인지 확인한다.

---

## 10. 폴더 구조

```
src/
├── content/blog/     ← 글은 전부 여기. 평소 건드리는 건 여기뿐이다.
├── categories.ts     ← 분류 이름. 새 카테고리 만들 때 여기 한 줄 추가.
├── consts.ts         ← 사이트 제목·설명, 문의 이메일, 광고 켜기 스위치
├── assets/           ← 글에 넣을 사진
├── pages/
│   ├── index.astro                     홈 (소개 + 최근 글)
│   ├── about.astro                     소개 페이지
│   ├── privacy.astro                   개인정보처리방침 (애드센스 필수)
│   ├── blog/index.astro                전체 글 목록
│   ├── blog/category/[category].astro  분류별 목록 (자동 생성)
│   └── 404.astro                       없는 주소로 들어왔을 때
├── layouts/          글 페이지의 틀
├── components/       머리말, 꼬리말, 글 목록 등 공통 조각
└── styles/global.css 전체 디자인 + 등장 애니메이션
public/               파비콘 등 그대로 복사되는 파일
```

---

디자인이나 구조를 바꾸고 싶으면 `src/styles/global.css` 부터 보면 된다. 색과 글꼴이 맨 위에 변수로 모여 있다.
