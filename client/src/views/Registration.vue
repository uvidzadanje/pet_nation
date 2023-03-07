<template>
    <div class="mx-auto card d-flex col-md-6 flex-column align-items-center mb-5 mt-5 card-color">

        <ul class="nav nav-tabs mb-3 mt-3" id="myTab" role="tablist">
          <li class="nav-item" role="presentation">
            <button class="nav-link active" id="potrosac-tab" data-bs-toggle="tab" data-bs-target="#potrosac" type="button" role="tab" aria-controls="potrosac" aria-selected="true">Potrošač</button>
          </li>
          <li class="nav-item" role="presentation">
            <button class="nav-link" id="preduzece-tab" data-bs-toggle="tab" data-bs-target="#preduzece" type="button" role="tab" aria-controls="preduzece" aria-selected="false">Preduzeće</button>
          </li>
        </ul>

        <div class="tab-content" id="myTabContent">
          <div class="tab-pane fade show active" id="potrosac" role="tabpanel" aria-labelledby="potrosac-tab">
             <form method="POST">
                <h3>Registrovanje Potrošača</h3>
                <div class="form-floating mb-3">
                  <input class="form-control" type="text" v-model="ime" id="floatingIme" placeholder="Ime"/>
                  <label for="floatingIme">Ime</label>
                </div>

                <div class="form-floating mb-3">
                    <input class="form-control" type="text" name="prezime" v-model="prezime" placeholder="Prezime"/>
                    <label for="floatingPrezime">Prezime </label>
                </div>

                <div class="form-floating mb-3">
                    <input class="form-control" type="text" id="floatingBrTelefona" v-model="broj_telefona" placeholder="Broj telefona"/>
                    <label for="floatingBrTelefona">Broj telefona </label>
                </div>

                <div class="form-floating mb-3">
                    <input class="form-control" type="text" id="floatingUsername" v-model="username" placeholder="Korisničko ime"/>
                    <label for="floatingUsername">Korisničko ime </label>
                </div>

                <div class="form-floating mb-3">
                    <input class="form-control" type="email" id="floatingEmail" v-model="email" placeholder="Email"/>
                    <label for="floatingEmail">Email</label>
                </div>

                <div class="form-floating mb-3">
                    <input class="form-control" type="password" id="floatingSifra" v-model="password" placeholder="Šifra"/>
                    <label>Šifra </label>
                </div>

                <div class="form-floating mb-3">
                    <input class="form-control" type="password" id="floatingRepeatPassword"  v-model="repeat_password" placeholder="Ponovite šifru"/>
                    <label for="floatingRepeatPassword">Ponovite šifru</label>
                </div>

                <div class="d-flex justify-content-around mb-3">
                  <button type="button" class="btn btn-primary" v-on:click="formaPotrosac">
                      Nazad
                  </button>

                  <input v-on:click.prevent="addUser" type="submit" class="btn btn-primary" value="Registrovanje">
                </div>

                <div class="d-flex justify-content-around mb-3">
                  <p>
                      Već ste registrovani?
                      <router-link :to="{ name: 'login' }">Prijavljivanje</router-link>
                  </p>
                </div>
            </form>
          </div>

          <div class="tab-pane fade" id="preduzece" role="tabpanel" aria-labelledby="preduzece-tab">
            <form method="POST">
                <h3>Registrovanje Preduzeća</h3>

                <div class="form-floating mb-3">
                    <input class="form-control" type="text" id="floatingNaziv" v-model="naziv" placeholder="Naziv"/>
                    <label for="floatingNaziv">Naziv</label>
                </div>

                <div class="form-floating mb-3">
                    <input class="form-control" type="text" id="floatingLokacija" v-model="lokacija" placeholder="Lokacija"/>
                    <label for="floatingLokacija">Lokacija</label>
                </div>

                <div class="form-floating mb-3">
                    <textarea class="form-control" type="text" id="floatingOpis" v-model="opis" placeholder="Opis">
                    </textarea>
                    <label id="floatingOpis">Opis</label>
                </div>

                <div class="form-floating mb-3">
                    <input class="form-control" type="text" id="floatingUsername1" v-model="username" placeholder="Korisničko ime"/>
                    <label for="floatingUsername1">Korisničko ime</label>
                </div>

                <div class="form-floating mb-3">
                    <input class="form-control" type="email" id="floatingEmail1" v-model="email" placeholder="Email"/>
                    <label for="floatingEmail1">Email</label>
                </div>

                <div class="form-floating mb-3">
                    <input class="form-control" type="password" id="floatingPassword1" v-model="password" placeholder="Šifra"/>
                    <label for="floatingPassword1">Šifra</label>
                </div>

                <div class="form-floating mb-3">
                    <input class="form-control" type="password" id="floatingPasswordRepeat1" v-model="repeat_password" placeholder="Ponovite šifru"/>
                    <label for="floatingPasswordRepeat1">Ponovite šifru</label>
                </div>

                <div class="mb-3">
                  <label for="profilnaSlika" class="form-label">Profilna slika:</label>
                  <input type="file" @change="onImageSelect" accept="image/png, image/jpeg" id="profilnaSlika" class="form-control">
                </div>

                <div class="d-flex justify-content-around mb-3">
                  <button type="button" class="btn btn-primary" v-on:click="formaPreduzece">
                    Nazad
                  </button>
                  <input v-on:click.prevent="addPreduzece" type="button" class="btn btn-primary" value="Registrovanje">
                </div>

                <div class="d-flex justify-content-around mb-3">
                  <p>
                      Već ste registrovani?
                      <router-link :to="{ name: 'login' }">Prijavljivanje</router-link>
                  </p>
                </div>
            </form>

          </div>
        </div>

    </div>
