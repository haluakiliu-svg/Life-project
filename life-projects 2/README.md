# Life Projects Dashboard — 部署說明

## 你需要的帳號（全部免費）
- GitHub：https://github.com
- Supabase：https://supabase.com
- Vercel：https://vercel.com（用 GitHub 登入）

---

## Step 1 — 建立 Supabase 資料庫（5 分鐘）

1. 登入 https://supabase.com → 點「New project」
2. 填入：
   - Project name：`life-projects`
   - Database password：（設一個你記得的密碼）
   - Region：選 **Northeast Asia (Tokyo)**
3. 等約 1 分鐘建立完成

4. 進入專案後，點左側「**SQL Editor**」
5. 貼上以下 SQL 並按「Run」：

```sql
create table projects_data (
  id text primary key,
  payload jsonb,
  updated_at timestamptz default now()
);

-- 允許所有人讀寫（個人工具用，夠用了）
alter table projects_data enable row level security;
create policy "allow all" on projects_data for all using (true) with check (true);
```

6. 點左側「**Project Settings**」→「API」
7. 複製以下兩個值（等一下要用）：
   - **Project URL**（長得像 `https://xxxx.supabase.co`）
   - **anon public key**（很長的一串）

---

## Step 2 — 上傳程式碼到 GitHub（3 分鐘）

1. 登入 https://github.com → 右上角「+」→「New repository」
2. Repository name：`life-projects`
3. 設為 **Private**（私人）
4. 點「Create repository」

5. 在你的電腦打開終端機（Terminal / 命令提示字元），執行：

```bash
cd 你放這個資料夾的路徑
git init
git add .
git commit -m "init"
git branch -M main
git remote add origin https://github.com/你的帳號/life-projects.git
git push -u origin main
```

> 如果你沒有用過 git，直接在 GitHub 網站上「Upload files」把 index.html 和 vercel.json 拖進去也可以。

---

## Step 3 — 部署到 Vercel（3 分鐘）

1. 登入 https://vercel.com（用 GitHub 帳號登入）
2. 點「**Add New Project**」
3. 選你剛才建立的 `life-projects` repository → 點「Import」
4. Framework Preset 選「**Other**」
5. 點「**Environment Variables**」，新增以下兩個變數：

| Key | Value |
|-----|-------|
| `SUPABASE_URL` | 剛才複製的 Project URL |
| `SUPABASE_ANON_KEY` | 剛才複製的 anon public key |

6. 點「**Deploy**」

---

## Step 4 — 把 Key 放進 index.html（1 分鐘）

打開 `index.html`，找到這兩行：

```js
const SUPA_URL = window.SUPABASE_URL || 'YOUR_SUPABASE_URL';
const SUPA_KEY = window.SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY';
```

直接把 `'YOUR_SUPABASE_URL'` 和 `'YOUR_SUPABASE_ANON_KEY'` 換成你的實際值：

```js
const SUPA_URL = 'https://xxxx.supabase.co';
const SUPA_KEY = 'eyJhbGc...（你的 anon key）';
```

存檔後推上 GitHub，Vercel 會自動重新部署（約 30 秒）。

---

## 完成後

- 你會得到一個網址，例如：`https://life-projects-xxx.vercel.app`
- 可以在 Vercel 設定「Custom Domain」用自己的網域
- 手機加到主畫面：Safari → 分享 → 加入主畫面，就像 App 一樣

## 之後更新內容

改了 `index.html` 之後：

```bash
git add .
git commit -m "update"
git push
```

Vercel 自動部署，約 30 秒後生效。

---

## 有問題？

把錯誤訊息截圖給 Claude，我幫你 debug。
