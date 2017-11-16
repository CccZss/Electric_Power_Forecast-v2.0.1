<!-- 列表，删除，查看详细 -->
<template>
	<section class="check-data-wrap">
		<p class="title">查看数据</p>
		<div v-for="item in allDatas" class="all-datas" :key="item.id">
			<dataItem
				:dataName = "item.dataName"
				:id = "item.id"
				@show-data-info = "showDataInfo"
			></dataItem>
		</div>
		<center v-show="data.allDataList <= 0"><h1>尚未上传数据集，请到【导入数据】导入</h1></center>
		<section v-show="column.length!=0" class="data-info-wrap">
			<span @click="toClearDataInfo"><Icon type="close-circled" class="close-bt"></Icon></span>
			<Table class="table" 
				:columns="column" 
				:data="columnData" 
				:width="tableWidth" 
				:height="tableHeight"
				border></Table>
			<section class="shadow"></section>
		</section>
	</section>
</template>

<script>
	import {mapState, mapActions} from 'vuex';
	import data from  '../../store/types/data'
	import dataItem from './dataItem'

	export default {
		data () {
			return {
				allDatas: [],
				column: [],
				columnData: [],
				tableWidth: undefined,
				tableHeight: undefined
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
			dataItem
		},
		methods: {
			...mapActions(data.actions),

			showDataInfo() {
				this.column = this.data.dataInfo.column
				this.columnData = this.data.dataInfo.columnData
			},

			toClearDataInfo() {
				this.clearDataInfo().then((data)=>{
					if(data.state){
	                    this.column = this.data.dataInfo.column
						this.columnData = this.data.dataInfo.columnData
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
			this.tableWidth = document.body.clientWidth;
			this.tableHeight = document.body.clientHeight - 20;
		}
	}
</script>

<style scoped>
	.check-data-wrap {
		overflow: hidden;
	}
	.all-datas {
		width: 96%;
		margin: auto;
		margin-top: 40px;
	}
	.data-info-wrap {
		width: 100%;
	}
	.table {
	    position: absolute;
	    top: 50px;
	    z-index: 100;
	    padding: 5px;
	    background-color: white;
	}
	.shadow{
		position: absolute;
		top: 0;
		left: 0;
		z-index: 99;
		width: 100%;
		height: 100%;
		background-color: rgba(72, 72, 72, 0.48);
	} 
	.close-bt {
		position: absolute;
		right: 20px;
		top: 10px;
		z-index: 100;
		color: white;
		font-size: 35px;
		cursor: pointer;
	}
</style>