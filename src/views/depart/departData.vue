<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">          
            <el-breadcrumb-item v-for="(item,index) in breadList" :key="index">{{item}}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card class="mt">
            <el-row :gutter="20">
                <el-col :span="18">
                    <el-row :gutter="20">
                        <el-col :span="8">
                            <el-input placeholder="请输入"></el-input>
                        </el-col>
                        <el-col :span="8">
                            <el-input placeholder="请输入"></el-input>
                        </el-col>
                        <el-col :span="8">
                            <el-input placeholder="请输入"></el-input>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20" v-show="show"  class="mt">
                        <el-col :span="8">
                            <el-input placeholder="请输入"></el-input>
                        </el-col>
                        <el-col :span="8">
                            <el-input placeholder="请输入"></el-input>
                        </el-col>
                        <el-col :span="8">
                            <el-input placeholder="请输入"></el-input>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="2">
                    <el-dropdown>
                        <span class="el-dropdown-link" @click="expand">
                            {{show?"收起":"展开"}}<i :class="`el-icon-arrow-${show?'up':'down'} el-icon--right`"></i>
                        </span>
                        <el-dropdown-menu >
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-col>
                <el-col :span="4" class="tr">
                    <el-button type="primary">查询</el-button>
                    <el-button type="primary">重置</el-button>
                </el-col>
            </el-row>
        </el-card>
        <el-card class="mt">
            <el-table  :data="tableData" v-loading="loading">
                <el-table-column type="index" label="序号" fixed width="50"></el-table-column>
                <el-table-column prop="no" label="运单号" fixed width="100"></el-table-column>
                <el-table-column prop="date" label="下单时间" width="120"></el-table-column>
                <el-table-column prop="name" label="客户名称" width="180"></el-table-column>
                <el-table-column prop="cargo" label="货物名称" width="100"></el-table-column>
                <el-table-column prop="count" label="件数" width="50"></el-table-column>
                <el-table-column prop="start" label="起始地"  width="150"></el-table-column>
                <el-table-column prop="end" label="目的地" width="150"></el-table-column>
                <el-table-column prop="price" label="运费" width="80"></el-table-column>
                <el-table-column prop="needRecive" label="需要接获" width="50"></el-table-column>
                <el-table-column prop="plateNumber" label="车牌号" width="100"></el-table-column>
                <el-table-column prop="driver" label="司机" width="100"></el-table-column>
                <el-table-column prop="tel" label="司机电话" width="150"></el-table-column>
                <el-table-column prop="percent" label="运输进度" width="150">
                    <template slot-scope="scope">
                        <el-progress :percentage="scope.row.percent"></el-progress>
                    </template>
                </el-table-column>
                <el-table-column label="操作" fixed="right"  width="80">
                    <template>
                        <el-button size="mini" type="primary">详情</el-button>
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
import moment from 'moment'

    export default {
        mixins:[breadCrumb],
        data(){
            return{
                show:false,
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
        methods:{
            expand(){
                this.show=!this.show
            },
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
        }
    }
</script>

<style lang="less" scoped>
 .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 18px;
  }
  .el-icon-arrow-up {
    font-size: 18px;
  }
</style>