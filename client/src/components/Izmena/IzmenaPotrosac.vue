<template>
  <div class="mx-auto mt-5 card d-flex col-md-6 flex-column align-items-center card-color" v-if="trUser">
        <h2 class="mt-5">Izmeni potrosaca</h2>
        <div class="form-floating mb-3">
          <input class="form-control" type="text" id="imeIzmena" v-model="trUser.ime" placeholder="Ime"/>
          <label for="imeIzmena">Ime</label>
        </div>

        <div class="form-floating mb-3">
          <input class="form-control" type="text" id="prezimeIzmena" v-model="trUser.prezime" placeholder="Prezime"/>
          <label for="prezimeIzmena">Prezime</label>
        </div>

        <div class="form-floating mb-3">
          <input class="form-control" type="text" id="broj_telefonaIzmena" v-model="trUser.broj_telefona" placeholder="Broj telefona"/>
          <label for="broj_telefonaIzmena">Broj telefona</label>
        </div>

        <div class="form-floating mb-3">
          <input class="form-control" type="text" id="usernameIzmena" v-model="trUser.User.username" placeholder="Korisničko ime"/>
          <label for="uzernameIzmena">Korisničko ime</label>
        </div>

        <div class="form-floating mb-3">
          <input class="form-control" type="password" id="passwordStara" v-model="passwordStara" placeholder="Stara lozinka"/>
          <label for="passwordStara">Stara Lozinka</label>
        </div>

        <div class="form-floating mb-3">
          <input class="form-control" type="password" id="passwordIzmena" v-model="passwordIzmena" placeholder="Lozinka"/>
          <label for="passwordIzmena">Lozinka</label>
        </div>

        <div class="input-group mb-3 d-flex justify-content-center gap-4">
          <button type="button" class="btn btn-primary" v-on:click="izmeniPotrosaca">
              Izmeni
          </button>
          <button type="button" class="btn btn-danger" v-on:click="obrisiUsera">
              Obriši
          </button>
        </div>
  </div>
</template>

<script>
import axios from 'axios'
import router from '../../router/index.js'

export default {
  name: "IzmenaPotrosac",
  data() {
    return {
      trUser: null,
      passwordStara: "",
      passwordIzmena: "",
    }
  },
  methods: {
    async izmeniPotrosaca() {
        try {
          if(this.passwordStara && !this.passwordIzmena)
          {
            alert("Unesite novu lozinku!");
            return;
          }
          if(this.passwordIzmena && !this.passwordStara)
          {
            alert("Unesite staru lozinku!");
            return;
          }
            if (this.trUser.ime && this.trUser.prezime && this.trUser.broj_telefona) {
              if(this.passwordStara && !this.passwordIzmena)
              {
                alert("Morate uneti novu lozinku!");
                return;
              }

              if(this.passwordIzmena && !this.passwordStara)
              {
                alert("Morate uneti staru lozinku!");
                return;
              }
                await axios.put('/potrosaci/potrosac/', {
                    ime: this.trUser.ime,
                    prezime: this.trUser.prezime,
                    broj_telefona: this.trUser.broj_telefona
                });

                await this.izmeniKorisnika()

                alert("Uspesne izmene!");

                window.location.reload();
            }
            else {
                alert("Unesite sve podatke");
            }
        } catch (error) {
          if(error.response.status === 400)
          {
            alert(error.response.data.error.message);
          }
        }
    },
    async izmeniKorisnika() {
      await axios.put('/users/user/', {
          username: this.trUser.User.username,
          old_password: this.passwordStara,
          password: this.passwordIzmena,
      });
    },
    async obrisiUsera() {
        try {

            await axios.delete(' /users/user/');

            alert("Uspesno obrisan nalog");

            localStorage.setItem("toglogovan", false);
            this.emitter.emit("toglogovan", false);
            localStorage.removeItem("type");
            localStorage.removeItem("username");
            router.push('../components/');


        } catch (error) {
          if(error.response) alert(error.response.data.error.message);
        }
    },
    getPotrosac()
    {
      axios.get('/potrosaci/potrosac/')
      .then((response) => {
          this.trUser = response.data.data.potrosac;
      })
      .catch((error) => {
          if(error.response) alert(error.response.data.error.message);
      })
    }
  },
  beforeMount()
  {
    this.getPotrosac();
  }
}
</script>
