<template>
    <div class="card mb-5 card-color mx-auto">
      <div class="input-group d-flex flex-column p-4">
        <legend class="text-center">Kategorije</legend>
        <div v-for="kategorija in kategorije" :key="kategorija.id" class="input-group">
            <label class="form-check-label">{{ kategorija.naziv }}</label>
            <div v-for="podKategorija in kategorija.Kategorijas" :key="podKategorija.id" class="input-group">
              <input type="checkbox" :value="podKategorija.id" :id="podKategorija.naziv" v-model="izabraneKategorije" class="form-check-input">
              <label :for="podKategorija.naziv" class="form-check-label">{{ podKategorija.naziv }}</label>
            </div>
        </div>
      </div>

      <fieldset class="input-group d-flex justify-content-center mb-3 p-4">
        <legend class="text-center">Lokacija</legend>
        <input type="text" v-model="lokacija" class="form-control">
      </fieldset>

      <fieldset class="input-group d-flex justify-content-center mb-3 gap-2">
          <legend class="text-center">Opseg cena</legend>
          <div class="col-md-4">
              <label for="minCena" class="form-label">Min. cena</label>
              <input type="number" name="minCena" step="any" v-model.number="minCena" class="form-control">
          </div>
          <div class="col-md-4">
              <label for="maxCena" class="form-label">Max. cena</label>
              <input type="number" name="maxCena" step="any"  v-model.number="maxCena" class="form-control">
          </div>
      </fieldset>

      <fieldset class="input-group d-flex justify-content-center mb-3">
          <legend class="text-center">Ocena</legend>
          <Rating @vrednost="uzmiVrednost" ref="rating_component" :value="0"/>
      </fieldset>

      <div class="input-group d-flex justify-content-center mb-3">
          <button class="btn btn-primary" @click="filterOut">
              Primeni filtere
          </button>
      </div>

    </div>
</template>

<script>
import axios from "axios";
import Rating from '../rating.vue';

export default {
    name: 'FilterUsluge',
    components: {
        Rating,
    },
    data() {
        return {
            kategorije: null,
            errorMsg: '',
            izabraneKategorije: [],
            maxCena: 100000,
            minCena: 0,
            rating: null,
            lokacija: ""
        }
    },
    async mounted() {
        axios.get('/kategorije/2')
            .then((response) => {
                this.kategorije = response.data.data
            })
            .catch((error) => {

            })
    },
    methods: {
        uzmiVrednost(value) {
            this.rating=value;
        },
        filterOut() {
            this.rating=this.$refs.rating_component.value

            let parameters = ''

            parameters += `avg_ocena=${this.rating}&`

            if(this.minCena>this.maxCena)
            {
                alert('Minimalna cena mora biti manja od maksimalne!')
                return
            }
            parameters += `min_price=${this.minCena}&max_price=${this.maxCena}&`
            if(this.lokacija) parameters += `lokacija=${this.lokacija}&`
            this.izabraneKategorije.forEach(element => {
                parameters += `kategorija_id=${element}&`
            });
            this.$emit('filter_usluga', parameters)
        }
    }
}
</script>
