<!-- src/components/StarterPageComponentQS.vue -->
<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

// 主標題：優先 pageTitle，其次 title，再不然顯示 Starter Page
const pageTitle = computed(() => route.meta.pageTitle ?? route.meta.title ?? 'Starter Page')

// 副標：有設定才顯示，沒有就不渲染
const pageSubtitle = computed(() => route.meta.pageSubtitle ?? '')
</script>

<template>
  <main class="main">

    <!-- Page Title 

    <div class="page-title" data-aos="fade">
      <div class="container">
        <h1 class="mb-2 mb-lg-0">{{ pageTitle }}</h1>
      </div>
    </div>
    
    -->

    <!-- 下方 Section：有副標才出現 -->
    <section id="starter-section" class="starter-section section" v-if="pageSubtitle">
      <div class="container section-title" data-aos="fade-up">
        <p>{{ pageSubtitle }}</p>
      </div>
      <div class="container" data-aos="fade-up">
        <!-- 內容區（空白或說明） -->
      </div>
    </section>
  </main>
</template>

<style scoped>
/* 主標題區 */
</style>

