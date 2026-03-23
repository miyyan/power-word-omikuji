# 使用ガイド

## 目次

1. [基本的な使い方](#基本的な使い方)
2. [カスタマイズ方法](#カスタマイズ方法)
3. [データ管理](#データ管理)
4. [トラブルシューティング](#トラブルシューティング)

## 基本的な使い方

### ユーザー体験フロー

1. **ホーム画面**: ユーザーが「おみくじを引く」ボタンをタップ
2. **ローディング画面**: 1.5秒間の待機（期待感を高める）
3. **結果画面**: 
   - パワーワードが表示される
   - SNSシェアボタンで共有可能
   - 書籍購入リンクへ誘導
   - もう一度引くボタンでホームへ戻る

### 神級（レア）の演出

神級が出現した場合（1%の確率）:
- 黄金色のグラデーション背景
- 紙吹雪エフェクト（3秒間）
- 輝く光の演出
- キラキラパーティクル

## カスタマイズ方法

### 1. パワーワードの編集

`/src/app/data/powerwords.json` を編集:

```json
{
  "id": 53,
  "rank": "アーキテクト級",
  "word": "「あなたの新しいパワーワード」",
  "source": "第X章 X.X節, p.XXX",
  "isRare": false
}
```

**フィールド説明:**
- `id`: 一意の識別子（整数）
- `rank`: ランク名（神級、アーキテクト級、リードエンジニア級、シニアエンジニア級）
- `word`: 表示するパワーワード（テキスト）
- `source`: 出典情報（章・節・ページ数）
- `isRare`: 神級かどうか（true/false）

### 2. レア確率の調整

`/src/app/App.tsx` の `drawOmikuji` 関数内:

```typescript
// 1%の確率
const selectedWord = drawPowerWord(0.01);

// 5%の確率に変更する場合
const selectedWord = drawPowerWord(0.05);

// 0.1%の確率に変更する場合
const selectedWord = drawPowerWord(0.001);
```

### 3. ローディング時間の調整

`/src/app/App.tsx` の `setTimeout` の値を変更:

```typescript
// 現在: 1.5秒
setTimeout(() => {
  // ...
}, 1500);

// 3秒に変更する場合
setTimeout(() => {
  // ...
}, 3000);
```

### 4. 書籍購入リンクの設定

`/src/app/components/ResultScreen.tsx` の `handlePurchase` 関数:

```typescript
const handlePurchase = () => {
  // 技術書典のURLに変更
  window.open('https://techbookfest.org/product/xxxxx', '_blank', 'noopener,noreferrer');
  
  // またはBoothのURLに変更
  // window.open('https://booth.pm/ja/items/xxxxx', '_blank', 'noopener,noreferrer');
};
```

### 5. カラーテーマの変更

ブルーから別の色に変更する場合、各コンポーネントの色を調整:

**例: パープルに変更**

```tsx
// HomeScreen.tsx
className="text-blue-600"  // ← text-purple-600 に変更
className="from-blue-600 to-blue-500"  // ← from-purple-600 to-purple-500 に変更

// ResultScreen.tsx
className="from-blue-600 to-blue-500"  // ← from-purple-600 to-purple-500 に変更
```

### 6. アニメーション速度の調整

各コンポーネントの `motion.div` の `transition` プロパティを調整:

```tsx
// 現在
transition={{ duration: 0.5 }}

// より速く（0.3秒）
transition={{ duration: 0.3 }}

// よりゆっくり（1秒）
transition={{ duration: 1 }}
```

## データ管理

### 統計情報の取得

`/src/app/utils/omikuji.ts` に用意されているユーティリティ関数:

```typescript
import { getPowerWordStats } from './utils/omikuji';

const stats = getPowerWordStats();
console.log(stats);
// {
//   total: 52,
//   rare: 2,
//   normal: 50,
//   rankCounts: { '神級': 2, 'アーキテクト級': 17, ... },
//   rarePercentage: 3.85
// }
```

### ランク別の取得

```typescript
import { getRarePowerWords, getNormalPowerWords } from './utils/omikuji';

const rareWords = getRarePowerWords();
console.log(`神級ワード数: ${rareWords.length}`);

const normalWords = getNormalPowerWords();
console.log(`通常ワード数: ${normalWords.length}`);
```

## トラブルシューティング

### Q: おみくじが引けない

**A:** 以下を確認してください:
1. `powerwords.json` に正しいデータが入っているか
2. JSONの構文エラーがないか（カンマの位置など）
3. ブラウザのコンソールにエラーが出ていないか

### Q: 神級が全く出ない

**A:** 確率が1%と低いため、100回引いても出ないことがあります。テスト用に一時的に確率を上げてください:

```typescript
// テスト用に50%に設定
const selectedWord = drawPowerWord(0.5);
```

### Q: 紙吹雪が表示されない

**A:** `canvas-confetti` パッケージがインストールされているか確認:

```bash
npm list canvas-confetti
```

インストールされていない場合:

```bash
npm install canvas-confetti
```

### Q: 画像が表示されない

**A:** 
1. 画像パスが正しいか確認（`figma:asset/` から始まるか）
2. 画像ファイルが存在するか確認
3. ブラウザのネットワークタブでエラーを確認

### Q: SNS共有が動作しない

**A:** 
1. ポップアップブロッカーが有効になっていないか確認
2. HTTPSでアクセスしているか確認（一部機能にはHTTPSが必須）
3. ブラウザのコンソールでエラーを確認

### Q: モバイルでレイアウトが崩れる

**A:** 
1. ビューポートメタタグが設定されているか確認
2. `overflow-hidden` が適切に適用されているか確認
3. 実機でのテストを推奨（ブラウザのモバイルビューは完全ではない）

## パフォーマンス最適化

### 大量のデータを扱う場合

パワーワードが100件以上になる場合:

1. **遅延読み込み**: データを分割して読み込む
2. **キャッシング**: 一度読み込んだデータをメモリに保持
3. **仮想化**: 必要なデータのみレンダリング

### アニメーションの最適化

低スペック端末でパフォーマンスが悪い場合:

```typescript
// prefers-reduced-motion を検出して簡略化
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const animationVariants = prefersReducedMotion
  ? { duration: 0 }  // アニメーションなし
  : { duration: 0.5 };  // 通常のアニメーション
```

## ベストプラクティス

1. **定期的なバックアップ**: `powerwords.json` のバックアップを取る
2. **バージョン管理**: Gitでコードを管理する
3. **テスト**: 新しいパワーワードを追加したら必ずテストする
4. **ユーザーフィードバック**: 実際のユーザーの声を聞いて改善する
5. **アクセシビリティ**: スクリーンリーダーでの動作確認

## サポート

問題が解決しない場合は、以下の情報を含めて報告してください:
- ブラウザのバージョン
- デバイス情報（PC/スマホ、OS）
- コンソールに表示されるエラーメッセージ
- 再現手順
