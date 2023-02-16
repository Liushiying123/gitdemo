<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">          
            <el-breadcrumb-item v-for="(item,index) in breadList" :key="index">{{item}}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card class="mt">
            <el-row>
                <el-col :span="6">
                    <el-input 
                        placeholder="请输入订单号或客户名称" 
                        v-model="params.keyword" 
                        class="input-with-select"
                    >
                        <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="6" :offset="12" class="operate">
                    <el-button type="primary" @click="visible=true">新建订单</el-button>
                    <el-button :disabled="!select.length" @click="operate(1)">审核</el-button>
                    <el-button :disabled="!select.length" @click="operate(2)">修改</el-button>
                    <el-button :disabled="!select.length" @click="operate(3)">作废</el-button>
                </el-col>
            </el-row>
        </el-card>
        <el-card class="mt">
            <el-table
            :data="tableData"
            style="width: 100%" 
            v-loading="loading"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)"
            @selection-change="handleSelectionChange">
            >
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column type="index" width="55" label="序号"></el-table-column>
                               <!-- 👇prop的属性值由后端决定 -->
                <el-table-column prop="id" label="订单号" fixed></el-table-column>
                <el-table-column prop="status" label="状态" >
                    <!--当有多种选择时，用以下固定语法取table内部的数据 -->
                     <template slot-scope="scope">
                        <span v-if="scope.row.status==1">待审核</span>
                        <span v-else-if="scope.row.status==2">已审核</span>
                        <span v-else-if="scope.row.status==3">审核通过</span>
                        <span v-else>审核拒绝</span>
                    </template>
                </el-table-column>                   
                <el-table-column prop="date" label="下单时间" width="100"></el-table-column>
                <el-table-column prop="name" label="客户名称" width="150"></el-table-column>
                <el-table-column prop="start" label="起始城市" width="180"></el-table-column>
                <el-table-column prop="end" label="目的城市" width="180"></el-table-column>
                <el-table-column prop="cargo" label="货物名称" ></el-table-column>
                <el-table-column prop="count" label="件数" ></el-table-column>
                <el-table-column prop="unit" label="单位" width="80"></el-table-column>
                <el-table-column prop="price" label="运费" ></el-table-column>
                <el-table-column prop="from" label="订单来源" ></el-table-column>
                <el-table-column prop="pay" label="是否支付" >
                    <template slot-scope="scope">
                        {{scope.row.pay==1?"已支付":"未支付"}}
                    </template>
                </el-table-column>
                <el-table-column label="操作" fixed="right" width="180">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="edit(scope.row)">编辑</el-button>
                        <el-button type="danger" size="mini" @click="deletes(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="params.page"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="params.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
                class="mt fr mb"
            >
            </el-pagination>
        </el-card>
        <orders-model :visible="visible" @hide="visible=false" @reload="loadData"></orders-model>
    </div>
</template>

<script>
//不要在生命周期写逻辑
import breadCrumb from "@/mixins/breadCrumb"
import {post} from "@/utils/http"
import ordersModel from "./ordersModel.vue"
import {mapMutations} from "vuex"

    export default {
        mixins:[breadCrumb],
        data(){
            return{                
                params:{
                    page:1,
                    pageSize:10,
                    keyword:'',                    
                },
                 tableData: [],
                 loading: false,
                 total:0,
                 select:[],
                 visible:false,
                 
            }
        },
        created(){
            this.loadData()
        },
        methods:{
            async loadData(){
                this.loading=true
                const res=await post("/orderList",this.params);
                this.tableData=res.data.list
                this.total=res.data.total
                this.loading=false
            },
            handleSizeChange(pageSize){
                this.params.pageSize=pageSize;
                this.loadData()
            },
            handleCurrentChange(page){
                this.params.page=page;
                this.loadData()
            },
            handleSelectionChange(selection){
                this.select=selection
                console.log(selection)
            },
            operate(type){
                let nos=this.select.map(item=>item.id)//循环一个数组，返回新数组
                //本来这步骤是发请求，省略了，用一个提示代替
                console.log(type)
                console.log(nos)
                this.$notify({
                    title: '操作成功',
                    message: nos,
                    type: ''
                });
            },
            delete(id){
                post("/delete",{id}).then(()=>{
                    this.$message({
                        message:"操作成功",
                        type:"success"
                    });
                    this.loadData();
                    //👆要写在then里面，因为this.loadData在created里，比post要先执行
                })
            },
            ...mapMutations(["setRow"]),
            edit(row){
                this.setRow(row);
                this.visible=true
                console.log(this.$store.state.row)
            }
        },
        components:{
            ordersModel
        }
    }
</script>

<style lang="less" scoped>
.operate{text-align: right;}
</style>