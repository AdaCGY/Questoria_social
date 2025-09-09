<script setup>
    
</script>

<template>
  <header class="pb-3 mb-4 border-bottom">
    <div class="d-flex justify-content-between align-items-center">
      <a href="/" class="d-flex align-items-center text-body-emphasis text-decoration-none">
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="32" class="me-2" viewBox="0 0 118 94" role="img">
          <title>Bootstrap</title>
          <path fill-rule="evenodd" clip-rule="evenodd"
            d="M24.509 0c-6.733 0-11.715 5.893-11.492 12.284..."
            fill="currentColor" />
        </svg>
        <span class="fs-4">DailyQuest</span>
      </a>
      <nav>
          <router-link to="/">首頁</router-link>||
          <router-link to="/member">會員</router-link>||
          <router-link to="/shop">商城</router-link>||
          <router-link to="/tasks">任務</router-link>||
          <router-link to="/social">社交</router-link>||
<a href="https://github.com/" target="_blank" class="text-decoration-none text-body">GitHub</a>

      </nav>
    </div>
  </header>
</template>