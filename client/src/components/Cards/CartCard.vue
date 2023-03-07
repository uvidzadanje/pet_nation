<template>
    <fieldset v-if="!obrisi">
        <div class="border border-dark border-4 px-4 py-4 card-color-darker mb-3 mt-3">
            <div class="row">
                <div class="col-md-6">
                    <div class="row">
                        <p class="h3 border-bottom border-dark border-3">Informacije o korpi</p>
                    </div>
                    <div class="row">
                        <div class="col-6">
                            <p>Adresa isporuke:</p>
                            <p v-if="!disabled">Vreme kreiranja korpe:</p>
                            <p v-if="!disabled || (disabled && type === 'admin')">Poslato kuriru:</p>
                        </div>
                        <div class="col-6">
                          <input type="text" v-model="korpa.adresa_isporuke" v-if="disabled">
                          <p v-if="!disabled">{{korpa.adresa_isporuke}}</p>
                          <p v-if="!disabled">{{new Date(korpa.createdAt).toLocaleString()}}</p>
                          <input type="checkbox" v-model="korpa.poslato_kuriru" v-if="disabled && type === 'admin'">
                          <p v-if="!disabled">{{korpa.poslato_kuriru? 'Poslato':'Nije poslato'}}</p>
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
                            <p>Telefon:</p>
                            <p>E-mail:</p>
                        </div>
                        <div class="col-6" v-if="korpa.Potrosac">
                            <p>{{korpa.Potrosac.ime}} {{korpa.Potrosac.prezime}}</p>
                            <p>{{korpa.Potrosac.broj_telefona}}</p>
                            <p>{{korpa.Potrosac.User.email}}</p>
                        </div>
                    </div>
                </div>
            </div>
                <div class="row col-lg-3 d-flex justify-content-end" v-if="type !== 'preduzece'">
                  <button class="button buttonIzmeni" v-if="!disabled" v-on:click.prevent="ukljuciPromene()"></button>

                  <button class="button buttonSacuvaj" v-if="disabled" v-on:click.prevent="sacuvajIzmene()"></button>

                  <button class="button buttonObrisi" v-on:click.prevent="obrisiKorpu()"></button>
                </div>
        <div>
            <div id="kupovina">
                <div v-for="kupovina in korpa.Kupovinas" :key="kupovina.id">
                    <KupovinaCard :kupovina="kupovina" />
                </div>
            </div>

        </div>
        </div>



    </fieldset>
</template>

<script>
import KupovinaCard from '../Cards/KupovinaCard.vue'
import axios from "axios"

export default {
    name: 'CartCard',
    props: ['korpa'],
    components: {
        KupovinaCard,
    },
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
      obrisiKorpu() {
          axios.delete('/korpe/korpa/' + this.korpa.id)
          .then((response) => {
            alert(response.data.data.message);
            this.obrisi = !this.obrisi;
          })
          .catch((error) => {
            if(error.response) alert(error.response.data.error.message);
          })
      },
      sacuvajIzmene() {
          if (!this.korpa.adresa_isporuke) {
            alert("Popunite sva polja");
            return;
          }
          else {
            axios.put('/korpe/korpa/', {
                id: this.korpa.id,
                adresa_isporuke: this.korpa.adresa_isporuke,
                poslato_kuriru: this.korpa.poslato_kuriru,
            })
            .then((response) => {
            })
            .catch((error) => {
              if(error.response) alert(error.response.data.error.message);
            })
          }
          this.disabled = !this.disabled
      }
    },
    beforeMount()
    {
      this.type = localStorage.getItem("type");
    }
}
</script>
