<template>
	<section>
		<p class="title">设置默认值</p>
		<div class="info-wrap blue-bar">
			<section>
				<span class="tip">默认数据集：</span>
				<Select v-model="defaultDataId" style="width:200px">
			        <Option v-for="item in allDatas" :value="item.id" :key="item.id">{{ item.dataName }}</Option>
			    </Select>
			</section>
			<section>
				<span class="tip">默认月份：</span>
				<InputNumber :max="12" :min="1" v-model="defaultMonth"></InputNumber>
			</section>
			<span class="tip">默认算法：</span><br/>
			<set-algorithm class="algorathm"
				:groupAlgorithm = "groupAlgorithm"
				:singleAlgorithm = "singleAlgorithm"
				@on-change = "setDefaultAlgorithm"
			></set-algorithm>
        	<Button class="set-default-bt my-bt" type="primary" @click="submitDefault">确定</Button>
		</div>
	</section>
</template>

<script>
	import setAlgorithm from './setAlgorithm'
	import {mapState, mapActions} from 'vuex';
	import data from  '../../store/types/data'
	export default {
		data () {
			return {
				defaultDataId: undefined,
				defaultMonth: 1,
				defaultAlgorithm: [],
				groupAlgorithm: [],
				singleAlgorithm: [],
				allDatas: [],
			}
		},
		computed: {
			...mapState({
                'data': state => {
                    return state.data
                }
            }),
		},
		components: {
			'set-algorithm' : setAlgorithm
		},
		methods: {
			...mapActions(data.actions),

			toSetDefault() {
				this.getDefault().then((data)=>{
					if(data.state){
	                    this.defaultDataId = this.data.defaultDataId
						this.defaultMonth = this.data.defaultMonth
						this.defaultAlgorithm = this.data.defaultAlgorithm.group.concat(this.data.defaultAlgorithm.single)
		                
		                var arr = this.data.defaultAlgorithm;
		                arr.group.forEach((item)=>{
		                	this.groupAlgorithm.forEach((alg, index)=>{
		                		if(alg.name === item) {
		                			this.groupAlgorithm[index].value=true
		                		}
		                	})
		                })
		                arr.single.forEach((item)=>{
		                	this.singleAlgorithm.forEach((alg, index)=>{
		                		if(alg.name === item) {
		                			this.singleAlgorithm[index].value=true
		                		}
		                	})
		                })
	                }else{
	                    this.$Message.error(data.info)
	                }
				}).catch((err)=>{
	                this.$Message.error(err)
				})
			},

			setDefaultAlgorithm(arr) {
				this.defaultAlgorithm = arr
			},

			submitDefault() {	
				this.setDefault({
					dataSetId: this.defaultDataId,
					month: this.defaultMonth,
					algorithm: this.defaultAlgorithm
				}).then((data)=>{
					if(data.state){
	                    this.$Message.success(data.info)
	                }else{
	                    this.$Message.error(data.info)
	                }
				}).catch((err)=>{
	                this.$Message.error(err)
				})
			}
		},
		created() {
			this.getAllDatas().then((data)=>{
				if(data.state){
                    this.allDatas = this.data.allDataList
                }else{
                    this.$Message.error(data.info)
                }
			}).catch((err)=>{
                this.$Message.error(err)
			})

			this.getAllAlgorithm().then((data)=>{
				if(data.state){
                    var groupAlgorithm = this.data.allAlgorithmList.group
                    var singleAlgorithm = this.data.allAlgorithmList.single

                    var gArr = [];
                    var sArr = [];
                    groupAlgorithm.forEach((item)=>{
                    	gArr.push({
                    		value: false,
                    		name: item
                    	})
                    })
                    singleAlgorithm.forEach((item)=>{
                    	sArr.push({
                    		value: false,
                    		name: item
                    	})
                    })
                    this.groupAlgorithm = gArr
                    this.singleAlgorithm = sArr

                    this.toSetDefault()
                }else{
                    this.$Message.error(data.info)
                }
			}).catch((err)=>{
                this.$Message.error(err)
			})
		}
	}
</script>

<style scoped>
	.info-wrap {
		width: 700px;
		height: 500px;
	    padding: 30px 40px;
	    margin: 50px 0 0 15%;
	    box-shadow: 1px 1px 8px 1px #b1b1b1;
	}
	.info-wrap > section {
		margin-bottom: 30px;
	}
	.tip {
		display: inline-block;
		width: 6em;
		font-size: 18px;
		margin-right: 10px;
		margin-bottom: 10px;
		vertical-align: middle;
	}
	.algorathm {
		position: relative;
		left: 6rem;
		top: -35px;
	}
	.set-default-bt {
		float: right;
		width: 100px;
	}
</style>