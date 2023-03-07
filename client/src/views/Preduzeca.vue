<template>
        <div class="card col-md-6 mx-auto mt-5 mb-3 card-color">
          <div class="card-body">
            <h2 class="card-text">Informacije preduzeća</h2>
            <div class="d-flex flex-wrap">
              <div class="col-md-3 mx-auto">
                <div class="d-flex flex-column">
                  <img class="picture" :src="preduzece.profilna_slika_link" :alt="preduzece.profilna_slika_link">
                </div>
              </div>
              <div class="col-md-9 card-body">
                <rating :value="preduzece.avg_ocena?preduzece.avg_ocena:0" :disabled="true"/>
                <div class="row">
                  <p class="h6">Naziv: {{preduzece.naziv}}</p>
                </div>
                <div class="row">
                  <p class="h6">Lokacija: {{preduzece.lokacija}}</p>
                </div>
                <div class="row" v-if="preduzece.User">
                  <p class="h6">Email: {{ preduzece.User.email }}</p>
                </div>
              </div>
            </div>
            <div class="row mt-3 mb-3" v-if="type === 'potrosac'">
              <div class="d-flex flex-wrap align-items-center justify-content-center">
                <span class="h5">Vasa ocena:</span>
                <rating :value="potrosacOcena?potrosacOcena.ocena: 0 "  :disabled="false"/>
                <button class="btn btn-primary" @click="changeOcena">Promeni ocenu</button>
              </div>
            </div>
            <div class="row">
              <p class="fw-bold">{{ preduzece.opis }}</p>
            </div>
          </div>
        </div>
</template>

<script>
import axios from 'axios'
import router from "../router/index.js"
import rating from '../components/Filteri/rating.vue'

export default {
    name: 'Preduzece',
    components: {
        rating,
    },
    data() {
        return {
            preduzece: {},
            type: "",

            potrosacOcena: null,
            ocena: null,
        }
    },
    beforeMount() {
        this.type = localStorage.getItem("type");
        this.emitter.on('dajVrednost', value => {
          this.ocena=value
        })
        axios.get('/preduzeca/preduzece/' + this.$route.params.id)
            .then((response) => {
                this.preduzece = response.data.data
            })
            .then(()=>{
              if(this.type === 'potrosac')
              {
                axios.get('/ocene-preduzece/ocena/preduzece/' + this.preduzece.id)
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
    methods:{
        promeniOcenu() {
            axios.put('/ocene-preduzece/ocena/', {
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
          axios.post('/ocene-preduzece/ocena/', {
              ocena: this.ocena,
              preduzece_id: this.preduzece.id
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
          axios.get('/ocene-preduzece/ocena/preduzece/' + this.preduzece.id)
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
    }
}
</script>

<style>
.rating {
    background-color: white;
}
</style>
