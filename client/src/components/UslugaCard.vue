<template>
  <div class="card col-md-5 me-lg-auto card-color">
    <div class="card-body">
      <h5 class="card-title text-center">
        <router-link :to="'/usluge/' + usluga.id" class="text-decoration-none text-reset">
          {{ usluga.Stavka.naziv }}
        </router-link>
      </h5>

      <div class="card-img-top">
        <router-link :to="'/usluge/' + usluga.id" class="text-decoration-none text-reset">
          <img class="img-thumbnail rounded" :src="usluga.Stavka.StavkaSlikas.length>0?usluga.Stavka.StavkaSlikas[0].slika_link:'/uploads/noPic.png'" alt="Nema Slika">
        </router-link>
      </div>
      <div>
        <p class="card-text">Cena po satu: ${{ usluga.cena_po_satu }}</p>
      </div>

      <div>
        <p class="card-text">Prosecna ocena: {{ usluga.avg_ocena === null ? usluga.avg_ocena = 0: usluga.avg_ocena }}</p>
      </div>
    </div>
  </div>

</template>

<script>
import modal from "../components/modalUsluga.vue"

export default {
  name: "Usluge",
  components: {
    modal
  },
  props: ['usluga', 'index', 'addToCart'],
  data () {
    return {
    }
  }
}
</script>


<style>
.picture{
  width: 100px;
  height: 100px;
}
</style>
