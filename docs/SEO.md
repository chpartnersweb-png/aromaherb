# SEO設定・公開への反映

更新：2026-11-03

## 正式URL

https://aromaherb.pages.dev/

ユーザーが指定した公開URLを`src/config/site.mjs`で管理しています。
Astroのsite設定、canonical、OGP、構造化データ、robots.txt、サイトマップはこのURLを共有します。
従来の`PUBLIC_SITE_URL`環境変数への依存はなくしました。別ドメインへ移転する場合はこの共通設定を変更してください。

## タイトル・説明文

タイトル：

> 熊本・水前寺・本荘のメンズエステ｜aromaherb-あろま～ぶ

説明文：

> 熊本市中央区・水前寺／本荘のメンズエステ「aromaherb-あろま～ぶ」。オイルマッサージ90分10,000円から。在籍セラピスト、出勤情報への案内、コース料金、お部屋・アクセスを掲載。ご予約・お問い合わせは080-7006-3145へ。

- 「メンズエステ」はユーザーの業態説明に基づく表記です。
- 表示上の地域・業態説明も日本語にそろえました。店舗名入りロゴとヒーローの短いコピーは維持しています。
- 終了時刻、価格の税込・税別、未提供のサービスや効果を推定していません。
- 検索結果に実際に表示されるタイトルや説明文は、検索エンジン側で変更される場合があります。

## メタ情報

- canonical：`https://aromaherb.pages.dev/`
- og:url：canonicalと同じ正式URL。
- OGP画像：`https://aromaherb.pages.dev/assets/brand/ogp.png`
- OGP画像は店舗名入りの専用ブランド画像。生成したセラピストの顔画像を店舗の実写真として使用しません。
- OGP画像の種類・幅・高さ・代替説明、X共有用のタイトル・説明・画像・代替説明を設定。
- robots：index、follow、大きい画像プレビュー等の方針を指定。
- メタ情報を`src/components/Seo.astro`にまとめ、head内の重複を避けています。

## 構造化データ

JSON-LD形式で、次の情報を関連付けています。

- WebSite：正式サイト名、URL、言語、運営店舗。
- WebPage：タイトル、説明、正式URL、ブランド画像。
- Organization：店舗名、URL、電話、ロゴ、SNS、公開範囲の住所、提供された室内写真。
- Place：水前寺・本荘のお部屋。それぞれの住所は公開指定の丁目まで。
- Service・OfferCatalog：オイルマッサージ、90・120・150・180分のコース料金。

構造化データの店舗情報・料金・室内写真は、画面に表示するデータと共通化しています。
電話番号は構造化データでは国際形式に整えています。

以下は追加していません。

- 番地・建物名・部屋番号、郵便番号、緯度経度の推定値。
- 「LAST」から推定した終了時刻や24時間営業の指定。
- 評価点・口コミ数、資格、開業年、年齢、本人写真という主張。
- 未確定の給与・雇用形態に基づくJobPosting。
- 医療・資格を前提にした業種分類。

現在はOrganizationとPlaceで確認できる情報を記述しています。
LocalBusiness専用の検索表示やリッチリザルトへの適合・表示を保証する実装ではありません。

## robots.txt・サイトマップ

- `src/pages/robots.txt.ts`から`/robots.txt`を静的生成。クロールを許可し、サイトマップの正式URLを案内。
- `src/pages/sitemap.xml.ts`から`/sitemap.xml`を静的生成。
- 1ページサイトなので、サイトマップのページURLはトップページ1件だけ。`#therapists`等のアンカーを別ページとして登録しません。
- 画像サイトマップには、提供された室内写真3件を掲載。生成したヒーローや人物画像は店舗の実写真として登録しません。
- 正確な更新履歴と連携しないlastmod、priority、changefreqは追加していません。
- 追加パッケージやサーバー常駐処理は不要です。

## Search Console

この作業では、Search Consoleへのログイン・所有権確認・サイトマップ送信・インデックス登録リクエストは行っていません。

所有権確認が必要な場合：

1. Search ConsoleでURLプレフィックス`https://aromaherb.pages.dev/`のプロパティを追加します。
2. HTMLタグ方式を使う場合、発行されたタグのcontent属性の値を、Cloudflare Pagesのビルド環境変数`PUBLIC_GOOGLE_SITE_VERIFICATION`へ設定します。タグ全体ではなく値だけを設定します。
3. このソースを含むビルドをCloudflare Pagesへデプロイします。すでに所有権確認済みなら、環境変数の追加は不要です。
4. Search Consoleの所有権確認後、`https://aromaherb.pages.dev/sitemap.xml`を送信します。
5. トップページをURL検査し、必要に応じてインデックス登録をリクエストします。

メタ情報やサイトマップの追加だけで、検索掲載や順位が確定するわけではありません。

## 作業状況

今回の変更はローカルソースに反映済みです。公開先への反映には再ビルド・再デプロイが必要です。
ユーザー指定に従い、変更後のビルド・テスト・ブラウザによる表示確認は実施していません。
デプロイ、変更後の公開HTML・robots.txt・サイトマップの応答、構造化データの外部検証、Search Consoleの状態、インデックス登録状況も未確認です。

変更前の公開ページはブラウザで読み取り、canonicalなし、og:urlなし、相対パスのog:image、JSON-LDなしを確認しました。
取得ツールでrobots.txt・サイトマップは読めなかったため、公開先に未設置だったとは断定していません。

## 編集箇所

| 内容 | ファイル |
| --- | --- |
| 正式URL | `src/config/site.mjs` |
| タイトル・構造化データ | `src/data/seo.ts` |
| 説明文・店舗情報・料金 | `src/data/site.ts` |
| head内のメタ情報 | `src/components/Seo.astro` |
| robots.txt | `src/pages/robots.txt.ts` |
| サイトマップ | `src/pages/sitemap.xml.ts` |
| 所有権確認タグの設定例 | `.env.example` |

## 参考にした公式資料

- [Astro Components](https://docs.astro.build/en/basics/astro-components/)
- [Astro Routing](https://docs.astro.build/en/guides/routing/)
- [Google：canonicalの指定](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
- [Google：サイトマップの作成と送信](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Google：Organization構造化データ](https://developers.google.com/search/docs/appearance/structured-data/organization)
- [Google：LocalBusiness構造化データ](https://developers.google.com/search/docs/appearance/structured-data/local-business)