</template>

<script>
import axios from 'axios'
import router from '../router/index.js'

export default {
    name: 'registerPost',
    data() {
        return {
            username: '',
            email: '',
            password: '',
            repeat_password: '',
            type: '',
            ime: '',
            prezime:'',
            broj_telefona:'',
            naziv:'',
            lokacija:'',
            opis:'',
            profile_image: null,
            isActivePotrosac: true,
            isActivePreduzece: true,
            isActiveButton: false
        }
    },
    methods: {
        formaPotrosac(event) {
            this.isActivePotrosac = !this.isActivePotrosac;
            this.isActiveButton = !this.isActiveButton;
        },
        formaPreduzece(event) {
            this.isActivePreduzece = !this.isActivePreduzece;
            this.isActiveButton = !this.isActiveButton;
        },
        async addUser() {
            try {

                if (!this.username || !this.password || !this.repeat_password || !this.email || !this.ime || !this.prezime || !this.broj_telefona) {
                    alert("Popunite sva polja");
                }
                else if(this.password.length < 6){
                    alert("Šifra je manja od 6 karaktera");
                }
                else if(this.password != this.repeat_password){
                    alert("Šifre nisu iste");
                }
                else{
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
                  router.push('../components/Login')
                }
            } catch (error) {
                if(error.response) alert(error.response.data.error.message);
            }
        },
        async addPreduzece() {
            try {
                if (!this.username || !this.password || !this.repeat_password || !this.email || !this.naziv || !this.lokacija || !this.opis) {
                    alert("Popunite sva polja");
                }
                else if(this.password.length < 6){
                    alert("Šifra je manja od 6 karaktera");
                }
                else if(this.password != this.repeat_password){
                    alert("Šifre nisu iste");
                }
                else{
                var formData = new FormData();
                formData.append('username', this.username);
                formData.append('password', this.password);
                formData.append('repeat_password', this.repeat_password);
                formData.append('email', this.email);
                formData.append('type', 'preduzece');
                formData.append('naziv', this.naziv);
                formData.append('lokacija', this.lokacija);
                formData.append('opis', this.opis);
                if(this.profile_image) formData.append('profile_image', this.profile_image, this.profile_image.name);
                let result = await axios.post("/users/user/", formData)
                alert("Uspesna registracija");
                router.push('../components/Login')
                }
            } catch (error) {
               if(error.response) alert(error.response.data.error.message);
            }
        },
        onImageSelect(event)
        {
          this.profile_image = event.target.files[0];
        }
    }
}
</script>
