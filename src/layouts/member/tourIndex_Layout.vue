<script setup>
import HeroComponentTour from '@/components/member/HeroComponentTour.vue';
import HeaderComponentTour from '@/components/member/HeaderComponentTour.vue';
import { RouterLink } from 'vue-router';


import { onMounted } from 'vue';
onMounted(() => {
  import('@/assets/css/tour/main.css')
})

</script>

<template>
   <!-- <HeaderComponentTour /> -->
   <HeroComponentTour />
 
  
   

  <RouterView></RouterView>
</template>

<style lang="scss" scoped>

</style>