<template>
    <div v-if="usluga.Stavka" class="card col-md-6 mx-auto mt-5 mb-3 card-color">
        <div class="card-body">
          <p class="h1">{{ usluga.Stavka.naziv }}</p>
          <div class="d-flex flex-wrap">
            <div class="col-md-3 mx-auto">
              <div class="d-flex flex-column">
                <img class="img-thumbnail"
                :src="usluga.Stavka.StavkaSlikas.length>0?usluga.Stavka.StavkaSlikas[0].slika_link:'/uploads/noPic.png'"
                :alt="usluga.Stavka.StavkaSlikas.length>0?usluga.Stavka.StavkaSlikas[0].slika_link:'/uploads/noPic.png'">
              </div>
              <viewer :images="images" v-if="images && images.length > 0" class="d-flex gap-1 mt-2 flex-wrap">
                <img v-for="image in images" :key="image.id" :src="image.slika_link" width="50" class="border border-1">
              </viewer>
            </div>
            <div class="col-md-9 card-body">
              <rating :value="usluga.avg_ocena === null ? usluga.avg_ocena = 0 : usluga.avg_ocena" :disabled="true"/>
              <div class="row">
                <p class="text-danger h6">Cena po satu: {{ usluga.cena_po_satu }}</p>
              </div>
              <div class="row">
                <p class="h6">Preduzeće:
                  <router-link :to="'/preduzeca/' + usluga.Stavka.preduzece_id">
                    {{ usluga.Stavka.Preduzece.naziv }}
                  </router-link>
                </p>
              </div>
              <div class="row">
                <p class="h6">Lokacija: {{ usluga.Stavka.Preduzece.lokacija }}</p>
              </div>
              <div class="row">
                <modal :uslugaID="usluga.id" />
              </div>
            </div>
          </div>
          <div class="row mt-3 mb-3" v-if="type === 'potrosac'">
            <div class="d-flex flex-wrap align-items-center justify-content-center">
              <span class="h5">Vasa ocena:</span>
              <rating :value="this.potrosacOcena?this.potrosacOcena.ocena: 0 "  :disabled="ne_radi" />
              <button class="btn btn-primary" @click="changeOcena">Promeni ocenu</button>
            </div>
          </div>
          <div class="row">
            <p class="fw-bold">{{ usluga.Stavka.opis }}</p>
        </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import router from "../router/index.js"
import rating from '../components/Filteri/rating.vue'
import modal from '../components/modalUsluga.vue'

export default {
    name: 'Usluge',
    components: {
        rating,
        modal,
    },
    data() {
        return {
            usluga: {},
            potrosacOcena: null,
            ocena: null,
            ne_radi: false,
            images: [],
            type: "",
        }
    },
    beforeMount() {
      this.type = localStorage.getItem("type");
        this.emitter.on('dajVrednost', value => {
            this.ocena=value
        })
        axios.get('/usluge/usluga/' + this.$route.params.id)
            .then((response) => {
              this.usluga = response.data.data
            }).
            then((response) => {
              axios.get("/stavka-slike/stavka/"+this.usluga.Stavka.id)
              .then((response) => {
                this.images = response.data.data.slike;
              })
              .catch((error) => {
                if(error.response) alert(error.response.data.error.message);
              })
            })
            .then(()=>{
              if(this.type !== "potrosac") return;
              axios.get('/ocene-stavka/ocena/stavka/' + this.usluga.Stavka.id)
              .then((response) => {
                  this.potrosacOcena = response.data.data.ocena
              })
              .catch((error) => {
                  this.potrosacOcena = null
              })
            })
            .catch((error) => {
              console.log(error);
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
                stavka_id: this.usluga.Stavka.id
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
          axios.get('/ocene-stavka/ocena/stavka/' + this.usluga.Stavka.id)
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
        }
    }
}
</script>
