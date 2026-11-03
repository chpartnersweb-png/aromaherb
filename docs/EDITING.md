# 編集・運用ガイド

## 現在の状態

2026-11-03に、計画に沿ってローカルのAstroサイトを実装しました。
同日、追加依頼に従って構成を見直し、在籍一覧の画像をユーザー提供のcast02〜07へ差し替えました。
ユーザーの指定により、ビルド・テスト・ブラウザ確認・公開は行っていません。

## 主な編集箇所

| 内容 | ファイル |
| --- | --- |
| 店舗名・電話・営業時間・SNS | `src/data/site.ts` |
| コース料金・公開住所・アクセス | `src/data/site.ts` |
| 室内ギャラリーの画像・説明 | `src/data/site.ts`の`roomPhotos` |
| セラピストの名前・身長・紹介文 | `src/data/therapists.ts` |
| 添付画像の元PNG | `src/assets/therapists/` |
| 名前と添付画像の仮配置記録 | `docs/cast-image-map.json` |
| 改訂した構成と意図 | `docs/restructure-plan.md` |
| ページ本文・求人案内・各セクション | `src/pages/index.astro` |
| 配色・文字・余白・画面サイズごとの配置 | `src/styles/global.css` |
| スマホメニュー・プロフィールの開閉 | `src/scripts/main.ts` |
| ヒーロー・スクロール時の表示演出 | `src/scripts/motion.ts` |
| 透明ヘッダー・アニメーションの仕様 | `docs/ANIMATIONS.md` |
| ロゴ原稿 | `public/assets/brand/logo.svg` |
| ロゴPNG・OGP | `public/assets/brand/` |
| ヒーロー・在籍一覧の画像 | `public/assets/images/` |
| 合意事項・未確認事項 | `docs/lp-plan.md` |
| 出典・画像の扱い | `docs/CONTENT-SOURCES.md` |
| 生成した画像の全プロンプト | `docs/image-prompts.json` |

## 人物画像

- 在籍一覧はユーザー提供のcast02〜07、ヒーローはその色味と自撮りの雰囲気に合わせて再生成した専用画像です。
- 在籍一覧の画像は掲載順に仮配置しています。本人との対応を示すものとして扱わず、「イメージ画像」の表示と注記を維持しています。
- 添付7点のうちcast08は未使用です。元のHealingプロジェクトは変更していません。
- 画像を交換するときも、イメージ画像の場合は表示と注記を維持してください。
- `-card.webp`は一覧用、接尾辞なしの画像はプロフィール用です。同じ人物の両方のファイルを変更してください。
- `src/data/therapists.ts`の`position`で、一覧のトリミング位置を個別調整できます。`imageWidth`・`imageHeight`には元画像のサイズを設定します。
- プロフィールは元の縦横比で写真全体を表示します。横長写真の場合は写真の下に紹介文を表示する構成です。
- 現在のプロフィールには年齢・経験年数・新人表示を設けていません。

## ヒーロー

- `hero-a-desktop.webp`：ユーザーが選択した1枚目・A案。画面幅1100pxを超える場合に使用します。
- `hero-a-tablet.webp`：A案を参照して生成した3:4のタブレット専用画像。画面幅600pxを超え1100px以下の場合に使用します。
- `hero-a-mobile.webp`：A案を参照して生成した9:16のスマートフォン専用画像。画面幅600px以下の場合に使用します。
- 元PNGは`src/assets/hero/`、生成記録は`docs/hero-a-device-prompts.json`に保存しています。
- 画像の切り替えは`src/pages/index.astro`のpictureとプリロード、文字の位置は`src/styles/global.css`で管理しています。
- デスクトップは画像右寄りの余白へコピーを配置し、タブレットは縦横の向きに応じて文字と画像の位置を調整します。
- 基本の高さは100svhです。小さな画面では文字やボタンが隠れないよう最小高さを設けています。
- ヘッダーはヒーローの上に重ねているため、ヘッダー分の高さを別途加えていません。
- コピー・ボタン・注記は画像の一部ではなく、HTMLで重ねています。

## 室内ギャラリー

- 提供された室内写真3枚を「お部屋・アクセス」欄に掲載しています。
- 元画像は`src/assets/line_oa_chat_261102_17553*.jpg`、配信用は`public/assets/images/room-interior-01.webp`〜`room-interior-03.webp`です。
- パソコンでは3枚を横に並べ、スマートフォンでは横長写真を大きく、その下に縦長2枚を並べています。
- 写真と各部屋の対応は未指定のため、共通ギャラリーとして扱っています。

## 出勤・求人

- 出勤への案内はヒーロー直後に配置しました。パソコンでは在籍一覧の横にも営業時間・料金の目安・電話の利用ガイドを表示します。
- 出勤情報はアメブロへのリンクで案内します。日々のアメブロ更新を、サイトに自動転記する仕組みはありません。
- 募集欄には提供済みの3条件のみ記載しています。契約形態・報酬・詳しい仕事内容等は確定後に追記してください。
- 電話ボタンはすべて`src/data/site.ts`の番号を使います。

## 公開URL

正式URLは`https://aromaherb.pages.dev/`です。`src/config/site.mjs`で管理しています。
Astro設定、canonical、OGP、構造化データ、robots.txt、サイトマップは同じURLを使います。`PUBLIC_SITE_URL`の設定は不要です。
SEOの編集箇所とSearch Consoleの手順は`docs/SEO.md`を参照してください。
Search ConsoleのHTMLタグ方式を使う場合は、`PUBLIC_GOOGLE_SITE_VERIFICATION`へ発行されたcontent属性の値を設定してください。

## ロゴ・favicon・OGPの原稿

`scripts/create-brand-assets.mjs`は、ロゴSVGからPNGを書き出し、faviconとOGPの専用画像を作る形式変換用スクリプトです。
faviconとOGPの装飾や文言はこのスクリプトに原稿があります。
ページはロゴSVGを使用しています。ロゴSVGを変更した場合、OGPとPNGロゴも更新してください。

## ユーザー確認用

実装後の確認は今回実施していません。以下は確認時の参考です。

- スマートフォンとパソコンでのヒーローの表示、コピーと人物の位置。
- スマホメニュー、プロフィールの開閉、電話・SNSへのリンク。
- 現在の在籍プロフィール、料金の条件、営業時間・住所・求人条件。
- 公開URL設定後のビルドとOGP。

開発サーバーを起動するときは`AGENTS.md`に従い、`astro dev --background`を使ってください。
