<script setup>
import StarterPageComponentQS from '@/components/StarterPageComponentQS.vue';
import FooterComponentQS from '@/components/FooterComponentQS.vue';
import HeaderComponentQSStartPage from '@/components/HeaderComponentQSStartPage.vue';
import { RouterView } from 'vue-router';


import { onMounted } from 'vue';
// 引入樣式
onMounted(() => {
  import('@/assets/css/quickStart/main.css')
})
    
</script>

<template>
    <!-- 頁首 -->
    <HeaderComponentQSStartPage />

    <StarterPageComponentQS />
    <RouterView></RouterView>
   
     
    <!-- 頁尾 -->
    <FooterComponentQS />


</template>

<style lang="css" scoped>

</style>