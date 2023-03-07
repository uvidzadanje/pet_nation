<template>
    <div class="d-md-flex justify-content-center mt-5 mb-5 gap-md-5">
      <div class="col-lg-3 d-flex flex-column">
        <FilterUsluge @filter_usluga="filtrirajUsluge"/>
      </div>

      <div class="col-lg-5 d-flex flex-wrap justify-content-between gap-5">
        <UslugaCard :usluga="usluga" v-for="usluga in usluge" :key="usluga.id"/>
      </div>
    </div>
</template>

<script>
import axios from "axios";
import FilterUsluge from "../components/Filteri/FilterUsluge/FilterUsluge.vue";
import UslugaCard from "../components/UslugaCard.vue";


export default {
    name: 'KategorijeUsluge',
    components: {
        FilterUsluge,
        UslugaCard,
        FilterUsluge
    },
    data() {
        return {
            usluge: null,
        }
    },
    beforeMount() {
        axios.get('/usluge')
            .then((response) => {

                this.usluge = response.data.data.usluge

            })
            .catch((error) => {

            })
    },
    methods: {
        filtrirajUsluge(value){
            axios.get('/usluge?'+ value)
            .then((response)=>{
                this.usluge = response.data.data.usluge
            })
            .catch((error) =>{

            })
        }
    }
}
</script>
