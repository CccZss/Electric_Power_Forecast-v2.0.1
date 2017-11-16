import types from '../types/data'
import { myAxios, IP } from 'src/utils/interaction'


const state = {
    defaultDataId: undefined,
    defaultDataName: undefined,
    defaultMonth: undefined,
    defaultAlgorithm: undefined,  // {gruop: [], single:[]}

    allDataList: [],
    allAlgorithmList: [],
    dataInfo: {}, 
}

const actions = {

    [types.actions.addData]: (context, data) => {
        return new Promise((resolve, reject) => {
            console.log(data)
            resolve({
                state: true,
                info: 'success'
            })
        })
    },

    [types.actions.getAllDatas]: (context) => {
        //context: commit,dispatch,getters,state
        return new Promise((resolve, reject) => {

            context.commit(types.mutations.setInfo,{
                allDataList : [
                    {
                        id: 1, 
                        dataName: "数据集_2017-10-26:17:18:3" 
                    },
                    {
                        id: 2, 
                        dataName: "数据集_2017-10-26:17:18:4" 
                    },
                    {
                        id: 3, 
                        dataName: "数据集_2017-10-26:17:18:5" 
                    },
                    {
                        id: 4, 
                        dataName: "数据集_2017-10-26:17:18:6" 
                    },
                    {
                        id: 5, 
                        dataName: "数据集_2017-10-26:17:18:7" 
                    },
                    {
                        id: 6, 
                        dataName: "数据集_2017-10-26:17:18:8" 
                    },
                ]
            })
            resolve({
                state: true,
                info: 'success'
            })
        })
    },

    [types.actions.getAllAlgorithm]: (context) => {
        //context: commit,dispatch,getters,state
        return new Promise((resolve, reject) => {

            context.commit(types.mutations.setInfo,{
                allAlgorithmList: {
                    group: ['Mix'],
                    single: ['AdaBoost', 'CART', 'Extratrees', 'GBRT', 'Lasso', 'RF', 'Xgboost']
                }
            })
            resolve({
                state: true,
                info: 'success'
            })
        })
    },

    [types.actions.getDataInfo]: (context, data) => {
        return new Promise((resolve, reject) => {

            var info = [
                ['name', 'age'],
                ['aaa','bbb','ccc'],
                [10,14,15]
            ]

            var column = []
            info[0].forEach((item, index)=>{
                column.push({
                    title: item,
                    key: index,
                    width: 200
                })
            })
            var columnData = []
            for(var i=1; i<info.length; i++) {
                columnData.push({})
                info[i].forEach((item, index)=>{
                    columnData[i-1][index] = item
                })
            }

            context.commit(types.mutations.setInfo,{
                dataInfo: {
                    column: column,
                    columnData: columnData
                }
            })
            resolve({
                state: true,
                info: 'success'
            })

        })
    },

    [types.actions.clearDataInfo]: (context, data) => {
        return new Promise((resolve, reject) => {

            context.commit(types.mutations.setInfo,{
                dataInfo: {
                    column: [],
                    columnData: []
                }
            })
            resolve({
                state: true,
                info: 'success'
            })
        })
    },

    [types.actions.deleteDataById]: (context, data) => {
        return new Promise((resolve, reject) => {

            var allDataList = context.state.allDataList;
            for(var i=0; i<allDataList.length; i++) {
                if(allDataList[i].id === data.id) {
                    allDataList.splice(i, 1)
                    break
                }
            }
            context.commit(types.mutations.setInfo,{
                allDataList: allDataList
            })
            resolve({
                state: true,
                info: 'success'
            })
        })
    },

    [types.actions.downloadDataById]: (context, data) => {
        return new Promise((resolve, reject) => {
            console.log(data)
            resolve({
                state: true,
                info: 'success',
                url: 'http://www.baidu.com'                
            })
        })
    },

    [types.actions.setDefault]: (context, data) => {
        return new Promise((resolve, reject) => {
            console.log(data)
            resolve({
                state: true,
                info: 'success'
            })
        })
    },

    [types.actions.getDefault]: (context) => {
        return new Promise((resolve, reject) => {

            var info = {
                month: 8,
                dataSetId: 1,
                dataSetName: "数据集_2017-10-26:17:18:3",
                algorithm: {
                    group: ['Mix'],
                    single: ['CART', 'GBRT']
                }
            }
            context.commit(types.mutations.setInfo,{
                defaultDataId: info.dataSetId,
                defaultDataName: info.dataSetName,
                defaultMonth: info.month,
                defaultAlgorithm: info.algorithm
            })
            resolve({
                state: true,
                info: 'success'
            })
        })
    },

    [types.actions.setDefaultAlgorithm]: (context, data) => {
        return new Promise((resolve, reject) => {
            console.log(data)
            resolve({
                state: true,
                info: 'success'
            })
        })
    },

    [types.actions.checkPredictionState]: (context) => {
        return new Promise((resolve, reject) => {
            if(true){
                //Number(new Date().getTime()) % 2
                resolve({
                    state: true,
                    info: 'success'
                })
            }else {
                resolve({
                    state: false,
                    info: 'fauise'
                })
            }
        })
    },

    [types.actions.hasPredictionResult]: (context, data) => {
        return new Promise((resolve, reject) => {
            console.log(data)
            if(Number(new Date().getTime()) % 2){
                resolve({
                    state: true,
                    info: '已有部分预测数据，是否利用已有结果'
                })
            }else {
                resolve({
                    state: false,
                    info: '当前无预测数据'
                })
            }
        })
    },

    [types.actions.prediction]: (context, data) => {
        return new Promise((resolve, reject) => {
            console.log(data)
            
            resolve({
                state: true,
                info: 'success'
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
