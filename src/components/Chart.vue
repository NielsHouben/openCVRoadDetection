<template>
<!-- what i want is a chart tha t shows the real speed and also a line for wanted speed -->
    <apexchart width="500" type="line" :options="options" :series="series"></apexchart>
</template>

<script>
import { onMounted, defineComponent, ref } from 'vue';

export default defineComponent({
  setup () {
    onMounted(() => {
      var me = this
      let data = this.data
      window.setInterval(function () {
        getNewSeries(lastDate, {
          min: 10,
          max: 90
        })
        
        me.$refs.chart.updateSeries([{
          data: data
        }])
      }, 1000)
    
      // every 60 seconds, we reset the data to prevent memory leaks
      window.setInterval(function () {
        resetData()
        
        me.$refs.chart.updateSeries([{
          data
        }], false, true)
      }, 60000)
    })
    return {
      data: {
          series: [{
            data: data.slice()
          }],
          chartOptions: {
            chart: {
              id: 'realtime',
              height: 350,
              type: 'line',
              animations: {
                enabled: true,
                easing: 'linear',
                dynamicAnimation: {
                  speed: 1000
                }
              },
              toolbar: {
                show: false
              },
              zoom: {
                enabled: false
              }
            },
            dataLabels: {
              enabled: false
            },
            stroke: {
              curve: 'smooth'
            },
            title: {
              text: 'Dynamic Updating Chart',
              align: 'left'
            },
            markers: {
              size: 0
            },
            xaxis: {
              type: 'datetime',
              range: XAXISRANGE,
            },
            yaxis: {
              max: 100
            },
            legend: {
              show: false
            },
          },
          
          
        }
    }
  }
})
</script>

<style>

</style>