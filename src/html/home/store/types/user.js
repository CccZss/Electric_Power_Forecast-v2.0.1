import namespace from 'src/utils/namespace'

export default namespace('user', {
    actions: [
    	'getMyInfo',
        'updatePassword',

        'getAllUsers',
        'addUser',
        'deleteUser',
        'updateUserInfo',

        'exit'
    ],
    mutations: [
        'setInfo',
        'refresh',
    ]
})