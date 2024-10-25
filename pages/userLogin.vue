<template>
  <div class="userPage">
    <section v-if="telas.length" class="userPage__container">
      <nav class="userPage__menu">
        <ul v-for="tela in telas">
          <li class="menu-link">
            <button
              @click.prevent="selectTela(tela)"
            >
              {{ tela.nome }}
            </button>
          </li>
        </ul>
      </nav>

      <div class="userPage__content">
        <div v-if="!selectedTela">
          <h2>Bem-vindo à página do Usuário</h2>
          <p class="info">
            Selecione uma página no menu lateral para visualizar o conteúdo!
          </p>
        </div>
        <ConteudoPagina v-if="selectedTela" :tela-nome="selectedTela.nome" />
      </div>
    </section>
    <p v-else class="error">Você não possui nenhum acesso disponível :(</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  data() {
    return {
      telas: [] as Array<{ nome: string; url: string; id: string }>,
      selectedTela: null as { nome: string; url: string; id: string } | null,
    };
  },
  async mounted() {
    const appToken =
      "eyJhbGciOiJIUzI1NiJ9.eyJ0b2tlbiI6ImFwcCJ9.5qhy0FKBVys-w6YggBsn6pu6v3ZDJR0d0XTDJ9u7WFM";
    const token = localStorage.getItem("authToken");

    if (token) {
      try {
        const response = await axios.post(
          "https://api.bashtechnology.com.br/api/v1/sessao/getSession",
          {},
          {
            headers: {
              App: appToken,
              Authorization: token,
            },
          }
        );
        this.telas = response.data.data.telas;
      } catch (error) {
        console.error(error);
      }
    } else {
      this.$router.push("/");
    }
  },
  methods: {
    selectTela(tela: { nome: string; url: string; id: string } | null) {
      this.selectedTela = tela;
      console.log(tela?.id);
      
    },
  },
});
</script>
<style>
h2 {
  font-size: 2.5rem;
  color: var(--principal);
}
.userPage {
  height: 100%;
  height: 70vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.userPage__container {
  display: flex;
  width: 100%;
  height: 100%;
}
.userPage__menu {
  width: 25%;
  height: 100%;
}

.userPage__menu ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  padding: 1rem 1rem;
}

.userPage__menu li {
  font-size: 1.6rem;
  margin-bottom: 1rem;
  border-radius: 5px;
  width: 100%;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  transition: ease background-color 0.4s, color 0.4s;
}

.userPage__menu button {
  background: none;
  border: none;
  width: 100%;
  text-decoration: none;
  color: #333;
  font-weight: bold;
  padding: 0.75em 1em;
  border-radius: 5px;
  transition: ease background-color 0.4s, color 0.4s;
  text-align: center;
  font-size: 1.2rem;
}

.userPage__menu li:hover {
  background-color: var(--azul-escuro);
  color: #fff;
}
.userPage__menu button:hover {
  color: #fff;
  width: 100%;
}
.userPage__content {
  width: 100%;
  padding: 1em;
}

.userPage__content {
  padding: 2rem 2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.error {
  color: red;
  font-size: 1.6rem;
}
.info {
  font-size: 1.3rem;
  margin-top: 5rem;
}
</style>
