<template>
  <div class="border border-dark border-4 px-4 py-4 card-color mb-3 mt-3" v-if="zakazano.Usluga && !obrisi">
      <p class="h2 border-bottom border-dark border-2 mb-3">{{zakazano.Usluga.Stavka.naziv}}</p>
      <div class="row">
          <div class="col-md-6">
              <div class="row">
                  <p class="h3 border-bottom border-dark border-3">Informacije o usluzi</p>
              </div>
              <div class="row">
                  <div class="col-6">
                      <p>Zakazani datum:</p>
                      <p>Trajanje:</p>
                      <p v-if="!disabled">Opis usluge:</p>
                  </div>
                  <div class="col-6">
                    <input type="date" :min="new Date().toISOString().slice(0,10)" v-model="zakazano.datum_zakazivanja" v-if="disabled" class="form-control">
                      <p v-if="!disabled">{{new Date(zakazano.datum_zakazivanja).toLocaleDateString()}}</p>
                      <input type="number" min="1" max="8" v-if="disabled" v-model="zakazano.broj_sati" class="form-control">
                      <p v-if="!disabled">{{zakazano.broj_sati}} sat(i)</p>
                      <p v-if="!disabled">{{zakazano.Usluga.Stavka.opis}}</p>
                  </div>
              </div>
          </div>

          <div class="col-md-6">
              <div class="row">
                  <p class="h3 border-bottom border-dark border-3">Informacije o potrosacu</p>
              </div>
              <div class="row">
                  <div class="col-6">
                      <p>Puno ime:</p>
                      <p>Broj telefona:</p>
                      <p>E-mail:</p>
                  </div>
                  <div class="col-6" v-if="zakazano.Potrosac">
                      <p>{{zakazano.Potrosac.ime}} {{zakazano.Potrosac.prezime}}</p>
                      <p>{{zakazano.Potrosac.broj_telefona}}</p>
                      <p>{{zakazano.Potrosac.User.email}}</p>
                  </div>
              </div>
          </div>
      </div>
      <div class="row col-lg-3 d-flex justify-content-end mb-3" v-if="type !== 'preduzece'">
        <button class="button buttonIzmeni" v-if="!disabled" v-on:click.prevent="ukljuciPromene()"></button>

        <button class="button buttonSacuvaj" v-if="disabled" v-on:click.prevent="sacuvajIzmene()"></button>

        <button class="button buttonObrisi" v-on:click.prevent="obrisiZakazivanje()"></button>
      </div>
  </div>
</template>

<script>
import axios from "axios"

export default {
    name: 'ListUslugaCard',
    props: [ 'zakazano' ],
    data()
    {
      return{
        disabled: false,
        obrisi: false,

        type: null,
      }
    },
    methods: {
      ukljuciPromene() {
        this.disabled = !this.disabled;
      },
      obrisiZakazivanje() {
          axios.delete('/zakazivanja/zakazivanje/' + this.zakazano.id)
          .then((response) => {
            alert(response.data.data.message);
            this.obrisi = !this.obrisi;
          })
          .catch((error) => {
            if(error.response) alert(error.response.data.error.message);
          })
      },
      sacuvajIzmene() {
          if (!this.zakazano.datum_zakazivanja || !this.zakazano.broj_sati) {
            alert("Popunite sva polja");
            return;
          }
          else {
            axios.put('/zakazivanja/zakazivanje/', {
                id: this.zakazano.id,
                datum_zakazivanja: this.zakazano.datum_zakazivanja,
                broj_sati: this.zakazano.broj_sati,
            })
            .then((response) => {
              this.disabled = !this.disabled
            })
            .catch((error) => {
              if(error.response) alert(error.response.data.error.message);
            })
          }
      }
    },
    beforeMount()
    {
      this.type = localStorage.getItem("type");
      this.zakazano.datum_zakazivanja = new Date(this.zakazano.datum_zakazivanja).toISOString().slice(0,10);
    }
}
</script>
