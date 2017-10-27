<template>
	<center>
		<div class="form" @keyup.enter="toLogin">
			<Mytip content="账号" :info="accountInfo">
				<Input class="input" type="text" v-model="account" placeholder="账号" icon="person"></Input>
			</Mytip>
			<Mytip content="密码" :info="passwordInfo">
				<Input class="input" type="password" v-model="password" placeholder="密码" icon="ios-locked-outline"></Input>
			</Mytip>
			<Row :gutter="10">
		        <Col span="12"><img :src="barcodeURL + '?' + refresh" class="barcode" @click="refreshBarcode"></Col>
		        <Col span="12">
		        	<Mytip content="验证码" :info="barcodeInfo">
		        		<Input class="input" type="text" v-model="barcode" placeholder="验证码"></Input>
		        	</Mytip>
		        </Col>
		    </Row>
			<Button class="login-bt" type="primary" long @click="toLogin" :loading="loadStatu">登陆</Button>
		</div>
	</center>
</template>

<script>
	import Mytip from './Mytip.vue'
	import { mapState, mapActions } from 'vuex'  
	import user from '../store/types/user'
	import { IP } from 'src/utils/interaction'

	export default {
		data () {
			return {
				account: '',
				password: '',
				loadStatu: false,
				barcode: '',
				barcodeURL: IP + 'utils/valcode',
				refresh: new Date().valueOf(),

				accountInfo: '',
				passwordInfo: '',
				barcodeInfo: '',
			}
		},
		components: {
			Mytip
		},
		computed: {
		    ...mapState({
		    	'user': state => {
		    		return state.user
		    	}
		    }),
		},
		methods: {
			...mapActions(user.actions),
			toLogin: function () {
				if(!this.check()) return

				this.loadStatu = true
				this.login({
					account: this.account,
					password: this.password,
					valcode: this.barcode
				}).then(data => {
					if(data.state){
						this.onSuccess(data.info)
					}else{
						this.onError(data.info)
					}
				}).catch(err => {
					this.onError(err)
				})

			},
			onSuccess (info) {
				this.$Message.success(info);
				window.location.href="./home.html"
			},
			onError (err) {
				this.loadStatu = false
				this.$Message.error(err);
			},
			check () {
				if(this.account.trim()=="" || this.password.trim()=="" || this.barcode.trim()==""){
					this.$Message.error("请填写好所有的信息")
					return false
				}else{
					return true
				}
			},
			refreshBarcode() {
				this.refresh = new Date().valueOf()
			},

		},
		watch: {
			barcode: function(val){
				if(val.length>0) this.barcodeInfo = ""
				else this.barcodeInfo = "请填写验证码";
			}
		}
	}
</script>

<style scoped>
	.form {
		position: relative;
	    top: 250px;
	    width: 25%;
	    min-width: 350px;
	    padding: 30px;
	    border-radius: 3px;
	    box-sizing: border-box;
	    background-color: rgba(202, 226, 255, 0.76);
	    /*background-color: rgba(230, 237, 247, 0.76);*/
	}
	.input, .login-bt {
		margin: 0 0 20px 0;
	}
	.forget-psw {
		padding-right: 10px;
		margin-right: 10px;
		border-right: 1px solid white;
		color: #a0a0a0;
	}
	.register {
		color: #a0a0a0;
	}
	.competence {
		position: absolute;
		left: 32px;
		bottom: 30px;
		color: white;
	}
	.barcode {
		width: 100%;
		height: 32px;
	}

	@media only screen and (max-width: 768px){
		.form {
			top: 120px;
		}
	}
</style>