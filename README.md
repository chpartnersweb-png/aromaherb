# aromaherb-あろま～ぶ

熊本・水前寺／本荘のオイルマッサージ店の1ページサイトです。
既存のアメブロに合わせた白・ピンクと花のデザインで制作しています。

## 現在の状態

ローカルのAstroソースと専用画像を実装済みです。
ユーザーの指定に従い、ビルド・テスト・ブラウザ確認・公開は実施していません。

## ドキュメント

- [制作計画・合意事項](docs/lp-plan.md)
- [構成の見直し・添付画像の対応](docs/restructure-plan.md)
- [編集・運用ガイド](docs/EDITING.md)
- [SEO設定・Search Consoleの手順](docs/SEO.md)
- [透明ヘッダー・アニメーション](docs/ANIMATIONS.md)
- [情報・画像の出典](docs/CONTENT-SOURCES.md)
- [画像生成のプロンプト](docs/image-prompts.json)

## 開発

Node.jsの必要バージョンはpackage.jsonのenginesを参照してください。

開発サーバーはAGENTS.mdに従ってバックグラウンドで起動してください。

```sh
npm run dev -- --background
```

管理コマンドは `astro dev status`、`astro dev logs`、`astro dev stop` です。

正式URLは `https://aromaherb.pages.dev/` です。`src/config/site.mjs` で管理しています。
SEO設定はソースへ反映済みです。公開先への反映には再ビルド・再デプロイが必要です。
