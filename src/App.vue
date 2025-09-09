<script setup>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import 'bootstrap-icons/font/bootstrap-icons.css'


import { useRoute } from 'vue-router'
import { ref, computed, onMounted, watchEffect, shallowRef } from 'vue'


//引入layout
import QuickStartIndexLayout from './layouts/QuickStartIndex_Layout.vue'
import QuickStarterPageLayout from './layouts/QuickStartStarterPage_Layout.vue'
import TourIndexLayout from './layouts/member/tourIndex_Layout.vue'



// //暗亮主題切換邏輯
// const isDark = ref(false)

// const toggleTheme = () => {
//   isDark.value = !isDark.value
//   const theme = isDark.value ? 'dark' : 'light'
//   document.documentElement.setAttribute('data-theme', theme)
//   localStorage.setItem('theme', theme)
// }

// onMounted(() => {
//   const saved = localStorage.getItem('theme')
//   if (saved === 'dark') {
//     isDark.value = true
//     document.documentElement.setAttribute('data-theme', 'dark')
//   }
// })


// 響應式 layoutComponent
const route = useRoute()
const layoutComponent = shallowRef(QuickStartIndexLayout)

// 監聽 route 變化並更新 layout
watchEffect(() => {
  const layout = route.meta.layout
  switch (layout) {
    case 'quick':
      layoutComponent.value = QuickStartIndexLayout
      break
    case 'quickStarterPage':
      layoutComponent.value = QuickStarterPageLayout
      break
    case 'tourIndex':
      layoutComponent.value = TourIndexLayout
      break
    default:
      layoutComponent.value = QuickStartIndexLayout // fallback 預設
  }
})

</script>

<template>
  <!-- 根據 route meta 使用不同 layout -->
  <component :is="layoutComponent" />
</template>



<style scoped>

</style>
