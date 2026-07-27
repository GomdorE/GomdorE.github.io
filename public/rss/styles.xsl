<?xml version="1.0" encoding="UTF-8"?>
<!--
  rss.xml 은 구독 프로그램이 읽는 파일이라 브라우저로 열면 XML 날것이 보인다.
  이 스타일시트는 브라우저에서 열었을 때만 적용되어, 사람이 읽을 수 있는
  안내 페이지로 그려준다. 피드 자체는 전혀 바뀌지 않는다.
-->
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output method="html" encoding="UTF-8" indent="yes" />

	<xsl:template match="/">
		<html lang="ko">
			<head>
				<meta charset="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<title><xsl:value-of select="/rss/channel/title" /> — RSS</title>
				<style>
					:root {
						color-scheme: light dark;
						--bg: #fdfdfb; --text: #1a1a18; --body: #37362f;
						--muted: #6f6d64; --faint: #a3a198; --border: #e8e6df;
						--bg-code: #f4f3ee; --accent: #0f7b3f;
					}
					@media (prefers-color-scheme: dark) {
						:root {
							--bg: #121211; --text: #f0efec; --body: #c9c7c0;
							--muted: #93918a; --faint: #6b6962; --border: #2b2a26;
							--bg-code: #1d1c1a; --accent: #4ec585;
						}
					}
					* { box-sizing: border-box; }
					body {
						margin: 0; background: var(--bg); color: var(--body);
						font-family: -apple-system, BlinkMacSystemFont, system-ui,
							'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif;
						font-size: 16px; line-height: 1.75; word-break: keep-all;
					}
					main {
						width: 42rem; max-width: calc(100% - 2.5rem);
						margin: 0 auto; padding: 3.5rem 0 4rem;
					}
					a { color: inherit; }
					h1 {
						color: var(--text); font-size: 1.5rem; letter-spacing: -0.015em;
						margin: 0 0 0.5rem;
					}
					.lede { color: var(--muted); margin: 0 0 2rem; }
					.label {
						font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
						font-size: 0.72rem; font-weight: 500; letter-spacing: 0.12em;
						text-transform: uppercase; color: var(--faint);
						display: block; margin-bottom: 0.6rem;
					}
					.url {
						font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
						font-size: 0.85rem; background: var(--bg-code);
						border: 1px solid var(--border); border-radius: 8px;
						padding: 0.9rem 1.1rem; word-break: break-all; color: var(--text);
						margin-bottom: 2.6rem;
					}
					ul { list-style: none; margin: 0; padding: 0; }
					li { padding: 0.7rem 0; border-bottom: 1px solid var(--border); }
					li a { color: var(--text); font-weight: 500; text-decoration: none; }
					li a:hover { color: var(--accent); }
					.date {
						font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
						font-size: 0.75rem; color: var(--faint); display: block;
					}
					.desc { color: var(--muted); font-size: 0.9rem; margin: 0.15rem 0 0; }
					.back {
						display: inline-block; margin-top: 2.5rem;
						font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
						font-size: 0.82rem; color: var(--muted); text-decoration: none;
					}
					.back:hover { color: var(--text); }
				</style>
			</head>
			<body>
				<main>
					<h1><xsl:value-of select="/rss/channel/title" /> 구독하기</h1>
					<p class="lede">
						이 페이지는 RSS 피드입니다. 새 글이 올라오면 알려주는 주소예요.
						광고나 알고리즘 없이, 올라온 순서 그대로 받아볼 수 있습니다.
					</p>

					<span class="label">구독 주소</span>
					<div class="url"><xsl:value-of select="/rss/channel/link" />rss.xml</div>

					<span class="label">최근 글</span>
					<ul>
						<xsl:for-each select="/rss/channel/item">
							<li>
								<span class="date">
									<xsl:value-of select="substring(pubDate, 6, 11)" />
								</span>
								<a href="{link}"><xsl:value-of select="title" /></a>
								<p class="desc"><xsl:value-of select="description" /></p>
							</li>
						</xsl:for-each>
					</ul>

					<a class="back" href="{/rss/channel/link}">← 블로그로 돌아가기</a>
				</main>
			</body>
		</html>
	</xsl:template>
</xsl:stylesheet>
