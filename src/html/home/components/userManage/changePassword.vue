<template>
	<section>
		<h1 class="title">修改密码</h1>
		<div class="info">
			<Input class="input" type="text" v-model="oldPassword" placeholder="旧密码"></Input> 
			<Input class="input" type="text" v-model="newPassword" placeholder="新密码"></Input> 
			<Button type="primary" class="change-bt" @click="changePassword">确定修改</Button>
		</div>
	</section>
</template>

<script>
	import { mapActions} from 'vuex';
	import user from  '../../store/types/user'
	export default {
		data () {
			return {
				oldPassword: '',
				newPassword: ''
			}
		},
		methods: {
			...mapActions(user.actions),

			changePassword () {
				if(this.oldPassword.trim() === '' || this.newPassword.trim()==='') {
					this.$Message.error('请填写好数据！')
					return
				}
				this.updatePassword({
					oldPassword: this.oldPassword,
					newPassword: this.newPassword
				}).then((data) => {
					if(data.state){
						this.$Message.success(data.info)		
					}else{
						this.$Message.error(data.info)
					}
					this.newPassword = ""
					this.oldPassword= ""
				}).catch((err) => {
					this.$Message.error(err)
				})
			}
		}
	}
</script>

<style scoped>
	.title {
		border-bottom: 2px solid #c3c3c3;
    	padding: 0 0 5px 10px;
	}
	.info {
		width: 400px;
	    padding: 50px;
	    margin: auto;
	    margin-top: 30px;
	    margin-bottom: 31px;
	    box-shadow: 1px 1px 8px 1px #b1b1b1;
	}
	.input {
		width: 100%;
		margin-bottom: 20px;
	}
	.change-bt {
		width: 100%;
	}
	.text {
		display: inline-block;
		width: 80px;
		padding-right: 10px;
		text-align: right;
		font-size: 16px;
	}
</style>