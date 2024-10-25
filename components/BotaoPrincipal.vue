<script lang="ts">
export default {
  props: {
    texto: { type: String, required: true },
  }
}
</script>

<template>
  <button class="paragrafo-lg botao-principal">
    {{ texto }}
  </button>
</template>

<style scoped>
.botao-principal {
  width: 12.5rem;
  height: 2.5rem;
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  font-size: 1em;
  font-weight: 700;
  color: var(--creme, #FFFAF3);
  background: var(--verde-medio); 
  cursor: pointer;
  transition: 0.2s;

  display: flex;
  justify-content: center;
  align-items: center;
}

.botao-principal:hover {
  background: var(--ocre-hover);
}

@media only screen and (max-width: 767px) {
  .botao-principal {
    width: 11.5rem;
  font-size: 0.8em;


}
}
</style>