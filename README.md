## キャンプ商品検索＆共有プラットフォーム

## 目次

1. [概要](#概要)
2. [技術スタック](#技術スタック)
   - [フロントエンド](#フロントエンド)
   - [バックエンド](#バックエンド)
   - [共通](#共通)
   - [開発ツール](#開発ツール)
3. [開発方針](#開発方針)
4. [URL](#URL)
5. [主要機能](#主要機能)
   - [商品検索ページ](#商品検索ページ)
   - [レイアウト投稿機能](#レイアウト投稿機能)
   - [投稿されたレイアウトの個別ページ](#投稿されたレイアウトの個別ページ)
   - [商品個別ページ](#商品個別ページ)
   - [商品追加ページ](#商品追加ページ)
     
### 概要

このプロジェクトはキャンプ商品の検索およびユーザーによるレイアウトの紹介を目的としたWebアプリケーションです。
登録済みのユーザーは、自身の写真にコメントと商品のイメージマップを登録し、他のユーザーと共有することができます。

### 技術スタック

#### フロントエンド

- **フレームワーク**: Next.js (TypeScript)
- **状態管理**: Recoil
- **UI フレームワーク**: Material-UI
- **バリデーション**: Yup
- **データ可視化**: Recharts

#### バックエンド

- **フレームワーク**: Laravel
- **認証**: JWT
- **画像処理**: Intervention Image
- **AWS SDK**: AWS S3 にファイルを保存
- **データベース**: MariaDB

#### 共通

- **HTTP クライアント**: Axios
- **CORS**: CORS パッケージ
- **環境変数**: Dotenv

#### 開発ツール

- **コードフォーマッタ**: ESLint
- **テスト**: PHPUnit, Faker

### 開発方針

- **フロントエンド**: アトミックデザインを採用
- **バックエンド**: TDD（Test-Driven Development）を採用

### URL

- [https://gears-camp.com/](https://gears-camp.com/)
  - ログインフォームにテストユーザー用の値が初期設定されています。

## データベース設計

本プロジェクトのデータベース設計は以下のER図に示されています。

![ER Diagram](/docs/er_diagram.png)


## 主要機能
### ホーム
[https://gears-camp.com/](https://gears-camp.com/)
![homePage](/docs/homePage.png)
- **商品とレイアウトのランイング情報**: 新着、いいね、閲覧数の切り替えが可能

### 商品検索ページ
[https://gears-camp.com/ItemSearchPage]([https://gears-camp.com/gears-camp.com/)
![itemSearchPage](/docs/itemSearchPage.png)
- **商品名での検索**: オートコンプリート機能付き
- **カテゴリー・サブカテゴリー選択**: プルダウン形式で単一選択
- **詳細な絞り込み**: アコーディオン形式で折りたたみ可能
  - **条件絞り込み**: AND/OR 切り替えトグルボタン
- **タグ・色選択**: オートコンプリート付きの複数選択セレクター
- **価格絞り込み**: 価格スライダーとピンが表示
- **条件クリア**: 検索条件を初期化
- **結果表示**: 画像をメインとしたグリッド表示、ページネーション機能付き

### レイアウト投稿機能
[https://gears-camp.com/AddNewLayoutPage](https://gears-camp.com/AddNewLayoutPage)

- **メイン画像アップロード**: 画像ファイル選択
- **商品ラベル配置**: 画像上をクリックで選択し、配置可能
- **投稿コメント**: テキストエリアで入力
- **使用商品の登録**: 商品リストから選択

### 投稿されたレイアウトの個別ページ
[https://gears-camp.com/layouts/1](https://gears-camp.com/layouts/1)
![layoutPage2](/docs/layoutPage2.png)
- **投稿画像とイメージマップ表示**
- **投稿コメント**
- **認証されたユーザーのアクション**: いいねとコメント投稿可能
- **商品リスト**: ページ下部に表示

### 商品個別ページ
<img src="/docs/itemPage.png" width="600" />
[https://gears-camp.com/items/1](https://gears-camp.com/items/1)
 **商品情報**: 価格、ブランド、サイズ等
- **関連レイアウト**: 商品が使用されているレイアウトをグリッド表示

### 商品追加ページ
[https://gears-camp.com/AddNewItemPage](https://gears-camp.com/AddNewItemPage)
![itemPage](/docs/itemPage.png)
- **商品アップロード**: 商品データを登録できます。
- **AWS S3**: 画像はバックエンドからAWS S3にアップロードされます。
