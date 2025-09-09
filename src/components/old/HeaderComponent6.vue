<script setup>
import { ref, onMounted } from 'vue'

const isDark = ref(false)

const toggleTheme = () => {
  isDark.value = !isDark.value
  document.documentElement.setAttribute('data-theme', isDark.value ? 'dark' : 'light')
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}

onMounted(() => {
  const saved = localStorage.getItem('theme')
  if (saved === 'dark') {
    isDark.value = true
    document.documentElement.setAttribute('data-theme', 'dark')
  }
})
</script>

<template>
  <header class="site-header">
    <div class="header-container">
      <!-- 左：Logo -->
      <div class="left-area">
        <router-link to="/web" class="logo">DailyQuest</router-link>
        <nav class="nav-links">
          <router-link to="/">首頁</router-link>
          <router-link to="/member">會員</router-link>
          <router-link to="/shop">商城</router-link>
          <router-link to="/task">任務</router-link>
          <router-link to="/social">社交</router-link>
        </nav>
      </div>

      <!-- 右：操作項 -->
      <div class="right-area">
        <router-link to="/contact" class="link">聯絡我們</router-link>
        <a href="https://github.com/louise56688/DailyQuest_VUE" target="_blank" class="link">GitHub</a>

        <button class="icon-button" @click="toggleTheme" :aria-label="isDark ? '切換成淺色' : '切換成暗色'">
          {{ isDark ? '☀️' : '🌙' }}
        </button>
      </div>
      
    </div>
  </header>
</template>

<style scoped>
.site-header {
  background-color: var(--bg-color, #fff);
  border-bottom: 1px solid #e0e0e0;
  padding: 0.75rem 1.5rem;
  position: sticky;
  top: 0;
  z-index: 1000;
}

.header-container {
  max-width: 1200px;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

/* 左區：Logo + 導覽 */
.left-area {
  display: flex;
  align-items: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.logo {
  font-weight: 700;
  font-size: 1.5rem;
  color: var(--primary-color, #e60012);
  text-decoration: none;
}

/* 導覽列 */
.nav-links {
  display: flex;
  gap: 1.25rem;
}

.nav-links a {
  color: var(--text-color, #222);
  text-decoration: none;
  font-weight: 500;
}
.nav-links a:hover {
  color: var(--primary-color, #e60012);
}

/* 右區：操作選項 */
.right-area {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.link {
  font-size: 0.9rem;
  color: var(--text-color, #333);
  text-decoration: none;
}
.link:hover {
  color: var(--primary-color, #e60012);
}

.icon-button {
  background: none;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
}

/* 按鈕樣式 */
.btn {
  padding: 0.3rem 0.75rem;
  border: 1px solid transparent;
  border-radius: 4px;
  font-size: 0.85rem;
  text-decoration: none;
  cursor: pointer;
  font-weight: 500;
}

.btn.primary {
  background-color: var(--primary-color, #e60012);
  color: #fff;
}

.btn.primary:hover {
  background-color: #cc0010;
}

.btn.small {
  padding: 0.25rem 0.6rem;
}
</style>
