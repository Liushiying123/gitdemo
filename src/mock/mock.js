import Mock from "mockjs";

//模拟网络延时
Mock.setup({//设置延时
    timeout:500
})

//登录接口
//这里是在写后端的接口，规定了接口地址、接口请求方式;
Mock.mock('http://localhost:8080/login',"post",(req)=>{
    //req是形参，返回一个对象，是前端发给后端的数据
    const{username,password} = JSON.parse(req.body);
    //根据用户名和密码查询数据库，查询出数据返回给前端
    if(username=="liuliu"&&password==123456){
        return{
            code:200,
            success:true,
            message:"登陆成功",
            token:"3arc9h0vhcr0f8iprpnscmfo8s",//令牌（后端提供）,验证身份，根据token返回数据，
            //不需要每次发送请求时进行身份验证
            nickname:'刘世颖',//返回用户昵称
            role:"finance",
        }
    }else{
        return{
            code:100,
            success:false,
            message:'账号或密码有误'
        }
    }
})


//入职日期接口
Mock.mock("http://localhost:8080/in","get",()=>{
    //不需传参，返回数据
    return{
        code:200,
        success:true,
        message:"请求成功",
        time:"2022-12-20 00:00:00"
    }
})

//菜单接口(里面的URL与路由path一一对应)
const menuList = [
    {
        name: "首页",
        icon: "el-icon-s-home",//在elementUi中的icon找的
        url: "/index",
    },
    {
        name: "订单管理",
        icon: "el-icon-s-order",
        url: "/order",
        children: [
            {
                name: "订单列表",
                icon: "el-icon-user",
                url: "/orders/list",
            }
        ]
    },
    {
        name: "运单管理",
        icon: "el-icon-menu",
        url: "/waybill",
        children: [
            {
                name: "运单录入",
                icon: "el-icon-notebook-2",
                url: "/waybill/in",
            },
            {
                name: "运单列表",
                icon: "el-icon-truck",
                url: "/waybill/list",
            }
        ]
    },
    {
        name: "发车管理",
        icon: "el-icon-s-order",
        url: "/depart",
        children: [
            {
                name: "发车数据单",
                icon: "el-icon-tickets",
                url: "/depart/data",
            }
        ]
    },
    {
        name: "承运商管理",
        icon: "el-icon-user",
        url: "/carrier",
        children: [
            {
                name: "承运商列表",
                icon: "el-icon-chat-square",
                url: "/carrier/list",
            },
            {
                name: "车辆列表",
                icon: "el-icon-bank-card",
                url: "/carrier/trucks",
            },
            {
                name: "承运司机列表",
                icon: "el-icon-bank-card",
                url: "/carrier/list",
            },
        ]
    },
    {
        name: "客户管理",
        icon: "el-icon-chat-dot-square",
        url: "/customer",
    },
    {
        name: "财务管理",
        icon: "el-icon-user",
        url: "/my",
        children: [
            {
                name: "客户对账单",
                icon: "el-icon-chat-square",
                url: "/customer/info",
            },
            {
                name: "承运商对账单",
                icon: "el-icon-bank-card",
                url: "/record",
            },
            {
                name: "承运司机列表",
                icon: "el-icon-bank-card",
                url: "/record",
            },
        ]
    },
    {
        name: "个人中心",
        icon: "el-icon-chat-dot-square",
        url: "/personal",
    },
]
Mock.mock("http://localhost:8080/menu","get",()=>{
    return{
        code:200,
        success:true,
        message:"请求成功",
        data:menuList,
    }
})


//折线图接口
Mock.mock("http://localhost:8080/line","get",()=>{
    return{
        code:200,
        success:true,
        message:"请求成功",
        data:{
            "1月":30,
            "2月":84,
            "3月":56,
            "4月":47,
            "5月":84,
            "6月":61,
            "7月":90,
        }
    }
})


