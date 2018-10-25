<template>
  <div class="meal-body container panel panel-success">
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
    <div class="row panel-body">
      <div class="col-md-12 meal-line1 panel-heading" >
        <div class="every-meal text-center panel panel-success" v-for="meal in meal_list">
          <h3 class="panel-heading">{{meal.name}}</h3>
          <div style="height: 10px"></div>
          <span>{{meal.price}}</span>元<br>
          <div style="height: 10px"></div>
          <div style="height: 50px">
            <span>{{meal.content}}</span>
          </div>
          <div style="height: 30px"></div>
          <button class="btn btn-success" @click="addCart($event)" :id="meal.id">加入到购物车</button>
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
      }
    },
    mounted: function () {
      this.beadhouse_id = sessionStorage.getItem('bhid');
      let that = this;
      axios.get('http://127.0.0.1:8000/beadhouse/gethousebyid/' + this.beadhouse_id + '/').then(function (response) {
        that.beadhouse_name = response.data[0].name;
        that.getMeals();
      });
    },
    methods: {
      getMeals: function () {
        let that = this;
        axios.get('http://127.0.0.1:8000/beadhouse/getmealbyhouseid/' + this.beadhouse_id + '/').then(function (response) {
          that.meal_list = response.data;
        })
      },
      goBeadHouse:function () {
        this.$router.push({path:"/apartinfo"});
      },
      goBeadHouseRoom:function(){
        this.$router.push({path:"/house"});
      },
      addCart:function (event) {
        if (sessionStorage.getItem('token')) {
          let meal = {
            "user_id": sessionStorage.getItem('u_id'),
            "good_list": [
              {
                "id": event.target.id,
                "number": 1,
                "type": 1
              },
            ]
          };
          let token = sessionStorage.getItem('token');
          axios.post('http://127.0.0.1:8000/cart/addcart/', meal, {headers: {"token": token}})
            .then(function (response) {
              if (response.data.statuscode === '202') {
                alert('添加成功');
                vm.getOldInfo();
              } else {
                alert("添加失败");
              }
              console.log(response.data);
            })
            .catch(function (error) {
              console.log(error)
            })
        }else {
          alert('你还未登录')
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
    height: 200px;
    background: url("../assets/images/room01.png");
    background-size: cover;
  }
  .meal-line1{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
  .every-meal{
    margin-top: 20px;
    width: 200px;
    height: 250px;
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
  .panel{
    margin-top: 20px;
  }
</style>

