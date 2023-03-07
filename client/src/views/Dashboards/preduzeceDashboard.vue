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
            </ul>
        </div>

        <div class="tab-content" id="myTabContent">
          <div class="tab-pane fade show active" id="info" role="tabpanel" aria-labelledby="info-tab">
            <div class="col-md-6 mx-auto">
                <InfoPreduzece :preduzece="this.preduzece" />
            </div>
          </div>

            <div class="tab-pane fade" id="proizvodi" role="tabpanel" aria-labelledby="proizvodi-tab">
                <div class="row">
                    <DodajProizvod />
                </div>
                <div class="col-md-6 mx-auto" >
                  <h3 v-if="!proizvodi || !proizvodi.length" class="text-center">Trenutno ne postoji nijedan proizvod</h3>
                  <ListProizvodCard :proizvod="proizvod" :iskljuciDugmici="true" v-else v-for="proizvod in proizvodi" :key="proizvod.id"/>
                </div>
            </div>

          <div class="tab-pane fade" id="usluge" role="tabpanel" aria-labelledby="usluge-tab">
            <div class="row">
                <DodajUslugu />
            </div>
              <div class="col-md-6 mx-auto">
                <h3 v-if="!usluge || !usluge.length" class="text-center">Trenutno ne postoji nijedna usluga</h3>
                <ListUslugaCard :usluga="usluga" v-else v-for="usluga in usluge" :key="usluga.id"/>
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
import ListProizvodCard from '../../components/Cards/ListProizvodCard.vue';
import ListUslugaCard from '../../components/Cards/ListUslugaCard.vue';
import CartCard from '../../components/Cards/CartCard.vue';
import ListZakazivanjeCard from '../../components/Cards/ListZakazivanjeCard.vue';
import DodajProizvod from '../../components/Cards/Preduzece/DodajProizvod/DodajProizvod.vue';
import IzmeniProizvod from '../../components/Cards/Preduzece/IzmeniProizvod.vue';
import DodajUslugu from '../../components/Cards/Preduzece/DodajUslugu/DodajUslugu.vue';
import InfoPreduzece from '../../components/Cards/Preduzece/InfoPreduzece.vue';

export default {
    name: 'preduzeceDashboard',
    components: {
        ListUslugaCard,
        ListProizvodCard,
        CartCard,
        ListZakazivanjeCard,
        DodajProizvod,
        IzmeniProizvod,
        DodajUslugu,
        InfoPreduzece
    },
    data() {
        return {
            preduzece: {},
            proizvodi: {},
            usluge: {},
            korpe: {},
            zakazivanja: {},
        }
    },
    methods: {
        show(evt, izabraniTab) {
            var i, tabcontent, tablinks;
            tabcontent = document.getElementsByClassName("tabcontent");
            for (i = 0; i < tabcontent.length; i++) {
                tabcontent[i].style.display = "none";
            }
            tablinks = document.getElementsByClassName("tablinks");
            for (i = 0; i < tablinks.length; i++) {
                tablinks[i].className = tablinks[i].className.replace(" active", "");
            }
            document.getElementById(izabraniTab).style.display = "block";
            evt.currentTarget.className += " active";
        }
    },
    beforeCreate() {
      this.emitter.on("refreshProizvodi", (proizvod) => {
        this.proizvodi.push(proizvod);
      })
      this.emitter.on("refreshUsluge", (usluga) => {
        this.usluge.push(usluga);
      })
        axios.get('/preduzeca/preduzece/')
            .then((response) => {
                this.preduzece = response.data.data.preduzece;
            })
            .catch((error) => {

            });
        axios.get('/proizvodi/preduzece')
            .then((response) => {
                this.proizvodi = response.data.data.proizvodi;
            })
            .catch((error) => {

            });
        axios.get('/usluge/preduzece')
            .then((response) => {
                this.usluge = response.data.data.usluge
            })
            .catch((error) => {

            });
        axios.get('/korpe/preduzece')
            .then((response) => {
                this.korpe = response.data.data.korpe
            })
            .catch((error) => {

            });
        axios.get('/zakazivanja/preduzece')
            .then((response) => {
                this.zakazivanja = response.data.data.zakazivanja
            })
            .catch((error) => {

            })
    },
}
</script>
