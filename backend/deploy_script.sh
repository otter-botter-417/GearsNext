#!/bin/bash

# ディレクトリに移動
cd /home/ubuntu/GearsNext

# 最新のコードをプル
git pull origin main

# バックエンドディレクトリに移動
cd backend

# Composerパッケージを更新
composer install --no-dev --optimize-autoloader

# 環境設定をキャッシュ
php artisan config:cache

# データベースマイグレーション
php artisan migrate --force
