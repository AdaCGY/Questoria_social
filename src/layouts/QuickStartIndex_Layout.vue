<script setup>
import HeaderComponentQS from '@/components/HeaderComponentQS.vue';
import HeroComponentQS from '@/components/HeroComponentQS.vue';
import FeaturedServicesComponentQS from '@/components/FeaturedServicesComponentQS.vue';
import AboutComponentQS from '@/components/AboutComponentQS.vue';
import FeaturesComponentQS from '@/components/FeaturesComponentQS.vue';
import ServicesComponentQS from '@/components/ServicesComponentQS.vue';
import ContactComponentQS from '@/components/ContactComponentQS.vue';
import FooterComponentQS from '@/components/FooterComponentQS.vue';
import { RouterLink } from 'vue-router';

import { onMounted } from 'vue';
// 引入樣式
onMounted(() => {
  import('@/assets/css/quickStart/main.css')
})
</script>

<template>
   
    <!-- 頁首 -->
    <HeaderComponentQS />
   
    <!-- Hero區塊 -->
    <HeroComponentQS />

    <!--FeaturedServices-->
    <FeaturedServicesComponentQS />
    <AboutComponentQS />
    <FeaturesComponentQS />
    <ServicesComponentQS />
    

    <ContactComponentQS />
     
    <!-- 頁尾 -->
    <FooterComponentQS />
</template>

<style lang="scss" scoped>

</style>