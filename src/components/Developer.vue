<template>
  <!--内容-->
  <div class="row my-index-center">
    <!--内容左空白-->
    <div class="col-md-2"></div>
    <!--内容左空白end-->
    <!--中间内容-->
    <div class="col-md-8">
      <div class="row panel panel-info">
        <div class="panel-heading">
          <div class="jumbotron">
            <h1>Debug团队</h1>
            <p>项目简介：当前社会老龄化越来越严重，空巢老人数量越来越多，许多子女往往无法亲身照料父母，而在线下选择养老院时，也很难全面了解。所以，解决老人照料问题、加进父母与子女之间的联系变的尤为重要。如今网络发展迅速，本项目将线下养老院以平台形式展现，解决儿女对养老院选择难、了解浅的难题，对老人了解少、沟通少的现状。</p>
            <p class="col-md-10"></p>
            <p class="col-md-1"><a class="btn btn-warning btn-lg" href="#our" role="button">关于我们</a></p>
          </div>
        </div>
        <div class="panel-body text-center" id="our">
          <div class="row">
            <div class="col-md-4 text-center">
              <div class="panel panel-info">
                <div class="panel-heading">
                  <h4>我们的宗旨是!</h4>
                </div>
                <div class="panel-body">
                  <p>项目要是想写好,思维碰撞必须吵!</p>
                  <p>今天吵过明天好,好过不怕继续吵!</p>
                  <p>你要数据我来给,格式不对互相怼!</p>
                  <p>错误绝没有下次,共同进步更要好!</p>
                </div>
              </div>
            </div>
            <div class="col-md-8 our-img">
              <img src="../assets/images/det2.jpg" alt="">
            </div>
          </div>
          <div class="row">
            <div class="col-md-3">
              <div class=" panel panel-info word">
                <div class="panel-heading">石鹏理</div>
                <div class="panel-body img">
                  <img src="../assets/images/user.png" alt="">
                </div>
                <h4>全能小哥哥</h4>
                <p>前端后台难不倒</p>
                <p>技术难题我来搞</p>
                <p>遇到bug把我找</p>
                <p>分钟搞定全叫好</p>
              </div>
            </div>
            <div class="col-md-3">
              <div class=" panel panel-info word">
                <div class="panel-heading">陶予祺</div>
                <div class="panel-body img">
                  <img src="../assets/images/user.png" alt="">
                </div>
                <h4>速度小姐姐</h4>
                <p>任务下达立即搞</p>
                <p>管它难易下手敲</p>
                <p>敲敲上手没问题</p>
                <p>早早完成美化好</p>
              </div>
            </div>
            <div class="col-md-3">
              <div class=" panel panel-info word">
                <div class="panel-heading">李雨彤</div>
                <div class="panel-body img">
                  <img src="../assets/images/user.png" alt="">
                </div>
                <h4>创意美少女</h4>
                <p>要问属谁点子多</p>
                <p>数来数去还属我</p>
                <p>完成任务无延误</p>
                <p>搞定代码没问题</p>
              </div>
            </div>
            <div class="col-md-3">
              <div class=" panel panel-info word">
                <div class="panel-heading">韦春龙</div>
                <div class="panel-body img">
                  <img src="../assets/images/user.png" alt="">
                </div>
                <h4>毅力开心果</h4>
                <p>遇到难题坚持干</p>
                <p>玩转代码乐呵呵</p>
                <p>不烦不燥性格好</p>
                <p>频出金句全组笑</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
    <!--中间内容end-->

  </div>


</template>

<script>
  export default {
    name: ""
  }
</script>

<style scoped>
  .my-nav-img img {
    height: 65px;
  }

  .my-nav a{
    color: white;
  }

  .my-every-btn button {
    color: white;
    width: 80px;
    height: 80px;
    border: solid 0px black;
    border-radius: 50%;
    box-shadow: #7b8099 2px 2px 2px;
  }

  .my-index-center {
    padding-top: 20px;
    min-height: 600px;
  }
  .img img{
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }
  .jumbotron{
    color: white;
    background-image: url("../assets/images/our.png");
  }
  .jumbotron {
    text-shadow: #000000 2px 2px 2px;
  }
  .word h4{
    color: orange;
  }
  .our-img img{
    width: 500px;
    height: 200px;
    border-radius: 5px;
  }
</style>
