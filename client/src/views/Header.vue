<template>
    <Navbar :key="$route.fullPath"/>
</template>


<script>
import Sidebar from '../components/Sidebar.vue'
import Navbar from '../components/Navbar.vue'

export default {
  components: {
    Sidebar,
    Navbar
},
  data () {
    return {
      showSidebar: false,
      cart: {}
    }
  },
  computed: {
    totalQuantity () {
      return Object.values(this.cart).length;
    }
  },
  methods: {
    addToCart (proizvod) {
      this.cart[proizvod.id] = proizvod;
    },
    toggleSidebar () {
      this.showSidebar = !this.showSidebar
    },
    removeItem (id) {
      delete this.cart[id]
    }
  },
  beforeMount()
  {
    this.emitter.on("dodavanjeUKorpu", (proizvod) => {
      this.addToCart(proizvod);
    })
    this.emitter.on("clearCart", () => {
      for(const el of Object.getOwnPropertyNames(this.cart))
      {
        delete this.cart[el];
      }
    })
  }
}
</script>
