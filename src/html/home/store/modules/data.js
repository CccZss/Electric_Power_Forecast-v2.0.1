import types from '../types/data'
import { myAxios, IP } from 'src/utils/interaction'


const state = {
    defaultDataId: undefined,
    defaultDataName: undefined,
    defaultMonth: undefined,
    defaultAlgorithm: [],

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

            /*myAxios({
                method: 'POST',
                url: 'data/import',
                data: data
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

            /*myAxios({
                method: 'GET',
                url: 'data/all',
            }).then(function(res){
                if(res.data.state.toString()==="0"){
                    context.commit(types.mutations.setInfo,{
                        allDataList: res.data.data
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

    [types.actions.getAllAlgorithm]: (context) => {
        //context: commit,dispatch,getters,state
        return new Promise((resolve, reject) => {

            context.commit(types.mutations.setInfo,{
                allAlgorithmList: {
                    group: ['gggg'],
                    single: ['aaaa', 'bbbb', 'cccc', 'dddd', 'eeee']
                }
            })
            resolve({
                state: true,
                info: 'success'
            })

            /*myAxios({
                method: 'GET',
                url: 'data/allAlgorithm',
            }).then(function(res){
                if(res.data.state.toString()==="0"){
                    context.commit(types.mutations.setInfo,{
                        allAlgorithmList: res.data.data
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
                    key: index
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

            /*myAxios({
                method: 'POST',
                url: 'data/single',
                data: data
            }).then(function(res){
                if(res.data.state.toString()==="0"){
                    var info = res.data.data;
                    var column = []
                    info[0].forEach((item, index)=>{
                        column.push({
                            title: item,
                            key: index
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

            /*myAxios({
                method: 'POST',
                url: 'data/single',
                data: data
            }).then(function(res){
                if(res.data.state.toString()==="0"){
                    var allDataList = context.state.allDataList;
                    for(var i=0; i<allDataList.length; i++) {
                        if(allDataList[i].id === res.data.state.id) {
                            allDataList.splice(i, 1)
                            break
                        }
                    }
                    context.commit(types.mutations.setInfo,{
                        allDataList: allDataList
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

    [types.actions.setDefault]: (context, data) => {
        return new Promise((resolve, reject) => {
            console.log(data)
            context.commit(types.mutations.setInfo,{
                defaultDataId: data.dataSetId,
                defaultDataName: "数据集_2017-10-26:17:18:3",
                defaultMonth: data.month,
                defaultAlgorithm: data.algorithm
            })
            resolve({
                state: true,
                info: 'success'
            })

            /*myAxios({
                method: 'POST',
                url: 'user/setDefault',
                data: data
            }).then(function(res){
                if(res.data.state.toString()==="0"){
                    context.commit(types.mutations.setInfo,{
                        defaultDataId: res.data.data.dataSetId
                        defaultDataName: res.data.data.dataSetName,
                        defaultMonth: res.data.data.month,
                        defaultAlgorithm: res.data.data.algorithm
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

    [types.actions.getDefault]: (context) => {
        return new Promise((resolve, reject) => {

            var info = {
                month: 8,
                dataSetId: 1,
                dataSetName: "数据集_2017-10-26:17:18:3",
                algorithm: {
                    group: ['gggg'],
                    single: ['aaaa', 'cccc']
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

            /*myAxios({
                method: 'GET',
                url: 'data/selectDefault',
            }).then(function(res){
                if(res.data.state.toString()==="0"){
                    context.commit(types.mutations.setInfo,{
                        defaultDataId: res.data.data.dataSetId
                        defaultDataName: res.data.data.dataSetName,
                        defaultMonth: res.data.data.month,
                        defaultAlgorithm: res.data.data.algorithm
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
