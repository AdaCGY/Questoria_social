<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getPosts, getCategories, getPostLikes} from '@/services/api'

const route = useRoute()

// 從 API 抓分類
const boards = ref([])
const posts = ref([])

// 載入分類 + 貼文
onMounted(async () => {
  try {
    // 抓分類
    const resCategories = await getCategories()
    boards.value = resCategories.data.map(c => ({
      id: c.categoryId,
      name: c.categoryName,
      desc: ''
    }))

    // 抓貼文
    const resPosts = await getPosts()
    posts.value = await Promise.all(resPosts.data.map(async p => {
      // 呼叫 likes API
      let likes = 0
      try {
        const resLikes = await getPostLikes(p.postId)
        likes = resLikes.data
      } catch (err) {
        console.error(`載入貼文 ${p.postId} 的讚數失敗:`, err)
      }

      return {
        id: p.postId,
        title: p.title,
        content: p.postsContent,
        createdAt: new Date(p.createdAt).getTime(),
        boardId: Number(p.categoryId),
        categoryName: p.categoryName,
        username: p.username,
        like: likes,
        mine: false,
        fav: false
      }
    }))
  } catch (err) {
    console.error("載入分類或貼文失敗:", err)
  }
})


// ====== 檢視模式 ======
const viewMode = computed(() => {
  const v = (route.query.view ?? route.meta.view ?? 'all').toString().toLowerCase()
  return ['all', 'my', 'fav'].includes(v) ? v : 'all'
})
const showFilterBar = computed(() => viewMode.value === 'all')
const simpleTitle = computed(() =>
  viewMode.value === 'my' ? '我的文章' :
  viewMode.value === 'fav' ? '收藏貼文' : ''
)

// ====== UI 狀態 ======
const selectedBoard = ref(0)
const search = ref('')
const sortBy = ref('newest')

// ====== 篩選 + 排序 ======
const filteredSorted = computed(() => {
  let rows = posts.value.slice()

  if (viewMode.value === 'my') {
    rows = rows.filter(p => p.mine)
  } else if (viewMode.value === 'fav') {
    rows = rows.filter(p => p.fav)
  } else {
    if (selectedBoard.value !== 0) {
      rows = rows.filter(p => p.boardId === Number(selectedBoard.value))
    }
    const q = search.value.trim().toLowerCase()
    if (q) {
      rows = rows.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.content.toLowerCase().includes(q)
      )
    }
  }

  if (sortBy.value === 'likes') {
    rows.sort((a, b) => (b.like ?? 0) - (a.like ?? 0))
  } else {
    rows.sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0))
  }
  return rows
})

function fmtTime(ts) {
  try { return new Date(ts).toLocaleString() } catch { return '' }
}
function boardName(id) {
  return boards.value.find(b => b.id === id)?.name || id;
}

</script>


<template>
  <div class="container py-5">
    <!-- 簡單模式標題 -->
    <h5 v-if="simpleTitle" class="mb-3 text-muted">{{ simpleTitle }}</h5>

    <!-- 篩選列 -->
    <div v-if="showFilterBar" class="filter-bar mb-4">
      <div class="py-3 px-4">
        <div class="row g-3 align-items-end">
          <div class="col-md-3">
            <label class="form-label">看板</label>
            <select v-model.number="selectedBoard" class="form-select">
              <option :value="0">全部</option>
              <option v-for="b in boards" :key="b.id" :value="b.id">
              {{ b.name }}
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
          <div>
          <h2 class="h6 mb-0">{{ p.title }}</h2>
        </div>
        <small class="text-muted">{{ fmtTime(p.createdAt) }}</small>
      </div>
          <p class="text-secondary mt-2 mb-2 text-truncate">{{ p.content }}</p>
          <div class="d-flex gap-3 text-muted small">
            <span>♥ {{ p.like ?? 0 }}</span>
            <span>看板：<strong>{{ p.categoryName }}</strong></span>
            <span>來自：{{ p.username }}</span>
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







