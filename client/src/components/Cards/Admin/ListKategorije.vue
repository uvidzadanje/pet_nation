<template>
    <div>
        <button class="button buttonDodaj" v-on:click="otvoriFormu()" v-if="prikaziDugme"></button>

        <DodajKategoriju v-if="prikaziFormu" />

    </div>
    <div class="card">
        <div class="card-title">
            <div>
                {{ kategorijo.naziv }}
            </div>
        </div>

        <div class="card-body">
            <form>
                <div class="row">
                    <div class="cell">
                        <label>Naziv kategorije</label>
                    </div>
                    <div class="cell">
                        <input type="text" v-if="disabled" id="izmeni" v-model="kategorijo.naziv" />
                        <div v-if="!disabled">
                            {{ kategorijo.naziv }}
                        </div>
                    </div>
                </div>

                <button class="button buttonIzmeni" v-if="!disabled" v-on:click.prevent="ukljuciPromene()"></button>

                <button class="button buttonSacuvaj" v-if="disabled" v-on:click.prevent="sacuvajIzmene()"></button>

                <button class="button buttonObrisi" v-on:click.prevent="obrisiKategoriju()"></button>

            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import DodajKategoriju from './DodajKategoriju.vue';

export default {
    name: "ListKategorije",
    props: ["kategorijo"],
    components: {
        DodajKategoriju,
    },
    data() {
        return {
            disabled: false,
            prikaziFormu: false,
            prikaziDugme: true,
        }
    },
    methods: {
        obrisiKategoriju() {
            axios.delete('/kategorije/kategorija/' + this.kategorijo.id)
                .then((response) => {

                })
                .catch((error) => {
                  if(error.response) alert(error.response.data.error.message);
                })
        },
        ukljuciPromene() {
            this.disabled = !this.disabled;
        },
        sacuvajIzmene() {
            if (!this.kategorijo.naziv) {
                alert("Popunite sva polja");
            }
            else {
                axios.put('/kategorije/kategorija/', {
                    id: this.kategorijo.id,
                    naziv: this.kategorijo.naziv,
                })
                    .then((response) => {

                    })
                    .catch((error) => {
                      if(error.response) alert(error.response.data.error.message);

                    })

            }
            this.disabled = !this.disabled
        },
        otvoriFormu() {
            this.prikaziFormu = !this.prikaziFormu;
            this.prikaziDugme = !this.prikaziDugme;
        },
    },
    mounted() {
        this.emitter.on("dodatKategorija", dodati => {
            this.prikaziFormu = !dodati;
            this.prikaziDugme = dodati;
        }),
            this.emitter.on("otkazanoKategorija", otkazano => {
                this.prikaziFormu = !otkazano;
                this.prikaziDugme = otkazano;
            })
    }
}
</script>
