<template>
    <div class="col-md-10 mx-auto mt-5 mb-5">
        <div class="d-flex flex-md-row justify-content-center gap-5 flex-wrap flex-column">
            <button type="button" class="btn bg-light col-md-5 rounded col-12 dugme-reg" v-on:click="formaBrisanje">
                Obrisi nalog
            </button>
            <button type="button" class="btn bg-light col-md-5 rounded col-12 dugme-reg" v-on:click="formaDodavanje">
                Dodaj nalog
            </button>
            <button type="button" class="btn bg-light col-md-5 rounded col-12 dugme-reg" v-on:click="formaIzmena">
                Izmeni nalog
            </button>
            <button type="button" class="btn bg-light col-md-5 rounded col-12 dugme-reg" v-on:click="formaIzmenaKorisnika">
                Izmeni korisnika
            </button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import router from '../router/index.js'

export default {
  name: "UpravaljanjeNalozima",
  components: {
  },
    data() {
        return {
        }
    },
    beforeMount() {
    },
    methods: {
        formaBrisanje() {
            router.push({path: "/brisanje-naloga"});
        },
        formaDodavanje() {
            router.push({path: "/dodavanje-naloga"});
        },
        formaIzmena() {
            router.push({path: "/izmena-naloga"});
        },
        formaIzmenaKorisnika() {
            router.push({path: "/izmeni-korisnike"});
        },
    }
}
</script>
