<template>
  <div>
    <div class="cabecera">
      <h2>Bibibus</h2>
      <!--nav>
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
      </nav-->
      <div class="usuario" v-show="loginView == 0">
        <span>{{ usuario }}</span>
        <button @click="cerrar">Cerrar Sesión</button>
      </div>
    </div>
    <!--div class="App">
      <div class="marco"-->
    <router-view />
    <!--/div>
    </div-->
    <div class="pie">
      <h3>Copyright Padese</h3>
    </div>
  </div>

  <ClassLogin
    class="login"
    @entrada="decision"
    v-show="loginView == 1"
  ></ClassLogin>
</template>

<script>
import ClassLogin from "./components/Login";

export default {
  name: "ClaseApp",
  components: {
    ClassLogin,
  },
  data: () => ({
    loginView: 0,
    usuario: "",
  }),
  mounted() {
    const user = localStorage.getItem("usuario");
    if (user == null) {
      this.loginView = 1;
    } else {
      this.usuario = user;
    }
  },
  beforeUnmount() {
    localStorage.removeItem("Usuario");
    localStorage.removeItem("dni");
  },
  methods: {
    decision(event) {
      this.loginView = 0;
      this.usuario = event.nombre;
      localStorage.setItem("usuario", event.nombre);
      localStorage.setItem("dni", event.dni);

      if (event.rol == "Admin") {
        this.$router.push("/Admin");
      } else if (event.rol == "Conductor") {
        this.$router.push("/Conductor");
      } else {
        this.$router.push("/Cliente");
      }
    },
    cerrar() {
      this.loginView = 1;
      this.user = "";
      localStorage.removeItem("usuario");
      this.$router.push("/");
    },
  },
};
</script>

<style>
html {
  overflow: hidden;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.cabecera {
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 6vh;
  background-color: #ffaaaa;
  color: #005555;
}

.cabecera h2 {
  margin-top: 1vh;
}

.usuario {
  position: absolute;
  display: flex;
  right: 50px;
  height: 6vh;
  top: 0;
}

.usuario span {
  margin-left: 20px;
  margin-top: 1.8vh;
}

.usuario button {
  height: 30px;
  width: 7vw;
  border-radius: 15px;
  background-color: #6ac2a7;
  color: black;
  margin-left: 20px;
  margin-top: 1vh;
}

.pie {
  position: absolute;
  left: 0px;
  bottom: 0px;
  width: 100%;
  height: 6vh;
  background-color: #0050aa;
  color: #ffcd55;
}

nav {
  padding: 30px;
}

.login {
  position: absolute;
  top: 0;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
