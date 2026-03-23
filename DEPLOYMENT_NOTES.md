# デプロイメントガイド

## はじめに

このアプリケーションは、モバイルファーストで設計されたSPA（シングルページアプリケーション）です。

## 必須の設定

### HTMLメタタグ

`index.html` に以下のメタタグが含まれていることを確認してください：

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<meta name="theme-color" content="#ffffff">
<meta name="description" content="理工系文学少女、アーキテクトになる。- パワーワードおみくじ">
```

## ビルド

```bash
npm run build
```

または

```bash
pnpm build
```

## デプロイ先の推奨

- **Vercel**: 最も簡単なデプロイ方法
- **Netlify**: シンプルな設定で利用可能
- **GitHub Pages**: 無料でホスティング可能
- **Cloudflare Pages**: 高速なグローバル配信

## 環境変数

現在、環境変数は不要です。書籍購入リンクを変更する場合は、ソースコードを直接編集してください。

## QRコード生成

デプロイ後のURLを使用して、QRコードを生成してください：

推奨ツール:
- https://www.qrcode-monkey.com/
- https://qr.io/

## パフォーマンス最適化

- すべての画像は最適化済み
- Motion（Framer Motion）を使用した軽量アニメーション
- コード分割は不要（SPAで軽量）

## セキュリティ

- XSS対策: Reactの自動エスケープを使用
- 外部リンクは `noopener,noreferrer` 付きで開く
- HTTPS必須（モダンブラウザの要件）

## ブラウザサポート

- iOS Safari 14+
- Android Chrome 90+
- 最新のモダンブラウザ

## トラブルシューティング

### JSONインポートエラー

もしTypeScriptでJSONインポートエラーが出る場合、`tsconfig.json`に以下を追加：

```json
{
  "compilerOptions": {
    "resolveJsonModule": true
  }
}
```

### モバイルでの表示崩れ

- ビューポートメタタグを確認
- オーバーフローを防ぐため `overflow-hidden` を適用

### アニメーションのパフォーマンス問題

- Motionのアニメーションは最適化済み
- 低スペック端末では自動的にアニメーションが簡略化されます

## アナリティクス（オプション）

Google Analytics や Plausible などのアナリティクスを追加する場合は、`index.html` にトラッキングコードを追加してください。

## 本番環境チェックリスト

- [ ] 書籍購入リンクURLを正しく設定
- [ ] OGP画像を設定（SNS共有用）
- [ ] favicon を設定
- [ ] HTTPS でデプロイ
- [ ] モバイルでの動作確認
- [ ] QRコードの生成とテスト
- [ ] SNS共有機能のテスト
