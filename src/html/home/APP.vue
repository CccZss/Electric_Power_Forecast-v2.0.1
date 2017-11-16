<template>
	<section class="wrap1">
		<mynav/>
	  	<router-view class="view"></router-view>
	  	<section class="foot">
	  		<span>www.gdut.edu.cn</span>　 
	  		<span>广东工业大学计算机学院</span>
	  		<span>广州市番禺区广州大学城外环西路100号(510006)</span>
	  	</section>
	</section>
</template>

<script>
import mynav from './components/myNav'

export default {
	name: 'app',
	data: function(){
		return {

		}
	},

	components: {
		mynav
	},
}
	
</script>

<style scoped>
	.wrap1 {
		height: 100%;
	}
	.wrap1 .view {
		/*width: 80%;*/
		min-height: calc(100% - 179px);
		margin-top: 44px;
	}
	.foot {
		padding-left: 10%;
	    background-color: #3478b5;
    	color: white;
	}
	.foot span {
		line-height: 40px;
		font-size: 16px;
		margin: 10px;
	}
</style>

<style>
/* 每个分页的标题 */
.title {
	background-image: url(./images/tip.png);
	background-repeat: no-repeat;
	height: 60px;
	font-size: 24px;
	color: white;
	line-height: 60px;
	padding-left: 100px; 
}

/* 每个分页的最外层 */
.page-wrap {
	background-color: white;
	padding: 25px 0;
	margin: auto;
	background-image: url(./images/background.png);
	background-repeat: no-repeat;
	background-attachment: fixed;	
	background-position: 100% 100%;	
}


.my-bt {
	border-radius: 0;
	font-size: 15px;
	height: 40px;
	box-shadow: -1px 2px 6px 0 rgba(3, 90, 197, 0.6);
}
.blue-bar {
	position: relative;
}
.blue-bar::after {
	content: '';
	display: block;
	position: absolute;
	left: 0;
	top: 0;
	width: 6px;
	height: 100%;
	background-image: url(./images/blue-bar.png);
	background-size: contain;
}

</style>