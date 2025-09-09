<template>
  <header>
    <div class="px-3 py-2 text-bg-dark border-bottom">
      <div class="container">
        <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <a href="/" class="d-flex align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none">
            <svg class="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap"><use xlink:href="#bootstrap" /></svg>
          </a>
          <ul class="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small">
            <li>
              <router-link to="/" class="nav-link text-secondary">首頁</router-link>
            </li>
            <li>
              <router-link to="/member" class="nav-link text-white">會員</router-link>
            </li>
            <li>
              <router-link to="/shop" class="nav-link text-white">商城</router-link>
            </li>
            <li>
              <router-link to="/tasks" class="nav-link text-white">任務</router-link>
            </li>
            <li>
              <router-link to="/social" class="nav-link text-white">社交</router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="px-3 py-2 border-bottom mb-3">
      <div class="container d-flex flex-wrap justify-content-center">
        <form class="col-12 col-lg-auto mb-2 mb-lg-0 me-lg-auto" role="search">
          <input type="search" class="form-control" placeholder="Search..." aria-label="Search" />
        </form>
        <div class="text-end">
          <button type="button" class="btn btn-light text-dark me-2">登入</button>
          <button type="button" class="btn btn-primary">註冊</button>
        </div>
      </div>
    </div>
  </header>
</template>
<script setup></script>