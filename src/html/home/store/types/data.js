import namespace from 'src/utils/namespace'

export default namespace('data', {
    actions: [
        'addData',
    	'getAllDatas',
        'getAllAlgorithm',
        'getDataInfo',
        'clearDataInfo',
        'deleteDataById',

        'setDefault',  // 包括 数据集，月份，默认算法
        'getDefault',
    ],
    mutations: [
        'setInfo',
    ]
})