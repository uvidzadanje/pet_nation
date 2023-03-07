<template>
  <div class="d-flex overflow-auto align-items-center gap-2">
    <div class="position-relative" v-for="slika in slike"
      :key="slika.id">
      <img
      :src="slika.slika_link"
      :alt="slika.slika_link"
      class="img-thumbnail"
      style="height:100px; min-width:100px; width:auto;">
      <button type="button" class="btn-close position-absolute top-0 end-0" @click="obrisiSliku(slika.id)"></button>
    </div>
    <div>
      <input type="file" @change="dodajSliku" accept="image/png, image/jpeg">
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: "StavkaImages",
  props: ["slike_props", "stavka_id"],
  data()
  {
    return {
      slike: [],
    }
  },
  methods: {
    dodajSliku(event)
    {
      const fd = new FormData();
      fd.append("stavka_image", event.target.files[0]);
      fd.append("stavka_id", this.stavka_id);
      axios.post("/stavka-slike/slika/", fd)
      .then((response) => {
        this.slike.push(response.data.data.nova_slika);
      })
      .catch((error) => {
        if(error.response) alert(error.response.data.error.message);
      })
    },
    obrisiSliku(id)
    {
      axios.delete("/stavka-slike/slika/"+id)
      .then((response) => {
        this.slike = this.slike.filter(el => el.id !== id);
        alert(response.data.data.message);
      })
      .catch((error) => {
        if(error.response) alert(error.response.data.error.message);
      })
    }
  },
  beforeMount()
  {
    this.slike = this.slike_props;
  }
}
</script>
