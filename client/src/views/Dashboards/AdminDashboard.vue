<template>
  <div>
    <div class="bg-light d-flex justify-content-center">
      <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item" role="presentation">
          <button class="nav-link active" id="info-tab" data-bs-toggle="tab" data-bs-target="#info" type="button" role="tab" aria-controls="info" aria-selected="true">Info</button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link" id="proizvodi-tab" data-bs-toggle="tab" data-bs-target="#proizvodi" type="button" role="tab" aria-controls="proizvodi" aria-selected="false">Proizvodi</button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link" id="usluge-tab" data-bs-toggle="tab" data-bs-target="#usluge" type="button" role="tab" aria-controls="usluge" aria-selected="false">Usluge</button>
        </li>
         <li class="nav-item" role="presentation">
          <button class="nav-link" id="korpe-tab" data-bs-toggle="tab" data-bs-target="#korpe" type="button" role="tab" aria-controls="korpe" aria-selected="false">Korpe</button>
        </li>
         <li class="nav-item" role="presentation">
          <button class="nav-link" id="zakazivanja-tab" data-bs-toggle="tab" data-bs-target="#zakazivanja" type="button" role="tab" aria-controls="zakazivanja" aria-selected="false">Zakazivanja</button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link" id="kategorije-tab" data-bs-toggle="tab" data-bs-target="#kategorije" type="button" role="tab" aria-controls="kategorije" aria-selected="false">Kategorije</button>
        </li>
      </ul>
    </div>

    <div class="tab-content" id="myTabContent">
      <div class="tab-pane fade show active" id="info" role="tabpanel" aria-labelledby="info-tab">
        <div v-if="!korisnici || !korisnici.length">
          <h3>Trenutno nema nijednog korisnika</h3>
        </div>
        <div v-else>
          <div class="col-md-6 mx-auto" v-for="korisnik in korisnici" :key="korisnik.id">
            <ListUserCard :user="korisnik" />
          </div>
        </div>
      </div>

      <div class="tab-pane fade" id="proizvodi" role="tabpanel" aria-labelledby="proizvodi-tab">
        <div v-if="!proizvodi || !proizvodi.length" class="col-md-6 mx-auto">
          <h3 class="text-center">Trenutno nema nijednog proizvoda</h3>
        </div>
        <div v-else>
          <div class="col-md-6 mx-auto" v-for="proizvod in proizvodi" :key="proizvod.id">
            <ListProizvodCard :proizvod="proizvod" :iskljuciDugmici="true"/>
          </div>
        </div>
      </div>
      <div class="tab-pane fade" id="usluge" role="tabpanel" aria-labelledby="usluge-tab">
      <div v-if="!usluge || !usluge.length" class="col-md-6 mx-auto">
        <h3 class="text-center">Trenutno nema nijedne usluge</h3>
      </div>
      <div v-else>
        <div class="col-md-6 mx-auto" v-for="usluga in usluge" :key="usluga.id">
          <ListUslugaCard :usluga="usluga" />
        </div>
      </div>
    </div>

    <div class="tab-pane fade" id="korpe" role="tabpanel" aria-labelledby="korpe-tab">
      <div v-if="!korpe || !korpe.length">
        <h3>Trenutno nema nijedne korpe</h3>
      </div>
      <div v-else>
        <div class="col-md-8 mx-auto" v-for="korpa in korpe" :key="korpa.id">
          <CartCard :korpa="korpa" />
        </div>
      </div>
    </div>

    <div class="tab-pane fade" id="zakazivanja" role="tabpanel" aria-labelledby="zakazivanja-tab">
      <div v-if="!zakazivanja || !zakazivanja.length" class="col-md-8 mx-auto">
          <h3 class="text-center">Trenutno nema nijednog zakazivanja</h3>
        </div>
        <div v-else>
          <div class="col-md-8 mx-auto" v-for="zakazivanje in zakazivanja" :key="zakazivanje.id">
            <ListZakazivanjeCard :zakazano="zakazivanje" />
          </div>
        </div>
      </div>
      <div class="tab-pane fade" id="kategorije" role="tabpanel" aria-labelledby="kategorije-tab">
        <Kategorije :kategorije="kategorije" />
      </div>
    </div>
    </div>
</template>

<script>
import axios from 'axios';
import ListProizvodCard from "../../components/Cards/ListProizvodCard.vue";
import ListUslugaCard from "../../components/Cards/ListUslugaCard.vue";
import ListUserCard from "../../components/Cards/Admin/ListUserCard.vue";
import CartCard from "../../components/Cards/CartCard.vue";
import ListZakazivanjeCard from "../../components/Cards/ListZakazivanjeCard.vue";
import Kategorije from "../../components/Cards/Admin/Kategorije.vue"

export default {
  name: "AdminDashboard",
  components: {
    ListUserCard,
    ListProizvodCard,
    ListUslugaCard,
    ListZakazivanjeCard,
    CartCard,
    Kategorije
  },
  data() {
    return {
      proizvodi: [],
      usluge: [],
      korisnici: [],
      zakazivanja: [],
      korpe: [],
      kategorije: [],
    }
  },
  methods: {

  },
  async mounted() {
    try {
      const korisnici = (await axios.get("/users/")).data.data;
      this.korisnici = korisnici;

      const proizvodi = (await axios.get("/proizvodi/")).data.data.proizvodi;
      this.proizvodi = proizvodi;

      const usluge = (await axios.get("/usluge/")).data.data.usluge;
      this.usluge = usluge;

      const korpe = (await axios.get("/korpe/")).data.data;
      this.korpe = korpe;

      const zakazivanja = (await axios.get("/zakazivanja/")).data.data;
      this.zakazivanja = zakazivanja;

      const kategorije = (await axios.get("/kategorije/root")).data.data;
      this.kategorije = kategorije;
    } catch (error) {
      if(error.response) alert(error.response.data.error.message);
    }
  }
}
</script>
