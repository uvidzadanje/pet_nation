<template>
  <input
    :disabled="enabled"
    class="rating"
    max="5"
    oninput="this.style.setProperty('--value', `${this.valueAsNumber}`)"
    step="0.5"
    :style="'--value:'+ value"
    type="range"
    v-model="value"
    style="background-color:transparent;">
</template>

<script>
export default {
    name: 'Rating',
    props: ['value', 'enabled'],
    data() {
        return {

        }
    },
    methods: {
        vratiVrednost() {
            const value=document.querySelector('.rating').value
            this.$emit('vrednost', value);
        }
    },
    beforeMount() {
        this.emitter.on('getVrednost', () => {
            this.emitter.emit('dajVrednost', this.value)
        })
    }
}
</script>
