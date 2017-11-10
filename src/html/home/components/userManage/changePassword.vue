<template>
	<section>
		<p class="title">修改密码</p>
		<div class="info blue-bar">
			<div>
				<span class="tip">旧密码：</span>
				<Input class="input" type="text" v-model="oldPassword" placeholder="旧密码"></Input> 
			</div>
			<div>
				<span class="tip">新密码：</span>
				<Input class="input" type="text" v-model="newPassword" placeholder="新密码"></Input> 
			</div>
			<Button type="primary" class="change-bt my-bt" @click="changePassword">确定修改</Button>
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
	.info {
		width: 700px;
		height: 350px;
	    padding: 30px 40px;
	    margin: 50px 0 0 15%;
	    box-shadow: 1px 1px 8px 1px #b1b1b1;
	}
	.info > div {
		margin-bottom: 20px;
	}
	.input {
		width: 300px;
		margin-bottom: 20px;
	}
	.change-bt {
		float: right;
		margin-right: 30px;
		width: 140px;
	}
	.text {
		display: inline-block;
		width: 80px;
		padding-right: 10px;
		text-align: right;
		font-size: 16px;
	}
	.tip {
		display: inline-block;
		font-size: 20px;
		width: 100px;
		vertical-align: top;
	}
</style>