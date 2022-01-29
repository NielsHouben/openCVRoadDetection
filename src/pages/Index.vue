<template>
  <q-page class="flex flex-center">
    <div class="main">
      <q-btn  @click="$pub()" color="green">start</q-btn>
      <q-btn  @click="$pub()" color="red">stop</q-btn>
      <q-input @keydown="$pub()" outlined v-model="bör" label="bör hastighet" />
      <q-input @keydown="$pub()" outlined v-model="kp" label="kp" />
    </div>
    <div class="main">
      <q-btn  @click="newData()" color="red">stop</q-btn>
    </div>
    <Chart />
    {{series}}
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue';
import Chart from 'components/Chart.vue'

export default defineComponent({
  name: 'PageIndex',
  components: {
    Chart
  },
  setup () {
    return {
      bör: ref(''),
      kp: ref(''),
      series: ref([{
        name: 'series-1',
        // data: [...Array(25).keys()]
        data: new Array(25).fill(0)
      }])
    }
  },
  methods: {
    newData() {
      // this.series.data = [...this.series.data.slice(1), 4]
      const max = 90;
      const min = 20;
      // let newData = this.series[0].data.map(() => {
      //   return Math.floor(Math.random() * (max - min + 1)) + min
      // })

      let newData = [...this.series[0].data.slice(1), Math.floor(Math.random() * (max - min + 1)) + min]

      console.log(newData)
      this.series = [{
        data: newData
      }]
    }
  }
})
</script>

<style lang="scss" scoped>
.main {
  display: flex
}
.main * {
  margin: 10px;
}

</style>