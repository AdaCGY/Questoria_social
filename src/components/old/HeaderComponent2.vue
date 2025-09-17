<script setup>
    
</script>

<template>
  <header style="border-bottom: 1px solid #d0d7de; padding: 1rem;">
    <div class="container" style="display: flex; justify-content: space-between; align-items: center;">
      <h1 style="margin: 0; font-size: 1.5rem;">Questoria</h1>
      <nav>
        <ul style="list-style: none; display: flex; gap: 1rem; margin: 0; padding: 0;">
          <li><router-link to="/">首頁</router-link></li>
          <li><router-link to="/member">會員</router-link></li>
          <li><router-link to="/shop">商城</router-link></li>
          <li><router-link to="/tasks">任務</router-link></li>
          <li><router-link to="/social">社交</router-link></li>
          <li><a href="https://github.com/" target="_blank" class="text-decoration-none text-body">GitHub</a></li>
        </ul>
      </nav>
    </div>
  </header>
</template>


