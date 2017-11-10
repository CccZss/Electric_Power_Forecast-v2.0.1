<template>
	<section>
		<p class="title">预测误差</p>
		<section class="wrap">
			<span class="select">
				<span class="tip">用户</span>
				<Cascader class="users" :data="allUsers" v-model="currentUser"  @on-change="userChange" :render-format="userNameFormat"></Cascader>
			</span>
			<Button class="download-bt" type="primary" @click="toDownErrorData" >导出数据</Button>
			<bar-chart class="chart" 
				:data="datas.y" 
				:xAxisData="datas.x" 
				:legend="datas.algorithm"
				:min="datas.min" />
		</section>
	</section>
</template>

<script>
	import barChart from './barChart'

	import {mapState, mapActions} from 'vuex';
	import visual from  '../../store/types/visual'
	import data from  '../../store/types/data'
	export default {
		data () {
			return {
				datas: {
					x: [],
					y: {},
					algorithm: [],
					min: 0
				},
				currentUser: [],
				allUsers: [],
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
			'bar-chart': barChart
		},
		methods: {
			...mapActions(visual.actions),
			...mapActions(data.actions),

			userNameFormat(labels, selectedData) {
				const index = labels.length - 1;
				return labels[index]
			},

			userChange(value) {
				this.getErrorVisualData({
					customer: value[value.length - 1],
				}).then((data)=>{
					if(data.state){
						this.datas = this.visual.chartDdata.bar
						this.$Message.success(data.info)
					}else{
						this.$Message.error(data.info)
					}
				}).catch((err)=>{
					this.$Message.error(err)
				})
			},

			toDownErrorData() {
				this.downloadErrorData({
					customer: this.currentUser[this.currentUser.length - 1],
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
						}
						this.allUsers = allUsers
						this.currentUser = currentUser.slice(0,3)
						this.userChange(this.currentUser)
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
		display: inline-block;
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
		
	}
</style>

<style>
	.users .ivu-input {
		height: 32px;
    	font-size: 14px;
	}
</style>
