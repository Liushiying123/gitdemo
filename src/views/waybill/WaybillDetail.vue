<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">          
            <el-breadcrumb-item v-for="(item,index) in breadList" :key="index">{{item}}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card class="head mt">
            <span>运单编号:YGC546513610345</span>
            <span class="ml">创建时间:2022-08-24</span>
            <span class="ml">审核员:张三丰</span>
            <el-button type="primary" size="mini" class="fr" @click="back">返回</el-button>
        </el-card>
        <el-card class="mt" >
            <el-steps :active="2" align-center >
                <el-step title="未发货" ></el-step>
                <el-step title="运输中"></el-step>
                <el-step title="已收货"></el-step>
                <el-step title="已完成"></el-step>
            </el-steps>
        </el-card>
        <el-card class="mt">
            <div >
                <p class="title">基础信息</p>
                <el-row class="row">
                    <el-col :span="6">
                        <p>客户名称:未来有限公司</p>
                        <p>货物名称:口罩</p>
                        <p>数量:8吨</p>
                    </el-col>
                    <el-col :span="6">
                        <p>是否易燃易爆炸品:否</p>
                        <p>结算方式:现付</p>
                        <p>运费:12000元</p>
                    </el-col>
                    <el-col :span="6">
                        <p>发货单据:暂未上传</p>
                        <p>接货单据:暂未上传</p>
                        <p>所属业务员:苏苏</p>
                    </el-col>
                    <el-col :span="6">
                        <p>客户下单时间:2020-08-25</p>
                        <p>是否需要接货:否</p>
                    </el-col>
                </el-row>
            </div>
            <div class="line">
                <p class="title mt">运输信息</p>
                <el-row class="row">
                    <el-col :span="6">
                        <p>车牌号:粤A1534</p>
                        <p>司机姓名:反恐精英</p>
                    </el-col>
                    <el-col :span="6">
                        <p>司机电话:12345678911</p>
                        <p>司机地址:贵州省</p>
                    </el-col>
                    <el-col :span="6">
                        <p>司机身份证号:13254854184186</p>
                        <p>所属公司:收到运输公司</p>
                    </el-col>
                    <el-col :span="6">
                        <p>预计运输时间:5天</p>
                        <p>违约金:12000</p>
                    </el-col>
                </el-row>
            </div>
            <div >
                <p class="title mt">经办人员信息</p>
                <el-row class="row">
                    <el-col :span="6">
                        <p>业务员:张胜男</p>
                    </el-col>
                    <el-col :span="6">
                        <p>审核员:张胜男</p>
                    </el-col>
                    <el-col :span="6">
                        <p>制单员:张胜男</p>
                    </el-col>
                    <el-col :span="6">
                        <p>备注:无</p>
                    </el-col>
                </el-row>
            </div>
        </el-card>
    </div>
</template>

<script>
import breadCrumb from '@/mixins/breadCrumb'

    export default {
        mixins:[breadCrumb],
        methods:{
            back(){
                this.$router.push("/waybill/list")
            },
           
        }
    }
</script>

<style lang="less" scoped>
.head{
    font-size: 14px;
}
.title{
    font-size: 16px;
    font-weight: bolder;
} 
.row{
    margin:20px 0;
    .el-col{
        font-size: 14px;
        line-height: 30px;
    }
}
.line{
    border-bottom: 1px solid rgb(204, 203, 203);
    border-top: 1px solid  rgb(204, 203, 203);
}
</style>