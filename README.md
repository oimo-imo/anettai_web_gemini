# 亜寝帯 (ANETTAI) Web Project 🌴

おいもの個人サイト（ポートフォリオ）、「亜寝帯」のソースコードです。
Y2KやFrutiger Aero、そして南国リゾートの夢のような雰囲気を意識したデザインになっています。

## 🛠️ 技術スタック

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Deployment**: GitHub Pages (Static Export)

## 🚀 ローカルでの開発

開発サーバーを立ち上げる手順です。

1. **パッケージのインストール**:
   ```bash
   npm install
   ```

2. **開発サーバーの起動**:
   ```bash
   npm run dev
   ```

3. **ブラウザで確認**:
   プロジェクトに `basePath` が設定されているため、以下のURLでアクセスしてください：
   - [http://localhost:3000/anettai_web_gemini](http://localhost:3000/anettai_web_gemini)

## 📦 GitHub Pages へのデプロイ

このリポジトリは **GitHub Actions** を使用して自動的にビルド・デプロイされます。

1. `main` ブランチにプッシュすると、`.github/workflows/nextjs.yml` が作動します。
2. 自動的に静的ファイルがエクスポート(`out` ディレクトリ)され、`gh-pages` 環境にアップロードされます。
3. リポジトリ設定の **Pages** で、Source が `GitHub Actions` になっていることを確認してください。

### 注意点

- **画像パスについて**:
  GitHub Pagesのサブディレクトリに対応するため、コード内では `BASE_PATH` (from `@/lib/config`) を使用して画像パスを指定しています。
  
- **SNSアイコン等のフォルダ名**:
  `public/images/SNS` フォルダは大文字で統一されています。Linux環境（GitHub Actions）では大文字小文字が区別されるため、コード内でも `/images/SNS/...` と指定する必要があります。

## 📂 ディレクトリ構成

- `app/`: ページのメインコード (Next.js App Router)
- `components/`: 再利用可能なUIコンポーネント (NetaiChan, WorkCard, etc.)
- `data/`: 作品データ (works.json) など
- `public/`: 画像などの静的アセット
- `lib/`: 設定ファイルやユーティリティ
