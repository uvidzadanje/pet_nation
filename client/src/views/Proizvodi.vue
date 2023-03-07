<template>
    <div class="d-lg-flex justify-content-center mt-5 mb-5 gap-md-5">
      <div class="col-lg-3 d-flex flex-column">
        <Filter @filter_proizvoda="filtrirajProizvode"/>
      </div>

      <div class="col-lg-5 d-flex flex-wrap justify-content-between gap-5">
        <ProductCard :product="proizvod" v-for="proizvod in proizvodi" :key="proizvod.id"/>
      </div>


    </div>
</template>

<script>
import axios from "axios";
import Filter from "../components/Filteri/FilterProizvoda/Filter.vue";
import ProductCard from "../components/ProductCard.vue";


export default {
    name: 'KategorijeProizvoda',
    components: {
        Filter,
        ProductCard
    },
    data() {
        return {
            proizvodi: null,
        }
    },
    beforeMount() {
        axios.get('/proizvodi')
            .then((response) => {
                this.proizvodi = response.data.data.proizvodi

            })
            .catch((error) => {
            })
    },
    methods: {
        filtrirajProizvode(value){
            axios.get('/proizvodi?'+ value)
            .then((response)=>{
                this.proizvodi= response.data.data.proizvodi
            })
            .catch((error) =>{

            })
        }
    }
}
</script>
