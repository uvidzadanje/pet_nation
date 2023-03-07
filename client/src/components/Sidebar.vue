<template>
  <aside class="cart-container" style="z-index:9">
    <div class="cart">
      <h1 class="cart-title spread">
        <span>
          Korpa
          <i class="icofont-cart-alt icofont-1x"></i>
        </span>
        <button @click="toggle" class="cart-close">&times;</button>
      </h1>

      <div class="cart-body">
        <table class="cart-table">
          <thead>
            <tr>
              <th>Proizvod</th>
              <th>Cena</th>
              <th>Kol.</th>
              <th>Ukupno:</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="proizvod in cart" :key="proizvod.id">
              <td>{{ proizvod.naziv }}</td>
              <td>${{ proizvod.cena }}</td>
              <td class="center"><button @click="decKolicina(proizvod.id)" style="background-color: #520908; color: white;" class="btn me-2">-</button>{{ proizvod.kolicina }}<button @click="incKolicina(proizvod.id)" style="background-color: #520908; color: white;" class="btn ms-2">+</button></td>
              <td>${{ proizvod.kolicina * proizvod.cena }}</td>
              <td class="center">
                <button @click="remove(proizvod.id)" class="btn btn-light cart-remove">
                  &times;
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <p class="center mt-2" v-if="!Object.keys(cart).length"><em>Nema proizvoda u korpi</em></p>
        <div class="mt-2">
          <div class="spread">
            <span><strong>Ukupno:</strong> ${{ calculateTotal() }}</span>
            <button class="btn btn-light" @click="startBuyingProcess">Kupi</button>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>

<script>
import router from "../router/index.js";

export default {
  props: ['toggle', 'cart', 'remove', 'incKolicina', 'decKolicina'],
  data()
  {
    return {
      type: null
    }
  },
  methods: {
    calculateTotal () {
      const total = Object.entries(this.cart).reduce((acc, curr, index) => {
        return acc + (+curr[1].cena * +curr[1].kolicina);
      }, 0)
      return total.toFixed(2)
    },
    startBuyingProcess()
    {
      if(!this.type)
      {
        alert("Morate biti ulogovani!");
        return;
      }

      if(this.type !== "potrosac")
      {
        alert("Morate biti potrosac da biste pristupili ovom delu!");
        return;
      }

      if(!Object.entries(this.cart).length)
      {
        alert("Korpa je prazna. Dodajte neki proizvod");
        return;
      }
      this.toggle();
      router.push({
        name: "BuyProcess",
        params: { proizvodi: JSON.stringify(Object.entries(this.cart))}
      });
    }
  },
  beforeMount()
  {
    this.type = localStorage.getItem("type")
  }
}
</script>
