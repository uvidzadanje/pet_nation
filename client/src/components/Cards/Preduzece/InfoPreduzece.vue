<template>
    <fieldset class="px-4 py-4" v-if="preduzece.User">
    <div class="border border-dark border-4 px-4 py-4 card-color">
      <p class="h4 border-bottom border-dark border-2">{{preduzece.naziv}}</p>
      
      <div class="row">
        <div class="col-4">
          <p>Korisnicko ime:</p>
          <p>E-mail adresa:</p>
          <p>Lokacija:</p>
          <p>Opis preduzeca:</p>
        </div>
        <div class="col">
          <p>{{preduzece.User.username}}</p>
          <p>{{preduzece.User.email}}</p>
          <p>{{preduzece.lokacija}}</p>
          <p>{{preduzece.opis}}</p>
        </div>
      </div>
    </div>
  </fieldset>

</template>

<script>
export default {
  name: "InfoPreduzece",
  props: ["preduzece"],
}
</script>