<template>
  <div class="ClaseSolicitud">
    <span class="inicio">Préstamo</span>
    <Select value="Seleccione tipo de fondo" class="combo">
      <option value="Seleccione tipo de fondo">Seleccione tipo de fondo</option>
      <option value="Libro" @click="vista = 'Libro'">Libro</option>
      <option value="Revista" @click="vista = 'Revista'">Revista</option>
      <option value="Digital" @click="vista = 'Digital'">Digital</option>
    </Select>

    <form @submit="reserva" class="formulario">
      <div class="fechas">
        <div class="fecha">
          <p>Fecha de préstamo:</p>
          <input type="text" readonly :value="fechaPrestamo" />
        </div>

        <input type="submit" value="Solicitar" />

        <div class="fecha">
          <p>Fecha de devolucion:</p>
          <input type="text" readonly :value="fechaDevolucion" />
        </div>
      </div>
      <div v-if="vista == 'Libro'">
        <select value="Selección libro" class="combo2">
          <option value="Selección libro">Seleccion libro</option>
          <option
            v-for="(libro, index) in listaLibros"
            :index="index"
            :key="index"
            @click="setFondo(libro)"
          >
            {{ libro.titulo }}
          </option>
        </select>
      </div>
      <div v-else-if="vista == 'Revista'">
        <select value="Selección revista" class="combo2">
          <option value="Selección revista">Seleccion revista</option>
          <option
            v-for="(revista, index) in listaRevistas"
            :index="index"
            :key="index"
            @click="setFondo(revista)"
          >
            {{ revista.nombre }}
          </option>
        </select>
      </div>
      <div v-else-if="vista == 'Digital'">
        <select value="Selección Audiovisual" class="combo2">
          <option value="Selección Audiovisual">Seleccion audiovisual</option>
          <option
            v-for="(digital, index) in listaDigital"
            :index="index"
            :key="index"
            @click="setFondo(digital)"
          >
            {{ digital.titulo }}
          </option>
        </select>
      </div>
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
    listaLibros: {
      type: Array,
    },
    listaRevistas: {
      type: Array,
    },
    listaDigital: {
      type: Array,
    },
  },
  methods: {
    setFondo(fondo) {
      this.marca = fondo.marca;
      this.setFechas();
    },
    setFechas() {
      const opciones = {
        weekday: "long",
        day: "numeric",
        month: "short",
        year: "numeric",
      };
      var hoy = new Date();
      var dev = new Date();
      dev.setMonth(hoy.getMonth() + 1);
      this.fechaPrestamo = hoy.toLocaleDateString("es-ES", opciones);
      this.fechaDevolucion = dev.toLocaleDateString("es-ES", opciones);
    },
    async reserva(event) {
      event.preventDefault();
      const usuario = localStorage.getItem("usuario");
      const dni = localStorage.getItem("dni");
      var persona = {};
      var idUsuario = "";
      var poblacion = "";

      await axios
        .get("http://localhost:5000/Personas/localiza", {
          params: {
            usuario: usuario,
            dni: dni,
          },
        })
        .then((response) => {
          persona = response.data[0];
        });

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

      await axios
        .get("http://localhost:5000/Poblaciones/Nombre", {
          params: {
            nombre: persona.poblacion,
          },
        })
        .then((response) => {
          poblacion = response.data[0].id;
        });

      axios
        .post("http://localhost:5000/Reservas", {
          marca: this.marca,
          idUsuario: idUsuario,
          idPoblacion: poblacion,
        })
        .then((response) => {
          alert(response.data);
          this.$emit("cierra");
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
  margin-left: -9.345vw;
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
  position: absolute;
  height: 30px;
  width: 9vw;
  border-radius: 15px;
  background-color: #6ac2a7;
  color: black;
  margin-left: 126%;
  margin-top: 21.4vh;
}
.cerrar {
  height: 30px;
  width: 9vw;
  border-radius: 15px;
  background-color: #6ac2a7;
  color: black;
  margin-left: 175.7%;
  margin-top: 46.8vh;
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
  width: 57%;
  left: 43%;
  top: -4.5vh;
  height: 4vh;
  background-color: #faa0;
  border-color: #faa0;
  color: white;
  font-weight: bold;
  font-size: 17px;
}
</style>
