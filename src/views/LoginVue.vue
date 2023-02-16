<template>
    <div>
        <el-row type="flex" justify="center">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <h2>邦达物流后台管理系统</h2>
                </div>
                <div>
                    <el-form 
                        :model="ruleForm"   
                        :rules="rules"      
                        ref="ruleForm" 
                        label-width="80px"    
                        class="demo-ruleForm"    
                    >
                        <el-form-item label="用户名:" prop="username">
                            <el-input v-model.trim="ruleForm.username"></el-input>
                        </el-form-item>

                        <el-form-item  label="密码:" prop="password">
                            <el-input type="password" v-model.trim="ruleForm.password"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button 
                                type="primary" 
                                style="width:100%" 
                                @click="login"
                                :loading="this.loading"
                                >登录</el-button>
                        </el-form-item>
                        
                    </el-form>
                </div>
                
            </el-card>
        </el-row>
    </div>
</template>

<script>
// import axios from "axios" 封装后，不直接引用axios
import {post} from "@/utils/http"  
import {setToken} from "@/utils/auth"
// import {setLimit} from "@/utils/limit"
import {mapMutations} from "vuex"

    export default {
        data(){
            return{
                ruleForm:{
                    username:"",
                    password:""
                },
                rules:{
                    username:[
                        {pattern:/^\w{4,8}$/,message:"用户名要求4-8位数字字母组合",trigger:'blur'},
                        {required:true,message:'用户名不能为空',trigger:'blur'}
                    ],
                    password:[
                        {required:true,message:'密码不能为空',trigger:'blur'},
                        {pattern:/^\d{6}$/,message:"密码要求6位纯数字",trigger:'blur'}
                    ]
                },
                loading:false
            }
        },
        methods:{
            ...mapMutations(["setRole"]),
            login(){                
                this.$refs.ruleForm.validate((va)=>{
                    if(va){
                        this.loading=true
                        // axios.get()                        
                        // axios({
                        //     url:"http://localhost:8080/login",
                        //     method:"post",
                        //     data:this.ruleForm,
                            // data:{
                            //     username:this.ruleForm.username,
                            //     password:this.ruleForm.password
                            // }
                        // })
                        post("/login",this.ruleForm).then(res=>{
                            console.log("1",res)//res是后端返回的一系列数据
                            //增加动态路由表(addRoute只能传一个配置项，如果很多数据，只能循环，一个个添加)
                            //动态添加的路由，刷新就丢失
                            // this.$router.addRoute({
                            //     path:"/attendance",
                            //     name:"Attendance",
                            //     meta:{auth:["boss","administration"]},
                            //     component:()=>import("@/views/AuthView/AuthAttendance")
                            // },)

                            //this.$router.getRoutes()获取所有活跃的路由记录列表
                            console.log("路由表",this.$router.getRoutes())


                            this.loading=false
                            setToken(res.token)//保存后端返回的token
                            this.setRole(res.role)//权限存到vuex
                            console.log(this.$store.state.role)
                            // setLimit(res.role) 
                            // sessionStorage.setItem("role",res.role) 
                            //存在sessionStorage中是不安全的，随便一个人在其中输入都行，所以把数据存在VUEX中
                            //then和catch二选一
                            sessionStorage.setItem("nickname",res.nickname)//仅用一次，不封装   
                            
                            this.$router.push('/')                        
                        }).catch((error)=>{
                            this.loading=false
                            console.log(error)
                        })
                    }
                })
            }
        }
    }
</script>

<style lang="less" scoped>
.box-card{
    width: 500px;
    margin-top: 200px;
    h2{
        text-align: center;
    }
}

</style>