<template>
    <div>
        <div class="fr">
            <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
                    欢迎您,{{info}}
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="a">个人中心</el-dropdown-item>
                    <el-dropdown-item command="b">修改密码</el-dropdown-item>
                    <el-dropdown-item command="c">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <!-- 要调接口的，一定有一个接口记录了入职时间 -->
        <p class="date fr">
            今天是你在阿里的第
            <span class="tips">{{days}}</span>天
        </p>
        <div class="cl"></div>
    </div>
    
</template>

<script>
import { removeToken } from '@/utils/auth';
import {get} from "@/utils/http"

    export default {
        data(){
            return{
                info:sessionStorage.getItem("nickname"),
                time:"",
            }
        },
        //一进页面的时候发送👇,因为不依赖于页面解构来做事情，所以不用mounted
        created(){//不推荐在生命周期内写逻辑,写在methods封装函数
            //获取入职时间
            this.workTime()//用this调用
        },
        methods:{
            handleCommand(item){
                if(item=="c"){
                    removeToken();
                    this.$router.push('/login')
                }
            },
            workTime(){
                // get("/in").then(res=>{
                //     this.time=res.time//将入职时间存起来
                // })
                get("/in").then(({time})=>{//解构赋值的写法
                    this.time=time
                })
            }
        },
        computed:{
            days(){
                let now=new Date();
                let target=this.time?new Date(this.time):new Date();
                //
                return Math.floor((now-target)/1000/60/60/24)
            }
        }
        
    }
</script>

<style lang="less" scoped>
.date{
    margin-right: 50px;
    .tips{
        font-size: 24px;
        color: #5696ff;
    }
}
</style>