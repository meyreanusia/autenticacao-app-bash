
<template>
  <div class="content_container">
    <h2>Conteúdo para: {{ nome }}</h2>
    <p class="content_text">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus molestias possimus expedita, sapiente officiis magnam totam perferendis provident, deserunt nulla impedit suscipit quas est error itaque soluta fugit? Totam, officiis?</p>
  </div>
</template>
<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
const nome = route.query.nome
</script>

<style scoped>
.content_container{
  padding: 2rem;
}
h2{
  font-size: 2.5rem;
  color: var(--principal);
}
.content_text{
  font-size: 1.6rem;
  text-align: justify;
  margin-top: 2rem;
}

</style>