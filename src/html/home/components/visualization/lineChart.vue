<template>
	<div id="line" class="line"></div>
</template>

<script>
	import echarts from 'echarts'
	import { mapActions } from 'vuex'  
	import theme from './line_chart_theme'

    export default {
    	props: {
            yOriginal: {
			}, 
			yForecast: {
			}, 
			yScatter: {
			},
            xAxisData : {
			}, 
			legend: {
			},
			startValue: {
				default: ''
			},
            firstPredictMonth: {
                default: ''
			},
			error: {
				default: 0
			},
        },
		data () {
			return {
				lineEchart: null,
				yTopError: [],
				yDownError: [],
			}
		},
		computed: {
			legendList() {
				var arr = []
				for(var name in this.legend) {
					arr.push(this.legend[name])
				}
				return arr
			},
			option () {
				return {
                    /* title: {
                        text: '用电量走势图'
					}, */
					backgroundColor: '#f2f6fb',
				    tooltip: {
				        trigger: 'axis', // 坐标轴触发
                        // 十字准星指示器
                        axisPointer: {
                            type: 'cross',
                            label: {
                                backgroundColor: '#6a7985'
                            }
                        }
					},
					legend: {
						data: this.legendList
					},
				    grid:{
				        left: '3%',
				        right: '4%',
				        bottom: '3%',
				        containLabel: true
				    },
			        dataZoom: [
					  	{
							type: 'slider', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
							startValue: this.startValue
                        },
			            {   // 这个dataZoom组件，也控制x轴。
                            type: 'inside', // 这个 dataZoom 组件是 inside 型 dataZoom 组件
                            startValue: this.startValue
                        },
                    ],
                    toolbox: {
                        feature: {
                            restore: {}, // 配置项还原
                            saveAsImage: {} // 保存为图片
                        }
                    },
				    xAxis : [
				        {
				            type : 'category',
                            data : this.xAxisData,
                            boundaryGap: false,
				            axisTick: {
				                alignWithLabel: true
				            }
				        }
				    ],
				    yAxis : [
				        {
				            type : 'value'
				        }
				    ],
				    series : [
				        {
				            name: this.legend.original,
				            type:'line',
				            barWidth: '60%',
				            data: this.yOriginal,
                            smooth: false,
                            markLine : {
                                lineStyle: {
                                    normal: {
                                        color: "red"
                                    }
                                },
                                data : [
									{ 
										name: '起始预测时间',
										xAxis: this.firstPredictMonth
									},
                                ]
                            }
						},
						{
				            name: this.legend.forecast,
				            type:'line',
				            barWidth: '60%',
				            data: this.yForecast,
                            smooth: false,
						},
						{
				            name: this.legend.max,
				            type:'line',
				            barWidth: '60%',
				            data: this.yTopError,
							smooth: true,
							lineStyle: {
								normal: {
									width: 2,
								}
							}
						},
						{
				            name: this.legend.min,
				            type:'line',
				            barWidth: '60%',
				            data: this.yDownError,
							smooth: true,
							lineStyle: {
								normal: {
									width: 2,
								}
							}
				        },
						{
							name: this.legend.test,
							type: 'scatter',
							data: this.yScatter,
						}
				    ]
				}
			}
		},
		methods: {
			handleResize () {
				this.lineEchart.resize()
			},
		},
		watch: {
			yOriginal () {
				var topError = []
				var downError = []
				this.yOriginal.forEach((item, i) => {
					if(item) {
						topError.push(item * (1 + Number(this.error)))
						downError.push(item * (1 - Number(this.error)))
					}else{
						topError.push(this.yForecast[i] * (1 + Number(this.error)))
						downError.push(this.yForecast[i] * (1 - Number(this.error)))
					}
				})
				this.yTopError = topError;
				this.yDownError = downError;
				this.lineEchart.setOption(this.option)
			},
		},
  		beforeDestroy () {
    		window.removeEventListener('resize', this.handleResize)
  		},
		mounted() {
	      	this.$nextTick(function() {
		        this.lineEchart = echarts.init(document.getElementById('line'), theme)
    			this.lineEchart.setOption(this.option)
    			window.addEventListener('resize', this.handleResize)
			})
			
	    }	
	}
</script>

<style scoped>
	.line {
		height: 700px;
		width: auto;
		margin-bottom: 10px;
	}
</style>