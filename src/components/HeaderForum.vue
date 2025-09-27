<!-- src/components/HeaderForum.vue -->
<script setup>
import { RouterLink } from 'vue-router'
import { ElIcon } from 'element-plus'
import { UserFilled } from '@element-plus/icons-vue'
import { currentUser } from '@/services/currentUser'
</script>

<template>
  <nav class="navbar navbar-expand-lg light-background border-bottom py-3">
    <div class="container">
      <!-- 左：品牌（導回首頁） -->
      <div class="navbar-brand fw-bold d-flex align-items-center">
        <!-- 點圖片回首頁 -->
        <RouterLink to="/" class="me-2 d-flex align-items-center">
          <img src="@/assets/img/logo.png" alt="Logo" style="height: 40px;">
        </RouterLink>
      
        <!-- 點文字回論壇首頁 -->
        <RouterLink to="/forum" class="text-decoration-none">
          <h2 class="m-0 sitename" style="font-size: 40px;">FORUM</h2>
        </RouterLink>
      </div>

      <!-- 右：登入後樣式 -->
      <div class="d-flex align-items-center gap-2">
        <div class="dropdown">
          <button
            class="btn btn-outline-secondary dropdown-toggle d-flex align-items-center"
            type="button"
            id="userMenuForum"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <el-icon class="me-2"><UserFilled /></el-icon>
            <span class="d-none d-sm-inline">{{ currentUser.username }} 您好</span>
          </button>
          <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userMenuForum">
            <li>
              <RouterLink class="dropdown-item" :to="{ path: '/forum', query: { view: 'my' } }">
                我的文章
              </RouterLink>
            </li>
            <li>
              <RouterLink class="dropdown-item" :to="{ path: '/forum', query: { view: 'fav' } }">
                收藏貼文
              </RouterLink>
            </li>
            <li><hr class="dropdown-divider" /></li>
            <li>
              <RouterLink class="dropdown-item text-danger" :to="{ path: '/logout' }">登出</RouterLink>
            </li>
          </ul>
        </div>

        <!-- 發文按鈕 -->
        <RouterLink class="btn btn-primary" to="/forum/create">＋ 發文</RouterLink>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.nav-link.active { font-weight: 600; }
</style>
