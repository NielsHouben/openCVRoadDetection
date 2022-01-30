<template>
  <!-- what i want is a chart tha t shows the real speed and also a line for wanted speed -->
  <apexchart
    style="width: 80vw;"
    height="400"
    type="line"
    :options="options"
    :series="series"
  ></apexchart>
  <q-btn @click="newData()" color="blue">next data points</q-btn>
  {{ $store.state.dupASpeed }}
</template>

<script>
import { onMounted, defineComponent, ref, reactive, computed } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    onMounted(() => {});
    return {
      series: ref([
        {
          name: "Actual Speed",
          data: [...Array(50)].map(_ => Math.ceil(Math.random() * 1000))
        }
        // {
        //   name: "Target value",
        //   data: [...Array(50)].fill(0)
        // }
      ]),
      options: reactive({
        chart: {
          type: "line",
          zoom: { enabled: false },
          animations: { enabled: false },
          toolbar: { show: false }
        },
        title: {
          text: "Actual speed",
          align: "left"
        },
        xaxis: { labels: { show: false } },
        annotations: {
          yaxis: [
            {
              y: 0,
              strokeDashArray: 10,
              borderColor: "#FF0000"
            }
          ]
        }
      })
    };
  },
  methods: {
    newData(aSpeed = Math.floor(Math.random() * (1000 - 0 + 1)) + 0) {
      let newData = [...this.series[0].data.slice(1), aSpeed];
      console.log(newData);
      this.series = [
        {
          data: newData
        }
      ];
    }
  },
  mounted() {
    const store = useStore();
    store.watch(
      state => state.tSpeed,
      () => {
        let obj = JSON.parse(JSON.stringify(this.options));
        obj.annotations.yaxis[0].y = parseInt(store.state.tSpeed);
        this.options = obj;
        this.series = [{ data: this.series[0].data }];
      }
    );
    store.watch(
      state => state.aSpeed,
      () => {
        this.newData(store.state.aSpeed);
      }
    );
    store.watch(
      state => state.dupASpeed,
      () => {
        this.newData(store.state.aSpeed);
      }
    );
  }
});
</script>

<style></style>
