import namespace from 'src/utils/namespace'

export default namespace('data', {
    actions: [
        'addData',
    	'getAllDatas',
        'getAllAlgorithm',
        'getDataInfo',   // 获取数据集文件具体内容
        'clearDataInfo',  // 只是用于把获取到的文件信息变量释放，没有跟后台交互
        'deleteDataById',
        'downloadDataById', // 下载数据集

        'setDefault',  // 包括 数据集，月份，默认算法
        'getDefault',
        'setDefaultAlgorithm', // 只设置默认算法

        'checkPredictionState',  //查询是否在预测中
        'hasPredictionResult', //查询是否已有结果  0:已有部分预测数据，1:当前无预测数据
        'prediction'  // 开始预测
    ],
    mutations: [
        'setInfo',
    ]
})