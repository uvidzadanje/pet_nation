<template>
    <div class="bg-light mx-2 my-2 px-4 py-3 border border-dark ">
        <div class="row">
            <p class="h3 text-center border-bottom border-dark border-3">Novi proizvod</p>
        </div>
        <div class="row">
            <div class="col-md-6">
                <p>Naziv proizvoda: </p>
            </div>
            <div class="col-md-6">
                <input type="text" name="nazivProizvoda" v-model="naziv" class="form-control" />
            </div>
        </div>
        <div class="row">
            <div class="col-md-6">
                <p>Kategorija:</p>
            </div>
            <div class="col-md-6">
                <select name="kategorija" v-model="kategorija_id" class="form-select">
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
                <p>Cena:</p>
            </div>
            <div class="col-md-6">
                <input type="text" name="cena" v-model="cena" class="form-control" />
            </div>
        </div>
        <div class="row">
            <div class="col-md-6">
                <p>Naziv proizvodjaca:</p>
            </div>
            <div class="col-md-6">
                <input type="text" name="nazivProizvodjaca" v-model="naziv_proizvodjaca" class="form-control" />
            </div>
        </div>
        <div class="row">
            <div class="col-md-6">
                <p>Zemlja porekla:</p>
            </div>
            <div class="col-md-6">
                <input type="text" name="zemljaPorekla" v-model="zemlja_porekla" class="form-control" />
            </div>
        </div>
        <div class="row">
            <div class="col-md-6">
                <p>Opis:</p>
            </div>
            <div class="col-md-6">
                <textarea name="opisProizvoda" id="" cols="30" rows="5" v-model="opis" class="form-control"></textarea>
            </div>
        </div>

        <div class="d-flex justify-content-center gap-3 pt-4">
            <button class="btn btn-primary" v-on:click.prevent="otkazi()">Otkazi</button>
            <button class="btn btn-primary" v-on:click.prevent="dodajProizvod()">Dodaj</button>
        </div>

    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: "DodajProizvodForma",
    data() {
        return {
            dodato: true,
            otkaz: true,

            naziv: '',
            opis: '',
            kategorija_id: null,
            cena: '',
            naziv_proizvodjaca: '',
            zemlja_porekla: '',

            kategorije: [],
        }
    },
    beforeMount() {
        axios.get('/kategorije/1')
        .then((response) => {
            this.kategorije = response.data.data
        })
        .catch((error) => {

        })
    },
    methods: {
        dodajProizvod() {
            if (!this.naziv || !this.opis || !this.kategorija_id || !this.cena || !this.naziv_proizvodjaca || !this.zemlja_porekla){
                alert("Popunite sva polja");
            }
            else {
                axios.post('/stavke/stavka', {
                    naziv: this.naziv,
                    opis: this.opis,
                    kategorija_id: this.kategorija_id,
                    cena: this.cena,
                    naziv_proizvodjaca: this.naziv_proizvodjaca,
                    zemlja_porekla: this.zemlja_porekla,
                    type: 'proizvod',
                })
                .then((response)=> {
                    alert(response.data.data.message);
                    this.emitter.emit("dodat", this.dodato);
                    this.emitter.emit("refreshProizvodi", response.data.data.stavka);
                })
                .catch((error) => {
                    alert(error.response.data.error.message);
                })
            }

        },
        otkazi() {
            this.emitter.emit("otkazano", this.otkaz )
        }
    }
}
</script>
