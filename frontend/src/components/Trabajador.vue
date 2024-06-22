<template>
  <div class="creaModifica">
    <div class="formulario">
      <span>{{ creaModifica }} usuario de la base de datos</span>
      <form name="formnuevo" class="formnuevo" @submit="modifica">
        <div class="entradas">
          <input
            type="text"
            name="nombre"
            id="nombre"
            placeholder="Nombre"
            :value="persona.nombre"
            required
          />
          <input
            type="text"
            name="apellidos"
            id="apellidos"
            placeholder="Apellidos"
            :value="persona.apellidos"
            required
          />
          <input
            type="text"
            name="direccion"
            id="direccion"
            placeholder="Direccion"
            :value="persona.direccion"
            required
          />
          <input
            type="text"
            name="poblacion"
            id="poblacion"
            placeholder="Poblacion"
            :value="persona.poblacion"
            required
          />

          <input
            type="text"
            name="dni"
            id="dni"
            placeholder="dni"
            :value="persona.dni"
            required
            v-if="creaModifica == 'Nuevo'"
          />
        </div>
        <div class="entradas">
          <input
            type="text"
            name="telefono"
            id="telefono"
            placeholder="teléfono"
            :value="persona.telefono"
            required
          />
          <input
            type="text"
            name="email"
            id="email"
            placeholder="email"
            :value="persona.email"
            required
          />

          <Select
            placeholder="Bibliobús"
            name="bibliobus"
            :value="persona.bibliobus"
            required
          >
            <option value="Bibliobus">Bibliobus</option>
            <option
              v-for="(biblio, bindex) in bibliobuses"
              :index="bindex"
              :key="bindex"
            >
              {{ biblio.numeroBiblioBus }}
            </option>
          </Select>

          <input
            v-if="creaModifica == 'Nuevo'"
            type="password"
            name="clave"
            id="clave"
            placeholder="clave de usuario"
            :value="persona.clave"
            required
          />
          <input
            v-if="creaModifica == 'Nuevo'"
            type="password"
            name="repita"
            id="repita"
            placeholder="Repita la clave"
            :value="persona.clave"
            required
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
    bibliobuses: {
      type: Array,
    },
    persona: {
      type: Object,
    },
    creaModifica: {
      type: String,
    },
  },
  methods: {
    modifica(event) {
      event.preventDefault();
      if (this.creaModifica == "Nuevo") this.nuevo();
      else this.modificaEmpleado();
    },
    nuevo() {
      console.log(document.formnuevo);
      var clave = document.formnuevo.clave.value;
      const clave2 = document.formnuevo.clave.value;

      if ((clave !== "" || clave2 !== "") && clave != clave2) {
        alert("Las claves son diferentes");
      }

      axios
        .post("http://localhost:5000/Personas/Conductor", {
          nombre: document.formnuevo.nombre.value,
          apellidos: document.formnuevo.apellidos.value,
          direccion: document.formnuevo.direccion.value,
          parada: document.formnuevo.poblacion.value,
          dni: document.formnuevo.dni.value,
          telefono: document.formnuevo.telefono.value,
          email: document.formnuevo.email.value,
          clave: document.formnuevo.clave.value,
          bibliobus: document.formnuevo.bibliobus.value,
        })
        .then((response) => {
          if (response.status === 200) {
            alert(response.data);

            this.$emit("cierra");
          }
        });
      console.log(this.bibliobuses);
    },
    modificaEmpleado() {
      console.log(document.formnuevo);
      axios
        .put("http://localhost:5000/Personas/Conductor", {
          nombre: document.formnuevo.nombre.value,
          apellidos: document.formnuevo.apellidos.value,
          direccion: document.formnuevo.direccion.value,
          parada: document.formnuevo.poblacion.value,
          dni: this.persona.dni,
          telefono: document.formnuevo.telefono.value,
          email: document.formnuevo.email.value,
          clave: this.persona.password,
          bibliobus: document.formnuevo.bibliobus.value,
        })
        .then((response) => {
          if (response.status === 200) {
            alert(response.data);

            this.$emit("cierra");
          }
        });
      console.log(this.bibliobuses);
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

.formnuevo {
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
  position: absolute;
  height: 30px;
  width: 9vw;
  border-radius: 15px;
  background-color: #6ac2a7;
  color: black;
  margin-left: 28%;
  top: 44.6vh;
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
