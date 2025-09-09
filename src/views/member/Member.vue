<script setup>
import { useRoute } from 'vue-router';
defineProps({id: String});

const route = useRoute();
const id = route.params.id;
console.log("Member.vue", id);
// 這裡的id是從路由參數中取得的，假設路由設定為
</script>

<template>
    <div>
        <h2>會員{{ $route.params.id}}</h2>
        <p>{{ id }}</p>
    </div>
</template>

<style lang="css" scoped></style>