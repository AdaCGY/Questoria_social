<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import api from '@/services/api'

const route = useRoute()

// ====== 狀態 ======
const post = ref(null)      // 單篇貼文詳情
const comments = ref([])    // 留言清單
const newComment = ref('')  // 新增留言內容

// TODO: 改成實際登入者 ID（目前先寫死 1）
const memberId = 1

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
    await loadPostDetail()  // 重新載入，更新留言清單
  } catch (err) {
    alert('留言失敗，請稍後再試')
    console.error(err)
  }
}

onMounted(() => {
  loadPostDetail()
})

const deletePost = async (id) => {
  if (!confirm('確定要刪除這篇文章嗎？')) return
  try {
    await api.deletePost(id)
    alert('刪除成功！')
    // 返回論壇列表
    router.push('/forum')
  } catch (err) {
    alert('刪除失敗，請稍後再試')
    console.error(err)
  }
}
</script>

<template>
  <div class="container py-4" v-if="post">
    <!-- 貼文標題 -->
    <h2>{{ post.title }}</h2>
    <p class="text-muted">
      作者：{{ post.username }} ｜ 看板：{{ post.categoryName }} ｜ 發佈時間：{{ new Date(post.createdAt).toLocaleString() }}
    </p>
    <p>{{ post.postsContent }}</p>

    <!-- 貼文互動 -->
    <div class="d-flex gap-3 mb-4">
      <span>♥ {{ post.likesCount }}</span>
      <span v-if="post.isLikedByCurrentUser" class="text-danger">（已按讚）</span>
      <span v-if="post.isFavoritedByCurrentUser" class="text-warning">⭐ 已收藏</span>
    </div>

    <!-- ✅ 如果是自己的文章，顯示編輯 / 刪除 -->
<div v-if="post.memberId === memberId" class="mb-4 d-flex gap-2">
  <router-link
    :to="{ name: 'createPost', query: { editId: post.postId } }"
    class="btn btn-outline-primary btn-sm"
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
        <strong>{{ c.username }}</strong>：
        <span>{{ c.commentsContent }}</span>
        <div class="small text-muted">
          ♥ {{ c.likesCount }} ｜ {{ new Date(c.commentedAt).toLocaleString() }}
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

