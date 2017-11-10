<template>
	<section class="page-wrap">
		<!-- <div class="picture"></div> -->
		<section class="banner">
			<p>数据.预测</p>
			<span>数据时代，预测精准电量</span>
		</section>
		<section class="need">
			<img class="left-img" src="../images/need.png" alt="need">
			<div class="right">
				<p>电网企业需要掌握用电需求变化趋势，以便有计划的提供电力服务。用电量预测是电网企业的一项重要基础性工作，预测结果可能直接影响企业效益。同时，用电量预测也是制定电力发展规划的重要依据。准确的用电量预测系统可以确保电网安全运行，对合理设计电网改造、错峰用电、发电计划有着重要的参考价值，有助于实现节能减排等环境保护目标</p>
				<p>用电量预测根据预测周期可分为短期预测和中长期预测。短期负荷预测通常用来安排电力计划的调度，因此，对短期负荷预测，一般需要充分研究电力系统过去的变化规律和趋势，分析各种干扰因素。中长期预测主要用来确定大机组的运行方式，根据地区实际情况，制定相关的电网改造和扩建规划，保证负荷用电量能够满足居民用电和工农业用电的需要。根据预测对象可分为地区负荷预测、微电网负荷预测、大客户负荷预测等等。</p>
			</div>
		</section>
		<section class="advantage">
			<div class="top">
				<span>我们的优势</span>
				<p>OUR ADVANTAGE</p>
			</div>
			<p>随着产业结构的不断调整，电力用户的用电特性正呈现多样化发展趋势: 不同企业用户其用电行为的差异化日益明显,并且电力数据生成速度快，</p>
			<p>因此，用电量系统对未来用电的准确预测对电网规划和经济部门的管理决策具有重要的指导意义，</p>
			<p>用电量预测工作的水平在一定程度上可以成为衡量一个电力企业的管理是否走向现代化的显著标志。</p>
			<ul class="logos">
				<li>
					<img src="../images/logo1.png" alt="">
					<p>帮助决策者判断是否</p>
					<p>需要配置安装新的发电机组</p>
					<p>以及确认对电网的改善方向</p>
				</li>
				<li>
					<img src="../images/logo2.png" alt="">
					<p>自适应确定用户</p>
					<p>最佳算法模型取得了较好</p>
					<p>的预测精度</p>
				</li>
				<li>
					<img src="../images/logo3.png" alt="">
					<p>在研究不同用户用电特性</p>
					<p>的基础上开展用电量预测帮助</p>
					<p>电力企业更好地了解用户个性化服务需求</p>
				</li>
				<li>
					<img src="../images/logo4.png" alt="">
					<p>为未来电网发展及</p>
					<p>电力需求侧响应政策的</p>
					<p>制定提供数据支撑</p>
				</li>
			</ul>
		</section>
		<section class="alogrithm">
			<div class="top">
				<span>算法介绍</span>
				<p>ALGORITHM INTRODUCION</p>
			</div>
			<div class="alog-wrap">
				<p class="tip">单算法</p>
				<ul>
					<li v-bind:class="{ 'action': item===currentAlgorithm }" v-for="item in singleAlgorithm" :key="item" @click="changeAlgorithm(item)">{{item}}</li>
				</ul>
			</div>
			<div class="alog-wrap">
				<p class="tip">组合算法</p>
				<ul>
					<li v-bind:class="{ 'action': item===currentAlgorithm }" v-for="item in groupAlgorithm" :key="item" @click="changeAlgorithm(item)">{{item}}</li>
				</ul>
			</div>
			<img class="under" src="../images/under.png" alt="">
			<div class="introduce">
				<img :src="imgName">
			</div>
		</section>
	</section>
</template>


