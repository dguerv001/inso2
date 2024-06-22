<template>
  <div class="admin">
    <div class="marco"></div>
    <div class="menu">
      <button @click="cargaDato(3)">Libros</button>
      <button @click="cargaDato(4)">Revistas</button>
      <button @click="cargaDato(5)">Medios digitales</button>
    </div>
  </div>

  <Tabla
    v-show="vistaTabla == 1"
    :cabeceras="cabeceras"
    :datosTabla="datosTabla"
    :tipo="tipo"
    @cierra="cerrar"
    @recarga="recargar"
    name="tabla"
  />
</template>

<script>
import axios from "axios";
import Tabla from "../components/Tabla.vue";
export default {
  name: "VistaConductor",
  components: {
    Tabla,
  },
  data: () => ({
    cabeceras: [],
    datosTabla: [],
    libros: [],
    conductor: {},
    dni: "",
    vistaTabla: 0,
  }),
  async mounted() {
    this.dni = localStorage.getItem("dni");
    await this.getBibliobus();
  },
  methods: {
    cerrar() {
      this.vistaTabla = 0;
    },
    async cargaDato(tipo) {
      this.tipo = tipo;

      if (tipo === 3) await this.cargaLibros();
      if (tipo === 4) await this.cargaRevistas();
      if (tipo === 5) await this.cargaDigitales();
      //console.log(tablaRef.value);
      //tablaRef.value.desselecciona();
    },
    async getBibliobus() {
      axios
        .get("http://localhost:5000/Bibliobuses/Trabajador", {
          params: {
            dni: this.dni,
          },
        })
        .then((response) => {
          console.log(response.data[0]);
          this.conductor = response.data[0];
        });
    },
    async cargaLibros() {
      this.cabeceras = [
        { cabecera: "Marca" },
        { cabecera: "I.S.B.N" },
        { cabecera: "Título" },
        { cabecera: "Autor" },
        { cabecera: "Soporte" },
        { cabecera: "Editorial" },
        { cabecera: "Bibliobus" },
      ];
      axios.get("http://localhost:5000/Fondos/Libros", {}).then((response) => {
        var libros = [];

        for (var i = 0; i < response.data.length; i++) {
          var libro = response.data[i];
          if (libro.numerobibliobus == this.conductor.numerobibliobus) {
            libros.push(libro);
          }
        }
        this.datosTabla = libros;
      });
      this.vistaTabla = 1;
    },
    async cargaRevistas() {
      this.cabeceras = [
        { cabecera: "Marca" },
        { cabecera: "Nombre" },
        { cabecera: "Género" },
        { cabecera: "Número" },
        { cabecera: "Soporte" },
        { cabecera: "Bibliobus" },
      ];
      axios
        .get("http://localhost:5000/Fondos/Revistas", {})
        .then((response) => {
          var revistas = [];

          for (var i = 0; i < response.data.length; i++) {
            var revista = response.data[i];
            if (revista.numerobibliobus == this.conductor.numerobibliobus) {
              revistas.push(revista);
            }
          }
          this.datosTabla = revistas;
        });
      this.vistaTabla = 1;
    },
    async cargaDigitales() {
      this.cabeceras = [
        { cabecera: "Marca" },
        { cabecera: "Título" },
        { cabecera: "Soporte" },
        { cabecera: "Duración (min)" },
        { cabecera: "Bibliobus" },
      ];
      axios
        .get("http://localhost:5000/Fondos/ImagenSonido", {})
        .then((response) => {
          var iss = [];

          for (var i = 0; i < response.data.length; i++) {
            var is = response.data[i];
            if (is.numerobibliobus == this.conductor.numerobibliobus) {
              iss.push(is);
            }
          }
          this.datosTabla = iss;
        });
      this.vistaTabla = 1;
    },
  },
};
</script>

<style scoped>
.admin {
  background-image: url(../assets/conductor.png);
  width: 80%;
  height: 85vh;
  margin-left: 10%;
  margin-top: 8vh;
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.marco {
  background-image: url(../assets/marco.png);
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  box-shadow: inset 0px 0px 30px 70px rgba(255, 255, 255, 1);
}
.menu {
  position: absolute;
  width: 10vw;
  height: 70vh;
  left: 2vw;
  top: 10vh;
}

.menu button {
  height: 30px;
  width: 9vw;
  border-radius: 15px;
  background-color: #6ac2a7;
  color: black;
  margin-left: 20px;
  margin-top: 6vh;
}

.tabla {
  position: absolute;
  top: 15%;
  left: 15%;
}
</style>
