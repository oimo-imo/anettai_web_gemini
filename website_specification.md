亜寝帯(ANETAI) Webサイト実装仕様書 v2.0 (統合版)
プロジェクト概要
インディーゲーム開発者・デジタルアーティスト「おいも」のポートフォリオサイト。
ブランド「亜寝帯」の世界観（亜熱帯×寝る＝鮮やかさと静けさの融合）を、**「Y2K × Frutiger Aero」**の視覚言語を用いて表現する。
懐かしくて新しい、**「Cyber Tropical Dream」**な空間を目指す。
ホスティング: Cloudflare Pages
独自ドメイン: あり（後日設定）
対応デバイス: レスポンシブ対応必須（PC、スマホ）
技術スタック
Next.js 14 (App Router)
SSG (Static Site Generation) でSEO最適化
画像最適化（next/image）
Framer Motion（アニメーション・遷移効果）
Three.js / React Three Fiber (検討中)
背景に軽量な3D要素（浮遊する幾何学図形や気泡）を配置するため
CSS Modules / Tailwind CSS
グラスモーフィズム、ネオン発光表現
JSON（作品データ管理）
Google Fonts: Zen Maru Gothic（日本語）
デザインコンセプト：『Cyber Tropical Dream』
コア・キーワード
Frutiger Aero (フルティガー・エアロ)
2000年代のOS（Windows Vista/7）のような透明感、光沢、楽観的な未来感。
モチーフ：水滴、ガラス、青空、芝生、光の反射（レンズフレア）。
Neo Y2K / Acid Graphics
原色に近いビビッドカラー、極太の立体文字、グリッドライン。
「インターネットの海」を漂うような浮遊感。
Plastic & Toy
おもちゃのような「ちゅるん」としたプラスチック質感。
リアルすぎない、デフォルメされた3D表現。
雰囲気の変遷（タイムライン）
ユーザーの滞在（スクロール）に合わせて、世界の空気が移ろいでいく。
時間帯
テーマ
特徴
昼 (Day)
Plastic Sky
「Frutiger Aero」全開。抜けるような青空、白い雲、水のような透明感。
夕方 (Sunset)
Melting Sunset
「Vaporwave」的なセンチメンタル。紫とオレンジのグラデーション、溶け出すような暖かさ。
夜 (Night)
Digital Deep
「Cyber Y2K」な深淵。黒背景にネオンが滲む、ブラウン管越しのようなデジタル・ナイト。

UIデザイン仕様（Look & Feel）
1. マテリアル（質感）
単なる「すりガラス（Glassmorphism）」から一歩進め、**「厚みのある物体」**として表現する。
Skeuomorphism (スキューモーフィズム):
ボタンやカードには明確な「ハイライト（光の反射）」と「ベベル（面取り）」を入れる。
「押せそう」「触れそう」な質感をCSS box-shadowとborderで再現。
Glossy (光沢):
要素の上部に白い透過グラデーションを配置し、ツヤを出す。
水滴やジェルボタンのような表現。
2. タイポグラフィ
日本語: Zen Maru Gothic (Google Fonts)
ウェイトは太め（Bold/Black）を推奨。丸ゴシックの「もちもち」した感じを活かす。
英語/見出し:
少し横長(Extended)のサンセリフ、またはY2K感のあるピクセルフォント（Chakra Petch, Orbitronなど）。
装飾:
文字自体にグラデーションをかける、または白いフチドリ（袋文字）をつけてポップにする。
3. カラーパレット
共通定義 (CSS Variables)
:root {
  /* 質感用 */
  --gloss-highlight: rgba(255, 255, 255, 0.8);
  --glass-border: rgba(255, 255, 255, 0.6);
  --shadow-color: rgba(0, 100, 255, 0.2);
}


時間帯別パレット
昼: Main #00D2FF (空色), Accent #70FF00 (ライムグリーン), Base #FFFFFF (光沢白)
夕: Main #FF2A6D (ホットピンク), Gradation #FF9E00→#D60270, Accent #FFF000 (レモン)
夜: Main #050014 (深紫), Neon #00FF9D (ミント), #BD00FF (パープル)
トップページ詳細仕様
全体構成と演出
画面全体背景には薄い「グリッド（方眼紙）」パターンを敷き、3Dオブジェクトがゆっくり浮遊する。
┌─────────────────────────────┐
│   Logo (中央・パララックス)    │
│   SNS Links (ロゴ下)         │
├─────────────────────────────┤ ← 昼：Windows XPの丘のような鮮やかな緑と青
│   サイト説明文               │
├─────────────────────────────┤
│   お気に入り作品             │ ← 夕方へ変化：空色が紫・オレンジへ溶ける
├─────────────────────────────┤
│   Gallery Button             │
├─────────────────────────────┤
│   Game (Coming Soon)         │ ← 夜へ変化：バイナリコード、ワイヤーフレーム背景
├─────────────────────────────┤
│   About                      │
├─────────────────────────────┤
│   各種Link                   │
└─────────────────────────────┘
【寝帯ちゃん - 画面下部固定（浮遊）】


