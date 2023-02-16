<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">          
            <el-breadcrumb-item v-for="(item,index) in breadList" :key="index">{{item}}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card class="mt" >
            <el-form
                :model="ruleForm"
                :rules="rules" 
                ref="ruleForm"
                label-width="100px" 
                style="width:800px;"
            >
                <el-row >
                    <el-col :offset="12" >                        
                        <el-form-item label="客户名称" prop="name" required>
                            <el-input v-model="ruleForm.name"></el-input>
                        </el-form-item>  
                        <el-form-item label="客户单号" prop="no" required>
                            <el-input v-model="ruleForm.nono"></el-input>
                        </el-form-item> 
                        <el-form-item label="发货地址" prop="address" required>
                            <el-input v-model="ruleForm.address"></el-input>
                        </el-form-item> 
                        <el-form-item label="货物单位" prop="unit" required>
                            <el-select v-model="ruleForm.unit" placeholder="请选择货物单位" >
                                <el-option label="方" value="1"></el-option>
                                <el-option label="吨" value="2"></el-option>
                            </el-select>    
                        </el-form-item> 
                        <el-form-item label="下单时间" required >
                            <el-col :span="11" >
                                <el-form-item prop="date1" >
                                    <el-date-picker 
                                    type="date" 
                                    placeholder="选择日期" 
                                    v-model="ruleForm.date1" 
                                    style="width: 100%;"
                                    
                                    >
                                    </el-date-picker>
                                </el-form-item>
                            </el-col>
                            <el-col class="line" :span="2" style="text-align:center;">-</el-col>
                            <el-col :span="11">
                                <el-form-item prop="date2">
                                    <el-time-picker 
                                    placeholder="选择时间" 
                                    v-model="ruleForm.date2" 
                                    style="width: 100%;">
                                    </el-time-picker>
                                </el-form-item>
                            </el-col>
                        </el-form-item> 
                        <el-form-item label="即时配送" prop="delivery">
                            <el-switch v-model="ruleForm.delivery"></el-switch>
                        </el-form-item>
                        <el-form-item label="承运方式" required>
                            <template>
                                <el-radio v-model="radio" label="1">个人</el-radio>
                                <el-radio v-model="radio" label="2">公司</el-radio>
                            </template>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" >立即创建</el-button>
                            <el-button >重置</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </el-card>
    </div>
</template>

<script>
import breadCrumb from '@/mixins/breadCrumb'
    export default {
        mixins:[breadCrumb],
        data(){
            return{
                ruleForm:{
                    name:"",
                    no:"",
                    address:"",
                    unit:"",
                    delivery:false,

                    
                },
                radio:"",
                rules:{
                    name:[
                        {required:true,message:"不能为空",trigger:"blur"}
                    ]
                }
            }
        }
    }
</script>

<style lang="less" scoped>

</style>