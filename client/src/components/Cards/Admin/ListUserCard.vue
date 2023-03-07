<template>
  <fieldset class="px-4 py-4">
    <div class="border border-dark border-4 px-4 py-4 card-color">
      <p class="h4 border-bottom border-dark border-2">Korisnik sa ID-jem: {{user.id}}</p>
      
      <div class="row">
        <div class="col-4">
          <p>Username:</p>
          <p>Napravljen:</p>
          <p>Email:</p>
        </div>
        <div class="col">
          <p>{{user.username}}</p>
          <p>{{new Date(Date.parse(user.createdAt)).toLocaleString()}}</p>
          <p>{{user.email}}</p>
        </div>
      </div>
    </div>
  </fieldset>
</template>

<script>
export default {
  name: "ListUserCard",
  props: ["user"],
}
</script>
