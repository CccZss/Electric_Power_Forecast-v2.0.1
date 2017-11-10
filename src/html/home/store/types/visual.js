import namespace from 'src/utils/namespace'

export default namespace('visual', {
    actions: [
        'getAllUser',
        'getAlgorithmList',
        'getElecVisualData',
        'getErrorVisualData',

        'downloadElecData',
        'downloadErrorData',
    ],
    mutations: [
        'setInfo',
    ]
})