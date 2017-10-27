import types from '../types/user'
import { myAxios, IP } from 'src/utils/interaction'


const state = {
    id: undefined,
   	userName: '',
   	account: '',
    admin: 0,   // 0：管理员，1：普通用户
    allUsers: []
}

const getters = {

}

const actions = {

    [types.actions.getMyInfo]: (context, data) => {
        //context: commit,dispatch,getters,state
        return new Promise((resolve, reject) => {

            context.commit(types.mutations.setInfo,{
                id: 1,
                userName: 'czs',
                account: '8888888888',
                admin: 0
            })
            resolve({
                state: true,
                info: 'success'
            })

            /*myAxios({
                method: 'GET',
                url: 'user/userInfo',
            }).then(function(res){
                if(res.data.state.toString()==="0"){
                    context.commit(types.mutations.setInfo,res.data.data)
                    resolve({
                        state: true,
                        info: res.data.stateInfo}
                    )
                }else{
                    resolve({
                        state: false,
                        info: res.data.stateInfo}
                    )
                }
            }).catch(function(err){
                reject(err)
            })*/
        })
    },

    [types.actions.updatePassword]: (context, data) => {
        return new Promise((resolve, reject) => {
            console.log(data)
            resolve({
                state: true,
                info: '修改成功'
            })

            /*myAxios({
                method: 'POST',
                url: 'user/updatePwd',
            }).then(function(res){
                 if(res.data.state.toString()==="0"){
                    resolve({
                        state: true,
                        info: res.data.stateInfo}
                    )
                }else{
                    resolve({
                        state: false,
                        info: res.data.stateInfo}
                    )
                }
            }).catch(function(err){
                reject(err)
            })*/
        })
    },
    
    [types.actions.getAllUsers]: (context) => {
        //context: commit,dispatch,getters,state
        
        return new Promise((resolve, reject) => {
            context.commit(types.mutations.setInfo,{
                allUsers: [
                    {
                        userName: '王小明',
                        account: 1111111111,
                        id: 1,
                        admin: 0
                    },
                    {
                        userName: '张小刚',
                        account: 2222222222,
                        id: 2,
                        admin: 1
                    },
                    {
                        userName: '李小红',
                        account: 3333333333,
                        id: 3,
                        admin: 0
                    },
                    {
                        userName: '周小伟',
                        account: 4444444444,
                        id: 4,
                        admin: 0
                    },
                    {
                        userName: '王小明',
                        account: 5555555555,
                        id: 5,
                        admin: 1
                    },
                    {
                        userName: '张小刚',
                        account: 6666666666,
                        id: 6,
                        admin: 1
                    },
                    {
                        userName: '李小红',
                        account: 77777777777,
                        id: 7,
                        admin: 1
                    },
                ]
            })
            resolve({
                state: true,
                info: 'success'
            })

           /*myAxios({
                method: 'GET',
                url: '/user/all',
            }).then(function(res){
                 if(res.data.state.toString()==="0"){
                    context.commit(types.mutations.setInfo,{
                        allUsers: res.data.data
                    })
                    resolve({
                        state: true,
                        info: res.data.stateInfo}
                    )
                }else{
                    resolve({
                        state: false,
                        info: res.data.stateInfo}
                    )
                }
            }).catch(function(err){
                reject(err)
            })*/
        })
    },

    [types.actions.addUser]: (context, data) => {
        return new Promise((resolve, reject) => {
            console.log(data)
            var allUsers = context.state.allUsers
            allUsers.push(data)
            context.commit(types.mutations.setInfo,{
                allUsers: allUsers
            })
            resolve({
                state: true,
                info: '添加成功'
            })

           /*myAxios({
                method: 'POST',
                url: '/user/add',
                data: data
            }).then(function(res){
                 if(res.data.state.toString()==="0"){
                    context.commit(types.mutations.setInfo,{
                        allUsers: context.state.allUsers.push(res.data.data)
                    })
                    resolve({
                        state: true,
                        info: res.data.stateInfo}
                    )
                }else{
                    resolve({
                        state: false,
                        info: res.data.stateInfo}
                    )
                }
            }).catch(function(err){
                reject(err)
            })*/
        })
    },

    [types.actions.deleteUser]: (context, data) => {
        return new Promise((resolve, reject) => {
            
            var allUsers = context.state.allUsers;
            for(var i=0; i<allUsers.length; i++) {
                if(allUsers[i].id === data.id) {
                    allUsers.splice(i, 1)
                    break
                }
            }
            context.commit(types.mutations.setInfo,{
                allUsers: allUsers
            })
            resolve({
                state: true,
                info: '删除成功'
            })

           /*myAxios({
                method: 'POST',
                url: '/user/delete',
                data: data
            }).then(function(res){
                 if(res.data.state.toString()==="0"){
                    var allUsers = context.state.allUsers;
                    for(var i=0; i<allUsers.length; i++) {
                        if(allUsers[i].id === res.data.state.id) {
                            allUsers.splice(i, 1)
                            break
                        }
                    }
                    context.commit(types.mutations.setInfo,{
                        allUsers: allUsers
                    })
                    resolve({
                        state: true,
                        info: res.data.stateInfo}
                    )
                }else{
                    resolve({
                        state: false,
                        info: res.data.stateInfo}
                    )
                }
            }).catch(function(err){
                reject(err)
            })*/
        })
    },

    [types.actions.updateUserInfo]: (context, data) => {
        return new Promise((resolve, reject) => {
            console.log(data)
            var allUsers = context.state.allUsers;
            for(var i=0; i<allUsers.length; i++) {
                if(allUsers[i].id === data.id) {
                    allUsers[i] = data
                    break
                }
            }
            context.commit(types.mutations.setInfo,{
                allUsers: allUsers
            })
            resolve({
                state: true,
                info: '修改成功'
            })

            /*myAxios({
                method: 'POST',
                url: 'user/updatePwd',
            }).then(function(res){
                 if(res.data.state.toString()==="0"){
                    var allUsers = context.state.allUsers;
                    for(var i=0; i<allUsers.length; i++) {
                        if(allUsers[i].id === res.data.data.id) {
                            allUsers[i] = res.data.data
                            break
                        }
                    }
                    context.commit(types.mutations.setInfo,{
                        allUsers: allUsers
                    })
                    context.commit(types.mutations.setInfo,res.data.data)
                    resolve({
                        state: true,
                        info: res.data.stateInfo}
                    )
                }else{
                    resolve({
                        state: false,
                        info: res.data.stateInfo}
                    )
                }
            }).catch(function(err){
                reject(err)
            })*/
        })
    },

    [types.actions.exit]: (context) => {
        return new Promise((resolve, reject) => {
            resolve({
                state: true,
                info: 'success'
            })

            /*myAxios({
                method: 'POST',
                url: '/user/exit',
            }).then(function(res){
                 if(res.data.state.toString()==="1"){
                    resolve({
                        state: true,
                        info: res.data.stateInfo}
                    )
                }else{
                    resolve({
                        state: false,
                        info: res.data.stateInfo}
                    )
                }
            }).catch(function(err){
                reject(err)
            })*/
        })
    },
}

const mutations = {
    [types.mutations.setInfo]: (state, datas) => {
        Object.assign(state,datas)
    },
    [types.mutations.refresh]: (state, data) => {
        state.refresh = data
    }
}

export default {
  state,
  getters,
  actions,
  mutations
};
