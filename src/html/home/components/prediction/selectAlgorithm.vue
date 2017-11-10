<template>
	<section>
		<p class="title">选择算法</p>
		<div class="selects">
			<Select v-model="algorithmType" style="width:100px" @on-change="typeChange">
				<Option v-for="item in algorithmTypeList" :value="item" :key="item">{{ item }}</Option>
			</Select>
		</div>
		<div class="algorithm-box">
			<p class="tip"><Icon type="android-radio-button-on"></Icon> 修改默认算法</p>
			<span class="algorithm-item" v-for="(item, index) in algorithmList" :key="index">
                <Checkbox v-model="item.value" @on-change="changeValue">{{item.name}}</Checkbox>
            </span>
		</div>
		<div class="algorithm-box"> 
			<span class="tip"><Icon type="android-radio-button-on"></Icon> 介绍</span>
			<Select v-model="algorithmName" style="width:100px" @on-change="nameChange">
				<Option v-for="(item, index) in algorithmList" :value="item.name" :key="item.name">{{ item.name }}</Option>
			</Select>
		</div>
		<div class="introduce">
			<img :src="imgName">
		</div>
	</section>
</template>

<script>
import { mapState, mapActions } from "vuex";
import data from "../../store/types/data";
export default {
  	data() {
		return {
			algorithmType: "组合算法",
			algorithmTypeList: ["组合算法", "单算法"],
			algorithmName: "",
			algorithmList: [],
			groupAlgorithm: [],
			singleAlgorithm: [],
			imgName: undefined
		};
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

		typeChange(val) {
			if(val === '组合算法') {
				this.algorithmList = this.groupAlgorithm
			}else {
				this.algorithmList = this.singleAlgorithm
			}
			this.algorithmName = this.algorithmList[0].name
		},
		changeValue() {
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
			
			this.setDefaultAlgorithm(algorithm).then((data)=>{
				if(data.state){
					this.$Message.success(data.info)
				}else{
					this.$Message.error(data.info)
				}
			}).catch((err)=>{
				this.$Message.error(err)
			})
        },
		nameChange(name) {
			this.imgName = require("../../images/algorithme/" + name + '.png')
		},
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
	},
	created() {
		this.getAllAlgorithm()
			.then(data => {
				if (data.state) {
					var groupAlgorithm = this.data.allAlgorithmList.group;
					var singleAlgorithm = this.data.allAlgorithmList.single;

					var gArr = [];
					var sArr = [];
					groupAlgorithm.forEach(item => {
						gArr.push({
							value: false,
							name: item
						});
					});
					singleAlgorithm.forEach(item => {
						sArr.push({
							value: false,
							name: item
						});
					});
					this.toSetDefault()

					this.groupAlgorithm = gArr;
					this.singleAlgorithm = sArr;
					this.algorithmList = this.groupAlgorithm
					this.algorithmName = this.algorithmList[0].name
				} else {
					this.$Message.error(data.info);
				}
			})
			.catch(err => {
				this.$Message.error(err);
			});
		}
	};
</script>

<style scoped>
.selects {
	margin: 24px 0 -10px 127px;
}
.selects::after {
    content: '';
    display: block;
    position: absolute;
    left: 172px;
	margin-top: 7px;
    height: 100%;
    width: 5px;
	background-image: url(../../images/blue-bar.png)
}
.algorithm-box {
}
.algorithm-box {
	width: 780px;
	padding-left: 185px;
	text-align: left;
	margin: 30px 0 10px;
}
.algorithm-box .tip {
	color: #00adfb;
  	font-size: 20px;
	margin-right: 10px;
	vertical-align: middle;
}
.algorithm-item {
	display: inline-block;
	margin: 10px 8px 10px 10px;
	padding-left: 20px;
	min-width: 90px
}
.introduce {
	margin-left: 70px;
}
.introduce img {
	width: 1554px;

}
</style>