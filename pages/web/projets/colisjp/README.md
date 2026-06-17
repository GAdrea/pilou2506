# colisjp

Application facilitant l'enregistrement des colis et la gestion des tarifs pour les hôtels au Japon.

## Description

Cette application web est un système de gestion de colis et de facturation conçu pour simplifier le processus d'enregistrement des livraisons dans un contexte hôtelier au Japon.

### Fonctionnalités principales

- Enregistrement des colis avec :

  - Informations client (numéro de chambre, nom)
  - Détails du colis (date, type, dimensions)
  - Gestion des frais (transport, emballage)
  - Calcul automatique des montants
  - Suivi des paiements (espèces ou facturation chambre)

- Interface intuitive :

  - Tableau dynamique avec lignes pré-remplies
  - Sélection rapide des types de box et des tarifs associés
  - Calcul automatique des totaux et de la monnaie
  - Gestion des colis multiples pour un même client

- Fonctionnalités pratiques :
  - Attribution des employés responsables
  - Système de checkbox pour le suivi
  - Formats adaptés aux standards japonais (dates, devises)
  - Design responsive et ergonomique
  - Transfert des données vers un système d'impression

### Technologies utilisées

- HTML5
- CSS3
- JavaScript vanilla
- Serveur Python local pour le développement

## Mode d'emploi (Français)

### Installation

1. Cloner le repository
2. Exécuter le fichier `start_server.bat` pour lancer le serveur local
3. L'application s'ouvrira automatiquement dans votre navigateur par défaut

### Utilisation quotidienne

1. **Saisie des informations**

   - Remplir le numéro de chambre et le nom du client
   - Sélectionner le type de colis ou de matériel d'emballage
   - Entrer les frais de transport si applicable
   - Indiquer la quantité pour les matériaux d'emballage

2. **Gestion des paiements**

   - Choisir le mode de paiement (espèces ou facturation chambre)
   - Pour les paiements en espèces, saisir le montant reçu
   - Le système calcule automatiquement la monnaie à rendre

3. **Finalisation**

   - Sélectionner l'employé responsable
   - Utiliser les cases à cocher pour marquer les transactions traitées
   - Cliquer sur "Données à transférer" pour préparer l'impression
   - Utiliser le bouton "Sauvegarder" pour conserver les données temporairement

4. **Fonctions supplémentaires**
   - "Données à effacer" : réinitialise le formulaire
   - "Tout sélectionner" : coche/décoche toutes les lignes
   - Le système sauvegarde automatiquement les données en cours

## 使用説明書 (日本語)

### インストール方法

1. リポジトリをクローンする
2. `start_server.bat`ファイルを実行してローカルサーバーを起動する
3. アプリケーションはデフォルトのブラウザで自動的に開きます

### 日常的な使用方法

1. **情報入力**

   - お客様の部屋番号と名前を入力
   - 荷物の種類または梱包材を選択
   - 該当する場合は運賃を入力
   - 梱包材の数量を指定

2. **支払い管理**

   - 支払い方法を選択（現金または部屋付け）
   - 現金支払いの場合、受け取った金額を入力
   - システムが自動的にお釣りを計算

3. **完了手続き**

   - 担当スタッフを選択
   - チェックボックスを使用して処理済みの取引をマーク
   - 「データを転送」をクリックして印刷準備
   - 「保存」ボタンを使用してデータを一時的に保存

4. **追加機能**
   - 「データを消去」：フォームをリセット
   - 「全選択」：すべての行のチェックボックスをオン/オフ
   - システムは進行中のデータを自動的に保存

# colisjp

仕事用の荷物と料金の登録を簡単にするアプリ（もちろん誰かの役に立てば）

## 説明

このウェブアプリケーションは、日本のホテル環境における配送と請求の管理システムで、配送登録プロセスを簡素化するために設計されています。

### 主な機能

- 荷物の登録:

  - お客様情報（部屋番号、氏名）
  - 荷物の詳細（日付、種類、サイズ）
  - 料金管理（運賃、梱包材）
  - 金額の自動計算
  - 支払い管理（現金または部屋付け）

- 直感的なインターフェース:

  - 20 行の事前入力された動的テーブル
  - ボックスタイプと関連料金のクイック選択
  - 合計金額とお釣りの自動計算
  - 同一顧客の複数荷物管理

- 実用的な機能:
  - 担当スタッフの割り当て
  - 追跡用チェックボックスシステム
  - 日本の標準に適応したフォーマット（日付、通貨）
  - レスポンシブで人間工学的なデザイン

### 使用技術

- HTML5
- CSS3
- バニラ JavaScript
- 外部依存なし

### インストール方法

1. リポジトリをクローン
2. ウェブブラウザで index.html を開く
3. すぐに使用可能

### 使用方法

インターフェースで可能な操作:

- お客様と荷物の情報入力
- 標準化された梱包材の選択
- 料金の自動計算
- 現金または部屋付けでの支払い管理
- 配送完了の追跡

お客様の荷物発送を定期的に管理するホテルや施設に最適です。
