<template>
    <div class="bg-light mx-2 my-2 px-4 py-3 border border-dark">
        <div class="row">
            <p class="h3 text-center border-bottom border-dark border-3">Novi proizvod</p>
        </div>
        <div class="row">
            <div class="col-md-6">
                <p>Naziv usluge:</p>
            </div>
            <div class="col-md-6">
                <input type="text" name="nazivUsluge" v-model="nazivUsluge" class="form-control" />
            </div>
        </div>
        <div class="row">
            <div class="col-md-6">
                <p>Kategorija: </p>
            </div>
            <div class="col-md-6">
                <select name="kategorija_id_usluge" v-model="kategorija_id_usluge" class="form-select">
                    <optgroup v-for="kategorija in kategorije" :key="kategorija.id" :label="kategorija.naziv">
                        <option v-for="podkategorija in kategorija.Kategorijas" :key="podkategorija.id" :value="podkategorija.id">
                            {{ podkategorija.naziv }}
                        </option>
                    </optgroup>
                </select>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6">
                <p>Cena po satu:</p>
            </div>
            <div class="col-md-6">
                <input type="number" name="cenaPoSatu" v-model="cenaPoSatu" class="form-control" />
            </div>
        </div>
        <div class="row">
            <div class="col-md-6">
                <p>Opis:</p>
            </div>
            <div class="col-md-6">
                <textarea name="opisProizvoda" id="" cols="30" rows="5" v-model="opisUsluge" class="form-control"></textarea>
            </div>
        </div>

        <div class="d-flex justify-content-center gap-3 pt-4">
            <button class="btn btn-primary" v-on:click.prevent="otkazi()">Otkazi</button>
            <button class="btn btn-primary" v-on:click.prevent="dodajUslugu()">Dodaj</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: "DodajUsluguForma",
    data() {
        return {
            dodato: true,
            otkaz: true,

            nazivUsluge: '',
            opisUsluge: '',
            kategorija_id_usluge: null,
            cenaPoSatu: '',

            kategorije: [],
        }
    },
    beforeMount() {
        axios.get('/kategorije/2')
        .then((response) => {
            this.kategorije = response.data.data
        })
        .catch((error) => {
        })
    },
    methods: {
        dodajUslugu() {
            if (!this.nazivUsluge || !this.opisUsluge || !this.kategorija_id_usluge || !this.cenaPoSatu){
                alert("Popunite sva polja");
            }
            else {
                axios.post('/stavke/stavka', {
                    naziv: this.nazivUsluge,
                    opis: this.opisUsluge,
                    kategorija_id: this.kategorija_id_usluge,
                    cena_po_satu: this.cenaPoSatu,
                    type: 'usluga',
                })
                .then((response)=> {
                    alert(response.data.data.message);
                    this.emitter.emit("dodataUsluga", this.dodato)
                    this.emitter.emit("refreshUsluge", response.data.data.stavka);
                })
                .catch((error) => {
                    alert(error.response.data.error.message);
                })
            }

        },
        otkazi() {
            this.emitter.emit("otkazanaUsluga", this.otkaz )
        }
    }
}
</script>
