const routes = [
  { 
    path: '*/homepage', 
    redirect: {
      name: 'homepage'
    } 
  },
  {
    path: '/homepage',
    name: 'homepage',
    meta: {
      title: 'HOMEPAGE'
    },
    component: require('../components/homepage.vue'),
  },
  {
    name: 'dataManage',
    path: '/dataManage',
    component: require('../components/dataManage.vue'),
    children: [
      {
        path: 'inputData',
        name: 'inputData',
        component: require('../components/dataManage/inputData.vue')
      },
      {
        path: 'checkData',
        name: 'checkData',
        component: require('../components/dataManage/checkData.vue')
      },
      {
        path: 'setDefault',
        name: 'setDefault',
        component: require('../components/dataManage/setDefault.vue')
      },
    ]
  },
  {
    name: 'prediction',
    path: '/prediction',
    component: require('../components/prediction.vue'),
    children: [
      {
        path: 'selectAlgorithm',
        name: 'selectAlgorithm',
        component: require('../components/prediction/selectAlgorithm.vue')
      },
      {
        path: 'startPrediction',
        name: 'startPrediction',
        component: require('../components/prediction/startPrediction.vue')
      },
    ]
  },
  {
    name: 'visualization',
    path: '/visualization',
    component: require('../components/visualization.vue'),
    children: [
      {
        path: 'electricity',
        name: 'electricity',
        component: require('../components/visualization/electricity.vue')
      },
      {
        path: 'deviation',
        name: 'deviation',
        component: require('../components/visualization/deviation.vue')
      },
    ]
  },
  {
    name: 'userManage',
    path: '/userManage',
    component: require('../components/userManage.vue'),
    children: [
      {
        path: 'changePassword',
        name: 'changePassword',
        component: require('../components/userManage/changePassword.vue')
      },
      {
        path: 'manageAccounts',
        name: 'manageAccounts',
        component: require('../components/userManage/manageAccounts.vue')
      },
    ]
  },
]

module.exports = routes