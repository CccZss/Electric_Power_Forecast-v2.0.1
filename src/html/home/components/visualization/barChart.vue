<template>
	<div id="bar" class="bar"></div>
</template>

<script>
	import echarts from 'echarts'

    export default {
    	props: ['data', 'xAxisData', 'legend', 'min'],
		data () {
			return {
				barEchart: null,
			}
		},
		computed: {
			seriesData () {
				var arr = []
				this.legend.forEach((item, index)=>{
					var y = this.data[item]
					var info = {
						name: item,
						type: 'bar',
						data: [y],
					}

					// 画阀值线
					if(index === 0) {
						info.markLine = {
							data : [
								{
									name: 'min',
									yAxis: this.min
								},
							]
						}
					}
					arr.push(info)
				})
				return arr
			},
			option () {
				return {
					backgroundColor: '#f2f6fb',
	 				tooltip : {
						trigger: 'axis',
						axisPointer : {            // 坐标轴指示器，坐标轴触发有效
							type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
						}
					},
					legend: {
						data: this.legend
					},
					grid:{
				        left: '3%',
				        right: '4%',
				        bottom: '3%',
				        containLabel: true
				    },
                    toolbox: {
                        feature: {
                            restore: {}, // 配置项还原
                            saveAsImage: {} // 保存为图片
                        }
                    },
					xAxis : [
						{
							type : 'category',
							data : [this.xAxisData]
						}
					],
					yAxis : [
						{
							type : 'value'
						}
					],
					series : this.seriesData
				}
			}
		},
		methods: {
			handleResize () {
				this.barEchart.resize()
			}
		},
		watch: {
			data () {
    			this.barEchart.setOption(this.option)
			}
		},
  		beforeDestroy () {
    		window.removeEventListener('resize', this.handleResize)
  		},
		mounted() {
	      	this.$nextTick(function() {
		        this.barEchart = echarts.init(document.getElementById('bar'))
    			this.barEchart.setOption(this.option)
    			window.addEventListener('resize', this.handleResize)
	      	})
	    }	
	}
</script>

<style scoped>
	.bar {
		height: 700px;
		width: auto;
		margin-bottom: 10px;
	}
</style>