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
				:data="datas.y" 
				:xAxisData="datas.x" 
				:firstPredictMonth="datas.firstPredictMonth" 
				:min="datas.min"
				:max="datas.max" />
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
					y: [],
					x: [],
					firstPredictMonth: '',
					min: 0,
					max: 0
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

				this.getElecVisualData({
					customer: value[value.length - 1],
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

			selectChange() {
				this.getElecVisualData({
					customer: this.currentUser[this.currentUser.length - 1],
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
							for(var item1 in users[item]) {
								var obj1 = {
									value: item1,
									label: item1,
									children: []
								}
								currentUser.push(item1)
								for(var item2 in users[item][item1]) {
									var obj2 = {
										value: users[item][item1][item2],
										label: users[item][item1][item2],
									}
									currentUser.push(users[item][item1][item2])
									obj1.children.push(obj2)
								}
								obj.children.push(obj1)
							}
							allUsers.push(obj)


							// 获取所有算法名
							this.getAllAlgorithm().then((data)=>{
								if(data.state){
									var groupAlgorithm = this.data.allAlgorithmList.group
									var singleAlgorithm = this.data.allAlgorithmList.single
									
									this.algorithmList = groupAlgorithm.concat(singleAlgorithm)
									this.algorithmName = this.algorithmList[0]
								
								}else{
									this.$Message.error(data.info)
								}
							}).catch((err)=>{
								this.$Message.error(err)
							})
						}
						this.allUsers = allUsers
						this.currentUser = currentUser.slice(0,3)
						
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
