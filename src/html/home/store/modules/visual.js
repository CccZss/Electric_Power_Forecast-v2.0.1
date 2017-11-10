import types from '../types/visual'
import { myAxios, IP } from 'src/utils/interaction'


const state = {
    allUsers: {
        area: null,
        industry: null
    },
    algorithmList: {
        group: [],
        single: []
    },
    chartDdata: null
}

const actions = {

    [types.actions.getAllUser]: (context) => {
        //context: commit,dispatch,getters,state
        return new Promise((resolve, reject) => {

            context.commit(types.mutations.setInfo,{
                allUsers: {
                    '地区': {
                        'xx地区一': ['xx商场一', 'xx商场二', 'xx商场三'],
                        'xx地区二': ['xx工厂一', 'xx工厂二']
                    },
                    '行业': {
                        'IT': ['xx通信', 'xx游戏'],
                        'xx行业': ['xx工业','xx工厂']
                    }
                }
            })
            resolve({
                state: true,
                info: 'success'
            })

            /*myAxios({
                method: 'GET',
                url: 'customer/all',
            }).then(function(res){
                if(res.data.state.toString()==="0"){
                    context.commit(types.mutations.setInfo,{
                        allUsers: res.data.data
                    })
                    resolve({
                        state: true,
                        info: res.data.stateInfo
                    })
                }else{
                    resolve({
                        state: false,
                        info: res.data.stateInfo
                    })
                }
            }).catch(function(err){
                reject(err)
            })*/
        })
    },

    [types.actions.getAlgorithmList]: (context, data) => {
        //context: commit,dispatch,getters,state
        return new Promise((resolve, reject) => {

            context.commit(types.mutations.setInfo,{
                algorithmList: {
                    group: ['gggg'],
                    single: ['aaaa','eeee']
                }
            })
            resolve({
                state: true,
                info: 'success'
            })

            /*myAxios({
                method: 'POST',
                url: 'visualization/algorithm',
                data: data
            }).then(function(res){
                if(res.data.state.toString()==="0"){
                    context.commit(types.mutations.setInfo,{
                        algorithmList: res.data.data
                    })
                    resolve({
                        state: true,
                        info: res.data.stateInfo
                    })
                }else{
                    resolve({
                        state: false,
                        info: res.data.stateInfo
                    })
                }
            }).catch(function(err){
                reject(err)
            })*/
        })
    },

    [types.actions.getElecVisualData]: (context, data) => {
        //context: commit,dispatch,getters,state
        return new Promise((resolve, reject) => {

            console.log(data)
            context.commit(types.mutations.setInfo,{
                chartDdata: {
                    line: {
                        y: [120, 132, 101, 134, 90, 230, 210],
                        x: ['2017-01','2017-02','2017-03','2017-04','2017-05','2017-05','2017-06'],
                        firstPredictMonth: '2017-03',
                        min: 123,
                        max: 245
                    }
                }
            })
            resolve({
                state: true,
                info: 'success'
            })

            /*myAxios({
                method: 'POST',
                url: 'visualization/elec',
                data: data
            }).then(function(res){
                if(res.data.state.toString()==="0"){
                    context.commit(types.mutations.setInfo,{
                        chartDdata: res.data.data
                    })
                    resolve({
                        state: true,
                        info: res.data.stateInfo
                    })
                }else{
                    resolve({
                        state: false,
                        info: res.data.stateInfo
                    })
                }
            }).catch(function(err){
                reject(err)
            })*/
        })
    },

    [types.actions.getErrorVisualData]: (context, data) => {
        //context: commit,dispatch,getters,state
        return new Promise((resolve, reject) => {

            console.log(data)
            context.commit(types.mutations.setInfo,{
                chartDdata: {
                    bar: {
                        x: 'xx商场二',
                        y: {
                            AdaBoost: 0.90,
                            CART: 0.30,
                            ExtrTree: 0.40,
                            GBRT: 0.60,
                            Lasso: 0.90,
                            Mix: 0.10,
                            RF: 0.30,
                            Xgboost: 0.50,
                        },
                        algorithm: ['AdaBoost', 'CART', 'ExtrTree', 'GBRT', 'Lasso', 'Mix', 'RF', 'Xgboost'],
                        min: 0.35
                    }
                }
            })
            resolve({
                state: true,
                info: 'success'
            })

            /*myAxios({
                method: 'POST',
                url: 'visualization/elec',
                data: data
            }).then(function(res){
                if(res.data.state.toString()==="0"){
                    context.commit(types.mutations.setInfo,{
                        chartDdata: res.data.data
                    })
                    resolve({
                        state: true,
                        info: res.data.stateInfo
                    })
                }else{
                    resolve({
                        state: false,
                        info: res.data.stateInfo
                    })
                }
            }).catch(function(err){
                reject(err)
            })*/
        })
    },

    [types.actions.downloadElecData]: (context, data) => {
        //context: commit,dispatch,getters,state
        return new Promise((resolve, reject) => {

            console.log(data)
            resolve({
                state: true,
                info: 'success',
                url: 'http://www.baidu.com'                
            })

            /*myAxios({
                method: 'POST',
                url: 'download/elec',
                data: data
            }).then(function(res){
                if(res.data.state.toString()==="0"){
                    resolve({
                        state: true,
                        info: res.data.stateInfo,
                        url: res.data.data.url
                    })
                }else{
                    resolve({
                        state: false,
                        info: res.data.stateInfo
                    })
                }
            }).catch(function(err){
                reject(err)
            })*/
        })
    },

    [types.actions.downloadErrorData]: (context, data) => {
        //context: commit,dispatch,getters,state
        return new Promise((resolve, reject) => {

            console.log(data)
            resolve({
                state: true,
                info: 'success',
                url: 'http://www.baidu.com'                
            })

            /*myAxios({
                method: 'POST',
                url: 'download/error',
                data: data
            }).then(function(res){
                if(res.data.state.toString()==="0"){
                    resolve({
                        state: true,
                        info: res.data.stateInfo,
                        url: res.data.data.url
                    })
                }else{
                    resolve({
                        state: false,
                        info: res.data.stateInfo
                    })
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
  actions,
  mutations
};
