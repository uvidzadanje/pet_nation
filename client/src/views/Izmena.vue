<template>
    <div class="col-md-8 mx-auto">
      <IzmenaPreduzece v-if="tip==='preduzece'" />
      <IzmenaPotrosac v-if="tip==='potrosac'" />
    </div>
</template>

<script>
import IzmenaPreduzece from "../components/Izmena/IzmenaPreduzece.vue"
import IzmenaPotrosac from "../components/Izmena/IzmenaPotrosac.vue"

export default {
  components: {
    IzmenaPreduzece,
    IzmenaPotrosac
  },
    data() {
        return {
            tip: '',
        }
    },
    beforeMount() {
        this.tip = localStorage.getItem('type');
    },
}
</script>
