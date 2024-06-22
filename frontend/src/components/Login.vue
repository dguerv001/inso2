<template>
  <div class="ClaseLogin">
    <span class="inicio">Inicio de Sesión</span>
    <form class="formLogin" name="formulario" @submit="submit">
      <input type="text" placeholder="Introduzca Email" name="usuario" />
      <input type="password" placeholder="Introduzca Contraseña" name="clave" />
      <div class="botones">
        <button type="button" value="Soy nuevo" @click="registro">
          Soy nuevo
        </button>
        <input type="submit" value="Iniciar" />
      </div>
    </form>
    <Modifica
      v-show="ver === 'true'"
      :persona="persona"
      :poblaciones="poblaciones"
      :creaModifica="boton"
      :modificacion="modificacion"
      @cierra="cerrar()"
      class="nuevo"
    ></Modifica>
  </div>
</template>

<script>
import axios from "axios";
import Modifica from "../components/Modifica";
export default {
  name: "ClaseLogin",
  components: {
    Modifica,
  },
  data: () => ({
    ver: "false",
    persona: Object,
    poblaciones: [],
    boton: "Regístrame",
    modificacion: "false",
  }),
  methods: {
    submit(event) {
      event.preventDefault();
      this.aceptacion();
    },
    async registro() {
      await axios
        .get("http://localhost:5000/Poblaciones", {})
        .then((response) => {
          console.log(response.data);
          this.poblaciones = response.data;
        });
      this.ver = "true";
    },
    cerrar() {
      this.ver = "false";
    },
    aceptacion() {
      axios
        .get("http://localhost:5000/personas", {
          params: {
            email: document.formulario.usuario.value,
            clave: document.formulario.clave.value,
          },
        })
        .then(async (response) => {
          if (response.data.length == 0) {
            alert("No tenemos ningún usuario con ese correo y esa contraseña.");
          } else {
            var usuario = await this.sancion(response.data[0]);
            console.log(usuario);
            if (
              response.data[0].rol == "Lector" &&
              usuario != null &&
              usuario.fechaFinBan != null
            ) {
              var fecha = usuario.fechaFinBan.split("-");
              var fin = new Date(fecha[0], parseInt(fecha[1]) - 1, fecha[2]);
              var hoy = new Date();

              if (fin < hoy) {
                await this.desBan(usuario.persona);
                alert("Terminó su periodo de sanción, bienvenido de nuevo");
                this.$emit("entrada", response.data[0]);
              } else
                alert("Tiene sanción vigente hasta el " + usuario.fechaFinBan);
            } else {
              console.log(response.data);
              this.$emit("entrada", response.data[0]);
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async sancion(usuario) {
      var persona = {};
      await axios
        .get("http://localhost:5000/Personas/Usuarios/penalizados", {})
        .then((response) => {
          for (var i = 0; i < response.data.length; i++) {
            if (response.data[i].persona.dni == usuario.dni) {
              persona = response.data[i];
            }
          }
        });
      return persona;
    },
    async desBan(usuario) {
      axios
        .put("http://localhost:5000/Personas/desPenaliza", {
          dni: usuario.dni,
        })
        .then((response) => {
          console.log(response);
        });
    },
  },
};
</script>

<style scoped>
.ClaseLogin {
  position: absolute;
  width: 20vw;
  margin-left: 40vw;
  height: 42vh;
  margin-top: 29vh;
  background-color: #ffaaaa;
  z-index: 10;
  display: block;
}

.botones {
  display: flex;
  width: 100%;
}

.inicio {
  position: absolute;
  width: 100%;
  padding-top: 5%;
  margin-left: -50%;
  height: 15%;
  /*background-color: #9900ff;*/
  background-color: #0050aa;
  color: #ffcd55;
  text-align: center;
  font-size: 25px;
}

.formLogin {
  margin-top: 30%;
  width: 100%;
  height: 50%;
}

.formLogin input {
  width: 80%;
  height: 15%;
  margin-top: 10%;
  margin-left: 0%;
}

.formLogin input[type="submit"],
button {
  height: 50px;
  width: 50px;
  border-radius: 25px;
  background-color: #6ac2a7;
  color: black;
  margin-left: 40%;
}

button {
  margin-top: 4vh;
  width: 100px;
  margin-left: 1vw;
}

.nuevo {
  position: absolute;
  width: 85vw;
  left: -32vw;
  top: -15vh;
}
</style>
