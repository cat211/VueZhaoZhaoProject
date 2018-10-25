<template>
  <div class="container-fluid">
    <div class="row bg-green my-footer">
      <div class="col-md-2"></div>
      <div class="col-md-2">
        <ul class="list-unstyled">
          <li><h4>合作企业</h4></li>
          <li>阿里叔叔</li>
          <li>百度阿姨</li>
          <li>腾讯叔叔</li>
          <li>思必驰叔叔</li>
        </ul>
      </div>
      <div class="col-md-2">
        <ul class="list-unstyled">
          <li><h4>联系我们</h4></li>
          <li>邮箱:1234564@xx.com.cn</li>
          <li>电话:18888888888</li>
          <li>微信:12542541254</li>
          <li>企业宗旨</li>
        </ul>
      </div>
      <div class="col-md-2">
        <ul class="list-unstyled">
          <li><h4>帮助</h4></li>
          <li>查看帮助文档</li>
          <li>问题反馈</li>
        </ul>
      </div>
      <div class="col-md-2">
        <ul class="list-unstyled">
          <li><h4>加入我们</h4></li>
          <li @click="admin()" ><a href="#"  class="develop">平台管理</a></li>
          <li>加盟</li>
          <li @click="developer()"><a href="#" class="develop">开发者团队</a></li>
        </ul>
      </div>
      <div class="col-md-2"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods:{
    developer:function () {
      this.$router.push({path: "/developer"});
    },
    admin:function () {
      this.$router.push({path: "/admin"});
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
  .panel-primary > .panel-heading,.bg-green{
    background: #40a170;
  }
  .nav > li > a:hover,
  .nav > li > a:focus {
    color: black;
  }
  .my-footer{
    padding-top: 15px;
    font-size: 13px;
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
  iframe{
    border: 0px;
    min-height: 500px;
    margin: 0;padding: 0;
    width: 100%;

  }
  .develop:hover,.develop:visited,.develop{
    color: white;
  }
</style>
