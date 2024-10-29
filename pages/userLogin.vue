<template>
  <div class="userPage">
    <section v-if="loading" class="loading">
      <p>Carregando...</p>
    </section>

    <section class="main_container">

      <section class="user_container" v-if="!loading">
        <small class="userName">usuário: {{ usuario.usuario }}</small>
        <button @click="logout" class="logout-button">Sair</button>
      </section> 

      <section v-if="telas.length && !loading" class="userPage__container">
        <nav class="userPage__menu">
          <ul>
            <li class="menu-link" v-for="tela in telas" :key="tela.id">
              <button @click.prevent="selectTela(tela)">
                {{ tela.nome }}
              </button>
            </li>
          </ul>
        </nav>

        <div class="userPage__content">
          <div>
            <h2>Bem-vindo à página do Usuário</h2>
            <p class="info">
              Selecione uma página no menu lateral para visualizar o conteúdo!
            </p>
          </div>
        </div>
      </section>
      <p v-if="telas.length < 0" class="error">Você não possui nenhum acesso disponível :(</p>
    </section>
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
      loading: true,
      authenticated: true,
      usuario: {},
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
        console.log(response.data.data.usuario);
        this.usuario = response.data.data.usuario;
        this.telas = response.data.data.telas;
        this.loading = false;
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

      if (tela && tela.url) {
        this.$router.push({
          path: `userPage${tela.url}`,
          query: { nome: tela.nome },
        });
      }
    },
    logout() {
      localStorage.removeItem("authToken");
      this.authenticated = false;
      this.$router.push("/");
    },
  },
});
</script>

<style scoped>
.main_container{
  width: 100%;
  height: auto;

  height: 100%;
  height: 70vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
h2 {
  font-size: 2.5rem;
  color: var(--principal);
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
  border-top: none;
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
.loading p {
  padding: 1rem;
  font-size: 1.6rem;
}

.user_container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  gap: 1rem;
  padding: 1rem 2rem;
}
.userName {
  font-size: 1.2rem;
}
.logout-button {
  font-size: 1.2rem;
  background: none;
  border: none;
  color: rgb(196, 23, 23);
  cursor: pointer;
}
</style>