//订单管理-订单列表
Mock.mock('http://localhost:8080/orderList', 'post', (req) => {
    //下面三个名字一般是由后端提供👇（keyword是接收搜索框传入的信息）
    const { page, pageSize,keyword } = JSON.parse(req.body);
    //后端数据量庞大，page进行分页处理：第一页，选取100条数据
    console.log("接口接收到参数:",page,pageSize,keyword)
    return {
        code: 200,
        success: true,
        message: "成功",
        data: Mock.mock({
            //👇将前端请求的数量作为变量传入，外面要加中括号
            [`list|${pageSize}`]: [{//一般写法：list|100 每次获取100份数据
                'id|+1': 10000,//订单号（每条订单号+1；10001）
                'status|1': [1,2,3,4],//订单状态 1待审核 2已审核 3审核通过 4审核拒绝（从4种状态随机生成其中一种）
                'date': Mock.Random.date(),//下单时间（生成随机时间）
                'name|1': ["诺来科技有限公司","辉华股份有限公司","川聚物流有限公司","成越材料有限公司","聚博纺织有限公司"],
                //👆客户名称（随机选一个公司）
                'start': Mock.Random.city(true),//起始城市（随机生成一个城市）
                'end': Mock.Random.city(true),//目的城市（随机生成一个城市）
                'cargo|1': ["日用品","纺织品","生鲜","建材","电器"],//货物名称（随机选一个）
                'count': Mock.Random.integer(10, 200),//件数（在10-200之间随机取一个整数）
                'unit|1': ["方","吨"],//单位（随机选一个单位）
                "price":Mock.Random.integer(5000,50000),//运费（在5000-50000之间随机取一个整数）
                "from|1":["移动端","pc端"],//（两项种随机选一个）
                "pay|1":[1,2],//是否支付 1 已支付 2未支付 （两项种随机选一个）     
            }],
            "total": 47//后端会返回提供的数据条数总量
        })
    }
})

//订单管理-新建订单
Mock.mock('http://localhost:8080/addOrder',"post",(req)=>{
    const { name,start,end,cargo,count,unit,price,from,pay} = JSON.parse(req.body);
    //正常情况下，把拿到的数据往数据库里存，但现在没有数据库，就简单打印代表成功
    console.log("新建订单接口收到参数：", name,start,end,cargo,count,unit,price,from,pay)
    return{
        code:200,
        success:true,
        message:"创建成功",
        }
})


//运单管理-运单列表
Mock.mock('http://localhost:8080/waybillList', 'post', (req) => {
     const { page, pageSize,waybillNo,name,startDate,endDate,status } = JSON.parse(req.body);
     console.log("服务端接收到参数",page, pageSize,waybillNo,name,startDate,endDate,status)
    return {
        code: 200,
        success: true,
        message: "成功",
        data: Mock.mock({
            [`list|${pageSize}`]: [{
                'no|+1': 10000,//订单号
                'date': Mock.Random.date(),//下单时间
                'name|1': ["诺来科技有限公司","辉华股份有限公司","川聚物流有限公司","成越材料有限公司","聚博纺织有限公司"],//客户名称
                'cargo|1': ["日用品","纺织品","生鲜","建材","电器"],//货物名称
                'count': Mock.Random.integer(10, 200),//件数
                'start': Mock.Random.city(true),//起始城市
                'end': Mock.Random.city(true),//目的城市,
                "price":Mock.Random.integer(5000,50000),//运费
                "needRecive|1":[1,2],//需要接货 1需要 2不需要
                'plateNumber|1': ["京A12345","苏C66666","鲁B45678"],//车牌号
                 "driver":Mock.Random.cname(),//cname关键字随机生成姓名
                 "tel|1":[18888888888,15577896554,15789654785,13698745269],
                 "percent|1":[37,22,89,65,80,74,56]//运货进度
   
            }],
            "total": 47
        })
    }
})


//根据token获取权限名字
Mock.mock("http://localhost:8080/getrole","get",()=>{
    return{
        code:200,
        success:true,
        message:"请求成功",
        role:"finance",
    }
})