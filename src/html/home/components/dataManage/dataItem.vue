<template>
	<section class="wrap">
		<span class="data-name">{{dataName}}</span>
        <span @click="toDeleteData"><Icon type="trash-a" class="delete-bt"></Icon></span>
		<br/>
        <Button class="data-info-bt" type="primary" @click="toDownData">下载数据</Button>
        <Button class="data-info-bt" type="primary" @click="toGetDataInfo" :loading="loading">查看数据</Button>
	</section>
</template>

<script>
	import {mapActions} from 'vuex';
	import data from  '../../store/types/data'
	export default {
		data() {
			return {
				loading: false
			}
		},
		props: ['dataName', 'id'],
		methods: {
			...mapActions(data.actions),
			
			toDeleteData() {
				this.deleteDataById({
					id: this.id
				}).then((data)=>{
					if(data.state){
	                    this.$Message.success(data.info)
	                }else{
	                    this.$Message.error(data.info)
	                }
				}).catch((err)=>{
	                this.$Message.error(err)
				})
			},

			toGetDataInfo() {
				this.loading = true
				this.getDataInfo({
					id: this.id
				}).then((data)=>{
					if(data.state){
						this.$emit('show-data-info')
	                }else{
	                    this.$Message.error(data.info)
					}
					this.loading = false
				}).catch((err)=>{
	                this.$Message.error(err)
				})
			},

			toDownData() {
				this.downloadDataById({
					dataSetId: this.id
				}).then((data)=>{
					if(data.state){
	                    window.open(data.url, '_blank')
	                }else{
	                    this.$Message.error(data.info)
	                }
				}).catch((err)=>{
	                this.$Message.error(err)
				})
			}
		}
	}
</script>

<style scoped>
	.wrap{
		position: relative;
		width: calc( 25% - 20px);
		box-shadow: 1px 1px 2px 1px #b9b9b9;
		padding: 20px;
		float: left;
		margin: 0 10px 20px 10px;
	}
	.data-name {
		font-size: 18px;
	}
	.data-info-bt {
		margin: 20px 10px 0 0;
		float: right;
	}
	.delete-bt {
		position: absolute;
		right: 10px;
		top: 10px;
		font-size: 24px;
		color: #d8cece;
		cursor: pointer;
	}
	.delete-bt:hover {
		color: red;
	}
</style>