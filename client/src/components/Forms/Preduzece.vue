<template>
  <div class="card mx-auto mb-5 mt-5 card-color">
      <div class="card-body">
        <h3 class="card-text text-center">Registrovanje Preduzeća</h3>
        <div class="input-group mb-3">
            <span class="input-group-text">Naziv </span>
            <input class="form-control" type="text" name="naziv" v-model="naziv" />
        </div>
        <div class="input-group mb-3">
            <span class="input-group-text">Lokacija </span>
            <input class="form-control" type="text" name="lokacija" v-model="lokacija" />
        </div>
        <div class="input-group mb-3">
            <span class="input-group-text">Opis </span>
            <textarea class="form-control" v-model="opis"></textarea>
        </div>
        <div class="input-group mb-3">
            <span class="input-group-text">Korisničko ime </span>
            <input class="form-control" type="text" name="username" v-model="username" required />
        </div>
        <div class="input-group mb-3">
            <span class="input-group-text">Email adresa </span>
            <input class="form-control" type="email" name="email" v-model="email" />
        </div>
        <div class="input-group mb-3">
            <span class="input-group-text">Šifra </span>
            <input class="form-control" type="password" name="password" v-model="password" />
        </div>
        <div class="input-group mb-3">
            <span class="input-group-text">Ponovite šifru </span>
            <input class="form-control" type="password" name="repeat_password" v-model="repeat_password" />
        </div>
        <div class="d-flex justify-content-center gap-3">
          <button v-on:click="addPreduzece" type="button" class="btn btn-primary">Registrovanje</button>
          <button type="button" class="btn btn-danger" v-on:click="formaPreduzece">
              <label>Nazad</label>
          </button>
        </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios';
import router from '../../router/index.js'

export default {
  name: "FormPreduzece",
  data()
  {
    return {
      naziv: "",
      lokacija: "",
      opis: "",
      username: "",
      email: "",
      password: "",
      repeat_password: "",
    }
  },
  methods: {
    async addPreduzece() {
        try {
            if (!this.username || !this.password || !this.repeat_password || !this.email || !this.naziv || !this.lokacija || !this.opis) {
                alert("Popunite sva polja");
            }
            else if (this.password.length < 6) {
                alert("Šifra je manja od 6 karaktera");
            }
            else if (this.password != this.repeat_password) {
                alert("Šifre nisu iste");
            }
            else {
                var formData = new FormData();
                formData.append('username', this.username);
                formData.append('password', this.password);
                formData.append('repeat_password', this.repeat_password);
                formData.append('email', this.email);
                formData.append('type', 'preduzece');
                formData.append('naziv', this.naziv);
                formData.append('lokacija', this.lokacija);
                formData.append('opis', this.opis);
                let result = await axios.post("/users/user/", formData)
                alert("Uspesna registracija");
                router.push('../components/Nalozi')
                window.location.reload();
            }
        } catch (error) {
          if(error.response)
            alert(error.response.data.error.message);
        }

    },
    formaPreduzece()
    {
      window.location.reload();
    }
  }
}
</script>
