<template>
    <div v-if="proizvod.Stavka" class="card col-md-6 mx-auto mt-5 mb-3 card-color">
        <div class="card-body">
          <p class="h1">{{ proizvod.Stavka.naziv }}</p>
          <div class="d-flex flex-wrap">
            <div class="col-md-3 mx-auto">
                <div class="d-flex flex-column">
                  <img class="img-thumbnail"
                  :src="proizvod.Stavka.StavkaSlikas[0]?proizvod.Stavka.StavkaSlikas[0].slika_link:'/uploads/noPic.png'"
                  :alt="proizvod.Stavka.StavkaSlikas[0]?proizvod.Stavka.StavkaSlikas[0].slika_link:'/uploads/noPic.png'">
                </div>
                <viewer :images="images" v-if="images && images.length > 0" class="d-flex gap-1 mt-2 flex-wrap">
                    <img v-for="image in images" :key="image.id" :src="image.slika_link" width="50" class="border border-1">
                </viewer>
            </div>
            <div class="col-md-9 card-body">
              <rating :value="proizvod.avg_ocena" :disabled="true"/>
              <div class="row">
                <p class="text-danger h6">Cena: {{ proizvod.cena }} </p>
              </div>
              <div class="row">
                <p class="h6">Proizvođač: {{ proizvod.naziv_proizvodjaca }}</p>
              </div>
              <div class="row">
                  <div class="col">
                      <p class="h6">Zemlja porekla: {{ proizvod.zemlja_porekla }}</p>
                  </div>
              </div>
              <div class="row">
                <p>Preduzeće:
                  <router-link :to="'/preduzeca/' + proizvod.Stavka.preduzece_id">
                    {{ proizvod.Stavka.Preduzece.naziv }}
                  </router-link>
                </p>
              </div>
              <div class="row">
                <div class="input-group" style="max-width:210px">
                  <input type="number" v-model.number="kolicina" class="form-control"/>
                  <button class="btn btn-primary" @click="dodajuKorpu">Dodaj u korpu</button>
                </div>
              </div>
            </div>
          </div>
          <div class="row mt-3 mb-3" v-if="type === 'potrosac'">
            <div class="d-flex flex-wrap align-items-center justify-content-center">
              <span class="h5">Vaša ocena:</span>
              <rating :value="potrosacOcena?potrosacOcena.ocena: 0 "  :disabled="false" />
              <button class="btn btn-primary" @click="changeOcena">Promeni ocenu</button>
            </div>
          </div>
          <div class="row">
            <p class="fw-bold">{{ proizvod.Stavka.opis }}</p>
          </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import router from "../router/index.js"

import rating from '../components/Filteri/rating.vue'

export default {
    name: 'PregledProzivoda',
    components: {
        rating,
    },
    data() {
        return {
            proizvod: {},
            potrosacOcena: null,
            ocena: null,
            kolicina: 1,
            type: "",
            images: [],
        }
    },
    beforeMount() {
        this.type = localStorage.getItem("type");
        this.emitter.on('dajVrednost', value => {
            this.ocena=value
        })
        axios.get('/proizvodi/proizvod/' + this.$route.params.id)
            .then((response) => {
                this.proizvod = response.data.data
            })
            .then(() => {
              axios.get("/stavka-slike/stavka/"+this.proizvod.Stavka.id)
              .then((response) => {
                this.images = response.data.data.slike;
              })
              .catch((error) => {
                if(error.response) alert(error.response.data.error.message);
              })
            })
            .then(()=>{
              if(this.type === 'potrosac')
              {
                axios.get('/ocene-stavka/ocena/stavka/' + this.proizvod.Stavka.id)
                .then((response) => {
                    this.potrosacOcena = response.data.data.ocena
                })
                .catch((error) => {
                    this.potrosacOcena = null
                })
              }
            })
            .catch((error) => {
              if(error.response.status === 404) router.push({path: "/404"})
            })

    },
    methods: {
        promeniOcenu() {
            axios.put('/ocene-stavka/ocena/',{
                ocena: this.ocena,
                id: this.potrosacOcena.id
            })
            .then((response) => {
              this.getOcena();
              alert("Ocena promenjena")
            })
            .catch((error) => {
                if(error.response) alert(error.response.data.error.message);
            })
        },
        dodajOcenu() {
            axios.post('/ocene-stavka/ocena/', {
                ocena: this.ocena,
                stavka_id: this.proizvod.Stavka.id
            })
            .then(() => {
              this.getOcena();
              alert("Ocena dodata")
            })
            .catch((error) => {
              if(error.response) alert(error.response.data.error.message);
            })
        },
        getOcena()
        {
          axios.get('/ocene-stavka/ocena/stavka/' + this.proizvod.Stavka.id)
            .then((response) => {
                this.potrosacOcena = response.data.data.ocena
            })
            .catch((error) => {
                this.potrosacOcena = null
            })
        },
        changeOcena() {
            this.emitter.emit('getVrednost')
            if(!this.ocena)
            {
              alert("Ocena mora biti od 1 do 5!");
              return;
            }
            if(this.potrosacOcena)
                this.promeniOcenu()
            else
                this.dodajOcenu()
        },
        dodajuKorpu() {
          this.emitter.emit("dodavanjeUKorpu", {id: this.proizvod.id, naziv: this.proizvod.Stavka.naziv, kolicina: this.kolicina, cena: this.proizvod.cena});
        }
    }
}
</script>
