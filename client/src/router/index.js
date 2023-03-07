import { createRouter, createWebHistory } from 'vue-router'
import * as AuthMiddleware from "../middleware/authentification_and_authorization.js"

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/products',
    name: 'Products',
    component: () => import('../views/Products.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    beforeEnter: AuthMiddleware.isNotAuth,
    component: () => import('../views/Registration.vue')
  },
  {
    path: '/login',
    name: 'login',
    beforeEnter: AuthMiddleware.isNotAuth,
    component: () => import('../views/Login.vue')
  },
  {
    path: '/aboutus',
    name: 'AboutUs',
    component: () => import('../views/AboutUs.vue')
  },
  {
    path: '/proizvodi',
    name: 'Proizvodi',
    component: () => import('../views/Proizvodi.vue')
  },
  {
    path: '/usluge',
    name: 'Usluge',
    component: () => import('../views/Usluge.vue')
  },
  {
    path: '/dashboard',
    name: "Dashboard",
    beforeEnter: [AuthMiddleware.isAuth],
    component: () => import('../views/Dashboard.vue')
  },
  {
    path: '/nalozi',
    name: "Nalozi",
    beforeEnter: [AuthMiddleware.isAuth, AuthMiddleware.isAdmin],
    component: () => import('../views/UpravljanjeNalozima.vue')
  },
  {
    path: '/izmena',
    name: "Izmena",
    beforeEnter: [AuthMiddleware.isAuth, AuthMiddleware.isPotrosacOrPreduzece],
    component: () => import('../views/Izmena.vue')
  },
  {
    path: '/proizvod/:id',
    name: "PregledProizvod",
    component: () => import('../views/PregledProizvod.vue')
  },
  {
    path: '/usluge/:id',
    name: "PregledUsluge",
    component: () => import('../views/PregledUsluge.vue')
  },
  {
    path: '/preduzeca/:id',
    name: "Preduzeca",
    component: () => import('../views/Preduzeca.vue')
  },
  {
    path: '/buy-process',
    name: "BuyProcess",
    props: true,
    beforeEnter: [AuthMiddleware.isAuth, AuthMiddleware.isPotrosac],
    component: () => import('../views/BuyProcess.vue')
  },
  {
    path: "/dodavanje-naloga",
    name: "DodavanjeNaloga",
    beforeEnter: [AuthMiddleware.isAuth, AuthMiddleware.isAdmin],
    component: () => import("../views/DodavanjeNaloga.vue")
  },
  {
    path: "/izmena-naloga",
    name: "IzmenaNaloga",
    beforeEnter: [AuthMiddleware.isAuth, AuthMiddleware.isAdmin],
    component: () => import("../views/IzmeniNaloge.vue")
  },
  {
    path: "/izmeni-korisnike",
    name: "IzmenaKorisnika",
    beforeEnter: [AuthMiddleware.isAuth, AuthMiddleware.isAdmin],
    component: () => import("../views/IzmeniKorisnike.vue")
  },
  {
    path: "/brisanje-naloga",
    name: "BrisanjeNaloga",
    beforeEnter: [AuthMiddleware.isAuth, AuthMiddleware.isAdmin],
    component: () => import("../views/BrisanjeNaloga.vue")
  },
  {
    path: "/404",
    name: "Error404",
    component: () => import("../views/PageNotFound.vue")
  },
  {
    path: "/:catchAll(.*)",
    name: "PageNotFound",
    component: () => import("../views/PageNotFound.vue")
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(AuthMiddleware.getAuth);

export default router
