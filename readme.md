# ScanDocParser

**ScanDocParser** は、スキャンされたアンケート画像を解析し、文字認識（OCR）およびマーク認識を通じて、回答データをCSV形式で出力するローカル実行型のドキュメントパーサーです。

---

## 🧭 概要

- スキャン画像（JPEG/PNG）を対象に、ReactフロントエンドからGUIで範囲指定
- 回答欄を設定し、複数画像のOCR／マーク認識をバッチ並列処理
- 結果をCSV形式で保存
- 完全ローカル・無料動作（Docker対応）

---

## ⚙️ システム構成

- フロントエンド：React（TypeScript + MUI + react-konva）
- バックエンド：Python（FastAPI）
- OCRエンジン：Tesseract-OCR
- 並列処理：Pythonの`concurrent.futures`
- 実行環境：Docker / WSL2（Windows対応）

---

## 📁 ディレクトリ構成

```bash
project-root/
├── docker-compose.yml
├── .env
├── .gitignore
├── readme.md
├── public/
├── frontend/                # React + MUI + react-konva
│   ├── Dockerfile
│   ├── components/      # 範囲選択・アップロードなどのUI部品
│   ├── pages/           # 各画面ステップ（画像設定・解析など）
│   ├── services/        # API呼び出し
│   ├── types/           # 型定義
│   ├── package.json
│   ├── tsconfig.json
│   └── App.tsx
│
├── backend/                 # Python + FastAPI
│   ├── Dockerfile
│   ├── main.py              # エントリーポイント（FastAPI）
│   ├── api/                 # APIルーティング
│   │   ├── endpoints/
│   │   │   ├── upload.py
│   │   │   ├── analyze.py
│   │   │   └── config.py
│   │   └── __init__.py
│   ├── core/                # ビジネスロジック（OCR、画像解析）
│   │   ├── ocr.py
│   │   ├── image_utils.py
│   │   └── csv_writer.py
│   └── models/              # データ構造（Pydanticモデル）
│
├── storage/                 # 永続データ置き場（Docker volume対応可）
│   ├── images/              # 回答画像アップロード先
│   ├── map/                 # 回答欄定義（JSON）
│   └── output/              # 結果CSVファイル出力先
│
└── docs/                    # 設計資料・仕様書（Markdown等）
    ├── requirements.md
    └── screens.md
```

---

## 🖥️ 必要環境

- Windows 11 + WSL2 + Docker Desktop
- CPU: Intel Core i7 第12世代（8C16T 以上推奨）
- メモリ: 16GB 以上推奨（推奨：32GB）

---

## 🚀 インストール手順

```bash
# 1. リポジトリをクローン
git clone https://github.com/ikepu-tp/scan-doc-parser.git
cd scan-doc-parser

# 2. Dockerコンテナ起動
docker-compose up
```

> 初回ビルド時は数分かかることがあります。

---

## 🌐 利用方法（基本フロー）

1. Web UI にアクセス（通常 [http://localhost:3000](http://localhost:3000)）
2. サンプル画像をアップロード
3. 回答欄をGUIで設定し、保存（JSON形式）
4. 回答済み画像をアップロード（複数枚対応）
5. 「解析開始」ボタンを押すと、OCR＋マーク判定を実行
6. 結果は `/storage/output/` にCSV形式で保存

---

## 🔧 回答方式の種類（指定可能）

1. 記述式：OCRによるテキスト認識
2. 選択式（囲み）：チェック／丸つけによる認識
3. リッカート式（表形式）：縦横グリッドでの○／✓による判定

---

## 📤 出力フォーマット（CSV）

```csv
answer_id,Q1,Q2,Q3,...,Qn
0001,よく当てはまる,青,りんご
0002,まあ当てはまる,赤,バナナ
...
```

---

## 🧑‍💻 コントリビューション

プルリクエスト・Issue大歓迎です！
バグ報告や改善提案はお気軽にどうぞ。
