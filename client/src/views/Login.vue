<template>
    <div class="mx-auto mt-5 card d-flex col-md-6 flex-column align-items-center card-color">
      <h3 class="mt-5">Prijavljivanje</h3>
      <div class="form-floating mb-3">
        <input v-model="username" id="floatingUsername" class="form-control" type="text" placeholder="Username"/>
        <label for="floatingUsername">Korisničko ime </label>
      </div>

      <div class="form-floating mb-3">
        <input id="floatingPassword" v-model="password" class="form-control" type="password" placeholder="Password"/>
        <label for="floatingPassword">Šifra </label>
      </div>

      <div class="input-group mb-3 d-flex justify-content-center">
        <input v-on:click.prevent="loginUser" type="submit" class="btn btn-primary" value="Prijavljivanje">
      </div>

      <div class="input-group mb-3 d-flex justify-content-center">
        <p>
          Niste registrovani?
          <router-link :to="{ name: 'signup' }">Registrovanje</router-link>
        </p>
      </div>
    </div>
</template>

<script>
import axios from 'axios'
import router from '../router/index.js'

export default {
    data() {
        return {
            username: '',
            password: '',
            logovan: false
        }
    },

    methods: {

        async loginUser() {
            try {
                if (!this.username || !this.password) {
                    alert("Popunite sva polja");
                }
                else {
                    let result = await axios.post("/users/user/auth/", {
                        username: this.username,
                        password: this.password
                    })
                    alert("Uspesno logovanje");
                    this.logovan = true;
                    this.emitter.emit("toglogovan", this.logovan);

                    localStorage.setItem("toglogovan", this.logovan);
                    localStorage.setItem("type", result.data.data.type);

                    this.emitter.emit("togAdmin", localStorage.getItem('type')==='admin');
                    router.push({path: "/dashboard"});
                }

            } catch (error) {
                if(error.response) alert(error.response.data.error.message);
            }


        },

    }
}
</script>
