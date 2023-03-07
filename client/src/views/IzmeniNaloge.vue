<template>
  <div class="col-md-6 mx-auto mt-5 mb-5">
    <div class="card d-flex flex-column mx-auto card-color" v-if="isActiveIzmena">
          <div class="card-body">
            <h2 class="text-center">Izmeni nalog</h2>
            <div class="card-body d-flex flex-column mb-3 border border-2 card-color-darker" v-for="useri in listaUsera" :key="useri.id">

                  <p class="card-text text-center">{{ useri.username }}</p>
                  <p class="card-text text-center">{{ useri.email }}</p>
                  <div class="d-flex justify-content-center">
                    <button type="button" class="btn btn-primary" v-on:click="formaIzmenaUsera(useri)">
                        Izmeni
                    </button>
                  </div>
            </div>
            <div class="d-flex">
              <button type="button" class="btn btn-danger" v-on:click="formaIzmena">
                  <label>Nazad</label>
              </button>
            </div>
          </div>
      </div>
      <div class="card d-flex flex-column mx-auto card-color" v-if="trUserZaIzmenu && isActiveIzmenaUsera">
          <div class="card-body">
            <h2 class="text-center card-text">Izmeni nalog</h2>
            <div class="card-body d-flex flex-column">
                <div class="input-group mb-3">
                  <span class="input-group-text">Korisničko ime</span>
                  <input class="form-control" type="text" name="usernameIzmena" v-model="trUserZaIzmenu.username" />
                </div>
                <div class="input-group mb-3">
                  <span class="input-group-text">Lozinka</span>
                  <input class="form-control" type="password" name="passwordIzmena" v-model="passwordIzmena" />
                </div>
                <div class="d-flex justify-content-center mb-3">
                  <button type="button" class="btn btn-primary" v-on:click="izmeniUsera">
                      Izmeni
                  </button>
                </div>
            </div>
            <div>
              <button type="button" class="btn btn-danger" v-on:click="formaIzmenaUsera">
                Nazad
              </button>
            </div>
          </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios';
import router from "../router/index.js"

export default {
  name: "IzmeniNaloge",
  data() {
    return{
      listaUsera: [],
      passwordIzmena: "",
      isActiveIzmenaUsera: false,
      isActiveIzmena: true,
      trUserZaIzmenu: null,
    }
  },
  methods: {
    izmeniUsera()
    {
        if (this.trUserZaIzmenu.username) {
            axios.put('/users/user/' + this.trUserZaIzmenu.id, {
                username: this.trUserZaIzmenu.username,
                password: this.passwordIzmena,
            })
            .then((response) => {
              router.push('../components/nalozi');
              window.location.reload();
            })
            .catch((error) => {
              if(error.response) alert(error.response.data.error.message);
            })
        }
        else {
            alert("Unesite username");
        }
    },
    formaIzmenaUsera(izmenaUsera)
    {
      this.isActiveIzmena = !this.isActiveIzmena;
      this.isActiveIzmenaUsera = !this.isActiveIzmenaUsera;
      this.trUserZaIzmenu = izmenaUsera;
    },
    formaIzmena()
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
  }
}
</script>
