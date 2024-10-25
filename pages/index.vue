<template>
  <div class="container__main">
    <FormLogin />
  </div>
</template>

<script>
import FormLogin from "../components/FormLogin.vue";
export default {

  components: {
    FormLogin,
  }
}
</script>

<style>
.container__main{
    background-color: var(--azul-escuro);
}
</style>
