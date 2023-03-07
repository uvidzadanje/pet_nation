<template>
    <fieldset class="px-4 py-4" v-if="korisnik.User">
    <div class="border border-dark border-4 px-4 py-4 card-color">
      <p class="h4 border-bottom border-dark border-2">Vasi podaci</p>
      
      <div class="row">
        <div class="col-4">
          <p>Korisnicko ime:</p>
          <p>E-mail adresa:</p>
          <p>Puno ime:</p>
          <p>Broj telefona:</p>
        </div>
        <div class="col">
          <p>{{korisnik.User.username}}</p>
          <p>{{korisnik.User.email}}</p>
          <p>{{korisnik.ime}} {{korisnik.prezime}}</p>
          <p>{{korisnik.broj_telefona}}</p>
        </div>
      </div>
    </div>
  </fieldset>

</template>

<script>
export default {
  name: "InfoPreduzece",
  props: ["korisnik"],
}
</script>