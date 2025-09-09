<script setup>
import { ref } from 'vue'
const isExpanded = ref(true)
</script>

<template>
  <aside class="dashboard-sidebar" :class="{ collapsed: !isExpanded }">
    <!-- 使用者資訊 -->
    <div class="sidebar-user">
      <img
        src="https://avatars.githubusercontent.com/u/9919?v=4"
        alt="使用者頭像"
        class="user-avatar"
      />
      <h3 class="user-name">DailyQuestMember</h3>
      <router-link to="/profile" class="edit-profile">個人資料</router-link>
    </div>

    <!-- 選單列表 -->
    <nav class="sidebar-nav">
      <router-link to="/notification" class="nav-item">
        <i class="bi bi-bell"></i>
        通知
      </router-link>
      
      <!-- 歷史紀錄 -->
<router-link to="/analysis" class="nav-item">
  <i class="bi bi-clock-history"></i>
  會員儀錶板
</router-link>

<!-- 設定 -->
<router-link to="/settings" class="nav-item">
  <i class="bi bi-gear"></i>
  設定
</router-link>

<!-- 登入／註冊 -->
<div class="auth-actions">
  <router-link to="/login" class="btn auth-btn">
    <i class="bi bi-box-arrow-in-right"></i> Login/Logout
  </router-link>
  <router-link to="/register" class="btn btn-primary auth-btn">
    <i class="bi bi-person-plus"></i> Register
  </router-link>
</div>
    </nav>

    <!-- 折疊按鈕 -->
    <div class="sidebar-toggle" @click="isExpanded = !isExpanded">
      {{ isExpanded ? '←' : '→' }}
    </div>
  </aside>
</template>

<style scoped>
.dashboard-sidebar {
  width: 240px;
  background-color: var(--bg-color, #fff);
  color: var(--text-color, #222);
  height: 100vh;
  padding: 1rem;
  box-shadow: 1px 0 4px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
}
.dashboard-sidebar.collapsed {
  width: 80px;
  overflow: hidden;
}

.sidebar-user {
  text-align: center;
  margin-bottom: 2rem;
}
.user-avatar {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  margin-bottom: 0.5rem;
}
.user-name {
  font-size: 1.2rem;
  font-weight: 600;
}
.edit-profile {
  font-size: 0.85rem;
  color: var(--primary-color, #e60012);
  text-decoration: none;
}
.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1rem;
  color: var(--text-color, #222);
  text-decoration: none;
  padding: 0.5rem;
  border-radius: 8px;
  transition: background-color 0.2s;
}
.nav-item:hover {
  background-color: var(--hover-bg, #f0f0f0);
}
.sidebar-toggle {
  margin-top: auto;
  font-size: 0.85rem;
  text-align: center;
  cursor: pointer;
  padding: 0.5rem;
  border-top: 1px solid var(--border-color, #ddd);
}

.auth-actions {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.auth-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: center;
  padding: 0.5rem 1rem;
  font-weight: 500;
  font-size: 0.95rem;
  border-radius: 8px;
  text-decoration: none;
  color: var(--text-color, #222);
  background-color: var(--bg-color, #f0f0f0);
  transition: all 0.2s ease-in-out;
}

.auth-btn:hover {
  background-color: var(--hover-bg, #ddd);
}

.btn-primary {
  background-color: var(--primary-color, #e60012);
  color: white;
}
.btn-primary:hover {
  background-color: #c4000f;
}
</style>
