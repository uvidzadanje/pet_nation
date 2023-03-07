<template>
  <div>
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Zakaži</button>
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style="z-index:9999">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Zakazivanje</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="input-group mb-3 col-md-4">
              <span class="input-group-text">Datum zakazivanja</span>
              <input type="date" class="form-control" :min="new Date().toISOString().slice(0, 10)" v-model="datum">
            </div>
            <div class="input-group mb-3 col-md-4">
              <span class="input-group-text">Broj sati</span>
              <input type="number" class="form-control" v-model="broj_sati">
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Otkaži</button>
            <button type="button" class="btn btn-primary" @click="zakaziUslugu()">Zakaži</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'ModalUsluge',
    props: ['uslugaID'],
    data() {
        return {
            isTurnedOn: false,

            datum: null,
            broj_sati: null,
        }
    },
    methods: {
        zakaziUslugu() {
            axios.post('/zakazivanja/zakazivanje/', {
                datum_zakazivanja: this.datum,
                broj_sati: this.broj_sati,
                usluga_id: this.uslugaID,
            })
            .then((response) => {
                alert("Uspesno zakazivanje")
            })
            .catch((error) => {
              if(error.response)
              {
                if(error.response.status === 401)
                {
                  alert("Morate se prvo ulogovati");
                }
                if(error.response.status === 404)
                {
                  alert("Morate biti ulogovani kao potrosac!");
                }
                else
                {
                  alert(error.response.data.error.message);
                }
              }

            })
        },

    },
}
</script>
