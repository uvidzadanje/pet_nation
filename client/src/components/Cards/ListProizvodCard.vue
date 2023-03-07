<template>
    <div v-if="obrisi" class="card mx-auto border border-dark border-2 mb-3 card-color mt-3">
        <div class="card-body">
            <div>
                <p class="h2 border-bottom border-dark border-2">{{proizvod.Stavka.naziv}}</p>
                <div class="row">
                    <div class="col-md-4 img-size">
                        <div class="d-flex justify-content-center">
                            <img class="img-fluid" :src="proizvod.Stavka.StavkaSlikas[0]?proizvod.Stavka.StavkaSlikas[0].slika_link:'/uploads/noPic.png'" alt="Nema Slika">
                        </div>
                    </div>

                    <div class="col-md-8">
                        <div class="row">
                            <div class="col-5">
                                <p>Naziv proizvoda: </p>
                            </div>
                            <div class="col-7">
                                <input type="text" v-if="disabled" id="izmeni" v-model="proizvod.Stavka.naziv" />
                                <p v-if="!disabled">
                                    {{ proizvod.Stavka.naziv }}
                                </p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-5">
                                <p>Kategorija:</p>
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
                                <p v-if="!disabled && proizvod.Stavka.Kategorija.nadkategorija">
                                    {{ proizvod.Stavka.Kategorija.nadkategorija.naziv }} - {{proizvod.Stavka.Kategorija.naziv}}
                                </p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-5">
                                <p>Cena:</p>
                            </div>
                            <div class="col-7">
                                <input type="number" v-if="disabled" id="izmeni" v-model="proizvod.cena" />
                                <div v-if="!disabled">
                                    {{ proizvod.cena }}
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-5">
                                <p>Naziv proizvodjaca:</p>
                            </div>
                            <div class="col-7">
                                <input type="text" v-if="disabled" id="izmeni" v-model="proizvod.naziv_proizvodjaca" />
                                <div v-if="!disabled">
                                    {{ proizvod.naziv_proizvodjaca }}
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-5">
                                <p>Zemlja porekla:</p>
                            </div>
                            <div class="col-7">
                                <input type="text" v-if="disabled" id="izmeni" v-model="proizvod.zemlja_porekla" />
                                <div v-if="!disabled">
                                    {{ proizvod.zemlja_porekla }}
                                </div>
                            </div>
                        </div>
                        <div v-if="iskljuciDugmici">
                          <div v-if="disabled">
                            <StavkaImages :slike_props="proizvod.Stavka.StavkaSlikas" :stavka_id="proizvod.Stavka.id"/>
                          </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-3">
                        <p>Opis proizvoda: </p>
                    </div>
                    <div class="col-lg-6">
                        <input type="text" v-if="disabled" id="izmeni" v-model="proizvod.Stavka.opis" />
                        <div v-if="!disabled">
                            {{ proizvod.Stavka.opis }}
                        </div>
                    </div>
                    <div class="col-lg-3 d-flex justify-content-end" v-if="iskljuciDugmici">
                        <button class="button buttonIzmeni" v-if="!disabled" v-on:click.prevent="ukljuciPromene()"></button>

                        <button class="button buttonSacuvaj" v-if="disabled" v-on:click.prevent="sacuvajIzmene()"></button>

                        <button class="button buttonObrisi" v-on:click.prevent="obrisiProizvod()"></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>

</style>

<script>
import axios from 'axios'
import StavkaImages from "../StavkaImages.vue"

export default {
    name: "ListProizvodCard",
    props: ["proizvod","iskljuciDugmici"],
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
        obrisiProizvod() {
          axios.delete('/stavke/stavka/' + this.proizvod.Stavka.id, {data: {type: "proizvod"}})
            .then((response) => {
              this.obrisi = !this.obrisi;
            })
            .catch((error) => {
              if(error.response) alert(error.response.data.error.message);
            })
        },
        ukljuciPromene() {
            this.disabled = !this.disabled;

            axios.get('/kategorije/1')
            .then((response) => {
                this.kategorije= response.data.data
            })
            .catch((error) => {
              if(error.response) alert(error.response.data.error.message);
            })
        },
        sacuvajIzmene() {
            if (!this.proizvod.cena || !this.proizvod.naziv_proizvodjaca || !this.proizvod.zemlja_porekla || !this.proizvod.Stavka.naziv || !this.proizvod.Stavka.opis) {
              alert("Popunite sva polja");
              return;
            }
            else {
                axios.put('proizvodi/proizvod/', {
                    id: this.proizvod.id,
                    cena: this.proizvod.cena,
                    naziv_proizvodjaca: this.proizvod.naziv_proizvodjaca,
                    zemlja_porekla: this.proizvod.zemlja_porekla,
                })
                .then((response) => {
                    axios.put('stavke/stavka/', {
                        id: this.proizvod.Stavka.id,
                        naziv: this.proizvod.Stavka.naziv,
                        opis: this.proizvod.Stavka.opis,
                        kategorija_id: this.kat_id
                    })
                    .then((response) => {
                      this.disabled = !this.disabled
                        axios.get("kategorije/kategorija/"+this.kat_id)
                        .then((response) => {
                           this.proizvod.Stavka.Kategorija = response.data.data;
                        })
                    })
                })
                .catch((error) => {
                  if(error.response) alert(error.response.data.error.message);
                })
            }
        },

    },
    mounted() {
      this.kat_id = this.proizvod.Stavka.Kategorija.id;
    },
}
</script>
