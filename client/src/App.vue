<template>
  <div id="app">
    <Header :key="$route.fullPath"/>
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Header from './views/Header.vue';
import Footer from './views/Footer.vue';

import axios from 'axios'
export default {
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      logovan: false,
      isAdmin: false
    }
  },
  async mounted() {
    try
    {
      const response = await axios.get("/users/user/auth");
      const auth = response.data.data;
      if(!auth.isAuthentificated) throw new Error("Losa autentifikacija");
      localStorage.setItem("toglogovan", auth.isAuthentificated);
      localStorage.setItem("type", auth.type);
      localStorage.setItem("id", auth.id);

      this.logovan = localStorage.getItem('toglogovan') === 'true';
      this.emitter.emit("toglogovan", this.logovan);
      this.isAdmin = localStorage.getItem('type')==='admin';
      this.emitter.emit("togAdmin", this.isAdmin);
    }
    catch(error)
    {
      localStorage.removeItem("toglogovan");
      localStorage.removeItem("type");
      localStorage.removeItem("id");
    }
  }
}
</script>

<style>

</style>