<script>
	import {mapState, mapActions} from 'vuex';
	import data from  '../store/types/data'
	export default {
		data () {
			return {
				groupAlgorithm: [],
				singleAlgorithm: [],
				currentAlgorithm: 'AdaBoost'
			}
		},
		computed: {
			...mapState({
				'data': state => {
                    return state.data
                }
			}),
			
			imgName() {
				return require("../images/algorithme/" + this.currentAlgorithm + '.png')
			} 
		},
		methods: {
			...mapActions(data.actions),

			changeAlgorithm(name) {
				this.currentAlgorithm = name
			}
		},
		created() {
			this.getAllAlgorithm().then((data)=>{
				if(data.state){
					this.groupAlgorithm = this.data.allAlgorithmList.group
					this.singleAlgorithm = this.data.allAlgorithmList.single
					this.currentAlgorithm = this.singleAlgorithm[0]
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
	.page-wrap {
		margin-bottom: -24px;
	}
 	/*.picture {
	    position: absolute;
	    top: 140px;
	    left: 0;
	    width: 100%;
	    height: 3882px;
	    background-image: url(../images/home.jpg);
    	background-position-y: -150px;
	}
 	*/
	/* 横幅 */
	.banner {
		width: 100%;
		height: 560px;
		padding: 0.1px;
		margin-top: -26px;
		text-align: center;
		color: white;
		background-image: url(../images/banner.png);
		background-repeat: no-repeat;
		background-size: cover;
		background-position: center center;
	}
	.banner p {
		margin-top: 170px;
		font-size: 65px;
		letter-spacing: 8px;
	}
	.banner span {
		font-size: 18px;
	}

	/** 需求 **/
	.need {
		background-color: white;
		overflow: hidden;
	}
	.need .left-img{
		width: 24%;
		margin-left: 16%;
	}
	.need .right {
		float: right;
		margin-top: 130px;
		margin-right: 16%;
		padding: 10px;
		width: calc(100% - 56%);
		/* border: 1px solid black; */
		min-height: 400px;
		font-size: 18px;
		line-height: 45px;
	}
	.need .right p {
		color: #797979;
    	text-indent: 2em;
	}

	/** 优势 **/
	.advantage {
		width: 100%;
		height: 715px;
		background-image: url(../images/advantage-bg.png);
		background-repeat: no-repeat;
		background-size: cover;
		background-position: center center;
		text-align: center;
		color: white;
	}
	.advantage p {
		font-size: 18px;
		line-height: 40px;
		letter-spacing: 3px;
		color: rgba(255, 255, 255, 0.80);
    	margin-left: -6%;
	}
	.advantage .logos p {
		width: 112%;
	}
	.top :first-child {
		display: inline-block;
		position: relative;
		font-size: 30px;
		margin: 50px 0 5px;
		letter-spacing: 3px;
	}
	.top :last-child {
		margin-bottom: 15px;
	}
	.top :first-child::before {
		content: '';
		display: block;
		position: absolute;
		left: -80px;
		top: 21px;
		width: 55px;
		height: 3px;
		background-color: white;
	}
	.top :first-child::after {
		content: '';
		display: block;
		position: absolute;
		right: -80px;
		top: 21px;
		width: 55px;
		height: 3px;
		background-color: white;
	}
	.advantage ul {
		margin-top: 40px;
		display: inline-block;
	}
	.advantage li {
		float: left;
    	width: 340px;
	}
	.advantage li img {
		width: 53%;
	}

	/* 算法 */
	.alogrithm {
		text-align: center;
		color: black;
		background-color: white;
	}
	.alogrithm .top p {
		color: #989898;
	}
	.alogrithm .top :first-child::before {
		background-color: black;
	}
	.alogrithm .top :first-child::after {
		background-color: black;
	}
	.alog-wrap {
		width: 500px;
		margin: 45px 6%;
		display: inline-block;
		vertical-align: top;
	}
	.alog-wrap .tip {
		font-size: 23px;
		color: #3491f9;
		position: relative;
		width: 288px;
		display: inline-block;
	}
	.alog-wrap .tip::before {
		content: '';
		display: block;
		position: absolute;
		left: -9px;
		width: 275px;
		height: 62px;
		background-image: url(../images/alog-tip.png);
		background-repeat: no-repeat;
	}
	.alog-wrap ul {
		display: inline-block;
		position: relative;
		left: 123px;
		width: 521px;
		margin-top: 20px;
		text-align: left;
	}
	.alog-wrap li {
		display: inline-block;
		width: 148px;
		margin: 5px 0 5px 63px;
		padding: 5px 0;
		background-color: #3491f9;
		color: white;
		font-size: 18px;
		text-align: center;
		cursor: pointer;
	}
	.alog-wrap li.action {
		background-color: #3447f9;
	}
	.under {
		display: block;
		position: absolute;
		margin-left: 76%;
	}
	.introduce {
		margin-top: 50px;
	}
	.introduce img {
		width: 1554px;

	}
</style>