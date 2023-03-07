<template>
    <div>
        <div class="bg-light d-flex justify-content-center">
            <ul class="nav nav-tabs" id="myTab" role="tablist">
              <li class="nav-item" role="presentation">
                <button class="nav-link active" id="info-tab" data-bs-toggle="tab" data-bs-target="#info" type="button" role="tab" aria-controls="info" aria-selected="true">Info</button>
              </li>
              <li class="nav-item" role="presentation">
                <button class="nav-link" id="korpe-tab" data-bs-toggle="tab" data-bs-target="#korpe" type="button" role="tab" aria-controls="korpe" aria-selected="false">Korpe</button>
              </li>
              <li class="nav-item" role="presentation">
                <button class="nav-link" id="zakazivanja-tab" data-bs-toggle="tab" data-bs-target="#zakazivanja" type="button" role="tab" aria-controls="zakazivanja" aria-selected="false">Zakazivanja</button>
              </li>
            </ul>
        </div>

        <div class="tab-content" id="myTabContent">
        <div class="tab-pane fade show active" id="info" role="tabpanel" aria-labelledby="info-tab">
            <div class="col-md-6 mx-auto">
                <InfoPotrosac :korisnik="this.korisnik" />
            </div>
        </div>

        <div class="tab-pane fade" id="korpe" role="tabpanel" aria-labelledby="korpe-tab">
          <div class="col-md-8 mx-auto">
            <h3 v-if="!korpe || !korpe.length" class="text-center">Trenutno ne postoji nijedna korpa</h3>
            <CartCard :korpa="korpa" v-else v-for="korpa in korpe" :key="korpa.id"/>
          </div>
        </div>

        <div class="tab-pane fade" id="zakazivanja" role="tabpanel" aria-labelledby="zakazivanja-tab">
          <div class="col-md-8 mx-auto">
            <h3 v-if="!zakazivanja || !zakazivanja.length" class="text-center">Trenutno ne postoji nijedno zakazivanje</h3>
            <ListZakazivanjeCard :zakazano="zakazano" v-else v-for="zakazano in zakazivanja" :key="zakazano.id"/>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import axios from 'axios'
import CartCard from '../../components/Cards/CartCard.vue'
import ListZakazivanjeCard from '../../components/Cards/ListZakazivanjeCard.vue'
import InfoPotrosac from '../../components/Cards/Potrosac/InfoPotrosac.vue'

export default {
    name: 'potrosacDashboard',
    components: {
        CartCard,
        ListZakazivanjeCard,
        InfoPotrosac
    },
    data() {
        return {
            korisnik: {},
            korpe: {},
            zakazivanja: [],
        }
    },
    beforeMount() {
        axios.get('/potrosaci/potrosac/')
            .then((response) => {
                this.korisnik = response.data.data.potrosac;
            })
            .catch((error) => {

            });

        axios.get('/korpe/potrosac')
            .then((response) => {
                this.korpe = response.data.data.korpe
            })
            .catch((error) => {

            });
        axios.get('/zakazivanja/potrosac')
            .then((response) => {
                this.zakazivanja = response.data.data.zakazivanja
            })
            .catch((error) => {

            })
    },
    methods: {
    }
}
</script>
