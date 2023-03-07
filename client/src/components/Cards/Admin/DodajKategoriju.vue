<template>
    <form>
        <div >
            <label>Naziv kategorije: </label>
            <input type="text" name="nazivKategorije" v-model="naziv" />
        </div>
        <button class="cancel" v-on:click.prevent="otkazi()">
            Otkazi
        </button>
        <button class="add" v-on:click.prevent="dodajProizvod()">
            Dodaj
        </button>
    </form>
</template>

<script>
import axios from 'axios'

export default {
    name: "DodajKategoriju",
    data() {
        return {
            dodato: true,
            otkaz: true,

            naziv: '',
        }
    },
    methods: {
        dodajProizvod() {
            if (!this.naziv){
                alert("Popunite sva polja");
            }
            else {
                axios.post('/kategorije/kategorija/', {
                    naziv: this.naziv,
                })
                .then((response)=> {
                    alert("Uspesno dodavanje kategorije")
                    this.emitter.emit("dodatKategorija", this.dodato)
                    window.location.reload();
                })
                .catch((error) => {
                    if(error.response) alert(error.response.data.error.message);
                })
            }

        },
        otkazi() {
            this.emitter.emit("otkazanoKategorija", this.otkaz )
        }
    }
}
</script>
