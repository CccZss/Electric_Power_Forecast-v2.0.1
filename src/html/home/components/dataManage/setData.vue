<template>
	<section>
		<h1 class="title">设置默认值</h1>
		<div class="wrap">
			<section>
				<span class="tip">默认数据集</span>
				<Select v-model="defaultDataId" style="width:200px">
			        <Option v-for="item in allDatas" :value="item.id" :key="item.id">{{ item.dataName }}</Option>
			    </Select>
			</section>
			<section>
				<span class="tip">默认月份</span>
				<InputNumber :max="12" :min="1" v-model="defaultMonth"></InputNumber>
			</section>
			<section>
				<span class="tip">默认算法</span><br/>
				<div class="algorithm-wrap">
					<p>组合算法</p>
					<span class="algorithm-item" v-for="(item, index) in groupAlgorithm" :key="index">
						<Checkbox v-model="item.value">{{item.name}}</Checkbox>
					</span>
				</div>
				<div class="algorithm-wrap">
					<p>单算法</p>
					<span class="algorithm-item" v-for="(item, index) in singleAlgorithm" :key="index">
						<Checkbox v-model="item.value">{{item.name}}</Checkbox>
					</span>
				</div>
			</section>
        	<Button class="set-default-bt" type="primary" @click="submitDefault">确定</Button>

		</div>
	</section>
</template>

<script>
	import {mapState, mapActions} from 'vuex';
	import data from  '../../store/types/data'
	export default {
		data () {
			return {
				defaultDataId: undefined,
				defaultMonth: 1,
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
		methods: {
			...mapActions(data.actions),

			toSetDefault() {
				this.getDefault().then((data)=>{
					if(data.state){
	                    this.defaultDataId = this.data.defaultDataId
		                this.defaultMonth = this.data.defaultMonth
		                
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

			submitDefault() {
				var algorithm = [];
				this.groupAlgorithm.forEach(item => {
					if(item.value) {
						algorithm.push(item.name)
					}
				})
				this.singleAlgorithm.forEach(item => {
					if(item.value) {
						algorithm.push(item.name)
					}
				})
				this.setDefault({
					dataSetId: this.defaultDataId,
					month: this.defaultMonth,
					algorithm: algorithm
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
	.title {
		border-bottom: 2px solid #c3c3c3;
    	padding: 0 0 5px 10px;
	}
	.wrap {
		margin: 30px 40px;
		overflow: hidden
	}
	.wrap>section {
		margin-bottom: 40px;
	}
	.tip {
		display: inline-block;
		width: 6em;
		font-size: 18px;
		margin-right: 10px;
		margin-bottom: 10px;
		vertical-align: middle;
	}
	.algorithm-wrap {
		margin: 10px 0 10px 50px;
		/*border-bottom: 1px solid black;*/
		padding-bottom: 10px;
	}
	.algorithm-wrap p {
		font-size: 15px;
		color: #00adfb;
		font-weight: bold;
		margin: 0 0 10px -30px;
	}
	.algorithm-item {
		margin-right: 8px;
	}
	.set-default-bt {
		float: right;
	}
</style>