<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/services/api'

const router = useRouter()

// ====== 表單綁定資料 ======
const title = ref('')
const categoryId = ref('')
const content = ref('')

// ====== 後端載入分類 ======
const categories = ref([])
onMounted(async () => {
  categories.value = await api.getCategories()
})

// ====== 送出表單 ======
const submitPost = async () => {
  if (!title.value || !categoryId.value || !content.value) {
    alert('請填寫完整')
    return
  }

  const dto = {
    title: title.value,
    categoryId: categoryId.value,
    postsContent: content.value,
    memberId: 1 // TODO: 之後改成登入者 ID
  }

  try {
    await api.createPost(dto)
    alert('新增成功！')
    clearForm()
    router.push('/forum')
  } catch (err) {
    alert('新增失敗，請稍後再試')
    console.error(err)
  }
}

// ====== 取消（清空 + 回論壇） ======
const cancelPost = () => {
  clearForm()
  router.push('/forum')
}

// ====== 共用清空表單 ======
const clearForm = () => {
  title.value = ''
  categoryId.value = ''
  content.value = ''
}
</script>

<template>
  <div class="container mt-4">
    <div class="row justify-content-center">
      <!-- 限制寬度：中螢幕佔 8 欄，大螢幕佔 6 欄 -->
      <div class="col-md-8 col-lg-10">
    <form @submit.prevent="submitPost">
      <!-- 標題 -->
      <div class="mb-3">
        <label for="postTitle" class="form-label fw-semibold">標題</label>
        <input
          v-model="title"
          type="text"
          class="form-control fs-5"
          id="postTitle"
          placeholder="輸入貼文標題"
        />
      </div>

      <!-- 分類 -->
      <div class="mb-3">
        <label for="postCategory" class="form-label fw-semibold">分類</label>
        <select v-model="categoryId" class="form-select fs-5" id="postCategory">
          <option disabled value="">請選擇分類</option>
          <option v-for="cat in categories" :key="cat.categoryId" :value="cat.categoryId">
            {{ cat.categoryName }}
          </option>
        </select>
      </div>

      <!-- 內文 -->
      <div class="mb-3">
        <label for="postContent" class="form-label fw-semibold">內文</label>
        <textarea
          v-model="content"
          class="form-control fs-5"
          id="postContent"
          rows="5"
          placeholder="輸入貼文內容"
        ></textarea>
      </div>

      <!-- 送出 + 取消 -->
      <div class="mb-3 d-flex gap-2">
        <button type="submit" class="btn btn-primary">送出貼文</button>
        <button type="button" class="btn btn-secondary" @click="cancelPost">取消</button>
      </div>
    </form>
    </div>
  </div>
</div>
</template>

