<template>
	<section class="wrap1">
		<mynav/>
	  	<router-view class="view"></router-view>
	  	<section class="foot">
	  		<span>www.gdut.edu.cn</span>　 
	  		<span>粤ICP备05008833号</span>
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
		width: 80%;
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