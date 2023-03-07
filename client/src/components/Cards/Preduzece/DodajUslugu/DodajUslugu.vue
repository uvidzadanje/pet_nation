<template>
    <div class="col-6 mx-auto pt-3">
        <div class="d-flex justify-content-center">
            <button class="button buttonDodaj" v-on:click="otvoriFormu()" v-if="prikaziDugmeUsluga"></button>
        </div>
        <div>
            <DodajUsluguForma v-if="prikaziFormuUsluga" />
        </div>
    </div>
</template>

<script>
import DodajUsluguForma from './DodajUsluguForma.vue';


export default {
    name: "DodajUslugu",
    components: {
        DodajUsluguForma,
    },
    data() {
        return {
            prikaziFormuUsluga: false,
            prikaziDugmeUsluga: true,
        };
    },
    methods: {
        otvoriFormu() {
            this.prikaziFormuUsluga = !this.prikaziFormuUsluga;
            this.prikaziDugmeUsluga = !this.prikaziDugmeUsluga;
        }
    },
    mounted() {
        this.emitter.on("dodataUsluga", dodati => {
            this.prikaziFormuUsluga = !dodati;
            this.prikaziDugmeUsluga = dodati;
        }),
        this.emitter.on("otkazanaUsluga", otkazano => {
            this.prikaziFormuUsluga = !otkazano;
            this.prikaziDugmeUsluga = otkazano;
        })
    }
}
</script>