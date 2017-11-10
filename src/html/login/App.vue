<template>
  	<div id="app">
  		<div class="title">
			<img class="logo" src="~assets/images/logo.png">
  		</div>
    	<Login v-if="login" v-on:to-register="toggle"/>
    	<div class="bg"></div>
  	</div>
</template>

<script>
import Login from './components/login'
export default {
	name: 'app',
	data (){
		return {
			login: true
		}
	},
	components: {
		Login,
	},
	methods: {
		toggle (){
			this.login = !this.login
		}
	}
}
</script>

<style scoped>
	#app{
		padding: 0.1px;
   	 	height: 100%;
   	 	/* background-color: rgba(69, 142, 230, 0.68); */
   	 	/*background-color: #2f81d4;*/
	}
	.bg {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		z-index: -1;
		background-image: url('./images/background.png');
   	 	background-size: cover;
   	 	background-repeat: no-repeat;
        background-position: center;
	}
	.title {
		background-color: white;
		overflow: hidden;
	}
	.logo {
	    display: block;
	    width: 160px;
	    height: 52px;
	    margin: 5px 0 0 10px;
	}

/* 	@media only screen and (max-width: 768px){
	.logo {
		width: 80px;
	}
} */
</style>
