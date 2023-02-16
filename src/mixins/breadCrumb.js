export default{
    data(){
        return{
            breadList:[]
        }
    },
    created(){
        this.getBreadCrumb()
    },
    watch:{
        $route(){
           this.getBreadCrumb()//只要路由有变化就执行此步
           //params/query情况下，路由信息变了，不跳页面 
        }
    },
    methods:{
        getBreadCrumb(){
            // this.breadList=this.$route.meta.bread?this.$route.meta.bread:[]
            this.breadList=this.$route.meta.bread||[]
        }
    }
}