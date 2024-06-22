<template>
  <div class="admin">
    <div class="marco"></div>
    <div class="menu">
      <button v-if="penalizado == 0" @click="cargaDato(0)">
        Solicitar Préstamo
      </button>
      <button @click="cargaDato(1)">Devolver Préstamo</button>
      <button v-if="penalizado == 0" @click="cargaDato(2)">
        Modificar datos
      </button>
    </div>
  </div>

  <Solicitud
    v-show="vistaTabla == 1"
    @cierra="cerrar"
    class="solicitud"
    :listaLibros="libros"
    :listaRevistas="revistas"
    :listaDigital="digitales"
  />
  <Devolucion
    v-show="vistaTabla == 3"
    @cierra="cerrar"
    @penalizado="penaliza"
    class="solicitud"
    :listaReservas="reservas"
  />
  <Modificar
    v-show="vistaTabla == 2"
    @cierra="cerrar"
    :persona="persona"
    :creaModifica="modifica"
    modificacion="true"
  />
</template>

<script>
import Solicitud from "../components/SolicitarPrestamo";
import Devolucion from "../components/Devolucion";
import Modificar from "../components/Modifica";
import axios from "axios";
export default {
  name: "VistaCliente",
  components: {
    Solicitud,
    Devolucion,
    Modificar,
  },
  data: () => ({
    vistaTabla: 0,
    persona: {},
    cabeceras: [],
    datosTabla: [],
    libros: [],
    revistas: [],
    digitales: [],
    reservas: [],
    tipo: 0,
    usuario: "",
    dni: "",
    modifica: "Modificar",
    penalizado: 0,
  }),
  methods: {
    async cargaDato(tipo) {
      this.tipo = tipo;
      if (tipo === 0) await this.solicitarPrestamo();
      if (tipo === 1) await this.devolverPrestamo();
      if (tipo === 2) await this.rectificarDatos();
    },
    cerrar() {
      this.vistaTabla = 0;
    },
    async solicitarPrestamo() {
      await this.cargaLibros();
      await this.cargaRevistas();
      await this.cargaDigitales();
      this.vistaTabla = 1;
    },
    async rectificarDatos() {
      this.usuario = localStorage.getItem("usuario");
      this.dni = localStorage.getItem("dni");
      await axios
        .get("http://localhost:5000/Personas/localiza", {
          params: {
            usuario: this.usuario,
            dni: this.dni,
          },
        })
        .then((response) => {
          this.persona = response.data[0];
        });

      this.vistaTabla = "2";
    },

    async cargaLibros() {
      axios
        .get("http://localhost:5000/Fondos/Libros/Reserva", {})
        .then((response) => {
          this.libros = response.data;
        });
    },

    async cargaRevistas() {
      axios
        .get("http://localhost:5000/Fondos/Revistas/Reserva", {})
        .then((response) => {
          this.revistas = response.data;
        });
    },
    async cargaDigitales() {
      axios
        .get("http://localhost:5000/Fondos/ImagenSonido/Reserva", {})
        .then((response) => {
          this.digitales = response.data;
        });
    },
    async devolverPrestamo() {
      this.dni = localStorage.getItem("dni");
      var idUsuario = "";
      await axios
        .get("http://localhost:5000/Personas/TodosUsuarios", {})
        .then((resp) => {
          for (var i = 0; i < resp.data.length; i++) {
            if (this.dni == resp.data[i].dni) {
              idUsuario = resp.data[i].id;
            }
          }
        });

      await axios
        .get("http://localhost:5000/Reservas", {
          params: {
            idUsuario: idUsuario,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.reservas = response.data;
        });
      this.vistaTabla = 3;
    },
    penaliza() {
      this.penalizado = 1;
    },
  },
};
</script>

<style scoped>
.admin {
  background-image: url(../assets/cliente.png);
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

.solicitud {
  position: absolute;
  top: 15%;
  left: 15%;
}
</style>
