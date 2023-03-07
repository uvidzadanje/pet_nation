<template>
    <div class="card-color" v-if="!obrisi">
      <div class="card-body">
        <div class="row">
          <div class="col-md-6">
            <span class="h4">Količina: <span v-if="!disabled">{{ kupovina.kolicina }}</span></span>
            <input type="number" min="1" v-model="kupovina.kolicina" v-if="disabled">
          </div>
          <div class="col-md-6">
            <div class="d-flex justify-content-end" v-if="type === 'potrosac' || type==='admin'">
                <button class="button buttonIzmeni" v-if="!disabled" v-on:click.prevent="ukljuciPromene()"></button>
                <button class="button buttonSacuvaj" v-if="disabled" v-on:click.prevent="sacuvajPromene()"></button>
                <button class="button buttonObrisi" v-on:click.prevent="obrisiKupovinu()"></button>
            </div>
          </div>
        </div>
      </div>
      <ListProizvodCard :proizvod="kupovina.Proizvod" :iskljuciDugmici="false"/>
    </div>
</template>

<script>
import ListProizvodCard from '../Cards/ListProizvodCard.vue'
import axios from 'axios'

export default {
    name: 'KupovinaCard',
    props: ['kupovina'],
    components: {
        ListProizvodCard
    },
    data(){
      return {
        type: null,
        disabled: false,
        obrisi: false,
      }
    },
    methods: {
      ukljuciPromene() {
        this.disabled = !this.disabled;
      },
      sacuvajPromene()
      {
        if (!this.kupovina.kolicina && isNaN(this.kupovina.kolicina)) {
          alert("Kolicina nije uneta ili nije broj!");
          return;
        }
        else {
          axios.put('/kupovine/kupovina/', {
              id: this.kupovina.id,
              kolicina: this.kupovina.kolicina
          })
          .then((response) => {
            this.disabled = !this.disabled
          })
          .catch((error) => {
            if(error.response) alert(error.response.data.error.message);
          })
        }
      },
      obrisiKupovinu() {
          axios.delete('/kupovine/kupovina/' + this.kupovina.id)
          .then((response) => {
            alert(response.data.data.message);
            this.obrisi = !this.obrisi;
          })
          .catch((error) => {
            if(error.response) alert(error.response.data.error.message);
          })
      },
    },
    beforeMount()
    {
      this.type = localStorage.getItem("type");
    }
}
</script>
