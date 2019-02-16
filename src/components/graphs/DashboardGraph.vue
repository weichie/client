<template>
   <div :class="parentClass">

		<apexchart 
         id="chart"
         ref="chart"
         :height="height"
         :options="chartOptions"
         :series="series"
      />

	</div>
</template>

<script>
   import VueApexCharts from 'vue-apexcharts'

   export default {
      name: 'DashboardChart',

      components: {
			apexchart: VueApexCharts
      },
      
      props: {
         parentClass: String,
         height: String
      },

      data(){
         return{
            chartOptions: {
               chart: {
                  id: 'chart',
                  type: 'spline',
						toolbar: {show: false},
						animations: {enabled: this.animation}
               },
               markers: {size: 0},
               legend: {show: false},
               stroke: {
						curve: 'smooth',
						width: 3,
					},
            },
            series: [{
               name: 'expenses',
               data: [11, 32, 45, 32, 34, 52, 41]
            },{
               name: 'income',
               data: [31, 40, 28, 51, 42, 109, 100]
            }]
         }
      }
   }
</script>

