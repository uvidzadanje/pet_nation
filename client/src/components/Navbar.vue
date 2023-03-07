<template>
    <nav class="navbar navbar-expand-lg nav-text bg-navbar-color">
      <div class="container-fluid">
        <a class="navbar-brand"><img class="brand-size" src="../assets/img/logo.png" alt=""></a>
        <button class="navbar-toggler navbar-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon nav-text"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
           <ul class="navbar-nav">
             <li class="nav-item">
                <router-link to="/" class="nav-link nav-text">
                  <span>Home</span>
                </router-link>
             </li>
              <li class="nav-item dropdown">
                <a class="nav-link nav-text dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <span>Kupovina</span>
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <router-link to="/proizvodi" class="dropdown-item nav-text"><span>Proizvodi</span></router-link>
                    <router-link to="/usluge" class="dropdown-item nav-text"><span>Usluge</span></router-link>
                </div>
              </li>
              <li class="nav-item">
                <router-link to="/aboutus" class="nav-link nav-text">
                  <span>O Nama</span>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/dashboard" class="nav-link nav-text" v-bind:class="{ registerr : !logovan }">
                  <span>Dashboard</span>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/nalozi" class="nav-link nav-text" v-bind:class="{ registerr : !isAdmin}">
                  <span>Upravljaj Nalozima</span>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/izmena" class="nav-link nav-text" v-bind:class="{ registerr : korisnik() }">
                <span>Upravljaj Podacima</span>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/login" class="nav-link nav-text" v-bind:class="{ registerr : logovan }">
                  <span>Prijavljivanje</span>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/signup" class="nav-link nav-text" v-bind:class="{ registerr : logovan }">
                  <span>Registrovanje</span>
                </router-link>
              </li>
              <li class="nav-item">
                <a href="#" v-on:click="logoutUser()" class="nav-link nav-text" v-bind:class="{ registerr : !logovan }">
                  <span>Izloguj se</span>
                </a>
              </li>
           </ul>
           <ul class="navbar-nav ms-auto" v-if="$route.name !== 'BuyProcess'">
             <li class="nav-item">
                <a @click="toggleSidebar" class="nav-link nav-text">
                  <i class="icofont-cart-alt icofont-1x"></i>
                  <span>Cart ({{ totalQuantity }})</span>
                </a>
              </li>
           </ul>
        </div>
      </div>
    </nav>

    <Transition name="slide-fade">
      <Sidebar
        v-if="showSidebar"
        :toggle="toggleSidebar"
        :cart="cart"
        :remove="removeItem"
        :incKolicina="incKolicina"
        :decKolicina="decKolicina"
      />
    </Transition>
</template>

<script>
import axios from 'axios'
import router from '../router/index.js'
import Sidebar from "../components/Sidebar.vue"

export default {
  name: "Navbar",
  components: {
    Sidebar
  },
  data() {
    return {
      logovan: false,
      active: false,
      isAdmin: false,
      showSidebar: false,
      cart: {}
    };
  },
  methods: {
        async logoutUser() {
            try {
              let result = await axios.post("/users/user/logout/")
                alert("Uspesno izlogovan");
                this.logovan = false;
                this.emitter.emit("toglogovan", this.logovan);
                this.emitter.emit("togAdmin", false);

                localStorage.clear();
                this.emitter.emit("clearCart");
                router.push({path: "/"});
            }catch (error) {
              if(error.response) alert(error.response.data.error.message);
            }


        },
        toggle () {
        this.active = !this.active
      },
      korisnik(){
        if(this.isAdmin === false && this.logovan === true){
          return false;
        }
        else return true;
      },
      addToCart (proizvod) {
        this.cart[proizvod.id] = proizvod;
        localStorage.setItem("cart", JSON.stringify(this.cart));
      },
      toggleSidebar () {
        this.showSidebar = !this.showSidebar
      },
      removeItem (id) {
        delete this.cart[id]
        localStorage.setItem("cart", JSON.stringify(this.cart));
      },
      incKolicina(id) {
        this.cart[id].kolicina++;
        localStorage.setItem("cart", JSON.stringify(this.cart));
      },
      decKolicina(id) {
        if(this.cart[id].kolicina === 1) return;
        this.cart[id].kolicina--;
        localStorage.setItem("cart", JSON.stringify(this.cart));
      }
    },

  mounted() {
    if(localStorage.getItem("cart")) this.cart = JSON.parse(localStorage.getItem("cart"));
      this.emitter.on("toglogovan", logovana => {
        this.logovan = logovana;
      }),
      this.emitter.on("togAdmin", isAdminTog => {
        this.isAdmin = isAdminTog;
      })
      this.emitter.on("dodavanjeUKorpu", (proizvod) => {
        this.addToCart(proizvod);
      })
      this.emitter.on("clearCart", () => {
        for(const el of Object.getOwnPropertyNames(this.cart))
        {
          delete this.cart[el];
        }
        localStorage.removeItem("cart");
      })

    this.emitter.emit("toglogovan", localStorage.getItem("toglogovan") === "true");
    this.emitter.emit("togAdmin", localStorage.getItem("type") === 'admin');
  },
  computed: {
    totalQuantity () {
      return Object.values(this.cart).length;
    }
  },
}

</script>
