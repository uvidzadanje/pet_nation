<template>
  <div class="col-md-10 mx-auto mt-5 mb-5">
    <div v-if="isActiveButton">
        <div class="d-flex flex-md-row justify-content-center gap-5 flex-wrap flex-column mb-2">
            <button type="button" class="btn bg-light col-md-5 rounded col-12 dugme-reg" v-on:click="formaPotrosac">
                Registrovanje Potrošača
            </button>
            <button type="button" class="btn bg-light col-md-5 rounded col-12 dugme-reg" v-on:click="formaPreduzece">
                Registrovanje Preduzeća
            </button>
        </div>
        <div class="d-flex justify-content-center">
          <button type="button" class="btn btn-danger mx-auto" v-on:click="formaDodavanje" style="padding: 10px">
            Nazad
          </button>
        </div>
    </div>
    <div v-if="isActivePotrosac">
      <FormPotrosac />
    </div>

    <div v-if="isActivePreduzece">
      <FormPreduzece />
    </div>
  </div>
</template>

<script>
import router from "../router/index.js"
import FormPotrosac from "../components/Forms/Potrosac.vue"
import FormPreduzece from "../components/Forms/Preduzece.vue"

export default {
  name: "DodavanjeNaloga",
  components: {
    FormPotrosac,
    FormPreduzece
  },
  data() {
    return {
      isActivePreduzece: false,
      isActiveButton: true,
      isActivePotrosac: false,
    }
  },
  methods: {
    formaPotrosac()
    {
      this.isActivePotrosac = !this.isActivePotrosac;
      this.isActiveButton = !this.isActiveButton;
    },
    formaPreduzece()
    {
      this.isActivePreduzece = !this.isActivePreduzece;
      this.isActiveButton = !this.isActiveButton;
    },
    formaDodavanje()
    {
      router.push({path: "/nalozi"});
    }
  }
}
</script>
