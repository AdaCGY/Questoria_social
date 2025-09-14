<!-- src/components/HeaderForum.vue -->
<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <nav class="navbar navbar-expand-lg bg-white border-bottom py-3">
    <div class="container">

      <!-- 左：品牌（導回首頁） -->
      <RouterLink class="navbar-brand fw-bold d-flex align-items-center" to="/">
        <!-- 想放圖標可在這裡加 <img> -->
        <span class="fs-4">Questoria 論壇</span>
      </RouterLink>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#forumNav"
        aria-controls="forumNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

    <!-- 至中選單
      <div class="collapse navbar-collapse" id="forumNav">
        
        <ul class="navbar-nav mx-auto mb-2 mb-lg-0">
          <li class="nav-item"><RouterLink class="nav-link" to="/">首頁</RouterLink></li>
          <li class="nav-item"><RouterLink class="nav-link" to="/forum">論壇</RouterLink></li>
        </ul>
    -->

        <!-- 右：登入後樣式（使用者下拉 + 發文） -->
        <div class="d-flex align-items-center gap-2">
          <div class="dropdown">
            <button
              class="btn btn-outline-secondary dropdown-toggle d-flex align-items-center"
              type="button"
              id="userMenuForum"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span class="rounded-circle me-2 d-inline-block" style="width:26px;height:26px;background:#6c757d;"></span>
              <span class="d-none d-sm-inline">我的帳號</span>
            </button>
            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userMenuForum">
                <li><RouterLink class="dropdown-item" to="/my-posts">我的文章</RouterLink></li>
                <li><RouterLink class="dropdown-item" to="/favorites">收藏貼文</RouterLink></li>
                <li><hr class="dropdown-divider" /></li>
                <li><RouterLink class="dropdown-item text-danger" to="/logout">登出</RouterLink></li>
            </ul>

          </div>

          <!-- 發文按鈕：帶 compose=1，論壇頁會自動展開發文區 -->
          <RouterLink class="btn btn-primary" :to="{ path: '/forum', query: { compose: '1' } }">
            ＋ 發文
          </RouterLink>
        </div>
      </div>
  </nav>
</template>

<style scoped>
.nav-link.active { font-weight: 600; }
</style>
