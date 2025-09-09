<script setup>
import HeaderComponentQS from '@/components/HeaderComponentQS.vue';
import HeroComponentQS from '@/components/HeroComponentQS.vue';
import FeaturedServicesComponentQS from '@/components/FeaturedServicesComponentQS.vue';
import AboutComponentQS from '@/components/AboutComponentQS.vue';
import FooterComponentQS from '@/components/FooterComponentQS.vue';
import ServicesComponentQS from '@/components/ServicesComponentQS.vue';
import ContactComponentQS from '@/components/ContactComponentQS.vue';
</script>

<template>
     <!-- 頁首 -->
    <HeaderComponentQS />
   
    <!-- Hero區塊 -->
        <HeroComponentQS />
       
    <!--FeaturedServices-->
    <FeaturedServicesComponentQS />
    
    <!-- 關於我們 -->
        <AboutComponentQS />
  

    <!-- 功能區塊 -->
        <FeaturesComponent />
        <ServicesComponentQS />
   

    <!-- 聯絡我們 -->
        <ContactComponentQS />
 
      
    <!-- 頁尾 -->
    <FooterComponentQS />
</template>

<style lang="css" scoped></style>