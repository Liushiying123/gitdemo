<template>
    <div>
        <el-row :gutter="20" class="total">
            <el-col :span="6" >
                <el-card shadow="always" class="in">
                    <div class="fl">
                        <p>盈利</p>
                        <p>824,197</p>
                        <p>+20.12%
                            <span style="font-size:12px">与上月同比</span>
                        </p>
                    </div>
                    <i class="el-icon-tickets fr ico"></i>
                    <div class="cl"></div>
                </el-card>
            </el-col>
            <el-col :span="6" >
                <el-card shadow="always" class="out">
                    <div class="fl">
                        <p>订单量</p>
                        <p>235,447</p>
                        <p>+1.25%
                            <span style="font-size:12px">与上月同比</span>
                        </p>
                    </div>
                    <i class="el-icon-money fr ico"></i>
                    <div class="cl"></div>
                </el-card>
            </el-col>
             <el-col :span="6" >
                <el-card shadow="always" class="allin">
                    <div class="fl">
                        <p>成交吨数</p>
                        <p>1287,038</p>
                        <p>+11.48%
                            <span style="font-size:12px">与去年同比</span>
                        </p>
                    </div>
                    <i class="el-icon-date fr ico"></i>
                    <div class="cl"></div>
                </el-card>
            </el-col>
            <el-col :span="6" >
                <el-card shadow="always" class="allout">
                    <div class="fl">
                        <p>新用户</p>
                        <p>228</p>
                        <p>-2.06%
                            <span style="font-size:12px">与去年同比</span>
                        </p>
                    </div>
                    <i class="el-icon-user fr ico"></i>
                    <div class="cl"></div>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top:20px">
            <el-col :span="18">
                <el-card>
                    <div slot="header" class="middle">销售记录</div>
                    <div style="height:240px" ref="analysis"></div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card>
                    <div slot="header" class="middle">当月指标</div>
                    <div style="height:240px" ref='percent'></div>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="20" class="mt">
            <el-col :span="12">
                <el-card>
                    <el-timeline>
                        <el-timeline-item timestamp="2018/4/12" placement="top">
                            <el-card>
                                <h4>更新 Github 模板</h4>
                                <p>王小虎 提交于 2018/4/12 20:46</p>
                            </el-card>
                        </el-timeline-item>
                        <el-timeline-item timestamp="2018/4/3" placement="top">
                            <el-card>
                                <h4>更新 Github 模板</h4>
                                <p>王小虎 提交于 2018/4/3 20:46</p>
                            </el-card>
                        </el-timeline-item>
                        <el-timeline-item timestamp="2018/4/2" placement="top">
                            <el-card>
                                <h4>更新 Github 模板</h4>
                                <p>王小虎 提交于 2018/4/2 20:46</p>
                            </el-card>
                        </el-timeline-item>
                        <el-timeline-item timestamp="2018/4/2" placement="top">
                            <el-card>
                                <h4>更新 Github 模板</h4>
                                <p>王小虎 提交于 2018/4/2 20:46</p>
                            </el-card>
                        </el-timeline-item>
                        <el-timeline-item timestamp="2018/4/2" placement="top">
                            <el-card>
                                <h4>更新 Github 模板</h4>
                                <p>王小虎 提交于 2018/4/2 20:46</p>
                            </el-card>
                        </el-timeline-item>
                    </el-timeline>
                </el-card>                 
            </el-col>
            <el-col :span="12" >
                <el-card>
                    <el-calendar v-model="date"></el-calendar>
                </el-card>
                
            </el-col>
        </el-row>
    </div>
</template>

<script>
import * as echarts from 'echarts';
import { get } from '@/utils/http';


    export default {
        data(){
            return{
                date:new Date()
            }
        },
        mounted(){//调用，不可以用created,因为要用到DOM元素
            this.drawLine();
            this.drawPie();
        },
        methods:{//在methods中写
        //折线图
            async drawLine(){
                //1.准备容器（拿到元素对象）
                var myChart=echarts.init(this.$refs.analysis);
                //调接口
                //const res=await get("/line")阻塞一下，拿到数据才能往下走
                const {data}=await get("/line")//解构数值写法
                let keys=[];
                let values=[];
                for(let item in data){
                    keys.push(item);
                    values.push(data[item]);
                }
                //2.配置图表配置项
                const option = {
                    tooltip: {
                        trigger: 'item',
                        formatter:"{b}:{c}"
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: keys
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                        data: values,//设定成变量由后端返回数据
                        type: 'line',
                        smooth: true,
                        lineStyle:{
                            color:'#4f88ff',
                        },
                        areaStyle: {
                            color:{
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2:0,
                                y2:1,
                                colorStops: [
                                    {
                                        offset: 0, 
                                        color: '#4f88ff' // 0% 处的颜色
                                    }, 
                                    {
                                         offset: 1, 
                                         color: 'white' // 100% 处的颜色
                                    }
                                ],
                                global: false // 缺省为 false
                            }
                        },
                        }
                    ]
                };
                //3、调用方法生成图表(setOption)
                myChart.setOption(option)
                console.log("myChart",myChart)
                console.log(option)
            },
        //饼图
            drawPie(){
                let myChart=echarts.init(this.$refs.percent);
                const option={
                    tooltip: {
                        trigger: 'item',
                    },
                    series: [{
                        name: 'Access From',
                        type: 'pie',
                        radius: ['40%', '70%'],
                        avoidLabelOverlap: false,
                        itemStyle:{
                            borderRadius: 3,
                            borderColor: '#fff',
                            borderWidth: 2,
                        },
                        label: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            label: {
                            show: true,
                            fontSize: 16,
                            fontWeight: 'bold'
                            }
                        },
                        labelLine: {
                            show: false
                        },
                        data: [
                            { value: 1048, name: 'Search Engine' },
                            { value: 735, name: 'Direct' },
                            { value: 580, name: 'Email' },
                            { value: 484, name: 'Union Ads' },
                            { value: 300, name: 'Video Ads' }
                        ]}
                    ]
                };
                myChart.setOption(option)
            }
        }
    }
</script>

<style lang="less" scoped>
.ico{
    font-size:90px;//字体图标按字体样式修改
    color:rgba(255,255,255,0.3)
}
.in{background: #4f88ff;}
.total{
    p{color: #fff;font-size: 16px;line-height: 30px;}
} 
.out{background: rgb(255, 111, 117);}
.allout{background-color: rgb(79,91,255);}
.allin{background-color: rgb(255, 158, 55);}
.middle{text-align: center;font-size: 16px;}

</style>