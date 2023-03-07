<template>
  <PotrosacDashboard v-if="type==='potrosac'" />
  <AdminDashboard v-else-if="type==='admin'" />
  <PreduzeceDashboard v-else-if="type==='preduzece'" />
</template>

<script>
import AdminDashboard from "./Dashboards/AdminDashboard.vue";
import PotrosacDashboard from "./Dashboards/potrosacDashboard.vue";
import PreduzeceDashboard from "./Dashboards/preduzeceDashboard.vue";

export default {
  name: "Dashboard",
  components: {
    AdminDashboard,
    PotrosacDashboard,
    PreduzeceDashboard,
  },
  data() {
    return {
      type: null
    }
  },
  beforeMount() {
    const type = localStorage.getItem("type");
    this.type = type;
  }
}
</script>
