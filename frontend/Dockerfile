# ステージ 1: ビルド
FROM node:20 AS build

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .

# RUN yarn build

# ステージ 2: 開発用にホスト（任意）
FROM node:20

WORKDIR /app

COPY --from=build /app /app

EXPOSE 3000

CMD ["yarn", "dev"]
