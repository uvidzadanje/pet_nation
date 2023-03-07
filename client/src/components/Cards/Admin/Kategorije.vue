<template>
  <div class="card col-md-6 mx-auto card-color mb-5 mt-5">
    <div class="card-body">
      <h2 class="card-title text-center">Upravljanje kategorijama</h2>
      <div class="card-body">
        <select @change="getSubCategories($event)" v-model="selectedRootCategory" class="form-control">
          <option v-for="kategorija in kategorije" :key="kategorija.id" :value="kategorija.id">{{kategorija.naziv}}</option>
        </select>
        <div class="btn btn-primary" @click="showSub">Dodaj podkategoriju</div>
        <div v-if="isAddSub">
          <input type="text" v-model="newSubCategory">
          <button class="btn btn-primary" @click="addSub">Dodaj</button>
        </div>
      </div>
      <div class="card-body" v-if="subcategories.length > 0 && step > 1">
        <select v-model="selectedSubCategory" @change="getCategories($event)" class="form-control">
          <option v-for="kategorija in subcategories" :key="kategorija.id" :value="kategorija.id">{{kategorija.naziv}}</option>
        </select>
        <div class="btn btn-primary" @click="showCat">Dodaj kategoriju</div>
        <div class="btn btn-primary ms-2" @click="showEditSub">Izmeni</div>
        <div class="btn btn-danger ms-2" @click="obrisiPodkategoriju">Obriši</div>
        <div v-if="isAddCat">
          <input type="text" v-model="newCategory">
          <button class="btn btn-primary" @click="addCat">Dodaj</button>
        </div>
        <div v-if="isEditSub">
          <input type="text" v-model="editSubCategory">
          <button class="btn btn-primary" @click="updateSubCategory">Prihvati izmene</button>
        </div>
      </div>
      <div class="card-body" v-if="categories.length > 0 && step > 2">
        <select v-model="selectedCategory" class="form-control">
          <option v-for="kategorija in categories" :key="kategorija.id" :value="kategorija.id">{{kategorija.naziv}}</option>
        </select>
        <div class="btn btn-primary" @click="showEditCat">Izmeni</div>
        <div class="btn btn-danger ms-2" @click="obrisiKategoriju">Obriši</div>
        <div v-if="isEditCat">
          <input type="text" v-model="editCategory">
          <button class="btn btn-primary" @click="updateCategory">Prihvati izmene</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: "Kategorije",
  props: ["kategorije"],
  data() {
    return {
      selectedRootCategory: null,
      selectedSubCategory: null,
      selectedCategory: null,
      isEditSub: false,
      isEditCat: false,
      isAddCat: false,
      isAddSub: false,
      subcategories: [],
      categories: [],
      step: 1,
      newCategory: null,
      newSubCategory: null,
      editCategory: null,
      editSubCategory: null,
    }
  },
  methods: {
    async getSubCategories(event)
    {
      try {
        this.step = 2;
        const response = await axios.get("/kategorije/"+this.selectedRootCategory);
        const subcategories = response.data.data;
        this.turnOffEditors();
        this.turnOffForms();
        this.selectedSubCategory = false;
        this.selectedCategory = false;
        this.subcategories = subcategories;
      } catch (error) {
        if(error.response) alert(error.response.data.error.message);
      }
    },
    async getCategories(event)
    {
      try {
        this.step = 3;
        const response = await axios.get("/kategorije/"+this.selectedSubCategory);
        const subcategories = response.data.data;
        this.turnOffEditors();
        this.turnOffForms();
        this.selectedCategory = false;
        this.categories = subcategories;
      } catch (error) {
        if(error.response) alert(error.response.data.error.message);
      }
    },
    showSub()
    {
      if(!this.selectedRootCategory)
      {
        alert("Morate izabrati glavnu kategoriju!");
        return;
      }
      this.isAddSub = !this.isAddSub;
    },
    showCat()
    {
      if(!this.selectedSubCategory)
      {
        alert("Morate izabrati podkategoriju!");
        return;
      }
      this.isAddCat = !this.isAddCat;
    },
    async addSub()
    {
      try {
        const response = await axios.post("/kategorije/kategorija", {
          naziv: this.newSubCategory,
          nadkategorija_id: this.selectedRootCategory
        })
        const kategorija = response.data.data.kategorija;
        this.subcategories.push(kategorija);
        this.isAddSub = false;
        alert("Uspešno dodata podkategorija!");
      } catch (error) {
        if(error.response) alert(error.response.data.error.message);
      }
    },
    async addCat()
    {
      try {
        const response = await axios.post("/kategorije/kategorija", {
          naziv: this.newCategory,
          nadkategorija_id: this.selectedSubCategory
        })
        const kategorija = response.data.data.kategorija;
        this.categories.push(kategorija);
        this.isAddCat = false;
        alert("Uspešno dodata kategorija!");
      } catch (error) {
        if(error.response) alert(error.response.data.error.message);
      }
    },
    async showEditSub()
    {
      if(!this.selectedSubCategory)
      {
        alert("Izaberite podkategoriju!");
        return;
      }

      if(!this.isEditSub)
      {
        const response = await axios.get("/kategorije/kategorija/"+this.selectedSubCategory);
        this.editSubCategory = response.data.data.naziv;
      }

      this.isEditSub = !this.isEditSub;
    },
    async showEditCat()
    {
      if(!this.selectedCategory)
      {
        alert("Izaberite kategoriju!");
        return;
      }
      if(!this.isEditCat)
      {
        const response = await axios.get("/kategorije/kategorija/"+this.selectedCategory);
        this.editCategory = response.data.data.naziv;
      }

      this.isEditCat = !this.isEditCat;
    },
    async updateSubCategory()
    {
      if(!this.editSubCategory)
      {
        alert("Kategorija ne sme da bude bez imena!");
        return;
      }

      try {
        const response = await axios.put("/kategorije/kategorija/", {
          id: this.selectedSubCategory,
          naziv: this.editSubCategory
        })
        this.subcategories.filter(el => el.id === this.selectedSubCategory)[0].naziv = this.editSubCategory;
        this.isEditSub = false;
        alert(response.data.data.message);
      } catch (error) {
        if(error.response) alert(error.response.data.error.message);
      }
    },
    async updateCategory()
    {
      if(!this.editCategory)
      {
        alert("Kategorija ne sme da bude bez imena!");
        return;
      }

      try {
        const response = await axios.put("/kategorije/kategorija/", {
          id: this.selectedCategory,
          naziv: this.editCategory
        })
        this.categories.filter(el => el.id === this.selectedCategory)[0].naziv = this.editCategory;
        this.isEditCat = false;
        alert(response.data.data.message);
      } catch (error) {
        if(error.response) alert(error.response.data.error.message);
      }
    },
    async obrisiPodkategoriju()
    {
      if(!this.selectedSubCategory)
      {
        alert("Morate prvo izabrati podkategoriju za brisanje!");
        return;
      }
      try {
        const response = await axios.delete("/kategorije/kategorija/"+this.selectedSubCategory);
        this.subcategories = this.subcategories.filter(el => el.id !== this.selectedSubCategory);
        this.step = 2;
        alert(response.data.data.message);
      } catch (error) {
        if(error.response) alert(error.response.data.error.message);
      }
    },
    async obrisiKategoriju()
    {
      if(!this.selectedCategory)
      {
        alert("Morate prvo izabrati kategoriju za brisanje!");
        return;
      }
      try {
        const response = await axios.delete("/kategorije/kategorija/"+this.selectedCategory);
        this.categories = this.categories.filter(el => el.id !== this.selectedCategory);
        alert(response.data.data.message);
      } catch (error) {
        if(error.response) alert(error.response.data.error.message);
      }
    },
    turnOffEditors()
    {
      this.isEditSub = false;
      this.isEditCat = false;
    },
    turnOffForms()
    {
      this.isAddSub = false;
      this.isAddCat = false;
    },
  }
}
</script>
