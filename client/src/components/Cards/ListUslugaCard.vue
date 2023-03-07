<template>
    <div v-if="obrisi" class="card mx-auto border border-dark border-2 mb-3 card-color mt-3">
        <div class="card-body">
            <div>
                <p class="h2 border-bottom border-dark border-2">{{usluga.Stavka.naziv}}</p>
                <div class="row">
                    <div class="col-md-4 img-size">
                        <div class="d-flex justify-content-center">
                            <img class="img-fluid" :src="usluga.Stavka.StavkaSlikas[0]?usluga.Stavka.StavkaSlikas[0].slika_link:'/uploads/noPic.png'" alt="Nema Slika">
                        </div>
                    </div>

                    <div class="col-md-8">
                        <div class="row">
                            <div class="col-5">
                                <p>Naziv usluge: </p>
                            </div>
                            <div class="col-7">
                                <input type="text" v-if="disabled" id="izmeni" v-model="usluga.Stavka.naziv" />
                                <p v-if="!disabled">
                                    {{ usluga.Stavka.naziv }}
                                </p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-5">
                                <p>Cena po satu: </p>
                            </div>
                            <div class="col-7">
                                <input type="number" v-if="disabled" id="izmeni" v-model="usluga.cena_po_satu" />
                                <p v-if="!disabled">
                                    {{ usluga.cena_po_satu }}
                                </p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-5">
                                <p>Kategorija: </p>
                            </div>
                            <div class="col-7">
                                <div v-if="disabled">
                                    <select v-model="kat_id" >
                                        <optgroup v-for="kategorija in kategorije" :key="kategorija.id" :label="kategorija.naziv">
                                            <option v-for="podkategorija in kategorija.Kategorijas" :key="podkategorija.id" :value="podkategorija.id">
                                                {{ podkategorija.naziv }}
                                            </option>
                                        </optgroup>
                                    </select>
                                </div>
                                <p v-if="!disabled && usluga.Stavka.Kategorija.nadkategorija">
                                    {{ usluga.Stavka.Kategorija.nadkategorija.naziv }} - {{usluga.Stavka.Kategorija.naziv}}
                                </p>
                            </div>
                        </div>
                        <div v-if="disabled">
                          <StavkaImages :slike_props="usluga.Stavka.StavkaSlikas" :stavka_id="usluga.Stavka.id" />
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-lg-3">
                        <p>Opis usluge:</p>
                    </div>
                    <div class="col-lg-6">
                        <input type="text" v-if="disabled" id="izmeni" v-model="usluga.Stavka.opis" />
                        <div v-if="!disabled">
                            {{ usluga.Stavka.opis }}
                        </div>
                    </div>
                    <div class="col-lg-3 d-flex justify-content-end">
                        <button class="button buttonIzmeni" v-if="!disabled" v-on:click.prevent="ukljuciPromene()"></button>

                        <button class="button buttonSacuvaj" v-if="disabled" v-on:click.prevent="sacuvajIzmene()"></button>

                        <button class="button buttonObrisi" v-on:click.prevent="obrisiusluga()"></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import StavkaImages from "../StavkaImages.vue"

export default {
    name: "ListUslugaCard",
    props: ["usluga"],
    components: {
      StavkaImages
    },
    data() {
        return {
            disabled: false,
            kategorije: [],
            kat_id: null,
            obrisi: true
        }
    },
    methods: {
        obrisiusluga() {
            axios.delete(`/stavke/stavka/${this.usluga.Stavka.id}`, {data: {type: 'usluga'}})
            .then((response) => {
              this.obrisi = !this.obrisi;
            })
            .catch((error) => {
              if(error.response) alert(error.response.data.error.message);
              console.log(error);
            })
        },
        ukljuciPromene() {
            this.disabled = !this.disabled;

            axios.get('/kategorije/2')
            .then((response) => {
                this.kategorije= response.data.data
            })
            .catch((error) => {

            })
        },
        sacuvajIzmene() {
            if (!this.usluga.cena_po_satu || !this.usluga.Stavka.naziv || !this.usluga.Stavka.opis) {
              alert("Popunite sva polja");
              return;
            }
            else {
                axios.put('/usluge/usluga/', {
                    id: this.usluga.id,
                    cena_po_satu: this.usluga.cena_po_satu,
                })
                .then((response) => {
                    axios.put('/stavke/stavka/', {
                        id: this.usluga.Stavka.id,
                        naziv: this.usluga.Stavka.naziv,
                        opis: this.usluga.Stavka.opis,
                        kategorija_id: this.kat_id
                    })
                    .then((response) => {
                        axios.get("kategorije/kategorija/" + this.kat_id)
                        .then((response) => {
                           this.usluga.Stavka.Kategorija = response.data.data;
                        })
                    })
                })
                .catch((error) => {
                  if(error.response) alert(error.response.data.error.message);
                })
            }
            this.disabled = !this.disabled
        }
    },
    mounted() {
      this.kat_id = this.usluga.Stavka.Kategorija.id
    }
}
</script>
