<template>
  <div class="tabla">
    <div class="table">
      <table class="esencia">
        <th></th>
        <th v-for="(cabecera, i) in cabeceras" :index="i" :key="i">
          {{ cabecera.cabecera }}
        </th>
        <tr
          v-for="(usuario, indice) in datosTabla"
          :index="indice"
          :key="indice"
          @click="selecciona(indice)"
        >
          <th>
            {{ indice + 1 }}
          </th>
          <td v-for="(campo, j) in usuario" :index="j" :key="j">
            {{ campo }}
          </td>
        </tr>
      </table>
    </div>
    <div class="filtros">
      <button v-if="tipo == 0" @click="this.$emit('seleccion', 0)">
        Todos
      </button>
      <button v-if="tipo == 0" @click="this.$emit('seleccion', 3)">
        Penalizados
      </button>
      <button v-if="tipo == 0" @click="this.$emit('seleccion', 4)">
        Activos
      </button>

      <button v-if="tipo == 2" @click="cargaDato(0)">Libros</button>
      <button v-if="tipo == 2" @click="cargaDato(1)">Revistas</button>
      <button v-if="tipo == 2" @click="cargaDato(2)">Soporte digital</button>
      <button v-if="tipo == 2" @click="cargaDato(3)">NuevoFondo</button>

      <button v-if="tipo < 2 || tipo == 13" @click="this.$emit('nuevo')">
        Nuevo
      </button>
      <button v-if="tipo < 2" @click="borrar">Borrar</button>
      <button v-if="tipo < 2" @click="this.$emit('modifica', this.pos)">
        Modificar
      </button>
      <button @click="cerrar">Cerrar</button>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

ref(0);
export default {
  name: "VistaTabla",
  components: {},
  data: () => ({
    pos: 0,
    nuevo: 1,
  }),
  props: {
    cabeceras: {
      type: Array,
    },
    datosTabla: {},
    tipo: {
      type: Number,
    },
  },
  methods: {
    async borrar() {
      //if (this.tipo == 0) {
      await this.desselecciona();
      this.$emit("borra", this.pos);
      //}
    },
    async cargaDato(valor) {
      if (valor === 0) await this.cargaLibros();
      if (valor === 1) await this.cargaRevistas();
      if (valor === 2) await this.cargaDigital();
      if (valor === 3) await this.nuevoFondo();
      await this.desselecciona();
    },
    async selecciona(indice) {
      this.pos = indice;
      var antigua = await this.desselecciona();

      if (antigua != indice) {
        var filaSeleccionada = document.getElementsByTagName("tr")[indice];
        filaSeleccionada.classList.add("seleccionada");
      }
    },
    async desselecciona() {
      var filas = document.getElementsByTagName("tr");
      var antigua = -1;
      for (var i = 0; i < filas.length; i++) {
        if (filas[i].classList.contains("seleccionada")) antigua = i;
        filas[i].classList.remove("seleccionada");
      }
      return antigua;
    },
    cerrar() {
      this.$emit("cierra");
    },
    async cargaLibros() {
      this.$emit("recarga", 0);
    },
    async cargaRevistas() {
      this.$emit("recarga", 1);
    },
    async cargaDigital() {
      this.$emit("recarga", 2);
    },
    async nuevoFondo() {
      this.$emit("nuevoFondo");
    },
  },
};
</script>

<style>
.tabla {
  width: 83%;
}

.table {
  width: 60%;
  margin-top: 10px;
  height: 67vh;
  /*border-style: solid;*/
  background-color: #fb59;
  margin-left: 13%;
  /*color: #04af;*/
  color: rgb(0, 43, 51);
  overflow-y: scroll;
}

.esencia {
  width: 100%;
  border-collapse: collapse;
}

.esencia td {
  border-bottom: solid;
  border-color: #045a;
  padding-top: 5px;
  padding-bottom: 5px;
}

.seleccionada {
  background-color: #f00a;
  color: white;
}

.esencia th {
  width: auto;
  border-width: 3px;
  background-color: #fb5a;
  border-spacing: -10px;
  border-bottom: solid;
  border-color: #045a;
}

.filtros {
  position: absolute;
  width: 10vw;
  height: 70vh;
  right: 2vw;
  top: -5vh;
}

.filtros button {
  height: 30px;
  width: 9vw;
  border-radius: 15px;
  background-color: #6ac2a7;
  color: black;
  margin-left: 20px;
  margin-top: 6vh;
}
</style>
