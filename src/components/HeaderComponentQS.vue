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
          <li class="dropdown"><a href="#"><span>Dropdown</span> <i class="bi bi-chevron-down toggle-dropdown"></i></a>
            <ul>
              <li><a href="#">Dropdown 1</a></li>
              <li class="dropdown"><a href="#"><span>Deep Dropdown</span> <i class="bi bi-chevron-down toggle-dropdown"></i></a>
                <ul>
                  <li><a href="#">Deep Dropdown 1</a></li>
                  <li><a href="#">Deep Dropdown 2</a></li>
                  <li><a href="#">Deep Dropdown 3</a></li>
                  <li><a href="#">Deep Dropdown 4</a></li>
                  <li><a href="#">Deep Dropdown 5</a></li>
                </ul>
              </li>
              <li><a href="#">Dropdown 2</a></li>
              <li><a href="#">Dropdown 3</a></li>
              <li><a href="#">Dropdown 4</a></li>
            </ul>
          </li>
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