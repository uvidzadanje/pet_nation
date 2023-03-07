<template>
  <div class="card mx-auto mb-5 mt-5 card-color">
        <div class="card-body">
          <h3 class="card-text text-center">Registrovanje Potrošača</h3>
          <div class="input-group mb-3">
              <span class="input-group-text">Ime </span>
              <input class="form-control" type="text" name="ime" v-model="ime" />
          </div>
          <div class="input-group mb-3">
              <span class="input-group-text">Prezime </span>
              <input class="form-control" type="text" name="prezime" v-model="prezime" />
          </div>
          <div class="input-group mb-3">
              <span class="input-group-text">Broj telefona </span>
              <input class="form-control" type="text" name="broj_telefona" v-model="broj_telefona" />
          </div>
          <div class="input-group mb-3">
              <span class="input-group-text">Korisničko ime </span>
              <input class="form-control" type="text" name="username" v-model="username" />
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
            <button v-on:click="addUser" type="button" class="btn btn-primary">Registrovanje</button>
            <button type="button" class="btn btn-danger" v-on:click="formaPotrosac">
                <label>Nazad</label>
            </button>
          </div>
        </div>

    </div>
</template>

<script>
import axios from "axios"
import router from "../../router/index.js"

export default {
  name: "FormPotrosac",
  data()
  {
    return {
      ime: "",
      prezime: "",
      broj_telefona: "",
      username: "",
      email: "",
      password: "",
      repeat_password: "",
    }
  },
  methods: {
    async addUser() {
        try {

            if (!this.username || !this.password || !this.repeat_password || !this.email || !this.ime || !this.prezime || !this.broj_telefona) {
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
                formData.append('type', 'potrosac');
                formData.append('ime', this.ime);
                formData.append('prezime', this.prezime);
                formData.append('broj_telefona', this.broj_telefona);
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
    formaPotrosac()
    {
      window.location.reload();
    }
  }
}
</script>
