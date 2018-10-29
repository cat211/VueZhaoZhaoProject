
<template>
  <div>

    <!--内容-->
    <div class="row bg-success my-index-center">
      <!--内容左空白-->
      <div class="col-md-2"></div>
      <!--内容左空白end-->
      <!--内容左导航列表-->
      <div class="col-md-2 ">
        <div class="list-group">
          <!--<router-link to="./personalcenter"><a href="javascript:void 0" class="list-group-item active">个人中心</a></router-link>-->
          <!--<router-link to="./myhome"><a href="javascript:void 0" class="list-group-item ">我的首页</a></router-link>-->
          <!--<router-link to="./myinfo"><a href="javascript:void 0" class="list-group-item ">我的信息</a></router-link>-->
          <!--<router-link to="./myoldinfo"><a href="javascript:void 0" class="list-group-item ">入住人信息</a></router-link>-->
          <!--<router-link to="./myorder"><a href="javascript:void 0" class="list-group-item ">我的收藏</a></router-link>-->
          <!--<router-link to="./mycoll"><a href="javascript:void 0" class="list-group-item ">我的订单</a></router-link>-->
          <!--<router-link to="./mystate"><a href="javascript:void 0" class="list-group-item ">状态报表</a></router-link>-->
          <a href="#" class="list-group-item active">个人中心</a>
          <a href="#" class="list-group-item lgi" @click="myhomestate=true,myinfostate=false,myoldstate=false,mycollstate=false,myordertate=false,mystatestate=false,mymessage=false">我的首页</a>
          <a href="#" class="list-group-item lgi" @click="myhomestate=false,myinfostate=true,myoldstate=false,mycollstate=false,myordertate=false,mystatestate=false,mymessage=false">我的信息</a>
          <a href="#" class="list-group-item lgi" @click="myhomestate=false,myinfostate=false,myoldstate=true,mycollstate=false,myordertate=false,mystatestate=false,mymessage=false">入住人信息</a>
          <a href="#" class="list-group-item lgi" @click="myhomestate=false,myinfostate=false,myoldstate=false,mycollstate=true,myordertate=false,mystatestate=false,mymessage=false">我的收藏</a>
          <a href="#" class="list-group-item lgi" @click="myhomestate=false,myinfostate=false,myoldstate=false,mycollstate=false,myordertate=true,mystatestate=false,mymessage=false">我的订单</a>
          <a href="#" class="list-group-item lgi" @click="myhomestate=false,myinfostate=false,myoldstate=false,mycollstate=false,myordertate=false,mystatestate=true,mymessage=false">状态报表</a>
          <a href="#" class="list-group-item lgi" @click="myhomestate=false,myinfostate=false,myoldstate=false,mycollstate=false,myordertate=false,mystatestate=false,mymessage=true">消息通知</a>
        </div>
      </div>
      <!--内容左导航end-->
      <!--内容右-->
      <div class="col-md-8">
        <div class="row">
          <my-home v-if="myhomestate" @changeinfoclick="changeInfo()"></my-home>
          <my-info v-if="myinfostate"></my-info>
          <my-oldinfo v-if="myoldstate"></my-oldinfo>
          <my-order v-if="myordertate"></my-order>
          <my-coll v-if="mycollstate"></my-coll>
          <my-state v-if="mystatestate"></my-state>
          <my-message v-if="mymessage"></my-message>
        </div>

      </div>
      <!--内容右end-->
      <!--<div class="col-md-2"></div>-->
    </div>
    <!--内容end-->

  </div>
</template>

<script>
export default {
  name: 'PersonalCenter',
  data () {
    return {
      myhomestate: true,
      myinfostate: false,
      myoldstate: false,
      myordertate: false,
      mycollstate: false,
      mystatestate: false,
      mymessage: false,
    }
  },
  methods:{
    changeInfo:function () {
      this.myhomestate=false,
        this.myinfostate=true,
        this.myoldstate=false,
        this.myordertate=false,
        this.mycollstate=false,
        this.mystatestate=false
        this.mymessage=false
    }

  },
  mounted(){
    if(sessionStorage.getItem('gotostate')){
      sessionStorage.setItem('gotostate','')
      this.myhomestate=false,
        this.myinfostate=false,
        this.myoldstate=false,
        this.mycollstate=false,
        this.myordertate=false,
        this.mymessage=false,
        this.mystatestate=true
    }
    else if(sessionStorage.getItem('gotomessage')){
      sessionStorage.setItem('gotomessage','')
      this.myhomestate=false,
        this.myinfostate=false,
        this.myoldstate=false,
        this.mycollstate=false,
        this.myordertate=false,
        this.mystatestate=false
        this.mymessage=true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .my-nav-img img{
    height: 65px;

  }
  .my-nav a,.my-footer{
    color: white;
  }

  .my-every-btn button{
    color: white;
    width: 80px;
    height: 80px;
    border: solid 0px black;
    border-radius: 50%;
    box-shadow: #7b8099 2px 2px 2px;
  }
  .my-index-center{
    padding-top: 20px;
    min-height: 750px;
  }

  .nav > li > a:hover,
  .nav > li > a:focus {
    color: black;
  }
  .list-group-item.active,
  .list-group-item.active:hover,
  .list-group-item.active:focus {
    z-index: 2;
    color: #fff;
    background-color: #40a170;
    border-color: #40a170;
  }

  .my-input span p{
    margin: 0;
    padding: 0;
    width: 150px;
  }

  .my-active a{
    color: white;
  }

  .order-img img{
    width: 100px;
    height: 60px;
  }
  .my-nav-size ul li{
    font-size: 14px;

  }

  .my-img-btn p{
    position:absolute;
  }



</style>
