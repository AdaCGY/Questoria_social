<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/services/api'
import { currentUser } from '@/services/currentUser'
import Swal from 'sweetalert2'

const route = useRoute()
const router = useRouter()

// ====== 狀態 ======
const title = ref('')
const categoryId = ref('')
const content = ref('')
const categories = ref([])
const editId = ref(route.query.editId || null) // 判斷是否編輯模式

// 圖片相關
const postImage = ref(null)       // Base64 圖片字串
const removeImage = ref(false)    // 是否刪除圖片
const previewUrl = ref(null)      // 前端顯示用的預覽圖
const fileInput = ref(null)       // 🔹 綁定 <input type="file">

// ====== 載入分類 ======
const loadCategories = async () => {
  try {
    const res = await api.getCategories()
    categories.value = res.data
  } catch (err) {
    console.error('載入分類失敗:', err)
  }
}

// ====== 如果是編輯模式，載入文章 ======
const loadPost = async () => {
  if (!editId.value) return
  try {
    const res = await api.getPostById(editId.value)
    const p = res.data
    title.value = p.title
    categoryId.value = String(p.categoryId ?? p.CategoryId)
    content.value = p.postsContent
    if (p.postImage) {
      postImage.value = p.postImage
      previewUrl.value = 'data:image/png;base64,' + p.postImage
    }
  } catch (err) {
    console.error('載入文章失敗:', err)
  }
}

// ====== 上傳圖片 ======
const handleFileUpload = (e) => {
  const file = e.target.files[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = () => {
    postImage.value = reader.result.split(',')[1]
    previewUrl.value = reader.result
    removeImage.value = false // 一旦選擇新圖，就取消刪除
  }
  reader.readAsDataURL(file)
}

// ====== 移除圖片 ======
const clearImage = () => {
  postImage.value = null
  previewUrl.value = null
  removeImage.value = true

  // 🔹 同時清掉 input 的值
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

// ====== 送出表單 ======
const submitPost = async () => {
  if (!title.value || !categoryId.value || !content.value) {
    Swal.fire('請填寫完整', '', 'warning')
    return
  }

  const dto = {
    title: title.value,
    categoryId: Number(categoryId.value),
    postsContent: content.value,
    memberId: currentUser.memberId,
    postImage: postImage.value,
    removeImage: removeImage.value // 🔹 控制刪除
  }

  try {
    if (editId.value) {
      await api.updatePost(editId.value, dto)
      Swal.fire('文章更新成功！', '', 'success')
    } else {
      await api.createPost(dto)
      Swal.fire('文章新增成功！', '', 'success')
    }
    clearForm()
    router.push('/forum')
  } catch (err) {
    Swal.fire('操作失敗，請稍後再試', '', 'error')
    console.error(err)
  }
}

// ====== 取消 ======
const cancelPost = () => {
  clearForm()
  router.push('/forum')
}

// ====== 清空表單 ======
const clearForm = () => {
  title.value = ''
  categoryId.value = ''
  content.value = ''
  postImage.value = null
  previewUrl.value = null
  removeImage.value = false
  if (fileInput.value) fileInput.value.value = ''
}

onMounted(() => {
  loadCategories()
  loadPost()
})
</script>

<template>
  <div class="container mt-4">
    <div class="row justify-content-center">
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
              <option v-for="cat in categories" :key="cat.categoryId" :value="cat.categoryId.toString()">
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

          <!-- 圖片 -->
          <div class="mb-3">
            <label class="form-label fw-semibold">圖片</label>
            <input
              ref="fileInput"
              type="file"
              class="form-control"
              accept="image/*"
              @change="handleFileUpload"
            />

            <!-- 預覽 -->
            <div v-if="previewUrl" class="mt-2 text-center">
              <img :src="previewUrl" alt="預覽圖片" class="img-fluid rounded" style="max-height: 200px; object-fit: contain;">
              <div class="mt-2">
                <button type="button" class="btn btn-sm btn-outline-danger" @click="clearImage">
                  移除圖片
                </button>
              </div>
            </div>
          </div>

          <!-- 送出 + 取消 -->
          <div class="mb-3 d-flex gap-2">
            <button type="submit" class="btn btn-primary">
              {{ editId ? '更新文章' : '送出貼文' }}
            </button>
            <button type="button" class="btn btn-secondary" @click="cancelPost">取消</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>





