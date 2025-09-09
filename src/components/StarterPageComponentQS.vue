<script setup>
    import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

const pageTitle = computed(() => route.meta.title || 'Starter Page')
const breadcrumbs = computed(() => route.meta.breadcrumb || ['Home', 'Starter Page'])
</script>

<template>
  
<main class="main">

    <!-- Page Title -->
    <div class="page-title aos-init aos-animate" data-aos="fade">
      <div class="container d-lg-flex justify-content-between align-items-center">
        <h1 class="mb-2 mb-lg-0">{{ pageTitle }}</h1>
        <nav class="breadcrumbs">
          <ol>
             <li v-for="(crumb, index) in breadcrumbs" :key="index">
              {{ crumb }}
            </li>
          </ol>
        </nav>
      </div>
    </div><!-- End Page Title -->

    <!-- Starter Section Section -->
    <section id="starter-section" class="starter-section section">

      <!-- Section Title -->
      <div class="container section-title aos-init aos-animate" data-aos="fade-up">
       <h2>{{ pageTitle }}</h2>
        <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
      </div><!-- End Section Title -->

      <div class="container aos-init aos-animate" data-aos="fade-up">
        <!-- <p>Use this page as a starter for your own custom pages.</p> -->
      </div>

    </section><!-- /Starter Section Section -->

  </main>
   
</template>

<style lang="scss" scoped>

</style>