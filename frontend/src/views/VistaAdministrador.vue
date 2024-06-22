<template>
  <div class="admin">
    <div class="marco"></div>
    <div class="menu">
      <button @click="cargaDato(0)">Usuarios</button>
      <button @click="cargaDato(1)">Empleados</button>
      <button @click="cargaDato(2)">Depósito bibliográfico</button>
      <button @click="cargaDato(13)">Bibliobus</button>
    </div>
  </div>

  <Tabla
    v-show="vistaTabla === 1"
    :cabeceras="cabeceras"
    :datosTabla="datosTabla"
    :tipo="tipo"
    :creaModifica="boton"
    @cierra="cerrar"
    @recarga="recargar"
    @seleccion="cargaDato"
    @borra="borrar"
    @modifica="modificar"
    @nuevo="nuevo"
    @nuevoFondo="nuevoFondo"
    name="tabla" />

  <Modifica
    v-show="vistaTabla === 2"
    :persona="persona"
    :poblaciones="poblaciones"
    :creaModifica="boton"
    :modificacion="modificacion"
    @cierra="cerrar()"
    class="nuevo"></Modifica>

  <Trabajador
    v-show="vistaTabla === 11"
    @cierra="cerrar()"
    class="nuevo"
    :bibliobuses="bibliobuses"
    :creaModifica="modificacion"
    :persona="persona"></Trabajador>

  <NuevoFondo
    v-show="vistaTabla == 10"
    :soportes="soportes"
    :bibliobuses="bibliobuses"
    @cierra="cerrar" />

  <Bibliobus v-show="vistaTabla == 12" @cierra="cerrar" />
</template>

