---

````md id="frontend-readme-zh"
# Questoria Social

Questoria Social 是一個以 **Vue 3** 開發的社群論壇前端專案，提供使用者瀏覽貼文、互動（留言、按讚、收藏）與發佈內容的功能。

本專案搭配後端 API（QuestoriaSocial API），實現完整的社群平台操作流程。

---

## 專案功能

- 瀏覽貼文列表（支援搜尋 / 分類 / 排序）
- 查看貼文詳情（含留言）
- 新增貼文
- 編輯 / 刪除自己的貼文
- 留言功能（新增 / 顯示）
- 貼文按讚 / 取消按讚
- 留言按讚 / 取消按讚
- 收藏貼文 / 取消收藏
- 我的貼文列表
- 收藏貼文列表

---

## 技術架構

- Vue 3 (Composition API)
- Vue Router v4
- Axios（API 串接）
- Vite
- CSS / 基本 UI 設計

---

## 專案結構

```bash id="frontend-structure"
Questoria_social/
├─ src/
│  ├─ api/             # API 呼叫集中管理
│  ├─ views/           # 頁面（Social / PostDetail / CreatePost）
│  ├─ components/      # 共用元件
│  ├─ router/          # 路由設定
│  ├─ assets/          # 靜態資源
│  └─ main.js
├─ public/
├─ index.html
└─ package.json
````

---

## 主要頁面說明

### Social.vue（首頁）

* 顯示所有貼文
* 支援搜尋 / 分類篩選 / 排序
* 顯示按讚數與作者資訊

### PostDetail.vue（貼文詳情）

* 顯示完整貼文內容
* 顯示留言列表
* 支援留言新增
* 按讚 / 收藏操作

### CreatePost.vue（新增 / 編輯貼文）

* 建立新貼文
* 編輯既有貼文（編輯模式）

---

## API 串接

本專案需搭配後端 API 使用：

👉 QuestoriaSocial API
[https://github.com/AdaCGY/QuestoriaSocial_api](https://github.com/AdaCGY/QuestoriaSocial_api)

---

## 環境設定與執行

### 1. 安裝套件

```bash id="frontend-install"
npm install
```

---

### 2. 設定 API Base URL

請在 `api.js` 中設定後端 API 位址，例如：

```js id="frontend-api"
const API_BASE_URL = "https://localhost:xxxx/api"
```

---

### 3. 啟動專案

```bash id="frontend-run"
npm run dev
```

---

## 開發進度

已完成：

* 貼文列表顯示
* 搜尋 / 分類 / 排序
* 新增貼文
* 貼文詳情頁面（基本資料）
* 按讚 / 收藏 UI

開發中：

* 留言功能測試
* 按讚 / 收藏 API 串接
* 編輯 / 刪除貼文功能串接
* 收藏頁面 API 整合

---

## 專案說明

本專案為個人作品集，重點在於：

* Vue 3 實務應用
* 前後端分離架構
* RESTful API 串接
* 社群平台功能實作

---

## 作者

AdaCGY

```

---
