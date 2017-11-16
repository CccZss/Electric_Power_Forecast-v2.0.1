<template>
	<section>
		<p class="title">导入数据</p>
		<div class="info blue-bar">
			<span class="input-tip">数据名：</span>
			<div class="upload-wrap">
				<Input class="input" v-model="dataName" placeholder="数据集名"></Input>
				<Button type="primary" class="upload-file-bt my-bt" @click="uploadFile">上传</Button>
				<Icon v-show="dataFile!==null" type="checkmark-circled" class="icon"></Icon>
			</div>
			<Button type="primary" class="add-data my-bt" @click="toAddData" :loading="loading">确定</Button>
		</div>
	</section>
</template>

<script>
	import { mapActions} from 'vuex';
	import data from  '../../store/types/data'
	export default {
		data () {
			return {
				dataName: '',
				dataFile : null,
				loading: false
			}
		},
		methods: {
			...mapActions(data.actions),

			updateDataName() {
				var date = new Date()
				var stamp =  date.getUTCFullYear() + '-' + (Number(date.getMonth()) + 1) + '-' + date.getUTCDate() + ':' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
				this.dataName = '数据集_' + stamp
			},

			uploadFile: function() {
				this.dataFile = null;
			 	var el = document.createElement('input');
			    el.setAttribute('type', 'file');
			    el.setAttribute('style', 'display: none');
			    el.setAttribute('multiple', 'multiple');
			    el.onchange = function(){
			    	var file = el.files[0]
			    	var reg = /^.*\.(?:xls|xlsx)$/i;//文件名可以带空格
	                if (!reg.test(file.name)) {//校验不通过
	                    alert("请上传excel格式的文件!");
	                }else {
	                	this.dataFile = file
	                }
			    }.bind(this)

			    document.body.appendChild(el)
    			el.click()

    			setTimeout(function(){
			      	el.parentNode.removeChild(el);
			    }, 1000);
			},

			toAddData() {
				if(this.dataName.trim()=='' || this.dataFile ==null) {
					this.$Message.error('请填写好数据集名并上传文件')
				}else {
					var data = new FormData()
					data.append('dataName', this.dataName)
					data.append('file', this.dataFile)
					this.loading = true
					this.addData(data).then((data) => {
						if(data.state){
							this.$Message.success(data.info)		
						}else{
							this.$Message.error(data.info)
						}
						this.dataFile = null
						this.loading = false
						this.updateDataName()
					}).catch((err) => {
						this.$Message.error(err)
					})
				}
			},
		},


		created () {
			this.updateDataName()
		}
	}
</script>

<style scoped>
	.info {
		width: 700px;
		height: 350px;
	    padding: 30px 40px;
	    margin: 50px 0 0 15%;
	    box-shadow: 1px 1px 8px 1px #b1b1b1;
	}
	.upload-wrap {
		position: relative;
	}
	.icon {
		position: absolute;
		top: 5px;
		right: 170px;
		font-size: 32px;
	    color: #3bda3b;
	}
	.input-tip {
		display: inline-block;
		font-weight: bold;
	    width: 20%;
	    line-height: 32px;
	    font-size: 15px;
		padding-left: 3px;
		margin-bottom: 12px;
	}
	.input {
		width: 300px;
		height: 30px;
		margin-right: 20px;
	}
	.upload-file-bt {
		width: 80px;
		vertical-align: top;
	}
	.add-data {
		width: 150px;
		margin-top: 45px;
	}
</style>
