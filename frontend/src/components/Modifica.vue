<template>
  <div class="creaModifica">
    <div class="formulario">
      <span>{{ creaModifica }} usuario de la base de datos</span>
      <form
        name="formmodificausuario"
        class="formmodificausuario"
        @submit="modifica"
      >
        <div class="entradas">
          <input
            type="text"
            name="nombre"
            id="nombre"
            placeholder="Nombre"
            :value="persona.nombre"
          />
          <input
            type="text"
            name="apellidos"
            id="apellidos"
            placeholder="Apellidos"
            :value="persona.apellidos"
          />
          <input
            type="text"
            name="direccion"
            id="direccion"
            placeholder="Direccion"
            :value="persona.direccion"
          />
          <select
            value="Poblacion"
            name="poblacion"
            v-if="creaModifica != 'Modificar'"
          >
            <option
              v-for="(poblacion, index) in poblaciones"
              :index="index"
              :key="index"
            >
              {{ poblacion.nombre }}
            </option>
          </select>
          <input v-else :value="persona.poblacion" disabled name="poblacion" />
          <input
            type="text"
            name="dni"
            id="dni"
            placeholder="dni"
            :value="persona.dni"
          />
        </div>
        <div class="entradas">
          <input
            type="text"
            name="telefono"
            id="telefono"
            placeholder="teléfono"
            :value="persona.telefono"
          />
          <input
            type="text"
            name="email"
            id="email"
            placeholder="email"
            :value="persona.email"
          />
          <input
            type="password"
            name="clave"
            id="clave"
            placeholder="clave de usuario"
            :value="persona.password"
          />
          <input
            type="password"
            name="repita"
            id="repita"
            placeholder="Repita la clave"
            :value="persona.password"
          />
          <input type="submit" :value="creaModifica" />
        </div>
      </form>
    </div>
    <button class="cerrar" @click="this.$emit('cierra')">Cerrar</button>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
ref(0);
export default {
  name: "VistaModificar",
  data: () => ({
    pos: 0,
  }),
  props: {
    persona: {
      type: [],
    },
    modificacion: {
      type: String,
    },
    poblaciones: {
      type: Array,
    },
    creaModifica: {
      type: String,
    },
  },
  methods: {
    modifica(event) {
      event.preventDefault();
      if (this.modificacion === "true") this.modificar();
      else this.nuevo();
    },
    modificar() {
      var clave = document.getElementById("clave").value;
      const clave2 = document.getElementById("repita").value;

      if ((clave != "" || clave2 != "") && clave != clave2) {
        alert("Las claves son diferentes");
      }
      console.log(document.formmodificausuario[1]);

      axios
        .put("http://localhost:5000/Personas", {
          nombre: document.formmodificausuario[1].nombre.value,
          apellidos: document.formmodificausuario[1].apellidos.value,
          direccion: document.formmodificausuario[1].direccion.value,
          parada: document.formmodificausuario[1].poblacion.value,
          dni: document.formmodificausuario[1].dni.value,
          telefono: document.formmodificausuario[1].telefono.value,
          email: document.formmodificausuario[1].email.value,
          clave: document.formmodificausuario[1].clave.value,
        })
        .then((response) => {
          if (response.status === 200) {
            alert("Modificado en la base de datos");
            this.$emit("cierra");
          }
        });
    },
    nuevo() {
      var clave = document.formmodificausuario[1].clave.value;
      const clave2 = document.formmodificausuario[1].clave.value;

      if ((clave !== "" || clave2 !== "") && clave != clave2) {
        alert("Las claves son diferentes");
      }

      if (clave === "" && clave === "") clave = this.persona.password;

      axios
        .post("http://localhost:5000/Personas", {
          nombre: document.formmodificausuario[1].nombre.value,
          apellidos: document.formmodificausuario[1].apellidos.value,
          direccion: document.formmodificausuario[1].direccion.value,
          parada: document.formmodificausuario[1].poblacion.value,
          dni: document.formmodificausuario[1].dni.value,
          telefono: document.formmodificausuario[1].telefono.value,
          email: document.formmodificausuario[1].email.value,
          clave: document.formmodificausuario[1].clave.value,
        })
        .then((response) => {
          if (response.status === 200) {
            alert(response.data);
            this.$emit("cierra");
          }
        });
    },
  },
};
</script>

<style>
.creaModifica {
  position: absolute;
  width: 83%;
  height: 70%;
  left: 10%;
  top: 15.8vh;
}

.formulario {
  position: absolute;
  width: 60%;
  margin-top: 10px;
  height: 66vh;
  background-color: #fb59;
  margin-left: 19.5%;
  color: rgb(0, 43, 51);
  padding-top: 1vh;
}

.formulario span {
  font-size: 20px;
  font-weight: bold;
}

.formmodificausuario {
  position: relative;
  width: 100%;
  height: 67vh;
  display: flex;
}

.entradas {
  width: 29vw;
  height: 67vh;
  margin-left: 0.5vw;
}
.entradas input,
.entradas select {
  width: 80%;
  margin-top: 10%;
  height: 30px;
}

.formulario input[type="submit"] {
  height: 30px;
  width: 9vw;
  border-radius: 15px;
  background-color: #6ac2a7;
  color: black;
  margin-left: 148%;
  margin-top: -6vh;
}

.cerrar {
  height: 30px;
  width: 9vw;
  border-radius: 15px;
  background-color: #6ac2a7;
  color: black;
  margin-left: 93.6%;
  margin-top: 54vh;
}
</style>
