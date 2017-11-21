<template>
	<section>
		<p class="title">用电量</p>
		<section class="wrap">
			<div class="select">
				<span class="tip">用户</span>
				<Cascader class="users" :data="allUsers" v-model="currentUser"  @on-change="userChange" :render-format="userNameFormat"></Cascader>
				<span class="tip">算法</span>
				<Select v-model="algorithmName" style="width:100px" @on-change="selectChange">
					<Option v-for="(item, index) in algorithmList" :value="item" :key="index">{{ item }}</Option>
				</Select>
				<Button class="download-bt" type="primary" @click="toDownElecData">导出数据</Button>
			</div>
			<line-chart class="chart" 
				:yOriginal="datas['y_original']" 
				:yForecast="datas['y_forecast']"
				:yScatter="datas['y_scatter']"
				:xAxisData="datas.x" 
				:legend="datas.legend"
				:startValue="datas.startValue"
				:firstPredictMonth="datas.firstPredictMonth" 
				:error="datas.error" />
		</section>
	</section>
</template>

<script>
	import lineChart from './lineChart'
	import {mapState, mapActions} from 'vuex';
	import visual from  '../../store/types/visual'	
	import data from  '../../store/types/data'

	export default {
		data () {
			return {
				datas:  {
					y_original: [],
					y_forecast: [],
					y_scatter: [],
					x: [],
					legend: {},
					startValue: '',
					firstPredictMonth: '',
					error: 0
				},
				currentUser: [],
				allUsers: [],
				algorithmName: '',
				algorithmList: []
			}
		},
		computed: {
			...mapState({
                'visual': state => {
                    return state.visual
				},
				'data': state => {
                    return state.data
                }
            }),
		},
		components: {
			'line-chart': lineChart
		},
		methods: {
			...mapActions(visual.actions),
			...mapActions(data.actions),

			userNameFormat(labels, selectedData) {
				// console.log(labels, selectedData)
				const index = labels.length - 1;
				return labels[index]
			},

			userChange(value) {
				this.getCurrentUserAlgorithm(value)
			},

			selectChange() {
				
				this.getElecVisualData({
					customer: this.currentUser[this.currentUser.length - 1],
					dataSetName: this.currentUser[0],
					algorithm: this.algorithmName,
					chart: 'line'
				}).then((data)=>{
					if(data.state){
						this.datas = this.visual.chartDdata.line
						this.$Message.success(data.info)
					}else{
						this.$Message.error(data.info)
					}
				}).catch((err)=>{
					this.$Message.error(err)
				})

			},

			toDownElecData() {
				this.downloadElecData({
					customer: this.currentUser[this.currentUser.length - 1],
					dataSetName: this.currentUser[0],
					algorithm: this.algorithmName
				}).then((data)=>{
					if(data.state){
	                    window.open(data.url, '_blank')
	                }else{
	                    this.$Message.error(data.info)
	                }
				}).catch((err)=>{
	                this.$Message.error(err)
				})
			},

			getCurrentUserAlgorithm(currentUser) {
				// 获取当前用户算法名
				this.getAlgorithmList({
					customer: currentUser[1],
					dataSetName: currentUser[0]
				}).then((data)=>{
					if(data.state){
						var groupAlgorithm = this.visual.algorithmList.group
						var singleAlgorithm = this.visual.algorithmList.single
						
						this.algorithmList = groupAlgorithm.concat(singleAlgorithm)
						this.algorithmName = this.algorithmList[0]

						// 获取此用户与该用户对应算法中的一种算法的可视化数据
						this.getElecVisualData({
							customer: currentUser[currentUser.length - 1],
							dataSetName: currentUser[0],
							algorithm: this.algorithmName,
							chart: 'line'
						}).then((data)=>{
							if(data.state){
								this.datas = this.visual.chartDdata.line
								this.$Message.success(data.info)
							}else{
								this.$Message.error(data.info)
							}
						}).catch((err)=>{
							this.$Message.error(err)
						})
					
					}else{
						this.$Message.error(data.info)
					}
				}).catch((err)=>{
					this.$Message.error(err)
				})
			},

			init() {
				this.getAllUser().then((data)=>{
					if(data.state){
						var users = this.visual.allUsers
						var allUsers = [];
						var currentUser = []
						for(var item in users) {
							var obj = {
								value: item,
								label: item,
								children: []
							}
							currentUser.push(item)
							for(var item2 in users[item]) {
								var obj2 = {
									value: users[item][item2],
									label: users[item][item2],
								}
								obj.children.push(obj2)
								currentUser.push(users[item][item2])
							}
							allUsers.push(obj)
						}
						this.allUsers = allUsers
						this.currentUser = currentUser.slice(0,2)
						this.getCurrentUserAlgorithm(currentUser)
						
					}else{
						this.$Message.error(data.info)
					}
				})

			}
		},
		created() {
			this.init()
		}
	}
</script>

<style scoped>
	.wrap {
		position: relative;
		width: 90%;
		margin: auto;
		margin-top: 30px;
	}
	.select {
		margin-bottom: 5px;
		margin-left: 10px;
	}
	.tip {
		font-size: 16px;
		margin-right: 10px;
	}
	.users {
		display: inline-block;
		width: 150px;
		margin-right: 20px;
	}
	.download-bt {
		margin-left: 20px;
	}
</style>

<style>
	.users .ivu-input {
		height: 32px;
    	font-size: 14px;
	}
</style>
