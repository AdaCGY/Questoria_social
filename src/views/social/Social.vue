<!-- src/views/Social.vue -->
<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// ====== 假資料（測試用）======
// 可選：簡單標記哪些是「我的」與「收藏」用來示範
const boards = ref([
  { id: 'gossip', name: '八卦', desc: '閒聊、日常、吐槽' },
  { id: 'tech',   name: '技術', desc: '前端 / 後端 / DevOps' },
  { id: 'nursing',name: '護理', desc: '臨床經驗、值班心得' },
])

const posts = ref([
  { id: 'p1', boardId: 'tech',    title: 'Vue3 專題起手式', content: '分享一下我的檔案結構與踩雷…', createdAt: Date.now() - 1000*60*60, like: 3, replies: 2, mine: true,  fav: false },
  { id: 'p2', boardId: 'gossip',  title: '今天通勤看到的事', content: '捷運上的超暖小故事',        createdAt: Date.now() - 1000*60*30, like: 1, replies: 0, mine: false, fav: true  },
  { id: 'p3', boardId: 'nursing', title: '夜班如何撐過去',   content: '咖啡、節奏、交班重點',        createdAt: Date.now() - 1000*60*10, like: 5, replies: 4, mine: false, fav: false },
])

// ====== 檢視模式：all / my / fav（支援 query.view 或 meta.view）======
const viewMode = computed(() => {
  const v = (route.query.view ?? route.meta.view ?? 'all').toString().toLowerCase()
  return ['all', 'my', 'fav'].includes(v) ? v : 'all'
})
const showFilterBar = computed(() => viewMode.value === 'all')
const simpleTitle = computed(() => (viewMode.value === 'my' ? '我的文章' : viewMode.value === 'fav' ? '收藏貼文' : ''))


// ====== UI 狀態（僅在一般模式下會用到）======
const selectedBoard = ref('all')
const search = ref('')
const sortBy = ref('newest') // newest | likes

// ====== 展示資料（篩選 + 搜尋 + 排序）======
const filteredSorted = computed(() => {
  let rows = posts.value.slice()

  // 模式切換篩選
  if (viewMode.value === 'my') {
    rows = rows.filter(p => p.mine)
  } else if (viewMode.value === 'fav') {
    rows = rows.filter(p => p.fav)
  } else {
    // 一般模式才有看板/搜尋條件
    if (selectedBoard.value !== 'all') {
      rows = rows.filter(p => p.boardId === selectedBoard.value)
    }
    const q = search.value.trim().toLowerCase()
    if (q) {
      rows = rows.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.content.toLowerCase().includes(q)
      )
    }
  }

  // 排序（兩種模式都吃得到）
  if (sortBy.value === 'likes') {
    rows.sort((a,b) => (b.like ?? 0) - (a.like ?? 0))
  } else {
    rows.sort((a,b) => (b.createdAt ?? 0) - (a.createdAt ?? 0))
  }
  return rows
})

function fmtTime(ts) {
  try { return new Date(ts).toLocaleString() } catch { return '' }
}
function boardName(id) {
  return boards.value.find(b => b.id === id)?.name || id
}
</script>

<template>
  <div class="container py-5">

    <!-- 簡單模式標題（我的文章 / 收藏貼文） -->
    <h5 v-if="simpleTitle" class="mb-3 text-muted">{{ simpleTitle }}</h5>

    <!-- 篩選列（只有在 view=all 才顯示） -->
    <div v-if="showFilterBar" class="filter-bar mb-4">
      <div class="py-3 px-4">
        <div class="row g-3 align-items-end">
          <div class="col-md-3">
            <label class="form-label">看板</label>
            <select v-model="selectedBoard" class="form-select">
              <option value="all">全部</option>
              <option v-for="b in boards" :key="b.id" :value="b.id">
                {{ b.name }}（{{ b.id }}）
              </option>
            </select>
          </div>
          <div class="col-md-6">
            <label class="form-label">搜尋</label>
            <input v-model="search" class="form-control" placeholder="輸入關鍵字（標題 / 內容）">
          </div>
          <div class="col-md-3">
            <label class="form-label">排序</label>
            <select v-model="sortBy" class="form-select">
              <option value="newest">最新發佈</option>
              <option value="likes">最多愛心</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- 文章清單 -->
    <div class="vstack gap-3">
      <a
        v-for="p in filteredSorted"
        :key="p.id"
        href="#"
        class="card text-decoration-none text-reset"
      >
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-center">
            <h2 class="h6 mb-0">{{ p.title }}</h2>
            <small class="text-muted">{{ fmtTime(p.createdAt) }}</small>
          </div>
          <p class="text-secondary mt-2 mb-2 text-truncate">{{ p.content }}</p>
          <div class="d-flex gap-3 text-muted small">
            <span>♥ {{ p.like ?? 0 }}</span>
            <span>回覆 {{ p.replies ?? 0 }}</span>
            <span>來自：<strong>{{ boardName(p.boardId) }}</strong></span>
          </div>
        </div>
      </a>

      <div v-if="filteredSorted.length === 0" class="text-center text-muted py-5">
        沒有符合條件的文章。
      </div>
    </div>
  </div>
</template>

<style scoped>
.text-truncate {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

/* 滑鼠移上去的卡片高亮效果 */
.card:hover {
  background-color: #f8f9fa;
  border-color: #0d6efd;
  cursor: pointer;
  transition: background-color 0.2s, border-color 0.2s;
}

/* 灰底區塊（同寬 + padding 內距） */
.filter-bar {
  background-color: #e5e7eb;
  box-shadow: 0 4px 18px rgba(0,0,0,.06);
  border: 1px solid #dee2e6;
  border-radius: .375rem;
}
</style>






