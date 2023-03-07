<template>
  <div class="card col-md-6 mx-auto mb-5 mt-5">
      <div class="card-body card-color">
        <h2 class="card-text text-center">Obrisi nalog</h2>

        <div class="card-body mb-3 border border-2 card-color-darker" v-for="useri in listaUsera" :key="useri.id">
          <div class="mb-3" v-if="useri">
              <p class="card-text text-center">{{useri.username}}</p>
              <p class="card-text text-center">{{useri.email}}</p>
          </div>
          <div class="d-flex justify-content-center">
            <button type="button" class="btn btn-danger" v-on:click="obrisiUsera(useri)">
                <label>Obrisi</label>
            </button>
          </div>
        </div>
        <div class="d-flex">
          <button type="button" class="btn btn-danger" v-on:click="formaBrisanje">
              <label>Nazad</label>
          </button>
        </div>
      </div>
  </div>
</template>

<script>
import axios from "axios"
import router from "../router/index.js"

export default {
  name: "BrisanjeNaloga",
  data() {
    return {
      listaUsera: null,
      userID: null,

    }
  },
  methods: {
    async obrisiUsera(userZaBrisanje) {
        try {
            await axios.delete('/users/user/' + userZaBrisanje.id);

            alert("Uspesno obrisan nalog");

            if (this.userID == userZaBrisanje.id) {
                this.emitter.emit("toglogovan", false);
                this.emitter.emit("togAdmin", false);
                await axios.post("/users/user/logout");
                router.push('../components/');
            }
            else {
                window.location.reload();
            }
        } catch (error) {
          if(error.response) alert(error.response.data.error.message);
        }
    },
    formaBrisanje()
    {
      router.push({path: "/nalozi"});
    }
  },
  beforeMount()
  {
    axios.get('/users')
      .then((response) => {
        this.listaUsera = response.data.data;
      })
      .catch((error) => {
          if(error.response) alert(error.response.data.error.message);
      })

    this.userID = localStorage.getItem('id');
  }
}
</script>
