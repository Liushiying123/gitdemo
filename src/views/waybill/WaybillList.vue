<template>
    <div>
         <el-breadcrumb separator-class="el-icon-arrow-right">          
            <el-breadcrumb-item v-for="(item,index) in breadList" :key="index">{{item}}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card  class="mt">
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-input placeholder="请输入运单号" v-model="params.waybillNo"></el-input>
                </el-col>
                <el-col :span="6">
                    <el-input placeholder="请输入客户名称" v-model="params.name"></el-input>
                </el-col>
                <el-col :span="6">
                     <el-date-picker
                        v-model="date"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        style="width:100%">
                    </el-date-picker>
                </el-col>
                <el-col :span="6" class="tr">
                    <el-button type="primary" @click="check">查询</el-button>
                    <el-button type="primary" @click="reset">重置</el-button>
                </el-col>
            </el-row>
        </el-card>
        <el-card  class="mt">
             <el-radio-group v-model="params.status" @change="loadData">
                <el-radio-button label="1">全部运单(300)</el-radio-button>
                <el-radio-button label="2">装货中(210)</el-radio-button>
                <el-radio-button label="3">运输中(40)</el-radio-button>
                <el-radio-button label="4">已完成(140)</el-radio-button>
                <el-radio-button label="5">运单异常(10)</el-radio-button>
            </el-radio-group>
        </el-card>
        <el-card class="mt">
            <el-table  :data="tableData" v-loading="loading">
                <el-table-column type="index" label="序号" fixed width="50"></el-table-column>
                <el-table-column prop="no" label="运单号" fixed width="80"></el-table-column>
                <el-table-column prop="date" label="下单时间" width="120"></el-table-column>
                <el-table-column prop="name" label="客户名称" width="180"></el-table-column>
                <el-table-column prop="cargo" label="货物名称" width="80"></el-table-column>
                <el-table-column prop="count" label="件数" width="50"></el-table-column>
                <el-table-column prop="start" label="起始地"  width="150"></el-table-column>
                <el-table-column prop="end" label="目的地" width="150"></el-table-column>
                <el-table-column prop="price" label="运费" width="80"></el-table-column>
                <el-table-column prop="needRecive" label="需要接获" width="50"></el-table-column>
                <el-table-column prop="plateNumber" label="车牌号" width="100"></el-table-column>
                <el-table-column prop="driver" label="司机" width="80"></el-table-column>
                <el-table-column prop="tel" label="司机电话" width="150"></el-table-column>
                <el-table-column prop="percent" label="运输进度" width="150">
                    <template slot-scope="scope">
                        <el-progress :percentage="scope.row.percent"></el-progress>
                    </template>
                </el-table-column>
                <el-table-column label="操作" fixed="right"  width="150">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="detail(scope.row.no)">详情</el-button>
                        <el-button type="danger" size="mini">修改</el-button>
                    </template>                                        
                </el-table-column>
            </el-table>
            <el-pagination
                class="tr mt"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pageData.page"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="pageData.pageSize"
                :total="total">
            </el-pagination>
        </el-card>    
    </div>
    
</template>

<script>
import breadCrumb from '@/mixins/breadCrumb'
import { post } from '@/utils/http'
import moment from "moment"

    export default {
        mixins:[breadCrumb],
        data(){
            return{                
                tableData:[],
                params:{                  
                    waybillNo:"",//双向绑定
                    name:"",  
                    status:1,                  
                },
                total:0,
                date:"",//后端需要的是两个参数，但只有一个表单，只能绑定到一个值
                loading:false,
                pageData:{
                    page:1, 
                    pageSize:10,
                    
                }
            }
        },
        created(){
            this.loadData()
        },
        beforeRouteLeave(to,from,next){//to,from里面有路由信息
            if(to.path=="/waybill/list/detail"){
                from.meta.keepAlive=true;
            }else{
                //如果去的不是详情页，需要清除缓存
                this.clearCache()//清除的是用生命周期当前页面的缓存
            }
            next()
        },
        methods:{            
            async loadData(){
                this.loading=true;
                let startDate=this.date?moment(this.date[0]).format("YYYY-MM-DD"):"";
                let endDate=this.date?moment(this.date[1]).format("YYYY-MM-DD"):"";              
                const res=await post("/waybillList",{...this.params,...this.pageData,startDate,endDate});
                console.log("运单",res)
                this.tableData=res.data.list
                this.total=res.data.total
                this.loading=false
            },
            handleSizeChange(size){
                this.pageData.pageSize=size
                this.loadData()
            },
            handleCurrentChange(page){
                this.pageData.page=page;
                this.loadData()
            },
            check(){
                if(this.params.name||this.params.waybillNo||this.date){
                    this.loadData()
                }
            },
            detail(no){                
                this.$router.push("/waybill/list/detail?no="+no)//query传参
            },
            clearCache(){
                let vnode = this.$vnode;
                let parentVnode = vnode && vnode.parent;
                if (
                    parentVnode &&
                    parentVnode.componentInstance &&
                    parentVnode.componentInstance.cache
                ) {
                    var key =
                    vnode.key == null
                    ? vnode.componentOptions.Ctor.cid +
                    (vnode.componentOptions.tag
                    ? `::${vnode.componentOptions.tag}`
                    : "")
                    : vnode.key;
                    var cache = parentVnode.componentInstance.cache;
                    var keys = parentVnode.componentInstance.keys;
                    if (cache[key]) {
                        this.$destroy();
                        // remove key
                        if (keys.length) {
                            var index = keys.indexOf(key);
                            if (index > -1) {
                                keys.splice(index, 1);
                            }
                        }
                        cache[key] = null;
                    }
                }
            },
            reset(){
                this.params.waybillNo='';
                this.params.name='';
                this.date=''
            }

        },
    }
</script>

<style lang="less" scoped>

</style>