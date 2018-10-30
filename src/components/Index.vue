<template>
  <div>

    <div class="index-search-background">
      <div class="container ">
        <div class="row">
          <div class="col-md-4 sky">
            <h4>
              <img :src=sky_src alt="">今日天气</h4>

            <p class="city">
              <input class="form-control" @click="toAddress" v-model="city">
              <button class="btn btn-sm btn-success" @click="getSky()">切换</button>
              <v-distpicker @selected='selected' v-show="addInp" class="address">
              </v-distpicker>
            </p>
            <p>
              <span>日期:</span>
              <span v-text="sky.result.HeWeather5[0].daily_forecast.date"></span>
            </p>
            <p>
              <span>最高气温:</span>
              <span v-text="sky.result.HeWeather5[0].daily_forecast.tmp.max"></span>
              <span>℃</span>
            </p>
            <p>
              <span>最低气温:</span>
              <span v-text="sky.result.HeWeather5[0].daily_forecast.tmp.min"></span>
              <span>℃</span>
            </p>
            <p>
              <span>天气状况:</span>
              <span v-text="sky.result.HeWeather5[0].daily_forecast.cond.txt_n"></span>
            </p>
            <p>
              <span>风力:</span>
              <span v-text="sky.result.HeWeather5[0].daily_forecast.wind.dir"></span>
              <span v-text="sky.result.HeWeather5[0].daily_forecast.wind.sc"></span>
              <span>级</span>
              <span v-text="sky.result.HeWeather5[0].suggestion.comf.brf"></span>
            </p>
            <p>
              <span>空气质量:</span>
              <span v-text="sky.result.HeWeather5[0].aqi.city.qlty"></span>
            </p>
            <p>
              <span>PM2.5:</span>
              <span v-text="sky.result.HeWeather5[0].aqi.city.pm25"></span>
            </p>
            <p>
              <span>能见度:</span>
              <span v-text="sky.result.HeWeather5[0].daily_forecast.vis"></span>
            </p>
            <p>
              <span>感冒:</span>
              <span v-text="sky.result.HeWeather5[0].suggestion.flu.brf"></span>
            </p>

          </div>
          <div class="col-md-6">
            <div class="input-group">
              <input type="text" class="form-control input-search" placeholder="" v-model="ser_word">
              <span class="input-group-btn">
                <button id="input-submit" class="btn btn-default" type="button" v-on:click="search">搜索</button>
              </span>
            </div><!-- /input-group -->
          </div><!-- /.col-lg-6 -->
          <div class="col-md-2">
            <h4 class="state text-center btn" @click="goToMyState()"><strong></strong></h4>
          </div>
        </div><!-- /.row -->
      </div>

    </div>

    <content>
      <div class="index-rooms-back">
        <div class="row">
          <p class="col-md-5"></p>
          <p class="col-md-2 goodhouse">
            <button class="center-block center-button btn btn-warning">
              <h4><img src="../assets/images/index_hot_icon.png" alt="">优选养老院</h4></button>
          </p>
          <p class="col-md-5"></p>
        </div>
        <div class="row">
          <div class="col-md-1"></div>
          <div class="col-md-10">
            <div class="row  ">
              <div class="col-md-3 single-room " v-for="h in house_list" v-on:click="toapartinfo(h.id,h.name)">
                <router-link to="/house" class="beadhouse-img">
                  <img :src=housesrc[h.id%10] alt="" :title=h.long_name>
                </router-link>
                <router-link to="/house" class="beadhouse-title">
                  <div>
                    <h4>
                      <span><img src="../assets/images/index_house_icon.png" alt=""></span>
                      <span v-text="h.name" :title=h.long_name></span>
                    </h4>
                    <h3>￥<span v-text="h.min_price" class="text-orange">888</span>起</h3>
                  </div>
                </router-link>

              </div>
            </div>
          </div>
          <div class="col-md-1"></div>
        </div>

      </div>
    </content>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'Index',
    data: function () {
      return {
        house_list: [], // 用来存放公寓
        ser_word: '',   // 查询字符串
        city: '苏州',   // 默认城市为苏州  ip定位要身份验证，懒得弄就写死了
        addInp: false,
        mask: false,
        search_city: '苏州', // 天气预报城市搜索
        sky: {},
        sky_src:'http://127.0.0.1:8000/media/pic/sky-sun.png',
        housesrc:[
          'http://127.0.0.1:8000/media/pic/house-1.jpg',
          'http://127.0.0.1:8000/media/pic/house-2.jpg',
          'http://127.0.0.1:8000/media/pic/house-3.jpg',
          'http://127.0.0.1:8000/media/pic/house-4.jpg',
          'http://127.0.0.1:8000/media/pic/house-5.jpg',
          'http://127.0.0.1:8000/media/pic/house-6.jpg',
          'http://127.0.0.1:8000/media/pic/house-7.jpg',
          'http://127.0.0.1:8000/media/pic/house-1.jpg',
          'http://127.0.0.1:8000/media/pic/house-3.jpg',
          'http://127.0.0.1:8000/media/pic/house-5.jpg',
        ]

      }
    },
    mounted: function () {
      this.getSky();   // 获得天气预报
      this.GetHouseData(); // 获得公寓列表
    },
    methods: {
      //点击弹出三级联动npm install v-distpicker --save
      toAddress() {
        this.mask = true;
        this.addInp = true;
      },
      //省市区三级联动
      selected(data) {
        this.mask = false;
        this.addInp = false;
        this.city = data.province.value + ' ' + data.city.value + ' ' + data.area.value;
        this.search_city = data.city.value.split('市')[0].split('城区')[0]
      },
      // 天气预报
      getSky: function () {
        var vm = this;
        var data = {
          "city": this.search_city
        };
        axios.post('http://127.0.0.1:8000/beadhouse/sky/', data)
          .then(function (response) {
            vm.sky = response.data;
            var reg1 = /.*?晴.*/;
            var reg2 = /.*?阴.*/;
            var reg3 = /.*?云.*/;
            var reg4 = /.*?雨.*/;
            var reg5 = /.*?雪.*/;

            if (reg1.test(vm.sky.result.HeWeather5[0].daily_forecast[0].cond.txt_n)) {
              vm.sky_src='http://127.0.0.1:8000/media/pic/sky-sun.png';
            }
            else if (reg2.test(vm.sky.result.HeWeather5[0].daily_forecast[0].cond.txt_n)) {
              vm.sky_src='http://127.0.0.1:8000/media/pic/sky-yin.png';
            }
            else if (reg3.test(vm.sky.result.HeWeather5[0].daily_forecast[0].cond.txt_n)) {
              vm.sky_src='http://127.0.0.1:8000/media/pic/sky-yun.png';
            }
            else if (reg4.test(vm.sky.result.HeWeather5[0].daily_forecast[0].cond.txt_n)) {
              vm.sky_src='http://127.0.0.1:8000/media/pic/sky-rain.png';
            }
            else if (reg5.test(vm.sky.result.HeWeather5[0].daily_forecast[0].cond.txt_n)) {
              vm.sky_src='http://127.0.0.1:8000/media/pic/sky-xue.png';
            }
            else{
              vm.sky_src='http://127.0.0.1:8000/media/pic/sky-sun.png';
            }
          })
          .catch(function (error) {
            console.log(error)
          });
      },
      // 得到热门公寓
      GetHouseData: function () {
        var that = this;
        axios.get('http://127.0.0.1:8000/beadhouse/gethouseby///1/1/')
          .then(function (response) {
            response.data.forEach((item, index) => {
              if (item.score >= 4.9) {
                if (that.house_list.length < 8) {
                  that.house_list.push(item)
                }

                // console.log(this.house_list)
              }
            });
            for (let i of that.house_list) {
              i.long_name = i.name;
              if (i.name.length > 13) {
                i.name = i.name.substring(0, 13) + '...'
              }
            }
          })
          .catch(function (error) {
            console.log(error)
          });
      },
      // 主页的搜索功能
      search: function () {
        if (this.ser_word) {
          sessionStorage.setItem('already_searched', this.ser_word);
          this.$router.push({path: "/apart"});
        } else {
          this.$router.push({path: "/apart"});
        }
      },
      // 跳转到公寓详情
      toapartinfo: function (id,name) {
        sessionStorage.setItem('bhid', id);
        sessionStorage.setItem('bhname', name);
      },
      // 跳转到个人中心
      goToMyState:function () {
        sessionStorage.setItem('gotostate',true);
        this.$router.push({path: "/personalcenter"});
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .goodhouse {
    width: 100%;
    height: 85px;
  }

  .single-room {
    padding: 0;
    margin: 0;
  }

  .single-room img {
    width: 100%;

  }

  .center-button {
    margin-top: 20px;
    width: 250px;
    height: 55px;
  }

  .beadhouse-img img, .beadhouse-title div {
    border: white solid 15px;
    border-bottom: white solid 8px;
  }

  .beadhouse-title h3 {
    float: right;
    overflow: hidden;
  }

  p, h3, h4 {
    margin: 0;
    padding: 0;
  }

  a:link, a:visited {
    color: black;
  }

  a {
    text-decoration: none;
  }

  .text-orange {
    color: orange;
  }

  .goodhouse h4 img, .beadhouse-title span img {
    width: 35px;
    height: 35px;
  }

  /*搜索部分*/
  .index-search-background {
    height: 400px;
    background: url("../../src/assets/images/index_search_background.jpg");
    background-repeat: no-repeat;
    background-size: cover;
  }

  /*搜索框*/
  .index-search-background div {
    /*display: flex;*/
  }

  .index-search-background .input-group .input-search {
    height: 50px;
    width: 500px;
    margin-top: 260px;
    font-size: 30px;
    border: none;
  }

  .index-search-background .input-group-btn #input-submit {
    height: 50px;
    width: 100px;
    margin-top: 260px;
    margin-left: -10px;
    background: #42b47a;
    outline: none;
    font-size: 18px;
  }

  .input-search {
    outline: none;
  }

  .index-rooms-back {
    margin-bottom: 70px;
  }

  #input-submit {
    color: white;
  }

  .sky {
    width: 300px;
    height: 350px;
    margin-top: 20px;
    padding: 5px 35px;
    color: white;
    background: rgba(0, 0, 0, 0.34);
  }

  .sky p {
    width: 240px;
    margin: 5px;
  }

  .sky img {
    width: 50px;
    height: 50px;
  }

  .city input {
    width: 170px;
    display: inline-block;
  }

  .city button {
    display: inline-block;
  }
  .address{
    position: fixed;
    z-index: 2;
  }
  .state{
    width: 80px;
    height: 80px;
    color: #00cc66;
    background-image: url("../assets/images/index_state.png");
    background-size:80px;
    background-repeat: no-repeat;
    position: fixed;
    top: 70%;
    right: 0;
  }
  .goodhouse img{
    margin-left: -10px;
  }
</style>
