import { createRouter, createWebHistory } from "vue-router";
import Principal from "../views/VistaPrincipal.vue";
import Administrador from "../views/VistaAdministrador.vue";
import Conductor from "../views/VistaConductor.vue";
import Cliente from "../views/VistaCliente.vue";
import Registro from "../views/VistaRegistro.vue";

const routes = [
  {
    path: "/",
    name: "/",
    component: Principal,
  },
  {
    path: "/admin",
    name: "admin",
    component: Administrador,
  },
  {
    path: "/conductor",
    name: "conductor",
    component: Conductor,
  },
  {
    path: "/cliente",
    name: "cliente",
    component: Cliente,
  },
  {
    path: "/registro",
    name: "registro",
    component: Registro,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
