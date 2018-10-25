<template>
  <!--内容-->
  <div class="row my-index-center">
    <!--内容左空白-->
    <div class="col-md-2"></div>
    <!--内容左空白end-->
    <!--中间内容-->
    <div class="col-md-8">
      <!--巨幕-->
      <div class="row">
        <div class="col-md-12 ">
          <div class="jumbotron title-img">
            <div class="row" >
              <div class="col-md-7 ">
              </div>
              <div class="col-md-5">
                <span class="house-title">
                </span>
                <h2 v-text="bh_name"></h2>
                <p>让您的父母得到最温暖的关怀！</p>
                <div class="row">
                  <div class="col-md-4">
                    <a class="btn btn-success btn-lg" href="#" role="button" @click="goToBhiInfo()">公寓简介</a>
                  </div>
                  <div class="col-md-6">
                    <a class="btn btn-success btn-lg" href="#" role="button" @click="goToMealsList">增值套餐</a>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
      <!--巨幕end-->
      <!--房型-->
      <div class="row">
        <div class="col-lg-12">
          <div class="panel panel-success">
            <div class="panel-heading">
              <div class="row">
                <div class="col-md-4"><span class="glyphicon glyphicon-home"></span>房型</div>
                <div class="col-md-2">床位数量</div>
                <div class="col-md-2">价格</div>
                <div class="col-md-2">剩余数量</div>
                <div class="col-md-2"></div>
              </div>
            </div>
            <div class="house-info">
              <div class="panel-body house-info house-border-bottom" v-for="r in rooms_info">
              <div class="row">
              <div class="col-md-4">
              <div class="row">
              <div class="col-md-6 houseimg">
              <img src="../assets/images/det2.jpg" alt="">
              </div>
              <div class="col-md-6">
                <h4 class="houselineheight">
                <span class="glyphicon glyphicon-bed"></span>
                  <span v-text="r.name">标准豪华单人间</span>
              </h4>
              </div>
              </div>
              </div>
              <div class="col-md-2">
                <h4 class="houselineheight">
                  <span v-text="r.bednum">1</span>
                  <span>张</span>
                </h4>
              </div>
              <div class="col-md-2">
                <h4 class="houselineheight text-orange" >
                <span class="price" v-text="r.price"></span>
                <span>元/月</span>
              </h4>
              </div>
              <div class="col-md-2"><h4 class="houselineheight">20张</h4></div>
              <div class="col-md-2 houselineheight">
              <button type="button" class="btn btn-lg btn-success" @click="goToDetails(r.id,r.name)">详情</button>
              </div>
              </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      <!--房型end-->
    </div>
    <!--中间内容end-->
  </div>
  <!--中间内容end-->
  <!--内容右end-->
</template>

<script>
  import axios from 'axios'
    export default {
        name: "",
      data(){
          return{
            rooms_info : [
            ],
            bh_id:'',
            bh_name:''
          }
      },
      methods:{
        //跳转公寓详情页
        goToBhiInfo:function(){
          this.$router.push({path: "/apartinfo"});
        },
        //跳转房间详情页
        goToDetails:function (roomid,roomname) {
          sessionStorage.setItem('roomid',roomid);
          sessionStorage.setItem('roomname',roomname);
          this.$router.push({path: "/details"});
        },
        //跳转套餐列表页
        goToMealsList:function () {
          this.$router.push({path: "/setmeal"});
        },
      },
      mounted() {

        var vm = this;
        vm.bh_id=sessionStorage.getItem('bhid');
        vm.bh_name=sessionStorage.getItem('bhname');
        axios.get('http://127.0.0.1:8000/beadhouse/getroomsbyhouseid/'+vm.bh_id+'/')
          .then(function (response) {
            vm.rooms_info = response.data;
            sessionStorage.setItem('rooms_info',vm.rooms_info )
            console.log(vm.rooms_info)
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    }
</script>

<style scoped>
  .houseimg img{
    width: 150px;
    height: 100px;
    border-radius: 5px;
  }
  .houselineheight{
    height: 80px;
    line-height: 80px;
  }
  .text-orange{
    color: orange;
    font-weight: bolder;
  }
  .house-border-bottom{
    border-bottom: #deefd8 solid 2px;
    padding: 25px;
  }
  .jumbotron{
    color: white;
    text-shadow: #c6c6c6 2px 2px ;
  }

  .house-title{
    font-size: 35px;
  }

  .my-nav-img img{
    height: 65px;

  }

  .my-nav a{
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
    min-height: 600px;
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
  .title-img{
    background-image: url("../assets/images/room02.png");
  }
  .glyphicon-bed{
    color: orange;
  }
  .btn-lg{
    width: 100px;
    height: 40px;
  }
  .glyphicon-home{
    color: orange;
  }
  .price{
    font-size: 28px;
  }

</style>
