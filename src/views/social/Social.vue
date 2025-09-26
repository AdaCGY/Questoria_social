<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import api from '@/services/api'
import { currentUser } from '@/services/currentUser'
import Swal from 'sweetalert2'

const route = useRoute()

// ====== 狀態 ======
const boards = ref([])
const posts = ref([])

// TODO: 之後要串登入系統，目前使用假資料
const memberId = currentUser.memberId

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

// ====== 載入分類 ======
const loadCategories = async () => {
  const resCategories = await api.getCategories()
  boards.value = resCategories.data.map(c => ({
    id: c.categoryId,
    name: c.categoryName,
    desc: ''
  }))
}

// ====== 載入文章（依模式切換） ======
const loadPosts = async () => {
  if (viewMode.value === 'fav') {
    const resFav = await api.getFavorites(memberId)
    posts.value = resFav.data.map(f => ({
      id: f.postId,
      title: f.postTitle,
      content: f.postsContent,
      createdAt: new Date(f.createdAt).getTime(),
      boardId: f.categoryId,
      categoryName: f.categoryName,
      username: f.username,
      like: f.likesCount,
      commentsCount: f.commentsCount ?? 0,
      postImage: f.postImage, // 收藏頁也帶圖片
      mine: f.username === currentUser.username,
      fav: true
    }))
  } else {
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
        commentsCount: p.commentsCount ?? 0,
        postImage: p.postImage, // 🔹 新增圖片欄位
        mine: p.memberId === memberId,
        fav: false
      }
    }))
  }
}

// ====== 篩選 + 排序 ======
const filteredSorted = computed(() => {
  let rows = posts.value.slice()

  if (viewMode.value === 'my') {
    rows = rows.filter(p => p.mine)
  } else if (viewMode.value === 'all') {
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

// ====== 刪除文章 ======
const deletePost = async (id) => {
  const ok = confirm('確定要刪除這篇文章嗎？')
  if (!ok) return
  try {
    await api.deletePost(id)
    posts.value = posts.value.filter(p => p.id !== id)
    Swal.fire('刪除成功！', '', 'success')
  } catch (err) {
    Swal.fire('刪除失敗', '', 'error')
    console.error(err)
  }
}

// ====== 取消收藏 ======
const removeFavorite = async (postId) => {
  const ok = await Swal.fire({
    title: '取消收藏確認',
    text: '確定要取消收藏這篇文章嗎？',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: '確定',
    cancelButtonText: '取消',
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6'
  })

  if (!ok.isConfirmed) return

  try {
    await api.removeFavorite(postId, memberId) 
    posts.value = posts.value.filter(p => p.id !== postId)
    Swal.fire('已取消收藏', '', 'success')
  } catch (err) {
    Swal.fire('取消收藏失敗', '', 'error')
    console.error(err)
  }
}

// ====== 初始化 + 監聽 ======
onMounted(async () => {
  await loadCategories()
  await loadPosts()
})
watch(viewMode, async () => {
  await loadPosts()
})
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
      <div v-for="p in filteredSorted" :key="p.id" class="card">
        <router-link
          :to="{ name: 'postDetail', params: { id: p.id } }"
          class="card-body text-decoration-none text-reset d-block"
        >
          <div class="d-flex justify-content-between align-items-center">
            <div><h3 class="sitename">{{ p.title }}</h3></div>
            <small class="period">{{ fmtTime(p.createdAt) }}</small>
          </div>

          <!-- 縮圖 -->
          <div v-if="p.postImage" class="mb-2">
            <img 
              :src="'data:image/png;base64,' + p.postImage"
              class="img-fluid rounded"
              style="max-height: 150px; object-fit: cover; width: 100%;"
            >
          </div>

          <p class="text-secondary mt-2 mb-2 text-truncate">{{ p.content }}</p>
          <div class="d-flex gap-3 text-muted small">
            <span>♥ {{ p.like ?? 0 }}</span>
            <span>💬 {{ p.commentsCount ?? 0 }}</span>
            <span>看板：<strong>{{ p.categoryName }}</strong></span>
            <span>來自：{{ p.username }}</span>
          </div>
        </router-link>

        <!-- 我的文章模式 -->
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

        <!-- 收藏文章模式 -->
        <div v-else-if="viewMode === 'fav'" class="card-footer d-flex justify-content-end">
          <button
            type="button"
            class="btn btn-sm btn-outline-warning"
            @click.prevent="removeFavorite(p.id)"
          >
            取消收藏
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