<script>
import Tabla from "../components/Tabla.vue";
import Modifica from "../components/Modifica";
import Trabajador from "../components/Trabajador.vue";
import NuevoFondo from "../components/NuevoFondo";
import Bibliobus from "../components/Bibliobus.vue";
import axios from "axios";
export default {
  name: "VistaAdministrador",
  components: {
    Tabla,
    Modifica,
    NuevoFondo,
    Trabajador,
    Bibliobus,
  },
  data: () => ({
    vistaTabla: 0,
    cabeceras: [],
    datosTabla: [],
    bibliobuses: [],
    soportes: [],
    persona: Object,
    tipo: 0,
    boton: "Modificar Usuario",
    modificacion: "true",
  }),
  methods: {
    async cargaDato(tipo) {
      this.tipo = tipo;

      if (tipo === 0) await this.cargaUsuarios();
      if (tipo === 1) await this.cargaEmpleados();
      if (tipo === 2) await this.cargaLibros();
      if (tipo === 3) await this.cargaPenalizados();
      if (tipo === 4) await this.cargaActivos();
      if (tipo === 13) await this.cargaBibliobus();
      //console.log(tablaRef.value);
      //tablaRef.value.desselecciona();
    },
    async recargar(val) {
      if (val === 0) await this.cargaLibros();
      if (val === 1) await this.cargaRevistas();
      if (val === 2) await this.cargaDigital();
      //this.$refs.tabla.desselecciona();
    },
    cerrar() {
      this.persona = {};
      this.vistaTabla = 0;
    },
    async cargaUsuarios() {
      await axios
        .get("http://localhost:5000/Personas/Usuarios", {})
        .then((usuarios) => {
          this.datosTabla = [];

          for (var i = 0; i < usuarios.data.length; i++) {
            var persona = usuarios.data[i].persona;
            delete persona.password;
            delete persona.rol;
            persona.ban = usuarios.data[i].ban;
            this.datosTabla.push(persona);
          }
        });
      this.cabeceras = [
        { cabecera: "D.N.I." },
        { cabecera: "Nombre" },
        { cabecera: "Apellidos" },
        { cabecera: "Direccion" },
        { cabecera: "Pueblo" },
        { cabecera: "Teléfono" },
        { cabecera: "Email" },
        { cabecera: "Sancionado" },
      ];
      this.vistaTabla = 1;
    },
    async cargaPenalizados() {
      await axios
        .get("http://localhost:5000/Personas/Usuarios/penalizados", {})
        .then((usuarios) => {
          this.datosTabla = [];

          for (var i = 0; i < usuarios.data.length; i++) {
            var persona = usuarios.data[i].persona;
            delete persona.password;
            delete persona.rol;
            persona.ban = usuarios.data[i].ban;
            this.datosTabla.push(persona);
          }
        });
      this.tipo = 0;
    },
    async cargaActivos() {
      await axios
        .get("http://localhost:5000/Personas/Usuarios/activos", {})
        .then((usuarios) => {
          this.datosTabla = [];

          for (var i = 0; i < usuarios.data.length; i++) {
            var persona = usuarios.data[i].persona;
            delete persona.password;
            delete persona.rol;
            persona.ban = usuarios.data[i].ban;
            this.datosTabla.push(persona);
          }
        });
      this.tipo = 0;
    },

    async cargaEmpleados() {
      await axios
        .get("http://localhost:5000/Personas/Conductores", {})
        .then((usuarios) => {
          this.datosTabla = [];
          for (var i = 0; i < usuarios.data.length; i++) {
            var persona = usuarios.data[i];
            console.log(persona);
            delete persona.password;
            console.log(persona);
            delete persona.rol;
            this.datosTabla.push(persona);
          }
        });
      this.cabeceras = [
        { cabecera: "D.N.I." },
        { cabecera: "Nombre" },
        { cabecera: "Apellidos" },
        { cabecera: "Direccion" },
        { cabecera: "Pueblo" },
        { cabecera: "Teléfono" },
        { cabecera: "email" },
      ];
      this.vistaTabla = 1;
    },
    async cargaLibros() {
      await axios
        .get("http://localhost:5000/Fondos/Libros", {})
        .then((libros) => {
          this.datosTabla = libros.data;
        });
      this.cabeceras = [
        { cabecera: "Marca" },
        { cabecera: "I.S.B.N" },
        { cabecera: "Título" },
        { cabecera: "Autor" },
        { cabecera: "Soporte" },
        { cabecera: "Editorial" },
        { cabecera: "Bibliobus" },
      ];
      this.vistaTabla = 1;
    },
    async cargaRevistas() {
      await axios
        .get("http://localhost:5000/Fondos/Revistas", {})
        .then((libros) => {
          this.datosTabla = libros.data;
        });
      this.cabeceras = [
        { cabecera: "Marca" },
        { cabecera: "Nombre" },
        { cabecera: "Género" },
        { cabecera: "Número" },
        { cabecera: "Soporte" },
        { cabecera: "Bibliobus" },
      ];
    },
    async cargaDigital() {
      await axios
        .get("http://localhost:5000/Fondos/ImagenSonido", {})
        .then((libros) => {
          this.datosTabla = libros.data;
        });
      this.cabeceras = [
        { cabecera: "Marca" },
        { cabecera: "Titulo" },
        { cabecera: "Duracion" },
        { cabecera: "Soporte" },
        { cabecera: "Bibliobus" },
      ];
    },
    async cargaSoportes() {
      await axios
        .get("http://localhost:5000/Fondos/Soportes", {})
        .then((soportes) => {
          this.soportes = soportes.data;
        });
    },
    async cargaBibliobus() {
      this.cabeceras = [
        { cabecera: "Numero" },
        { cabecera: "Marca" },
        { cabecera: "Matricula" },
      ];
      await this.cargaBibliobuses();
      await axios
        .get("http://localhost:5000/Bibliobuses", {})
        .then((response) => {
          this.datosTabla = response.data;
        });
      this.vistaTabla = 1;
    },
    async cargaBibliobuses() {
      await axios
        .get("http://localhost:5000/Bibliobuses", {})
        .then((response) => {
          this.bibliobuses = response.data;
        });
    },
    async borrar(posicion) {
      if (this.tipo === 0) this.borraPersonas(posicion);
      if (this.tipo === 1) this.borraPersonas(posicion);
      if (this.tipo === 2) this.borraLibros(posicion);
    },
    async borraPersonas(posicion) {
      await axios
        .delete("http://localhost:5000/Personas", {
          params: {
            dni: this.datosTabla[posicion].dni,
          },
        })
        .then(async (response) => {
          if (response.status === 200) {
            if (this.tipo == 0) alert("Lector borrado correctamente");
            if (this.tipo == 1) alert("Conductor borrado correctamente");
            this.vistaTabla = 0;
          } else alert("No se encontró el usuario en la base de datos");
        });
    },
    async borraLibros(posicion) {
      await axios
        .delete("http://localhost:5000/Personas", {
          params: {
            dni: this.datosTabla[posicion].dni,
          },
        })
        .then(async (response) => {
          if (response.status === 200) {
            if (this.tipo == 0) alert("Lector borrado correctamente");
            if (this.tipo == 1) alert("Conductor borrado correctamente");
            this.vistaTabla = 0;
          } else alert("No se encontró el usuario en la base de datos");
        });
    },

    async modificar(posicion) {
      await axios
        .get("http://localhost:5000/Poblaciones", {})
        .then((response) => {
          console.log(response.data);
          this.poblaciones = response.data;
        });
      this.persona = this.datosTabla[posicion];
      console.log(this.persona);
      if (this.tipo == 1) {
        await this.cargaBibliobuses();
        this.modificacion = "Actualizar";
        this.vistaTabla = 11;
      } else this.vistaTabla = 2;
    },
    async basePoblaciones() {
      await axios
        .get("http://localhost:5000/Poblaciones", {})
        .then((response) => {
          console.log(response.data);
          this.poblaciones = response.data;
        });
      this.ver = "true";
    },

    async nuevo() {
      if (this.tipo == 13) {
        this.vistaTabla = 12;
      } else {
        await this.cargaBibliobuses();
        this.persona = {};
        console.log(this.bibliobuses);
        this.modificacion = "Nuevo";
        if (this.tipo == 0) {
          this.boton = "Nuevo";
          await this.basePoblaciones();
          this.vistaTabla = 2;
        } else this.vistaTabla = 11;
      }
    },
    async nuevoFondo() {
      await this.cargaSoportes();
      await this.cargaBibliobuses();
      this.cerrar();
      this.vistaTabla = 10;
    },
  },
};
</script>

<style scoped>
.admin {
  background-image: url(../assets/administrador.png);
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
