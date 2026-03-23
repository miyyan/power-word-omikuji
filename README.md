# パワーワードおみくじ

「理工系文学少女、アーキテクトになる。」の販促用Webアプリケーション

## 概要

技術書典で頒布されるエッセイ本『理工系文学少女、アーキテクトになる。』のための、パワーワードおみくじアプリです。
読者がスマホでQRコードを読み取り、今の自分にぴったりの「パワーワード」を受け取る体験を提供します。

## ✨ デモ

![ホーム画面](docs/home-screen.png)
![結果画面](docs/result-screen.png)
![神級演出](docs/god-level.png)

## 主な機能

- **おみくじ抽選**: 52個のパワーワードからランダムに1つを選択
- **レアリティシステム**: 
  - **神級**（1%以下の出現率）: 特別な黄金演出 + 紙吹雪エフェクト
  - **通常級**（アーキテクト級・リードエンジニア級・シニアエンジニア級）: シンプルで美しい演出
- **ローディングアニメーション**: 抽選中の待機画面
- **SNS共有**: X（Twitter）への共有機能
- **書籍購入リンク**: 技術書典への誘導
- **モバイルファースト**: スマートフォン最適化

## 技術スタック

- **React** 18.3.1 - UIライブラリ
- **TypeScript** - 型安全性
- **Tailwind CSS v4** - スタイリング
- **Motion** (旧Framer Motion) - アニメーション
- **canvas-confetti** - 紙吹雪エフェクト
- **Vite** - ビルドツール
- **lucide-react** - アイコン

## プロジェクト構造

```
/src
  /app
    /components
      - HomeScreen.tsx          # トップ画面
      - ResultScreen.tsx        # 結果表示画面
      - LoadingScreen.tsx       # ローディング画面
    /data
      - powerwords.json         # 52個のパワーワードデータ
    /utils
      - omikuji.ts             # おみくじロジック
    - App.tsx                   # メインコンポーネント
  /styles
    - theme.css                 # カラーテーマ
    - tailwind.css              # Tailwind設定
```

## データ構造

`/src/app/data/powerwords.json` に52個のパワーワードを格納:

```json
{
  "id": 1,
  "rank": "神級",
  "word": "「新人？ なんで？ 募集してないけど」",
  "source": "第2章 2.3節, p.10",
  "isRare": true
}
```

## コンポーネント構成

- `App.tsx`: メインコンポーネント、状態管理
- `HomeScreen.tsx`: トップ画面（おみくじボタン）
- `ResultScreen.tsx`: 結果表示画面
- `LoadingScreen.tsx`: ローディング画面

## デザインコンセプト

- **配色**: 白ベースに知的なブルー（#3b82f6）と落ち着いたグレー
- **雰囲気**: エンジニアリングと文学・カフェの融合
- **演出**: 回路図パターンと手書き風の温かみ

## カスタマイズ

### パワーワードの追加・編集

`/src/app/data/powerwords.json` を編集してください。

### 書籍購入リンクの変更

`/src/app/components/ResultScreen.tsx` の `handlePurchase` 関数内のURLを変更してください。

```typescript
const handlePurchase = () => {
  window.open('YOUR_PURCHASE_URL_HERE', '_blank', 'noopener,noreferrer');
};
```

### 神級の出現率調整

`/src/app/App.tsx` の以下の行で確率を調整できます（デフォルト: 1%）:

```typescript
const isRareDraw = Math.random() < 0.01; // 0.01 = 1%
```

## ライセンス

このプロジェクトは書籍『理工系文学少女、アーキテクトになる。』の販促用に作成されました。