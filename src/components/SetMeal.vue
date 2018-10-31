<template>
  <div class="meal-body container panel panel-success">
    <!--提示消息模态框-->
    <message-modal :err_message="err_message" :err_message_info="err_message_info"></message-modal>
    <div class="row meal-body-title panel-heading ">
      <div class="col-md-12 ">
        <a href="" @click.prevent="goBeadHouse"><h1 class="text-center" >{{beadhouse_name}}</h1></a>
      </div>
      <div class="col-md-12">
        <div class="col-md-9"></div>
        <div class="col-md-1">
          <button class="btn btn-warning btngobh" @click="goBeadHouseRoom">查看房间</button>
        </div>
        <div class="col-md-2">
          <button class="btn btn-warning btngobh" @click="goBeadHouse">公寓简介</button>
        </div>

      </div>
    </div>
    <div class="row" >
      <div class="col-md-3 meal-line1 panel-body" v-for="meal in meal_list">
        <div class="every-meal text-center panel panel-success" >
          <div class="panel-heading">
            <h3 >{{meal.name}}</h3>
          </div>
          <div class="panel-body">
            <img :src=setsrc[meal.id%10] alt="">
            <span>{{meal.price}}</span>元<br>
            <div class="meal-content">
              <span >{{meal.content}}</span>
            </div>

            <button class="btn btn-success" @click="addCart($event)" :id="meal.id">加入到购物车</button>
          </div>

        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import axios from 'axios'
  export default {
    name: 'ShoppingMall',

    data: function () {
      return {
        logined: true,
        beadhouse_id: 0,
        beadhouse_name: '',
        meal_list : [],
        err_message:'',
        err_message_info:'',
        setsrc:[
          sysConf.djangoUrl+'/media/pic/set-3.jpg',
          sysConf.djangoUrl+'/media/pic/set-1.jpg',
          sysConf.djangoUrl+'/media/pic/set-4.jpg',
          sysConf.djangoUrl+'/media/pic/set-2.jpg',
          sysConf.djangoUrl+'/media/pic/set-3.jpg',
          sysConf.djangoUrl+'/media/pic/set-1.jpg',
          sysConf.djangoUrl+'/media/pic/set-4.jpg',
          sysConf.djangoUrl+'/media/pic/set-2.jpg',
          sysConf.djangoUrl+'/media/pic/set-3.jpg',
          sysConf.djangoUrl+'/media/pic/set-1.jpg',
        ]
      }
    },
    mounted: function () {
      //获取当前公寓id
      this.beadhouse_id = sessionStorage.getItem('bhid');
      let that = this;
      //根据id查询公寓
      axios.get(sysConf.djangoUrl+'/beadhouse/gethousebyid/' + this.beadhouse_id + '/').then(function (response) {
        that.beadhouse_name = response.data[0].name;
        //获取套餐信息
        that.getMeals();
      });
    },
    methods: {
      //获取套餐信息
      getMeals: function () {
        let that = this;
        axios.get(sysConf.djangoUrl+'/beadhouse/getmealbyhouseid/' + this.beadhouse_id + '/').then(function (response) {
          that.meal_list = response.data;
        })
      },
      //跳转公寓详情页
      goBeadHouse:function () {
        this.$router.push({path:"/apartinfo"});
      },
      //跳转选择房间页
      goBeadHouseRoom:function(){
        this.$router.push({path:"/house"});
      },
      //加入购物车
      addCart:function (event) {
        if (sessionStorage.getItem('token')) {
          let meal = {
            "user_id": sessionStorage.getItem('u_id'),
            "good_list": [
              {
                "id": parseInt(event.target.id),
                "number": 1,
                "type": 1
              },
            ]
          };
          let that = this;
          let token = sessionStorage.getItem('token');
          axios.post(sysConf.djangoUrl+'/cart/addcart/', meal, {headers: {"token": token}})
            .then(function (response) {
              if (response.data.statuscode === '202') {
                that.err_message='添加成功';
                that.err_message_info='详情请在购物车内查看';
                vm.getOldInfo();
              } else {
                that.err_message='添加失败';
                that.err_message_info='如果遇到问题请联系客服解决';
              }
              console.log(response.data);
            })
            .catch(function (error) {
              console.log(error)
            })
        }else {
          this.err_message='你还未登录';
          this.err_message_info='请登录后使用该功能'
        }
      }
    }
  }

</script>

<style scoped>
  body{
    margin: 0;
    padding: 0;
  }
  .meal-body-title{
    margin: 0 auto;
    margin-top: 20px;
    width: 100%;
    min-height: 200px;
    background: url("../assets/images/room01.png");
    background-size: cover;
  }
  .meal-line1{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
  .meal-line1 img{
    width: 200px;
    height: 120px;
    border-radius: 5px;
  }
  .every-meal{
    margin-top: 20px;
    width: 240px;
    height: 400px;
    border-radius: 10px;
    background: white;
  }
  .every-meal span{
    font-size: 16px;
  }
  .meal-body-title a{
    color: white;
    text-shadow: #6f777d 2px 2px 2px;
  }
  .btngobh{
    margin-top: 70px;
  }
  .meal-body{
    min-height: 700px;
  }
  .meal-content{
    width: 200px;
    height: 80px;
  }
</style>

