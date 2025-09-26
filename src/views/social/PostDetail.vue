<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router' 
import api from '@/services/api'
import Swal from 'sweetalert2'
import { ElIcon } from 'element-plus'
import { Warning } from '@element-plus/icons-vue'
import { currentUser } from '@/services/currentUser'
import { confirmDialog } from '@/services/confirmDialog'

const route = useRoute()
const router = useRouter()

// ====== 狀態 ======
const post = ref(null)      // 單篇貼文詳情
const comments = ref([])    // 留言清單
const newComment = ref('')  // 新增留言內容

// TODO: 改成實際登入者 ID（目前使用假資料）
const memberId = currentUser.memberId

// 編輯留言狀態
const editingId = ref(null)
const editContent = ref('')

// ====== 載入貼文詳情 ======
const loadPostDetail = async () => {
  try {
    const res = await api.getPostDetail(route.params.id, memberId)
    post.value = res.data
    comments.value = res.data.comments || []
  } catch (err) {
    console.error('載入貼文詳情失敗:', err)
  }
}

// ====== 新增留言 ======
const submitComment = async () => {
  if (!newComment.value.trim()) {
    alert('留言不可為空')
    return
  }

  const dto = {
    postId: post.value.postId,
    memberId,
    commentsContent: newComment.value
  }

  try {
    await api.createComment(dto)
    newComment.value = ''
    await loadPostDetail()
  } catch (err) {
    alert('留言失敗，請稍後再試')
    console.error(err)
  }
}

// ====== 編輯留言 ======
const startEdit = (c) => {
  editingId.value = c.commentId
  editContent.value = c.commentsContent
}

const cancelEdit = () => {
  editingId.value = null
  editContent.value = ''
}

const updateComment = async (id) => {
  try {
    await api.updateComment(id, { commentsContent: editContent.value })
    await loadPostDetail()
    cancelEdit()
  } catch (err) {
    alert('更新留言失敗')
    console.error(err)
  }
}

// ====== 刪除留言 ======
const deleteComment = async (id) => {
  const ok = await confirmDialog({
    title: '刪除確認',
    text: '確定要刪除這則留言嗎？此動作無法復原。',
    icon: 'warning'
  })
  if (!ok) return

  try {
    await api.deleteComment(id)
    await loadPostDetail()
    Swal.fire('刪除成功！', '', 'success')
  } catch (err) {
    Swal.fire('刪除失敗', '', 'error')
    console.error(err)
  }
}

// ====== 刪除文章 ======
const deletePost = async (id) => {
  const ok = await confirmDialog({
    title: '刪除確認',
    text: '確定要刪除這篇文章嗎？此動作無法復原。',
    icon: 'warning'
  })
  if (!ok) return

  try {
    await api.deletePost(id)
    Swal.fire('刪除成功！', '', 'success')
    router.push('/forum') 
  } catch (err) {
    Swal.fire('刪除失敗', '', 'error')
    console.error(err)
  }
}
// ====== 文章按讚 ======
const toggleLike = async () => {
  try {
    if (post.value.isLikedByCurrentUser) {
      // 取消讚
      await api.unlikePost(post.value.postId, memberId)
      post.value.likesCount--
      post.value.isLikedByCurrentUser = false
    } else {
      // 按讚
      await api.likePost({ postId: post.value.postId, memberId })
      post.value.likesCount++
      post.value.isLikedByCurrentUser = true
    }
  } catch (err) {
    Swal.fire('操作失敗', '', 'error')
    console.error(err)
  }
}
// ====== 留言按讚 / 取消讚 ======
const toggleCommentLike = async (c) => {
  try {
    if (c.isLikedByCurrentUser) {
      await api.unlikeComment(c.commentId, memberId)
      c.likesCount--
      c.isLikedByCurrentUser = false
    } else {
      await api.likeComment({ commentId: c.commentId, memberId })
      c.likesCount++
      c.isLikedByCurrentUser = true
    }
  } catch (err) {
    Swal.fire('操作失敗', '', 'error')
    console.error(err)
  }
}

