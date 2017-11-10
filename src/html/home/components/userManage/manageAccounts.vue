<template>
	<section>
		<p class="title">账户管理</p>
		<div class="users">
            <div class="search-wrap" @keyup.enter="search">
               <!--  <Input class="search-input" v-model="searchInfo"  icon="ios-search" placeholder="请输入..."></Input> -->
                <Button class="add-user-bt" type="primary" @click="toShowAddModel">添加用户</Button>
			</div>
			<Table border :columns="columns" :data="currentUsers"></Table>
			<div style="margin: 10px;overflow: hidden">
		        <div style="float: right;">
		            <Page :total="allUsers.length" :page-size='10' :current="1" @on-change="changePage"></Page>
		        </div>
			</div>
    	</div>
    	<Modal
	        v-model="showUpdateModel"
	        title="修改信息"
	        @on-ok="toUpdateInfo"
	        @on-cancel="cancel">
	        <div><span class="update-tip">用户名</span><Input class="update-input" v-model="updateUserName"></Input></div>
	        <div><span class="update-tip">账号</span><Input class="update-input" v-model="updateUserAccount"></Input></div>
	        <div><span class="update-tip">密码</span><Input class="update-input" placeholder = '*************' v-model="updateUserPassword"></Input></div>
            <div>
                <span class="update-tip">权限</span><Select v-model="updateAdmin" style="width:200px">
                    <Option v-for="(item, index) in ['管理员','普通用户']" :value="index" :key="index">{{ item }}</Option>
                </Select>
            </div>
	    </Modal>
        <Modal
            v-model="showAddUserModel"
            title="添加用户"
            @on-ok="toAddUser"
            @on-cancel="cancel">
            <div><span class="update-tip">用户名</span><Input class="update-input" v-model="newUserName"></Input></div>
            <div><span class="update-tip">账号</span><Input class="update-input" v-model="newUserAccount"></Input></div>
            <div><span class="update-tip">密码</span><Input class="update-input" v-model="newUserPassword"></Input></div>
            <div>
                <span class="update-tip">权限</span><Select v-model="newUserAdmin" style="width:200px">
                    <Option v-for="(item, index) in ['管理员','普通用户']" :value="index" :key="index">{{ item }}</Option>
                </Select>
            </div>
        </Modal>
	</section>
</template>

<script>
    import {mapState, mapActions} from 'vuex'
    import user from '../../store/types/user'

    export default {
        data () {
            return {
            	searchInfo: '',
            	showUpdateModel: false,
                showAddUserModel: false,

            	updateUserId: '',
            	updateUserName: '',
            	updateUserAccount: '',
            	updateUserPassword: '',
                updateAdmin: '',

                newUserName: '',
                newUserAccount: '',
                newUserPassword: '',
                newUserAdmin: 1,

                currentPage: 1,
                allUsers: [],
                currentUsers: [],
                columns: [
                    {
                        title: '姓名',
                        key: 'userName',
                        render: (h, params) => {
                            return h('div', [
                                h('Icon', {
                                    props: {
                                        type: 'person'
                                    }
                                }),
                                h('strong', params.row.userName)
                            ]);
                        }
                    },
                    {
                        title: '账户',
                        key: 'account'
                    },
                    {
                    	title: '权限',
                        key: 'admin',
                        render: (h, params) => {
                        	return h('strong', params.row.admin === 0 ? '管理员' : '普通用户')
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.toShowUpdateModel(params)
                                        }
                                    }
                                }, '修改'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
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

            toShowUpdateModel (parame) {
                // console.log(parame)
                this.showUpdateModel = true;
               	this.updateUserId =  parame.row.id
            	this.updateUserName = parame.row.userName
            	this.updateUserAccount = parame.row.account
                this.updateAdmin = parame.row.admin
            	this.updateUserPassword = ''
            },
            toShowAddModel () {
                this.showAddUserModel = true
            },
            remove (parame) {
                this.deleteUser({
                    id: parame.row.id
                }).then((data) => {
                     if(data.state){
                        this.allUsers = this.user.allUsers
                        if(this.user.allUsers.slice((this.currentPage-1)*10, this.currentPage*10).length > 0) {
                            this.currentUsers = this.user.allUsers.slice((this.currentPage-1)*10, this.currentPage*10)
                        }else{
                            if(this.user.allUsers.length !== 0) {
                                this.currentPage -= 1;
                            }
                            this.currentUsers = this.user.allUsers.slice((this.currentPage-1)*10, this.currentPage*10)
                        }
                        this.$Message.success(data.info)
                    }else{
                        this.$Message.error(data.info + ",请重新登陆！")
                    }
                })
            },
            changePage(val) {
                this.currentPage = val
            	this.currentUsers = this.allUsers.slice((val-1)*10, val*10)
            },
            search() {
            	alert(this.searchInfo)
            	this.searchInfo = ''
            },
            toUpdateInfo() {
                if(this.updateUserName.trim() === '' || this.updateUserAccount === ''){
                    this.$Message.error('用户名和账号不能为空!')
                    return
                }
                this.updateUserInfo({
                    userName: this.updateUserName,
                    id: this.updateUserId,
                    account: this.updateUserAccount,
                    password: this.updateUserPassword,
                    admin: this.updateAdmin
                }).then((data) => {
                     if(data.state){
                        this.allUsers = this.user.allUsers
                        this.currentUsers = this.user.allUsers.slice((this.currentPage-1)*10, this.currentPage*10)
                        this.$Message.success(data.info)
                    }else{
                        this.$Message.error(data.info + ",请重新登陆！")
                    }
                })
            	
            },
            toAddUser() {
                if(!this.checkAdd()) {
                    this.$Message.error('请将信息填写完整!')
                    return
                }
                this.addUser({
                    userName: this.newUserName,
                    account: this.newUserAccount,
                    password: this.newUserPassword,
                    admin: this.newUserAdmin
                }).then((data) => {
                     if(data.state){
                        this.allUsers = this.user.allUsers
                        this.currentUsers = this.user.allUsers.slice((this.currentPage-1)*10, this.currentPage*10)

                        this.newUserName = ''
                        this.newUserAccount = ''
                        this.newUserPassword = ''
                        this.newUserAdmin = 1
                        
                        this.$Message.success(data.info)
                    }else{
                        this.$Message.error(data.info)
                    }
                })
            },
            checkAdd() {
                return this.newUserName.trim() !== '' && this.newUserAccount.trim() !== '' && this.newUserPassword.trim() !== ''
            },
            cancel() {
            	console.log('cancel')
            }
        },
        created() {
            this.getAllUsers().then((data) => {
                if(data.state){
                    this.allUsers = this.user.allUsers
                    this.currentUsers = this.user.allUsers.slice((this.currentPage-1)*10, this.currentPage*10)
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
    section {
        height: 100%;
        background-color: white; 
        padding-bottom: 50px;
    }
	.search-wrap {
		margin-bottom: 10px;
		text-align: right;
	}
	.search-input {
		width: 200px;
	}
	.users {
        width: 90%;
        margin: auto;
		margin-top: 30px;
	}
	.update-input {
		display: inline-block;
		width: 70%;
	}
	.update-tip {
		display: inline-block;
		width: 80px;
		margin-bottom: 20px;
	}
    .add-user-bt {
        margin-left: 10px;
    } 
</style>