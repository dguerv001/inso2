<template>
  <div class="ClaseSolicitud">
    <span class="inicio">Devolucion</span>

    <form @submit="devolucion" class="formulario">
      <select value="Signatura a devolver" class="combo2">
        <option value="Signatura a devolver">Signatura a devolver</option>
        <option
          v-for="(reserva, index) in listaReservas"
          :index="index"
          :key="index"
          @click="setFondo(reserva)"
        >
          {{ reserva.idFondo }}
        </option>
      </select>

      <input type="submit" value="Devolver" />
    </form>
    <button class="cerrar" @click="this.$emit('cierra')">Cerrar</button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ClaseSolicitud",
  data: () => ({
    vista: "Seleccione tipo de fondo",
    fechaPrestamo: "",
    fechaDevolucion: "",
    marca: "",
  }),
  props: {
    listaReservas: {
      type: Array,
    },
  },
  methods: {
    setFondo(fondo) {
      this.marca = fondo.idFondo;
    },
    async devolucion(event) {
      event.preventDefault();

      const dni = localStorage.getItem("dni");
      var idUsuario = "";

      await axios
        .get("http://localhost:5000/Personas/TodosUsuarios", {})
        .then((resp) => {
          for (var i = 0; i < resp.data.length; i++) {
            console.log(resp.data[i]);
            console.log(dni + " " + resp.data[i].dni);
            if (dni == resp.data[i].dni) {
              idUsuario = resp.data[i].id;
            }
          }
        });

      axios
        .delete("http://localhost:5000/Reservas", {
          params: {
            idFondo: this.marca,
          },
        })
        .then(async (response) => {
          if (response.data == "0") {
            alert("Esperamos que haya disfrutado del préstamo");
          } else {
            alert(response.data);
            await this.penaliza(idUsuario);
          }
          this.$emit("cierra");
        });
    },
    async penaliza(idUsuario) {
      this.$emit("penalizado");
      axios
        .put("http://localhost:5000/Personas/Penaliza", {
          idUsuario: idUsuario,
        })
        .then((response) => {
          console.log(response);
        });
    },
  },
};
</script>

<style scoped>
.ClaseSolicitud {
  position: absolute;
  width: 30vw;
  margin-left: 20vw;
  height: 42vh;
  margin-top: 4vh;
  background-color: #fb59;
  z-index: 10;
  display: block;
}
.inicio {
  position: absolute;
  width: 100%;
  padding-top: 1%;
  padding-bottom: 1%;
  margin-left: 0vw;
  height: 7%;
  /*background-color: #9900ff;*/
  background-color: #0050aa;
  color: #ffcd55;
  text-align: center;
  font-size: 25px;
}
.inicio span {
  position: absolute;
  margin-top: -10px;
}
.formulario {
  margin-top: 5%;
  margin-left: 0px;
  width: 100%;
  height: 65%;
  background: #fff0;
}
.formulario input {
  width: 80%;
  height: 15%;
  margin-top: 10%;
  margin-left: 0%;
}
.formulario input[type="submit"] {
  height: 30px;
  width: 9vw;
  border-radius: 15px;
  background-color: #6ac2a7;
  color: black;
  margin-left: 175.7%;
  margin-top: 32.7vh;
}
.cerrar {
  height: 30px;
  width: 9vw;
  border-radius: 15px;
  background-color: #6ac2a7;
  color: black;
  margin-left: 175.7%;
  margin-top: 50.8vh;
}
.combo {
  position: relative;
  z-index: 20;
  top: 7vh;
  height: 30px;
  background: white;
}
.combo2 {
  position: relative;
  z-index: 20;
  top: 10vh;
  height: 30px;
  background: white;
}

.fechas {
  position: relative;
  z-index: 20;
  top: 4vh;
  width: 100%;
  height: 10vh;
  display: block;
}

.fecha {
  position: relative;
  display: flex;
  width: 90%;
  left: 5%;
  text-align: left;
  margin-top: 10px;
  height: 4vh;
  color: white;
  font-weight: bold;
  font-size: 17px;
}

.fecha input {
  position: absolute;
  width: 53%;
  left: 46%;
  top: -4.5vh;
  height: 4vh;
  background-color: #faa0;
  border-color: #faa0;
  color: white;
  font-weight: bold;
  font-size: 17px;
}
</style>
