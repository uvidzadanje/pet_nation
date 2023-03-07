<template>
  <div class="mx-auto mt-5 card d-flex col-md-6 flex-column align-items-center mb-5 card-color" v-if="trUser">
        <div class="card-body">
          <h2 class="mt-5 card-title mb-3 text-center">Izmeni preduzeće</h2>
          <div class="card-img-top d-flex justify-content-center mb-3">
            <img :src="trUser.profilna_slika_link || '/uploads/default_profile_image.png'" :alt="trUser.profilna_slika_link || '/uploads/default_profile_image.png'" width="100">
          </div>
          <div class="input-group mb-3">
            <input type="file" @change="onImageSelect" accept="image/png, image/jpeg" class="form-control">
          </div>
          <div class="form-floating mb-3">
            <input class="form-control" type="text" id="nazivIzmena" v-model="trUser.naziv" placeholder="Naziv"/>
            <label for="nazivIzmena">Naziv</label>
          </div>
          <div class="form-floating mb-3">
            <input class="form-control" type="text" id="lokacijaIzmena" v-model="trUser.lokacija" placeholder="Lokacija"/>
            <label for="lokacijaIzmena">Lokacija</label>
          </div>
          <div class="form-floating mb-3">
            <textarea class="form-control" id="opisIzmena" v-model="trUser.opis" placeholder="Opis"/>
            <label for="opisIzmena">Opis</label>
          </div>
          <div class="form-floating mb-3">
            <input class="form-control" type="text" id="usernameIzmena" v-model="trUser.User.username" placeholder="Koricničko ime"/>
            <label for="usernameIzmena">Korisničko ime</label>
          </div>
          <div class="form-floating mb-3">
            <input class="form-control" type="password" id="passwordStara" v-model="passwordStara" placeholder="Stara Lozinka"/>
            <label for="passwordStara">Stara Lozinka</label>
          </div>
          <div class="form-floating mb-3">
            <input class="form-control" type="password" id="passwordIzmena" v-model="passwordIzmena" placeholder="Lozinka"/>
            <label for="passwordIzmena">Lozinka</label>
          </div>

          <div class="input-group mb-3 d-flex justify-content-center gap-4">
            <button type="button" class="btn btn-primary" v-on:click="izmeniPreduzece">
                <label>Izmeni</label>
            </button>

            <button type="button" class="btn btn-danger" v-on:click="obrisiUsera">
                <label>Obrisi</label>
            </button>
          </div>
        </div>
  </div>
</template>

<script>
import axios from 'axios'
import router from '../../router/index.js'

export default {
  name: "IzmenaPreduzece",
  data() {
    return {
      trUser: null,
      passwordStara: "",
      passwordIzmena: "",
    }
  },
  methods: {
    getPreduzece()
    {
      axios.get('/preduzeca/preduzece/')
        .then((response) => {
            this.trUser = response.data.data.preduzece;
        })
        .catch((error) => {

        })
    },
    async izmeniPreduzece() {
      try {
          if (this.trUser.naziv && this.trUser.opis && this.trUser.lokacija) {
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
              await axios.put('/preduzeca/preduzece/', {
                  naziv: this.trUser.naziv,
                  opis: this.trUser.opis,
                  lokacija: this.trUser.lokacija
              });

              await this.izmeniKorisnika();

              alert("Uspesno napravljene izmene");

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
    async obrisiUsera() {
      try {

          await axios.delete('/users/user/');

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
    async izmeniKorisnika() {
      await axios.put('/users/user/', {
          username: this.trUser.User.username,
          old_password: this.passwordStara,
          password: this.passwordIzmena,
      });
    },
    async obrisiUsera(event) {
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
    async onImageSelect(event)
    {
      try {
        const formData = new FormData();
        formData.append("profile_image", event.target.files[0], event.target.files[0].name);
        await axios.put("/preduzeca/preduzece/slika", formData);

        this.trUser.profilna_slika_link = URL.createObjectURL(event.target.files[0]);
      } catch (error) {
        if(error.response) alert(error.response.data.error.message);
      }
    }
  },
  beforeMount()
  {
    this.getPreduzece();
  }
}
</script>
