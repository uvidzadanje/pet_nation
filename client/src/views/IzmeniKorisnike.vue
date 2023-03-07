<template>
  <div class="col-md-6 mx-auto mb-5 mt-5">
    <div class="card mx-auto card-color" v-if="isActiveIzmenaKorisnika">
        <div class="card-body">
          <h2 class="card-text text-center">Izmeni korisnike</h2>
          <div class="card-body mb-3 border border-2 card-color-darker" v-for="useriPo in listaPotrosaca" :key="useriPo.id">
                <div v-if="useriPo.User">
                    <p class="card-text text-center">{{ useriPo.User.username }}</p>
                    <p class="card-text text-center">{{ useriPo.User.email }}</p>
                </div>
                <div class="d-flex justify-content-center">
                  <button type="button" class="btn btn-primary " v-on:click="formaIzmenaUseraPotrosac(useriPo)">
                      <label>Izmeni</label>
                  </button>
                </div>
          </div>
          <div class="card-body mb-3 border border-2 card-color-darker" v-for="useriPr in listaPreduzeca" :key="useriPr.id">
                <div v-if="useriPr.User">
                    <p class="card-text text-center">{{ useriPr.User.username }}</p>
                    <p class="card-text text-center">{{ useriPr.User.email }}</p>
                </div>
                <div class="d-flex justify-content-center">
                  <button type="button" class="btn btn-primary" v-on:click="formaIzmenaUseraPreduzece(useriPr)">
                      <label>Izmeni</label>
                  </button>
                </div>
          </div>
          <div class="d-flex">
            <button type="button" class="btn btn-danger" v-on:click="formaIzmenaKorisnika">
                <label>Nazad</label>
            </button>
          </div>
        </div>
    </div>
    <div class="card mb-3 card-color mx-auto" v-if="isActiveIzmenaUseraPotrosac && trPotrosacZaPrikaz">
        <div class="card-body">
          <h2 class="card-text text-center">Izmeni potrosaca</h2>
          <div class="card-body mb-3">
            <div class="input-group mb-3">
              <span class="input-group-text">Ime</span>
              <input class="form-control" type="text" name="imeIzmena" v-model="trPotrosacZaPrikaz.ime" />
            </div>

            <div class="input-group mb-3">
              <span class="input-group-text">Prezime</span>
              <input class="form-control" type="text" name="prezimeIzmena" v-model="trPotrosacZaPrikaz.prezime" />
            </div>

            <div class="input-group mb-3">
              <span class="input-group-text">Broj telefona</span>
              <input class="form-control" type="text" name="broj_telefonaIzmena"
                  v-model="trPotrosacZaPrikaz.broj_telefona" />
            </div>

            <div class="d-flex jusitfy-content-center">
              <button type="button" class="btn btn-primary" v-on:click="izmeniPotrosaca">
                  <label>Izmeni</label>
              </button>
            </div>
          </div>
          <div class="card-body">
            <button type="button" class="btn btn-danger" v-on:click="formaIzmenaUseraPotrosac">
                <label>Nazad</label>
            </button>
          </div>
        </div>
    </div>
    <div class="card mb-3 card-color mx-auto" v-if="isActiveIzmenaUseraPreduzece && trPreduzeceZaPrikaz">
        <div class="card-body">
          <h2 class="card-text text-center">Izmeni preduzece</h2>
          <div class="card-body mb-3">
            <div class="input-group mb-3">
              <span class="input-group-text">Naziv</span>
              <input class="form-control" type="text" name="nazivIzmena" v-model="trPreduzeceZaPrikaz.naziv" />
            </div>

            <div class="input-group mb-3">
              <span class="input-group-text">Lokacija</span>
              <input class="form-control" type="text" name="lokacijaIzmena" v-model="trPreduzeceZaPrikaz.lokacija" />
            </div>

            <div class="input-group mb-3">
              <span class="input-group-text">Opis</span>
              <input class="form-control" type="text" name="opisIzmena" v-model="trPreduzeceZaPrikaz.opis" />
            </div>

              <div class="d-flex justify-content-center">
                <img
                  class="img-thumbnail"
                  :src="trPreduzeceZaPrikaz.profilna_slika_link || '/uploads/default_profile_image.png'"
                  :alt="trPreduzeceZaPrikaz.profilna_slika_link || '/uploads/default_profile_image.png'"
                  width="100">
                </div>
            <div class="input-group mb-3 justify-content-center">
              <span class="input-group-text">Profilna slika:</span>
              <input class="form-control" type="file" @change="onImageSelect" accept="image/png, image/jpeg">
            </div>
            <div class="d-flex justify-content-center">
              <button type="button" class="btn btn-primary" v-on:click="izmeniPreduzece">
                Izmeni
              </button>
            </div>
          </div>
          <div class="card-body">
            <button type="button" class="btn btn-danger" v-on:click="formaIzmenaUseraPreduzece">
                <label>Nazad</label>
            </button>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import router from "../router/index.js"

