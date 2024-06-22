<template>
  <div class="registro">
    <div class="marco"></div>
    <Modifica
      v-show="ver"
      :persona="persona"
      :poblaciones="poblaciones"
      @cierra="cerrar()"
    ></Modifica>
  </div>
</template>

<script>
import Modifica from "../components/Modifica";
import axios from "axios";
export default {
  name: "vistaRegistro",
  components: {
    Modifica,
  },
  data: () => ({
    persona: Object,
    poblaciones: [],
    ver: "false",
  }),
  mounted() {
    this.basePoblaciones();
  },
  methods: {
    async basePoblaciones() {
      await axios
        .get("http://localhost:5000/Poblaciones", {})
        .then((response) => {
          console.log(response.data);
          this.poblaciones = response.data;
        });
      this.ver = "true";
    },
    cerrar() {
      localStorage.clear();
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.registro {
  background-image: url(../assets/registro.jpg);
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
</style>
