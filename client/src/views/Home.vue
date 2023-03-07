<template>
<div>

  <!-- Slika Home stranice -->
  <header class="masthead">
    <div class="container h-100">
      <div class="row h-100 align-items-center">
        <div class="col-12 text-center">
          <h1 class="masthead-text">PET NATION</h1>
        </div>
      </div>
    </div>
  </header>

  <!-- Sadrzaj stranice -->
    <div class="container">
      <div class="col-md-8 mx-auto bg-light p-3 mt-5 mb-5" >
            <p class="h1">O nama</p>

            <p class="h2">Dobrodošli na naš sajt</p>
            <img src="@/assets/img/golden-retriever.jpg" alt="golden-retriever.jpg" width="150" class="float-start me-3">
            <p>
              Web aplikacija koja se bavi da Vašim kućnim ljubimcima obezbedite samo najbolje.
              Pružamo šansu svim preduzećima koja nemaju finansije za marketing da se svojim kvalitetom izbore na tržištu.
              Samo to nadmetanje ima za cilj raznovrsniji i kvalitetniji spektar proizvoda i usluga.
              Potražite šta Vam treba i učinite svog ljubimca srećnim.
            </p>
            <img src="@/assets/img/cat.jpg" alt="cat.jpg" width="150" class="float-end">
            <p>
                PetNation sadrži osnovne informacije o preduzećima za usluge kućnih
                ljubimaca i vlasnika ljubimaca. Preduzeća koja se bave uslugama kućnih ljubimaca
                mogu da dodaju usluge koje pružaju uz koje će ići i cena, takođe će moći da
                naprave nalog i isti izmene kad god požele. Vlasnici kućnih ljubimaca mogu da
                pretražuju po filterima i nađu uslugu koja im treba, zakazivati termine i ocenjivati
                preduzeća, kao i da vrše kupovinu proizvoda.
            </p>
        </div>
    </div>

</div>
</template>

<script>
import Header from '@/views/Header.vue'


export default {
  name: 'Home',
  props: ['addToCart'],
  components: {
    Header
  }
}
</script>
