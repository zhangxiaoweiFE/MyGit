<template>
    <div id="app">
        <v-header :seller="seller"></v-header>
        <div class="tab border-1px">
            <ul>
                <li class="tab-item">
                    <router-link to="/goods">商品</router-link>
                </li>
                <li class="tab-item">
                    <router-link to="/ratings">评论</router-link>
                </li>
                <li class="tab-item">
                    <router-link to="/seller">商家</router-link>
                </li>
            </ul>
        </div>
        <div>
            <keep-alive>
                <router-view :seller="seller" ></router-view>
            </keep-alive>
        </div>
    </div>
</template>

<script>
import {urlParse} from "@/common/js/util.js";
import Header from "./components/header/header"

const ERR_OK = 0;

export default {
  name: 'app',
  data() {
    return {
        seller:{
            id:(() => {
                let queryParam=urlParse();
                return queryParam.id;
            })()
        }
    }
  },
  created() {
    this.$http.get("/api/seller?id="+this.seller.id).then((res) => {
        res=res.body;
        if(res.errno===ERR_OK){
            // this.seller=res.data;
            this.seller=Object.assign({},this.seller,res.data);
        }
    });
  },
  components:{
    "v-header":Header
  }
}
</script>

<style>
    .tab{
        position: relative;
    }
    .tab:after{
        content:"";
        position: absolute;
        left: 0;
        bottom:0;
        width: 100%;
        border-bottom:1px solid rgba(7,17,27,.1);
    }
    .tab ul{
        display: flex;
        width: 100%;
    }
    .tab-item{
        flex:1;
        height: 40px;
        line-height: 40px;
        text-align:center;
    }
    .tab-item a{
        display: block;
        font-size: 14px;
        color:rgb(77,85,93);
    }
    .tab-item a.active{
        color:rgb(240,20,20);
    }
</style>
