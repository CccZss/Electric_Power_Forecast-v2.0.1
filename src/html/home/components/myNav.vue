<template>
	<section class="nav-wrap">
		<div class="top">
			<span class="logo"@click="toHome"></span>
		    <div class="user">
		    	<strong>{{user.userName}}</strong>
		    </div>
		</div>
		<Menu class="meun" ref="myNav" mode="horizontal" theme="light" :active-name="activeName" @on-select="changeMenu">
	        <MenuItem name="homepage">
				<Icon type="ios-home"></Icon>
	            首页
	        </MenuItem>
	        <Submenu name="data-manage">
	        	<template slot="title">
		            <Icon type="ios-folder"></Icon>
		            数据管理
	            </template>
	            <MenuItem name="inputData">导入数据</MenuItem>
                <MenuItem name="checkData">查看数据</MenuItem>
                <MenuItem name="setDefault">设置默认值</MenuItem>
	        </Submenu>
	        <Submenu name="prediction">
	            <template slot="title">
	                <Icon type="ios-loop-strong"></Icon>
	                预测
	            </template>
                <MenuItem name="selectAlgorithm">选择算法</MenuItem>
                <MenuItem name="startPrediction">开始预测</MenuItem>
	        </Submenu>
	        <Submenu name="visualization">
	            <template slot="title">
	                <Icon type="stats-bars"></Icon>
	                可视化
	            </template>
                <MenuItem name="electricity">用电量</MenuItem>
                <MenuItem name="deviation">预测误差</MenuItem>
                 <!-- <MenuGroup title="暂无数据可以可视化"> -->
	            </MenuGroup>
	        </Submenu>
	        <Submenu name="user-manage">
	            <template slot="title">
	                <Icon type="ios-gear"></Icon>
	                用户管理
	            </template>
                <MenuItem name="changePassword">修改密码</MenuItem>
                <MenuItem name="manageAccounts">账户管理</MenuItem>
                <MenuItem name="exit">退出登录</MenuItem>
	        </Submenu>
	    </Menu>
	</section>
</template>

<script>
	import {mapState, mapActions} from 'vuex'
	import user from '../store/types/user'
	export default { 
		data () {
			return {
				activeName: 'homepage'
			}
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

			changeMenu(name) {
				if(name === 'exit') {
					this.exit().then((data)=>{
						if(data.state){
							window.location.href = "./login.html"			
						}else{
							this.$Message.error(data.info)
						}
					}).catch((err)=>{
						this.$Message.error(err)
					})
				}else{
					this.$router.push({
						name: name,
						/*params: { 
							info: 'xxx'
						}*/
					})
				}
			},

			toHome() {
				/* this.$router.push({
					name: 'homepage',
				}) */
			},

			toExit () {
				this.exit().then((data) => {
					if(data.state){
						window.location.href = "./login.html"			
					}else{
						this.$Message.error(data.info)
					}
				}).catch((err) => {
					this.$Message.error(err)
				})
			},
		},

		created () {
			this.getMyInfo().then((data) => {
				if(data.state){
					this.$router.push('homepage')
				}else{
					this.$Message.error(data.info + ",请重新登陆！")
				}
			}).catch((err) => {
				window.location.href = "./login.html"			
			})
		}
	}
</script>

<style scoped>
	.nav-wrap {
 	  	/*position: fixed;
		top: 0; */
	    width: 100%;
	    background-color: white;
	    box-shadow: 0 1px 1px rgba(0,0,0,.08);
	    z-index: 5;
       	border-top: 1px solid #3478b5;
	}
	.logo{
		float: left;
		display: inline-block;
	    width: 267px;
	    height: 90px;
	    margin: 5px 0 0 11%;
		background-image: url('~assets/images/logo.png');
		background-size: contain;
	}
	.top {
		overflow: hidden;
	}
	.meun {
	    padding-left: 10%;
	    float: left;
	    width: 100%;
        position: static;
	}
	
	.user {
		line-height: 60px;
		float: right;
		margin-right: 12%;
	}
	.user strong {
	    font-size: 20px;
	    line-height: 95px;
	}
</style>

<style>
	/* 整体导航栏颜色 */
	.ivu-menu-light {
	    background: #2d8cf0;
    	/*border-top: 1px solid #3478b5;*/
	}
	/* 选中*/
 	.ivu-menu-light.ivu-menu-horizontal .ivu-menu-item-active,  .ivu-menu-light.ivu-menu-horizontal .ivu-menu-item:hover, .ivu-menu-light.ivu-menu-horizontal .ivu-menu-submenu:hover {
	    border-bottom: 0;
	    background-color: #f5f5f5;
	} 
	.ivu-menu-light.ivu-menu-horizontal .ivu-menu-item, .ivu-menu-light.ivu-menu-horizontal .ivu-menu-submenu {
	    color: #ffffff;
	}
	.nav-wrap .meun .ivu-menu-item-active{
		color: #807777;
	}
	.ivu-menu-light.ivu-menu-horizontal .ivu-menu-item:hover, .ivu-menu-light.ivu-menu-horizontal .ivu-menu-submenu:hover {
		color: #807777;
	}
	.ivu-menu-horizontal {
	    height: 42px;
	    line-height: 42px;
	}
	.ivu-menu-horizontal.ivu-menu-light:after {
		content: none;
	}
</style>