<script setup>
   
</script>

<template>
    <div>
<header id="header" class="header d-flex align-items-center fixed-top">
    <div class="container-fluid container-xl position-relative d-flex align-items-center">

      <a href="/" class="logo d-flex align-items-center me-auto">
        <img src="@/assets/img/logo.png" alt="">
        <h1 class="sitename">Questoria</h1>
      </a>

      <nav id="navmenu" class="navmenu">
        <ul>
        <li><RouterLink :to="{ path: '/', hash: '#heroQS' }">首頁</RouterLink></li>
  <li><RouterLink :to="{ path: '/', hash: '#aboutQS' }">關於我們</RouterLink></li>
  <li><RouterLink :to="{ path: '/', hash: '#featuresQS' }">會員中心</RouterLink></li>
  <li><RouterLink to="/forum">論壇</RouterLink></li>
  <li><RouterLink :to="{ path: '/', hash: '#contactQS' }">聯絡我們</RouterLink></li>
          
        </ul>
        <i class="mobile-nav-toggle d-xl-none bi bi-list"></i>
      </nav>
      <router-link to="/register" class="btn-getstarted">REGISTER</router-link>
      <router-link to="/login" class="btn-getstarted">LOGIN</router-link>
    </div>
  </header>
    </div>
</template>

<style lang="css" scoped>

</style>