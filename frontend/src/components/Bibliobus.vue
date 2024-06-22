<template>
  <div class="claseBibliobus">
    <span class="inicio">Nuevo Bibliobus</span>
    <form class="formBiblio" name="formBiblio" @submit="submit">
      <input type="text" placeholder="Número" name="numero" />

      <input type="text" placeholder="Matricula" name="matricula" />

      <input type="text" placeholder="Marca" name="marca" />

      <div class="botones">
        <button type="button" value="Cancelar" @click="cerrar">Cancelar</button>
        <input type="submit" value="Aceptar" />
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ClaseLogin",
  components: {},
  data: () => ({
    tipo: "Fondo",
  }),
  props: {
    soportes: {
      type: Array,
    },
    bibliobuses: {
      type: Array,
    },
  },
  methods: {
    async submit(event) {
      event.preventDefault();
      await axios
        .post("http://localhost:5000/Bibliobuses", {
          numero: document.formBiblio.numero.value,
          marca: document.formBiblio.marca.value,
          matricula: document.formBiblio.matricula.value,
        })
        .then((response) => {
          alert(response.data);
          this.cerrar();
        });
    },
    cerrar() {
      this.$emit("cierra");
    },
    setTipo(value) {
      this.tipo = value;
    },
  },
};
</script>

<style scoped>
.claseBibliobus {
  position: absolute;
  width: 20vw;
  margin-left: 40vw;
  height: 65vh;
  margin-top: -75vh;
  background-color: #faa9;
  z-index: 10;
  display: block;
}

.botones {
  display: flex;
  width: 100%;
  margin-left: 2vw;
}

.inicio {
  position: absolute;
  width: 100%;
  padding-top: 5%;
  margin-left: -50%;
  height: 10%;
  /*background-color: #9900ff;*/
  background-color: #0050aa;
  color: #ffcd55;
  text-align: center;
  font-size: 25px;
}

.formBiblio {
  margin-top: 25%;
  width: 100%;
  height: 45%;
}

.select {
  display: flex;
  padding-left: 11%;
}

select {
  width: 33%;
  margin-left: 11%;
}

.formBiblio input,
.select {
  width: 80%;
  height: 10%;
  margin-top: 9%;
  margin-left: 0%;
}

.formBiblio input[type="submit"],
button {
  height: 50px;
  border-radius: 25px;
  background-color: #6ac2a7;
  color: black;
  margin-left: 40%;
  margin-top: 4vh;
  width: 100px;
  margin-left: 1vw;
}
</style>
