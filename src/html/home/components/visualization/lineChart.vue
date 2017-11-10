<template>
	<div id="line" class="line"></div>
</template>

<script>
	import echarts from 'echarts'
	import { mapActions } from 'vuex'  
	import theme from './line_chart_theme'

    export default {
    	props: {
            data: {
                default: {}
            }, 
            xAxisData : {
                default: {}
            }, 
            firstPredictMonth: {
                default: ''
			},
			min: {
				default: 0
			},
			max: {
				default: 0
			}
        },
		data () {
			return {
				lineEchart: null,
			}
		},
		computed: {
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
				    grid:{
				        left: '3%',
				        right: '4%',
				        bottom: '3%',
				        containLabel: true
				    },
			        dataZoom: [
					  	{
                            type: 'slider', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
                            start: 0,      // 左边在 0% 的位置。
                            end: 100         // 右边在 100% 的位置。
                        },
			            {   // 这个dataZoom组件，也控制x轴。
                            type: 'inside', // 这个 dataZoom 组件是 inside 型 dataZoom 组件
                            start: 0,      // 左边在 0% 的位置。
                            end: 100         // 右边在 100% 的位置。
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
				            name:'counts',
				            type:'line',
				            barWidth: '60%',
				            data: this.data,
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
									{
										name: 'max',
										yAxis: this.max
									},
									{
										name: 'min',
										yAxis: this.min
									}
                                ]
                            }
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
			data () {
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