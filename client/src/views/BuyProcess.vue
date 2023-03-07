<template>
  <div class="card col-md-6 mx-auto mt-5 mb-5">
    <div class="card-body card-color">
      <Transition name="slide-fade">
        <div class="d-flex flex-column" v-if="currentStep === 1">
          <p class="h2">Unošenje adrese</p>
          <div class="form-floating mb-3">
            <input type="text" id="adresa" v-model="adresa" class="form-control" placeholder="Unesite adresu">
            <label for="adresa">Unesite adresu</label>
          </div>
          <div class="ms-auto">
            <button @click="nextStep" class="btn btn-primary">Dalje</button>
          </div>
        </div>
      </Transition>
      <Transition name="slide-fade">
        <div class="d-flex flex-column" v-if="currentStep === 2">
          <p class="h2">Potvrda kupovine</p>
          <div class="card-body mb-3" v-for="product in products" :key="product[1].id">
            <p class="card-text fw-bold h-4">{{ product[1].naziv }}</p>
            <p class="card-text">Cena: {{ product[1].cena }}</p>
            <p class="card-text">Kolicina: {{ product[1].kolicina }}</p>
            <p class="card-text">Ukupna cena: {{ +product[1].cena * +product[1].kolicina }}</p>
          </div>
          <div class="card-body mb-3">
              <p class="card-text">
                <span class="fw-bold">Adresa:</span> {{ adresa }}
              </p>
          </div>
          <div class="d-flex justify-content-between">
            <button @click="prevStep" class="btn btn-primary">Nazad</button>
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
              Potvrđujem podatke
            </button>
          </div>
        </div>
      </Transition>
    </div>
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style="z-index:9999">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Potvrda kupovine</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            Da li ste sigurni da želite da potvrdite kupovinu? Moći ćete u bilo kom trenutku da promenite podatke za istu.
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Ne</button>
            <button type="button" class="btn btn-primary" @click="kreirajKorpu">Da</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import router from "../router/index.js"

export default {
  name: "BuyProcess",
  props: ["proizvodi"],
  data() {
    return {
      products: [],
      adresa: "",
      currentStep: 1,
      isTurnedOn: false,
    }
  },
  methods: {
    nextStep()
    {
      if(this.currentStep === 1)
      {
        if(!this.adresa)
        {
          alert("Adresa je obavezna!");
          return;
        }
      }

      this.currentStep++;
    },
    prevStep()
    {
      this.currentStep--;
    },
    async kreirajKorpu()
    {
      try {
        const korpaID = (await axios.post("/korpe/korpa", {
          adresa_isporuke: this.adresa,
        })).data.data.id;

        this.products.forEach(async proizvod => {
          await axios.post("/kupovine/kupovina", {
            korpa_id: korpaID,
            proizvod_id: proizvod[1].id,
            kolicina: proizvod[1].kolicina
          });
        });

        alert("Uspesno napravljena kupovina");
        this.emitter.emit("clearCart");
      } catch (error) {
        if(error.response) alert(error.response.data.error.message);
      }
    }
  },
  beforeMount()
  {
    if(this.proizvodi) this.products = JSON.parse(this.proizvodi);
    else
    {
      if(localStorage.getItem("cart"))
      {
        this.products = Object.entries(JSON.parse(localStorage.getItem("cart")));
      }
    }

    if(!this.proizvodi || !this.proizvodi.length) router.push({path: "/"});
  }
}
</script>