export default {
  name: "IzmeniKorisnike",
  data() {
    return {
      listaPreduzeca: null,
      listaPotrosaca: null,
      trPotrosacZaPrikaz: null,
      trPreduzeceZaPrikaz: null,
      isActiveIzmenaUseraPotrosac: false,
      isActiveIzmenaUseraPreduzece: false,
      isActiveIzmenaKorisnika: true,
    }
  },
  methods: {
    formaIzmenaUseraPotrosac(izmenaUsera) {
        this.isActiveIzmenaUseraPotrosac = !this.isActiveIzmenaUseraPotrosac;
        this.isActiveIzmenaKorisnika = !this.isActiveIzmenaKorisnika;
        this.trPotrosacZaPrikaz = izmenaUsera;
    },
    formaIzmenaUseraPreduzece(izmenaUsera) {
        this.isActiveIzmenaUseraPreduzece = !this.isActiveIzmenaUseraPreduzece;
        this.isActiveIzmenaKorisnika = !this.isActiveIzmenaKorisnika;
        this.trPreduzeceZaPrikaz = izmenaUsera;
    },
    formaIzmenaKorisnika()
    {
      router.push({path: "/nalozi"});
    },
    izmeniPotrosaca() {
      try {
          if (this.trPotrosacZaPrikaz.ime && this.trPotrosacZaPrikaz.prezime && this.trPotrosacZaPrikaz.broj_telefona) {
            axios.put('/potrosaci/potrosac/' + this.trPotrosacZaPrikaz.id, {
                ime: this.trPotrosacZaPrikaz.ime,
                prezime: this.trPotrosacZaPrikaz.prezime,
                broj_telefona: this.trPotrosacZaPrikaz.broj_telefona
            })
            .then((response) => {
              window.location.reload();
            })
            .catch((error) => {
              if(error.response) alert(error.response.data.error.message);
            })

            window.location.reload();
          }
          else {
              alert("Unesite sve podatke");
          }
      } catch (error) {
          if(error.response) alert(error.response.data.error.message);
      }
    },
    izmeniPreduzece() {
        if (this.trPreduzeceZaPrikaz.naziv && this.trPreduzeceZaPrikaz.opis && this.trPreduzeceZaPrikaz.lokacija) {
            console.log("aaaaa");
              axios.put('/preduzeca/preduzece/' + this.trPreduzeceZaPrikaz.id, {
                  naziv: this.trPreduzeceZaPrikaz.naziv,
                  opis: this.trPreduzeceZaPrikaz.opis,
                  lokacija: this.trPreduzeceZaPrikaz.lokacija
              })
              .then((response) => {
                window.location.reload();
              })
              .catch((error) => {
                if(error.response) alert(error.response.data.error.message);
              })
          }
          else {
              alert("Unesite sve podatke");
          }
    },
    async onImageSelect(event)
    {
      try {
        const formData = new FormData();
        formData.append("id", this.trPreduzeceZaPrikaz.id);
        formData.append("profile_image", event.target.files[0], event.target.files[0].name);
        await axios.put("/preduzeca/preduzece/slika", formData);

        this.trPreduzeceZaPrikaz.profilna_slika_link = URL.createObjectURL(event.target.files[0]);
      } catch (error) {
        if(error.response) alert(error.response.data.error.message);
      }
    }
  },
  beforeMount()
  {
    axios.get('/preduzeca')
        .then((response) => {
            this.listaPreduzeca = response.data.data;
        })
        .then(() => {
          axios.get('/potrosaci')
          .then((response) => {
              this.listaPotrosaca = response.data.data;
          })
        })
        .catch((error) => {
            if(error.response) alert(error.response.data.error.message);
        })
  }
}
</script>
