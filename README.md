# gomdore.log

Astro로 만든 개인 블로그. 글을 쓰고 `git push` 하면 자동으로 빌드되어 사이트에 반영된다.

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
| `updatedDate` | | 수정일. 넣으면 글 상단에 `updated`로 표시된다. |
| `heroImage` | | 대표 이미지. 안 넣어도 된다. |

작은따옴표를 빠뜨리지 말 것. 제목에 `:` 이 들어가면 따옴표 없이는 오류가 난다.

### 3) 올리기

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

## 3. 명령어 모음

| 명령어 | 하는 일 |
|---|---|
| `npm install` | 필요한 패키지 설치 (새 PC에서 처음 한 번) |
| `npm run dev` | 로컬 미리보기 서버 실행 (`localhost:4321`) |
| `npm run build` | 실제 배포와 똑같이 빌드해서 `dist/` 에 생성 |
| `npm run preview` | 빌드 결과를 로컬에서 확인 |

`npm run build` 가 내 PC에서 성공하면 배포도 거의 확실히 성공한다. 불안할 때 미리 돌려보면 좋다.

---

## 4. 배포가 돌아가는 방식

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

## 5. 최초 1회 세팅 (Cloudflare Pages)

아직 안 했다면 이 순서대로 하면 된다. **한 번만 하면 끝이고, 그 뒤로는 push만 하면 된다.**

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

## 6. 주소를 바꾸고 싶을 때

도메인을 바꾸면 [`astro.config.mjs`](astro.config.mjs) 의 `site` 값도 **반드시 같이** 바꿔야 한다.

```js
site: 'https://blog.igomdori.com',
```

여기를 안 고치면 사이트는 멀쩡히 뜨지만, RSS 구독 링크와 검색엔진에 넘기는 사이트맵이 옛 주소를 가리킨 채로 남는다.

---

## 7. 안 될 때

**글을 올렸는데 사이트에 안 보인다**
Cloudflare 대시보드의 프로젝트 → Deployments 에서 빌드가 실패했는지 본다. 대부분 원인은 맨 위 `---` 블록의 형식 오류다. 특히 `title` 에 따옴표를 안 씌운 경우.

**날짜가 이상하게 나온다**
`pubDate` 형식을 확인한다. `'2026-07-27'` 또는 `'Jul 27 2026'` 이어야 한다. `2026.07.27` 같은 형식은 인식하지 못한다.

**로컬에서 `npm run dev` 가 안 된다**
Node 버전이 22.12 미만이면 안 된다. `node -v` 로 확인한다.

**글 목록에 안 나온다**
파일이 `src/content/blog/` 안에 있는지, 확장자가 `.md` 인지 확인한다.

---

## 8. 폴더 구조

```
src/
├── content/blog/     ← 글은 전부 여기. 평소 건드리는 건 여기뿐이다.
├── pages/
│   ├── index.astro       홈 (소개 + 최근 글)
│   ├── about.astro       소개 페이지
│   ├── blog/index.astro  전체 글 목록
│   └── 404.astro         없는 주소로 들어왔을 때
├── layouts/          글 페이지의 틀
├── components/       머리말, 꼬리말 등 공통 조각
└── styles/global.css 전체 디자인
public/               파비콘 등 그대로 복사되는 파일
```

---

디자인이나 구조를 바꾸고 싶으면 `src/styles/global.css` 부터 보면 된다. 색과 글꼴이 맨 위에 변수로 모여 있다.
