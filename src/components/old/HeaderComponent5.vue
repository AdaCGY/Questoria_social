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
      <div class="logo">
        <router-link to="/">DailyQuest</router-link>
      </div>

      <nav class="nav-links">
        <router-link to="/">首頁</router-link>
        <router-link to="/member">會員</router-link>
        <router-link to="/shop">商城</router-link>
        <router-link to="/tasks">任務</router-link>
        <router-link to="/social">社交</router-link>
      </nav>

      <div class="header-actions">
        <router-link to="/contact" class="link">聯絡我們</router-link>
        <a href="https://github.com" target="_blank" class="link">GitHub</a>
        <button class="theme-toggle" @click="toggleTheme">
          {{ isDark ? '☀️' : '🌙' }}
        </button>
        <sl-icon-button
    name="moon"
    label="Toggle dark mode"
    @click="toggleTheme"
    :name="isDark ? 'sun' : 'moon'"
  ></sl-icon-button>
      </div>
    </div>

   
  <div class="text-end">
    <router-link to="/login" class="btn btn-light text-dark me-2">
      登入
    </router-link>
    <router-link to="/register" class="btn btn-primary">
      註冊
    </router-link>
  </div>


  </header>
</template>



<style scoped>
.site-header {
  background-color: var(--bg-color, #fff);
  border-bottom: 1px solid #e6e6e6;
  padding: 1rem 2rem;
  font-family: 'Noto Sans TC', sans-serif;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.header-container {
  max-width: 1200px;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
}

.logo a {
  font-weight: bold;
  font-size: 1.5rem;
  color: var(--primary-color, #e60012);
  text-decoration: none;
}

.nav-links {
  display: flex;
  gap: 1.25rem;
  flex-wrap: wrap;
}

.nav-links a {
  color: var(--text-color, #222);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}
.nav-links a:hover {
  color: var(--primary-color, #e60012);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 0.5rem;
  flex-wrap: wrap;
}

.header-actions .link {
  font-size: 0.9rem;
  color: var(--text-color, #333);
  text-decoration: none;
}
.header-actions .link:hover {
  color: var(--primary-color, #e60012);
}

.theme-toggle {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
}


</style>
