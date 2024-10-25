<template>
  <div>
    <h2>Detalhes da Tela Selecionada</h2>
    <p>Nome da Tela: {{ telaNome }}</p>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni non facilis
      ab? Corporis molestias, quibusdam beatae expedita eius, earum iusto
      eveniet quod necessitatibus tenetur saepe quidem, voluptatibus odit nihil
      iste.
    </p>
  </div>
</template>

<script>
export default {
  props: {
    telaNome: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
div {
  height: 100%;
  padding: 0 4rem;
}
h2 {
  font-size: 2.5rem;
  color: var(--principal);
}
p {
  margin-top: 4rem;
  font-size: 1.2rem;
  text-align: justify;
}
</style>