各セクション詳細
1. ヒーローセクション
ロゴ: /images/ANETTAI_3DLogo.png
マウスの動きに合わせてパララックス（視差効果）で傾く。プルプル震えるアニメーション。
背景: 雲（Cloud）の画像をレイヤー分けして配置し、奥行きを出す。
2. SNS Links
アイコン + hover時にガラス風カード浮き上がり。
水滴のような光沢処理（Glossy）。
3. お気に入り作品（Pickup Works）
カードデザイン: CDジャケット、またはトレーディングカードのような厚みのあるデザイン。
ホバー演出: 「きらっ」と光の筋が走る（CSS linear-gradient アニメーション）。
クリックでポップアップ詳細表示。
4. Game / About / Link（夜セクション）
UI: 半透明の黒ガラスに、ネオンカラーの枠線（Glowing border）。
寝帯ちゃん:
画面下部に固定配置。
宇宙遊泳のようにふわふわ浮いている（Framer Motion）。
クリック時のインタラクションあり（ポーズ変化や吹き出し）。
ギャラリーページ詳細仕様
機能・UI
デザイン: 夜または夕方の「落ち着いた」テーマをベースにしつつ、作品が際立つように。
フィルタリング:
年別タブ（2025, 2024...）
タグ（Blender, アイソメトリック...）
グリッド:
正方形（aspect-ratio: 1/1）のカードを並べる。
ホバー時にカードが少し浮き上がり、タイトルがネオン風に発光して表示される。
作品モーダル
グラスモーフィズムのオーバーレイ。
閉じるボタンは「×」印のプラスチックパーツ風デザイン。
データ管理（JSON）
data/works.json で管理。
{
  "works": [
    {
      "id": 1,
      "title": "作品タイトル",
      "date": "2025-01-15",
      "year": 2025,
      "image": "/works/sample01.png",
      "tools": ["Blender", "Photoshop"],
      "tags": ["Blender", "アイソメトリック"],
      "description": "作品説明",
      "featured": true
    }
  ]
}


ファイル構成（Next.js App Router）
/
├── public/
│   ├── images/
│   │   ├── ANETTAI_3DLogo.png
│   │   ├── ANETTAI_netai.png
│   │   └── textures/           # グリッド、ノイズ等のテクスチャ
│   └── works/
├── app/
│   ├── layout.jsx              # ルートレイアウト
│   ├── page.jsx                # トップページ
│   ├── gallery/
│   │   └── page.jsx            # ギャラリーページ
│   └── globals.css
├── components/
│   ├── Header.jsx
│   ├── Footer.jsx
│   ├── WorkCard.jsx            # 厚みのあるカードコンポーネント
│   ├── WorkModal.jsx
│   ├── NetaiChan.jsx           # 固定・浮遊する寝帯ちゃん
│   ├── Background3D.jsx        # Three.js 背景（もし実装する場合）
│   └── ui/                     # UIパーツ
│       ├── GlossyButton.jsx    # ツヤのあるボタン
│       └── NeonFrame.jsx       # ネオン枠
├── data/
│   └── works.json
└── styles/
    ├── colors.css              # 新カラーパレット定義
    └── animations.css          # キーフレーム定義


実装優先順位
Phase 1: 基本構造とデザイン基盤
Next.js プロジェクトセットアップ。
Tailwind CSS設定 + カスタムカラーパレット（colors.css）の定義。
Zen Maru Gothic フォント導入。
基本的なUIコンポーネント作成（GlossyButton, WorkCard）。
Phase 2: トップページ演出
スクロールによる背景色遷移（昼→夕→夜）の実装。
ヒーローセクションのロゴパララックス。
寝帯ちゃんの浮遊アニメーション。
グリッド背景と装飾要素の配置。
Phase 3: ギャラリー機能
JSONデータ読み込みとグリッド表示。
フィルタリングロジック実装。
モーダル詳細表示。
Phase 4: ブラッシュアップ
アニメーション調整（ホバー時の光沢、遷移のスムーズさ）。
レスポンシブ確認・調整。
パフォーマンス最適化。
以上、実装仕様書 v2.0 (統合版)
