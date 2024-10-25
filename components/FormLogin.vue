<template>
  <div class="container__form">
    <h1>Bem-vindo!</h1>
    <form @submit.prevent="login">
      <div>
        <label for="usuario">Usuário</label>
        <input type="text" v-model="usuario" id="usuario" />
      </div>
      <div>
        <label for="senha">Senha</label>
        <input type="password" v-model="senha" id="senha" />
      </div>
      <button type="submit">Entrar</button>
    </form>
    <section class="container__message">
      <p v-if="error" class="error">{{ error }}</p>
      <p v-if="loading" class="loading">Carregando...</p>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  data() {
    return {
      usuario: "" as string,
      senha: "" as string,
      error: null as string | null,
      loading: false,
    };
  },
  methods: {
    async login() {
      if (!this.usuario || !this.senha) {
        this.error = "Usuário e senha são obrigatórios!";
        setTimeout(() => {
          this.error = null;
        }, 3000);
        return;
      }
      this.loading = true;
      try {
        const config = useRuntimeConfig();
        const token = config.public.appToken;
        


        const response = await axios.post(
          "https://api.bashtechnology.com.br/api/open/login",
          {
            usuario: this.usuario,
            senha: this.senha,
          },
          {
            headers: {
              App: token,
            },
          }
        );
        this.usuario = "";
        this.senha = "";
        if (response.data.data.token) {
          console.log(response.data.data.token);

          localStorage.setItem("authToken", response.data.data.token);
          this.$router.push("/userLogin");
        }
      } catch (error) {
        this.error = " Usuário ou Senha incorretos!";
        setTimeout(() => {
          this.error = null;
        }, 4000);
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
  },
});
</script>

<style scoped>
h1 {
  font-size: 2.4rem;
  margin-bottom: 5rem;
  color: var(--principal);
}
p {
  font-size: 1.6rem;
  margin-bottom: 3rem;
}
.container__form {
  border-radius: 3.75rem 3.75rem 0rem 0rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 70vh;
  background-color: var(--creme);
}
form {
  width: 100%;
  display: flex;
  background-color: var(--creme);
  flex-direction: column;

  align-items: center;
  justify-content: center;
  gap: 2.5rem;
}

form div {
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
}

input {
  width: 40%;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: var(--principal) 0.3s, box-shadow 0.3s;
  background-color: var(--creme);

  cursor: pointer;
  font-size: 1.2rem;
  color: var(--principal);
}

input:focus {
  border-color: var(--principal);
  box-shadow: 0 0 5px var(--ocre);
  outline: none;
}

label {
  cursor: pointer;
  margin-right: 2rem;
  font-size: 2rem;
  width: 7rem;
}

button {
  width: 10%;
  height: 3rem;
  padding: 1.2rem 1.2rem;
  margin: 3rem 0;
  border-radius: 2rem;
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--creme, #fffaf3);
  background: var(--azul-escuro);
  box-shadow: 4px 4px 15px 0px var(--cinza-claro);
  border: none;
  cursor: pointer;
  transition: transform 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
}

button:hover {
  background: #1869cd;
  transform: scale(1.1);
}
.container__message {
  height: 5vh;
}

.loading {
  font-size: 1.6rem;
  color: darkgreen;
}
.error {
  font-size: 1.6rem;
  color: red;
}
</style>
