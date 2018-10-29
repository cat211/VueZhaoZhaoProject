<template>
  <div class="nav-main container-fluid">
    <div class="row bg-green">
      <div class="col-md-2"></div>
      <router-link to="/"><div class="col-md-4 my-nav-img"><img src="../assets/images/nav-logo.png" alt=""></div></router-link>
      <div class="col-md-6">
        <ul class="nav nav-pills my-nav">
          <li role="presentation">
            <router-link to="./login"><a href="javascript:void 0" v-if="!islogin">登录</a></router-link>
          </li>
          <li role="presentation">
            <router-link to="./register"><a href="javascript:void 0" >注册</a></router-link>
          </li>
          <li role="presentation">
            <router-link to="/"><a href="javascript:void 0">首页</a></router-link>
          </li>
          <li role="presentation">
            <router-link to="./apart"><a href="javascript:void 0">养老院</a></router-link>
          </li>
          <li role="presentation">
            <router-link to="./articlelist"><a href="javascript:void 0">社区</a></router-link>
          </li>
          <li role="presentation">
            <router-link to="./shoppingmall"><a href="javascript:void 0">积分商城</a></router-link>
          </li>
          <li role="presentation">
            <router-link to="./cart"><a href="javascript:void 0">购物车</a></router-link>
          </li>
          <li role="presentation">
            <router-link to="./personalcenter"><a href="javascript:void 0" >个人中心</a></router-link>
          </li>
          <li role="presentation" v-show="true">
            <a href="javascript:void 0" @click = logOut v-if="islogin">退出</a>
          </li>
          <li role="presentation" v-if="!flag" @click="goToState()">
            <a href="javascript:void 0" ><img src="../assets/images/nav-xx.png" alt=""></a>
          </li>
          <li role="presentation" v-if="flag" @click="goToState()">
            <a href="javascript:void 0" ><img src="../assets/images/nav-xx2.png" alt=""></a>
          </li>
        </ul>
      </div>
      <div class="col-md-1"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavMain',
  props:['islogin','dyn_flag'],
  data () {
    return {
      flag:false,
    }
  },
  mounted:function () {

  },
  methods:{
    logOut:function () {
      sessionStorage.clear();
      this.$emit('exit',false);
      this.disConnectSocket();
      this.$router.push({path:"/login"});
    },
    goToState:function () {
      this.flag = false;
      this.disConnectSocket();
      sessionStorage.setItem('gotostate',true);
      this.$router.push({path:"/personalcenter"});
    },
    // 断开websocket连接
    disConnectSocket:function () {
      this.$emit('disconnectwebsocket');
    }
  },
  watch: {
    "dyn_flag": function () {
      if (this.dyn_flag === true) {
        this.flag = true
      }
    },
    deep: true,
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .my-nav-img img{
    height: 65px;

  }
  .my-nav{
    height: 65px;
    line-height: 40px;
  }
  .my-nav a{
    color: white;
  }
  .my-nav a:hover {
    color: black;
  }
  .my-every-btn button{
    color: white;
    width: 80px;
    height: 80px;
    border: solid 0px black;
    border-radius: 50%;
    box-shadow: #7b8099 2px 2px 2px;
  }

  .panel-primary > .panel-heading,.bg-green{
    background: #40a170;
  }
  .nav > li > a:hover,
  .nav > li > a:focus {
    color: black;
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

  li img{
    width: 30px;
    height: 30px;
  }

</style>
