<template>
  <div class="claseNuevoFondo">
    <span class="inicio">Nuevo fondo bilbiográfico</span>
    <form class="formNuevo" name="formNuevo" @submit="submit">
      <div class="select">
        <Select
          placeholder="Tipo Fondo"
          name="tipoFondo"
          value="Fondo"
          v-model="tipo"
        >
          <option value="Fondo" @click="setTipo('Fondo')">Fondo</option>
          <option value="Libro" @click="setTipo('Libro')">Libro</option>
          <option value="Revista" @click="setTipo('Revista')">Revista</option>
          <option value="Audiovisual" @click="setTipo('Audiovisual')">
            Audiovisual
          </option>
        </Select>

        <Select placeholder="Bibliobús" name="bibliobus">
          <option value="Bibliobus">Bibliobus</option>
          <option
            v-for="(biblio, bindex) in bibliobuses"
            :index="bindex"
            :key="bindex"
          >
            {{ biblio.numeroBiblioBus }}
          </option>
        </Select>
      </div>

      <div class="select" v-if="tipo != 'Fondo'">
        <Select placeholder="Soporte" name="soporte">
          <option value="Soporte">Soporte</option>
          <option
            v-for="(soporte, sindex) in soportes"
            :index="sindex"
            :key="sindex"
          >
            {{ soporte.tipo }}
          </option>
        </Select>
      </div>

      <input
        v-if="tipo != 'Fondo'"
        type="text"
        placeholder="Marca"
        name="marca"
      />

      <div v-if="tipo == 'Libro'">
        <input type="text" placeholder="Título" name="titulo" />
        <input type="text" placeholder="I.S.B.N." name="isbn" />
        <input type="text" placeholder="Autor" name="autor" />
        <input type="text" placeholder="Editorial" name="editorial" />
      </div>

      <div v-else-if="tipo == 'Revista'">
        <input type="text" placeholder="Nombre" name="nombre" />
        <input type="text" placeholder="Género." name="genero" />
        <input type="text" placeholder="Número." name="numero" />
      </div>

      <div v-else-if="tipo == 'Audiovisual'">
        <input type="text" placeholder="Título" name="titulo" />
        <input type="text" placeholder="Duracion" name="duracion" />
      </div>

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
      if (this.tipo == "Libro") {
        await axios
          .post("http://localhost:5000/Fondos/Libros", {
            marca: document.formNuevo.marca.value,
            autor: document.formNuevo.autor.value,
            ISBN: document.formNuevo.isbn.value,
            titulo: document.formNuevo.titulo.value,
            editorial: document.formNuevo.editorial.value,
            numerobibliobus: document.formNuevo.bibliobus.value,
            soporte: document.formNuevo.soporte.value,
          })
          .then((response) => {
            alert(response.data);
          });
      }
      if (this.tipo == "Revista") {
        await axios
          .post("http://localhost:5000/Fondos/Revistas", {
            marca: document.formNuevo.marca.value,
            nombre: document.formNuevo.nombre.value,
            genero: document.formNuevo.genero.value,
            numero: document.formNuevo.numero.value,
            soporte: document.formNuevo.soporte.value,
            numerobibliobus: document.formNuevo.bibliobus.value,
          })
          .then((response) => {
            alert(response.data);
          });
      }
      if (this.tipo == "Audiovisual") {
        await axios
          .post("http://localhost:5000/Fondos/ImagenSonido", {
            marca: document.formNuevo.marca.value,
            titulo: document.formNuevo.titulo.value,
            duracion: document.formNuevo.duracion.value,
            soporte: document.formNuevo.soporte.value,
            numerobibliobus: document.formNuevo.bibliobus.value,
          })
          .then((response) => {
            alert(response.data);
          });
      }
      this.cerrar();
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
.claseNuevoFondo {
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

.formNuevo {
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

.formNuevo input,
.select {
  width: 80%;
  height: 10%;
  margin-top: 9%;
  margin-left: 0%;
}

.formNuevo input[type="submit"],
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
