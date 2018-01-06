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
                    'xx地区一': ['xx商场一', 'xx商场二', 'xx商场三'],
                    'xx地区二': ['xx工厂一', 'xx工厂二']
                }
            })
            resolve({
                state: true,
                info: 'success'
            })
        })
    },

    [types.actions.getAlgorithmList]: (context, data) => {
        //context: commit,dispatch,getters,state
        return new Promise((resolve, reject) => {
            console.log(data)
           
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
        })
    },

    [types.actions.getElecVisualData]: (context, data) => {
        //context: commit,dispatch,getters,state
        return new Promise((resolve, reject) => {

            console.log(data)
            context.commit(types.mutations.setInfo,{
                chartDdata: {
                    line: {
                        y_original: [120, 132, 101, 134,null,null,null],
                        y_forecast: [null,null,null,134, 90, 230, 210],
                        y_scatter: [null,null,90 ,125, 85, null, null],
                        x: ['2017-01','2017-02','2017-03','2017-04','2017-05','2017-05','2017-06'],
                        legend: {
                            original: '原始数据',
                            forecast: '预测数据',
                            test: '测试数据',
                            max: '上限值',
                            min: '下限值'
                        },
                        startValue: '2017-04',
                        error: 0.2,
                        customer: 'USERA',
                        firstPredictMonth: '2017-04',
                    }
                }
            })
            resolve({
                state: true,
                info: 'success'
            })
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
                        algorithm: ['AdaBoost', 'CART', 'ExtraTrees', 'GBRT', 'Lasso', 'Mix', 'Random Forest', 'Xgboost'],
                        max: 0.35
                    }
                }
            })
            resolve({
                state: true,
                info: 'success'
            })
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