// ====== 文章收藏 ======
const toggleFavorite = async () => {
  try {
    if (post.value.isFavoritedByCurrentUser) {
      await api.removeFavorite(post.value.postId, memberId)
      post.value.isFavoritedByCurrentUser = false
    } else {
      await api.addFavorite({ postId: post.value.postId, memberId })
      post.value.isFavoritedByCurrentUser = true
    }
  } catch (err) {
    Swal.fire('操作失敗', '', 'error')
    console.error(err)
  }
}
// ====== 檢舉文章 ======
const reportPost = async (postId) => {
  try {
    const res = await api.getReportCategories()
    const categories = res.data

    const { value: formValues } = await Swal.fire({
      title: '檢舉文章',
      html: `
        <select id="reportCategory" class="swal2-select">
          ${categories.map(c => `<option value="${c.reportCategoryId}">${c.reportCategoryName}</option>`).join('')}
        </select>
        <textarea id="reportContent" class="swal2-textarea" placeholder="補充說明（若選擇其他必填）"></textarea>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: '送出',
      cancelButtonText: '取消',
      preConfirm: () => {
        const reportCategoryId = Number(document.getElementById('reportCategory').value)
        const reportContent = document.getElementById('reportContent').value.trim()
        if (reportCategoryId === 4 && !reportContent) {
          Swal.showValidationMessage('請輸入詳細說明')
          return false
        }
        return { reportCategoryId, reportContent }
      }
    })

    if (!formValues) return

    await api.createReport({
      postId,
      memberId,
      reportCategoryId: formValues.reportCategoryId,
      reportContent: formValues.reportContent
    })
    Swal.fire('檢舉已送出！', '', 'success')
  } catch (err) {
    Swal.fire('檢舉失敗，請稍後再試', '', 'error')
    console.error(err)
  }
}

onMounted(() => {
  loadPostDetail()
})
</script>

<template>
  <div class="container py-4" v-if="post">
    <!-- 貼文標題 + 檢舉 -->
    <div class="d-flex justify-content-between align-items-start">
      <h2 class="mb-0">{{ post.title }}</h2>
      <button
        v-if="post.memberId !== memberId"
        class="btn btn-sm btn-light text-secondary"
        @click="reportPost(post.postId)"
      >
        <el-icon><Warning /></el-icon> 檢舉
      </button>
    </div>

    <!-- 文章資訊 -->
    <p class="text-muted">
      作者：{{ post.username }} ｜ 看板：{{ post.categoryName }} ｜ 發佈時間：{{ new Date(post.createdAt).toLocaleString() }}
    </p>

    <!-- 文章內容 -->
    <p style="white-space: pre-line;">{{ post.postsContent }}</p>

    <!-- 完整圖片 -->
    <div v-if="post.postImage" class="my-3 text-center">
      <img
        :src="'data:image/png;base64,' + post.postImage"
        alt="文章圖片"
        class="img-fluid rounded border"
        style="max-height: 500px; object-fit: contain;"
      >
    </div>

    <!-- 貼文互動 -->
    <div class="d-flex gap-3 mb-4">
      <button
        class="btn btn-sm"
        :class="post.isLikedByCurrentUser ? 'btn-danger' : 'btn-outline-danger'"
        @click="toggleLike"
      >
        ♥ {{ post.likesCount }}
      </button>
      <button
        class="btn btn-sm"
        :class="post.isFavoritedByCurrentUser ? 'btn-warning' : 'btn-outline-warning'"
        @click="toggleFavorite"
      >
        ⭐ {{ post.isFavoritedByCurrentUser ? '已收藏' : '收藏' }}
      </button>
    </div>

    <!-- 如果是自己的文章，顯示編輯 / 刪除 -->
    <div v-if="post.memberId === memberId" class="d-flex justify-content-end mt-2">
      <router-link
        :to="{ name: 'createPost', query: { editId: post.postId } }"
        class="btn btn-outline-primary btn-sm me-2"
      >
        編輯
      </router-link>
      <button class="btn btn-outline-danger btn-sm" @click="deletePost(post.postId)">
        刪除
      </button>
    </div>

    <!-- 留言清單 -->
    <h5>留言</h5>
    <div v-if="comments.length > 0" class="list-group mb-3">
      <div v-for="c in comments" :key="c.commentId" class="list-group-item">
        <div class="d-flex justify-content-between align-items-start">
          <strong>{{ c.username }}</strong>
        </div>
        <div>
          <span v-if="editingId !== c.commentId">{{ c.commentsContent }}</span>
          <div v-else>
            <textarea v-model="editContent" class="form-control mb-2"></textarea>
            <button class="btn btn-success btn-sm me-2" @click="updateComment(c.commentId)">確認</button>
            <button class="btn btn-secondary btn-sm" @click="cancelEdit">取消</button>
          </div>
        </div>
        <div class="d-flex justify-content-between align-items-center mt-2 small text-muted">
          <div>{{ new Date(c.commentedAt).toLocaleString() }}</div>
          <div v-if="c.memberId === memberId">
            <button
              v-if="editingId !== c.commentId"
              class="btn btn-outline-primary btn-sm me-2"
              @click="startEdit(c)"
            >
              ✏ 編輯
            </button>
            <button class="btn btn-outline-danger btn-sm" @click="deleteComment(c.commentId)">
              🗑 刪除
            </button>
          </div>
          <div v-else>
            <button
              class="btn btn-sm"
              :class="c.isLikedByCurrentUser ? 'btn-danger' : 'btn-outline-danger'"
              @click="toggleCommentLike(c)"
            >
              ♥ {{ c.likesCount }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <p v-else class="text-muted">尚無留言</p>

    <!-- 新增留言 -->
    <div class="mb-3">
      <textarea
        v-model="newComment"
        class="form-control"
        rows="3"
        placeholder="輸入留言..."
      ></textarea>
    </div>
    <button class="btn btn-primary" @click="submitComment">送出留言</button>
  </div>

  <div v-else class="text-center py-5">
    <p class="text-muted">載入中...</p>
  </div>
</template>