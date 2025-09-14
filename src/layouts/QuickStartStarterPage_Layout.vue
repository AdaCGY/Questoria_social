<!-- src/layouts/QuickStartStarterPage_Layout.vue -->
<script setup>
import { onMounted, computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'

import StarterPageComponentQS from '@/components/StarterPageComponentQS.vue'
import FooterComponentQS from '@/components/FooterComponentQS.vue'
import HeaderComponentQSStartPage from '@/components/HeaderComponentQSStartPage.vue'
import HeaderForum from '@/components/HeaderForum.vue'

onMounted(() => {
  import('@/assets/css/quickStart/main.css')
})

const route = useRoute()

// 只有當 meta.header 設成 'forum'（大小寫皆可）才使用論壇專用 Header
const useForumHeader = computed(() => {
  const h = (route.meta?.header ?? '').toString().toLowerCase()
  return h === 'forum'
})
</script>

<template>
  <!-- Header：依 meta 切換 -->
  <component :is="useForumHeader ? HeaderForum : HeaderComponentQSStartPage" />

  <!-- 頁首版頭（可用 meta.showHero 控制是否顯示；預設顯示） -->
  <StarterPageComponentQS
    v-if="route.meta.showHero !== false"
    :title="route.meta.pageTitle || route.meta.title"
    :subtitle="route.meta.pageSubtitle || ''"
    :breadcrumb="route.meta.breadcrumb || []"
  />

  <!-- 內容 -->
  <RouterView />

  <!-- 頁尾 -->
  <FooterComponentQS />
</template>

<style scoped>
</style>

