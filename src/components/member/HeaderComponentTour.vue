<script setup>
    
</script>

<template>
    <div>
<header id="header" class="header d-flex align-items-center fixed-top">
    <div class="header-container container-fluid container-xl position-relative d-flex align-items-center justify-content-between">

       <!-- <a href="/" class="logo d-flex align-items-center me-auto">
        <img src="@/assets/img/logo.png" alt="">
        <h1 class="sitename">DaliyQuest</h1> -->
        <!-- Uncomment the line below if you also wish to use an image logo -->
        <!-- <img src="assets/img/logo.webp" alt=""> -->
        <!-- <h1 class="sitename">DaliyQuest</h1> -->
      <!-- </a> -->
      
      <nav id="navmenu" class="navmenu">
        <ul>
          <li><RouterLink :to="{ path: '/', hash: '#heroQS' }">Home</RouterLink></li>
  <li><RouterLink :to="{ path: '/', hash: '#aboutQS' }">About</RouterLink></li>
  <li><RouterLink :to="{ path: '/', hash: '#featuresQS' }">Features</RouterLink></li>
  <li><RouterLink :to="{ path: '/', hash: '#servicesQS' }">Services</RouterLink></li>
  <li><RouterLink :to="{ path: '/', hash: '#contactQS' }">Contact</RouterLink></li>
        </ul>
      </nav>
    </div>
</header>
</div>
  
 
</template>

<style lang="css" scoped>

</style>