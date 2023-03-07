<template>
  <div class="card col-lg-5 me-lg-auto card-color">

    <div class="card-body">
      <h5 class="card-title text-center">
        <router-link :to="'/proizvod/' + product.id" class="text-decoration-none text-reset">
            {{ product.Stavka.naziv }}
        </router-link>
      </h5>

      <div class="card-img-top">
        <router-link :to="'/proizvod/' + product.id" class="d-flex justify-content-center">
          <div>
            <img class="img-thumbnail rounded" :src="product.Stavka.StavkaSlikas[0]?product.Stavka.StavkaSlikas[0].slika_link:'/uploads/noPic.png'" alt="Nema Slika">
          </div>
        </router-link>
      </div>
      <div>
          <p class="card-text">Cena: {{ product.cena.toFixed(2) }} RSD</p>
      </div>
      <div>
          <p>Prosecna ocena: {{ product.avg_ocena ? product.avg_ocena.toFixed(2) : 'neocenjen' }}</p>
      </div>
      <div class="input-group mb-3 mt-auto">
        <span class="input-group-text">Kolicina</span>
        <input type="number" v-model.number="kolicina" class="form-control" min="1">
        <button @click="dodajUKorpu" class="btn btn-primary mx-auto mt-2">
          Dodaj u korpu
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['product', 'index', 'addToCart'],
  data () {
    return {
      kolicina: 1
    }
  },
  methods: {
    dodajUKorpu()
    {
      this.emitter.emit("dodavanjeUKorpu", {id: this.product.id, naziv: this.product.Stavka.naziv, kolicina: this.kolicina, cena: this.product.cena});
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
