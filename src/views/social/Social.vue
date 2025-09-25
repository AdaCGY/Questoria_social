<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import api from '@/services/api'
import { currentUser } from '@/services/currentUser'

const route = useRoute()

// ====== 狀態 ======
const boards = ref([])
const posts = ref([])

// TODO: 之後要串登入系統，目前使用假資料
const memberId = currentUser.memberId

// ====== 載入分類 + 貼文 ======
onMounted(async () => {
  try {
    // 抓分類
    const resCategories = await api.getCategories()
    boards.value = resCategories.data.map(c => ({
      id: c.categoryId,
      name: c.categoryName,
      desc: ''
    }))

    // 抓貼文
    const resPosts = await api.getPosts()
    posts.value = await Promise.all(resPosts.data.map(async p => {
      let likes = 0
      try {
        const resLikes = await api.getPostLikes(p.postId)
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
        mine: p.memberId === memberId,   // 判斷是不是登入者文章
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

const deletePost = async (id) => {
  if (!confirm('確定要刪除這篇文章嗎？')) return
  try {
    await api.deletePost(id)
    posts.value = posts.value.filter(p => p.id !== id)
    alert('刪除成功！')
  } catch (err) {
    alert('刪除失敗，請稍後再試')
    console.error(err)
  }
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
      <div
        v-for="p in filteredSorted"
        :key="p.id"
        class="card"
      >
        <!-- 點擊卡片任意地方跳文章詳閱 -->
        <router-link
          :to="{ name: 'postDetail', params: { id: p.id } }"
          class="card-body text-decoration-none text-reset d-block"
        >
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <h2 class="sitename">{{ p.title }}</h2>
            </div>
            <small class="period">{{ fmtTime(p.createdAt) }}</small>
          </div>
          <p class="text-secondary mt-2 mb-2 text-truncate">{{ p.content }}</p>
          <div class="d-flex gap-3 text-muted small">
            <span>♥ {{ p.like ?? 0 }}</span>
            <span>看板：<strong>{{ p.categoryName }}</strong></span>
            <span>來自：{{ p.username }}</span>
          </div>
        </router-link>

        <!-- ✅ 我的文章模式才顯示按鈕 -->
        <div v-if="viewMode === 'my' && p.mine" class="card-footer d-flex justify-content-end gap-2">
          <router-link
            :to="{ name: 'createPost', query: { editId: p.id } }"
            class="btn btn-sm btn-outline-primary"
          >
            編輯
          </router-link>
          <button
            type="button"
            class="btn btn-sm btn-outline-danger"
            @click.prevent="deletePost(p.id)"
          >
            刪除
          </button>
        </div>
      </div>

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







