<template>
    <div class="col-6 mx-auto pt-3">
        <div class="d-flex justify-content-center">
            <button class="button buttonDodaj" v-on:click="otvoriFormu()" v-if="prikaziDugme"></button>
        </div>
        <div>
            <DodajProizvodForma v-if="prikaziFormu" />
        </div>
    </div>
</template>

<script>
import DodajProizvodForma from './DodajProizvodForma.vue';


export default {
    name: "DodajProizvod",
    components: {
        DodajProizvodForma,
    },
    data() {
        return {
            prikaziFormu: false,
            prikaziDugme: true,
        };
    },
    methods: {
        otvoriFormu() {
            this.prikaziFormu = !this.prikaziFormu;
            this.prikaziDugme = !this.prikaziDugme;
        }
    },
    mounted() {
        this.emitter.on("dodat", dodati => {
            this.prikaziFormu = !dodati;
            this.prikaziDugme = dodati;
        }),
        this.emitter.on("otkazano", otkazano => {
            this.prikaziFormu = !otkazano;
            this.prikaziDugme = otkazano;
        })
    }
}
</script>
