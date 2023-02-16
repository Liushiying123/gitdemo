export default[
  {
    path: '/',
    name: 'LayOut',
    component: ()=>import('../views/LayOut.vue'),
    redirect:"index",//只要去到/layout页面，就自动重定向到/index页面
    //因为不写这个的话，刷新的/页面里面是不会显示/index的
    children:[
      {
        path:"/index",
        name:"index",
        component:()=>import("@/views/index/HomeIndex")
      },
      {
        path:"/orders/list",
        name:"Orders_list",
        component:()=>import("@/views/orders/OrdersList"),
        meta:{bread:["订单管理","订单列表"]}//面包屑
      },
      {
        path:"/waybill/list",
        name:'waybill_list',        
        meta:{bread:["运单管理","运单列表"],keepAlive:true},
        component:()=>import("@/views/waybill/WaybillList"),
      },
      {
        path:"/waybill/in",
        name:"waybill_in",
        meta:{bread:["运单管理","运单录入"]},
        component:()=>import("@/views/waybill/WaybillIn"),
      },
      {
        path:"/waybill/list/detail",
        name:"waybill_list_detail",
        meta:{bread:["运单管理","运单列表","运单详情"]},
        component:()=>import("@/views/waybill/WaybillDetail"),
      },
      {
        path:"/depart/data",
        name:"waybill_list_in",
        meta:{bread:["发车管理","发车数据单"]},
        component:()=>import("@/views/depart/departData"),
      },
    ]
  },
  {
    path:'/login',
    name:'LoginVue',
    component:()=>import("@/views/LoginVue")
  },
  
]

