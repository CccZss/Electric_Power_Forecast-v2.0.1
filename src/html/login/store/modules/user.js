import types from '../types/user'
import { myAxios } from 'src/utils/interaction'

const state = {
    userName: '',
    email: '',
    phone: '',
    userId: undefined,
}

const actions = {
    [types.actions.login]: (context, data) => {
        //context: commit,dispatch,getters,state
        return new Promise((resolve, reject) => {
            myAxios({
                method: 'POST',
                url: 'user/login',
                data: data
            }).then(function(res){
                if(res.data.state.toString()==="0"){
                    context.commit(types.mutations.setInfo,res.data.data)
                    resolve({
                        state: true,
                        info: res.data.stateInfo,
                    })
                }else{
                    resolve({
                        state: false,
                        info: res.data.stateInfo}
                    )
                }
            }).catch(function(err){
                reject(err)
            })
        })
    },
}

const mutations = {
    [types.mutations.setInfo]: (state, datas) => {
        Object.assign(state,datas)
    },
}

export default {
  state,
  actions,
  mutations
};
