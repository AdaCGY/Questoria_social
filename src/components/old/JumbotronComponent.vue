<script setup>
const props = defineProps({
  title: { type: String, default: '歡迎來到 DailyQuest！' },
  description: {
    type: String,
    default: '在這裡，你可以以遊戲化的方式完成每日任務、成長並探索生活的意義。'
  }
})
</script>

<template>
  <section class="jumbotron">
    <h1>{{ title }}</h1>
    <p>{{ description }}</p>
  </section>
</template>

<style scoped>
.jumbotron {
  background-color: var(--jumbotron-bg, #f3f4f6);
  color: var(--text-color, #222);
  padding: 3rem 1.5rem;
  text-align: center;
  border-radius: 1rem;
  margin-bottom: 2rem;
  transition: all 0.3s ease-in-out;
}

.jumbotron h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.jumbotron p {
  font-size: 1.25rem;
  color: var(--text-color-secondary, #555);
  max-width: 700px;
  margin: 0 auto;
}
</style>
