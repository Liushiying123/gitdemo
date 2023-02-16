<template>
    <div>
        <h1 class="title">邦达国际物流平台</h1>
        <el-menu 
            :router="true"
            background-color="#001529"
            text-color="#fff"            
        >
            <menus-vue v-for="(item,index) in menuData" :menu="item" :key="index"></menus-vue>
        </el-menu>
    </div>
</template>

<script>
import { get } from '@/utils/http'
import MenusVue from "./MenusVue.vue"

    export default {
        data(){
            return{
                menuData:[]
            }
        },
        created(){
            this.getMenu()
        },
        methods:{
            async getMenu(){
            //  let result=await get("/menu")
            //  console.log(result)
             let {data}=await get("/menu")//解构
                this.menuData=data
            }
        },
        components:{
            MenusVue
        }
    }
</script>

<style lang="less" scoped>
.title{
    line-height: 50px;
    text-align: center;
    color: #fff;
    font-size:18px;
}
</style>