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
              <span v-text="sky.result.HeWeather5[0].daily_forecast[0].tmp.max"></span>
              <span>℃</span>
            </p>
            <p>
              <span>最低气温:</span>
              <span v-text="sky.result.HeWeather5[0].daily_forecast[0].tmp.min"></span>
              <span>℃</span>
            </p>
            <p>
              <span>天气状况:</span>
              <span v-text="sky.result.HeWeather5[0].daily_forecast[0].cond.txt_n"></span>
            </p>
            <p>
              <span>风力:</span>
              <span v-text="sky.result.HeWeather5[0].daily_forecast[0].wind.dir"></span>
              <span v-text="sky.result.HeWeather5[0].daily_forecast[0].wind.sc"></span>
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
        sky: {
          "code": "10000",
          "charge": false,
          "msg": "查询成功",
          "result": {
            "HeWeather5": [
              {
                "aqi": {
                  "city": {
                    "aqi": "38",
                    "qlty": "优",
                    "pm25": "19",
                    "pm10": "38",
                    "no2": "32",
                    "so2": "5",
                    "co": "0.4",
                    "o3": "63"
                  }
                },
                "basic": {
                  "city": "苏州",
                  "cnty": "中国",
                  "id": "CN101190401",
                  "lat": "31.29937935",
                  "lon": "120.61958313",
                  "update": {
                    "loc": "2018-11-17 14:45",
                    "utc": "2018-11-17 06:45"
                  }
                },
                "daily_forecast": [
                  {
                    "astro": {
                      "mr": "13:39",
                      "ms": "00:18",
                      "sr": "06:27",
                      "ss": "16:57"
                    },
                    "cond": {
                      "code_d": "104",
                      "code_n": "305",
                      "txt_d": "阴",
                      "txt_n": "小雨"
                    },
                    "date": "2018-11-17",
                    "hum": "73",
                    "pcpn": "2.0",
                    "pop": "61",
                    "pres": "1025",
                    "tmp": {
                      "max": "15",
                      "min": "10"
                    },
                    "uv": "1",
                    "vis": "18",
                    "wind": {
                      "deg": "23",
                      "dir": "东北风",
                      "sc": "3-4",
                      "spd": "18"
                    }
                  },
                  {
                    "astro": {
                      "mr": "14:11",
                      "ms": "01:13",
                      "sr": "06:28",
                      "ss": "16:57"
                    },
                    "cond": {
                      "code_d": "306",
                      "code_n": "104",
                      "txt_d": "中雨",
                      "txt_n": "阴"
                    },
                    "date": "2018-11-18",
                    "hum": "80",
                    "pcpn": "0.0",
                    "pop": "0",
                    "pres": "1022",
                    "tmp": {
                      "max": "13",
                      "min": "9"
                    },
                    "uv": "2",
                    "vis": "14",
                    "wind": {
                      "deg": "351",
                      "dir": "北风",
                      "sc": "3-4",
                      "spd": "24"
                    }
                  },
                  {
                    "astro": {
                      "mr": "14:44",
                      "ms": "02:08",
                      "sr": "06:29",
                      "ss": "16:56"
                    },
                    "cond": {
                      "code_d": "104",
                      "code_n": "101",
                      "txt_d": "阴",
                      "txt_n": "多云"
                    },
                    "date": "2018-11-19",
                    "hum": "80",
                    "pcpn": "0.0",
                    "pop": "1",
                    "pres": "1026",
                    "tmp": {
                      "max": "15",
                      "min": "9"
                    },
                    "uv": "1",
                    "vis": "18",
                    "wind": {
                      "deg": "353",
                      "dir": "北风",
                      "sc": "3-4",
                      "spd": "17"
                    }
                  },
                  {
                    "astro": {
                      "mr": "15:17",
                      "ms": "03:04",
                      "sr": "06:30",
                      "ss": "16:56"
                    },
                    "cond": {
                      "code_d": "300",
                      "code_n": "305",
                      "txt_d": "阵雨",
                      "txt_n": "小雨"
                    },
                    "date": "2018-11-20",
                    "hum": "65",
                    "pcpn": "0.0",
                    "pop": "3",
                    "pres": "1024",
                    "tmp": {
                      "max": "18",
                      "min": "12"
                    },
                    "uv": "2",
                    "vis": "19",
                    "wind": {
                      "deg": "96",
                      "dir": "东风",
                      "sc": "1-2",
                      "spd": "10"
                    }
                  },
                  {
                    "astro": {
                      "mr": "15:52",
                      "ms": "04:03",
                      "sr": "06:30",
                      "ss": "16:56"
                    },
                    "cond": {
                      "code_d": "305",
                      "code_n": "305",
                      "txt_d": "小雨",
                      "txt_n": "小雨"
                    },
                    "date": "2018-11-21",
                    "hum": "81",
                    "pcpn": "0.0",
                    "pop": "0",
                    "pres": "1024",
                    "tmp": {
                      "max": "14",
                      "min": "12"
                    },
                    "uv": "4",
                    "vis": "14",
                    "wind": {
                      "deg": "19",
                      "dir": "东北风",
                      "sc": "3-4",
                      "spd": "12"
                    }
                  },
                  {
                    "astro": {
                      "mr": "16:30",
                      "ms": "05:04",
                      "sr": "06:31",
                      "ss": "16:55"
                    },
                    "cond": {
                      "code_d": "101",
                      "code_n": "101",
                      "txt_d": "多云",
                      "txt_n": "多云"
                    },
                    "date": "2018-11-22",
                    "hum": "81",
                    "pcpn": "0.0",
                    "pop": "0",
                    "pres": "1026",
                    "tmp": {
                      "max": "14",
                      "min": "8"
                    },
                    "uv": "3",
                    "vis": "19",
                    "wind": {
                      "deg": "3",
                      "dir": "北风",
                      "sc": "3-4",
                      "spd": "22"
                    }
                  },
                  {
                    "astro": {
                      "mr": "17:14",
                      "ms": "06:07",
                      "sr": "06:32",
                      "ss": "16:55"
                    },
                    "cond": {
                      "code_d": "101",
                      "code_n": "305",
                      "txt_d": "多云",
                      "txt_n": "小雨"
                    },
                    "date": "2018-11-23",
                    "hum": "73",
                    "pcpn": "0.0",
                    "pop": "0",
                    "pres": "1024",
                    "tmp": {
                      "max": "16",
                      "min": "9"
                    },
                    "uv": "3",
                    "vis": "20",
                    "wind": {
                      "deg": "3",
                      "dir": "北风",
                      "sc": "3-4",
                      "spd": "12"
                    }
                  }
                ],
                "hourly_forecast": [
                  {
                    "cond": {
                      "code": "104",
                      "txt": "阴"
                    },
                    "date": "2018-11-17 16:00",
                    "hum": "78",
                    "pop": "7",
                    "pres": "1024",
                    "tmp": "14",
                    "wind": {
                      "deg": "66",
                      "dir": "东北风",
                      "sc": "4-5",
                      "spd": "25"
                    }
                  },
                  {
                    "cond": {
                      "code": "104",
                      "txt": "阴"
                    },
                    "date": "2018-11-17 19:00",
                    "hum": "82",
                    "pop": "18",
                    "pres": "1025",
                    "tmp": "13",
                    "wind": {
                      "deg": "69",
                      "dir": "东北风",
                      "sc": "3-4",
                      "spd": "19"
                    }
                  },
                  {
                    "cond": {
                      "code": "305",
                      "txt": "小雨"
                    },
                    "date": "2018-11-17 22:00",
                    "hum": "85",
                    "pop": "58",
                    "pres": "1024",
                    "tmp": "12",
                    "wind": {
                      "deg": "53",
                      "dir": "东北风",
                      "sc": "3-4",
                      "spd": "20"
                    }
                  },
                  {
                    "cond": {
                      "code": "305",
                      "txt": "小雨"
                    },
                    "date": "2018-11-18 01:00",
                    "hum": "88",
                    "pop": "25",
                    "pres": "1024",
                    "tmp": "11",
                    "wind": {
                      "deg": "14",
                      "dir": "东北风",
                      "sc": "3-4",
                      "spd": "23"
                    }
                  },
                  {
                    "cond": {
                      "code": "305",
                      "txt": "小雨"
                    },
                    "date": "2018-11-18 04:00",
                    "hum": "92",
                    "pop": "20",
                    "pres": "1023",
                    "tmp": "10",
                    "wind": {
                      "deg": "55",
                      "dir": "东北风",
                      "sc": "3-4",
                      "spd": "24"
                    }
                  },
                  {
                    "cond": {
                      "code": "305",
                      "txt": "小雨"
                    },
                    "date": "2018-11-18 07:00",
                    "hum": "93",
                    "pop": "43",
                    "pres": "1023",
                    "tmp": "10",
                    "wind": {
                      "deg": "79",
                      "dir": "东北风",
                      "sc": "3-4",
                      "spd": "22"
                    }
                  },
                  {
                    "cond": {
                      "code": "104",
                      "txt": "阴"
                    },
                    "date": "2018-11-18 10:00",
                    "hum": "87",
                    "pop": "80",
                    "pres": "1023",
                    "tmp": "11",
                    "wind": {
                      "deg": "5",
                      "dir": "北风",
                      "sc": "3-4",
                      "spd": "22"
                    }
                  },
                  {
                    "cond": {
                      "code": "305",
                      "txt": "小雨"
                    },
                    "date": "2018-11-18 13:00",
                    "hum": "85",
                    "pop": "25",
                    "pres": "1022",
                    "tmp": "12",
                    "wind": {
                      "deg": "343",
                      "dir": "西北风",
                      "sc": "3-4",
                      "spd": "16"
                    }
                  }
                ],
                "now": {
                  "cond": {
                    "code": "104",
                    "txt": "阴"
                  },
                  "fl": "14",
                  "hum": "61",
                  "pcpn": "0.0",
                  "pres": "1023",
                  "tmp": "15",
                  "vis": "10",
                  "wind": {
                    "deg": "81",
                    "dir": "东风",
                    "sc": "2",
                    "spd": "8"
                  }
                },
                "status": "ok",
                "suggestion": {
                  "air": {
                    "brf": "良",
                    "txt": "气象条件有利于空气污染物稀释、扩散和清除，可在室外正常活动。"
                  },
                  "comf": {
                    "brf": "较舒适",
                    "txt": "白天天气晴好，早晚会感觉偏凉，午后舒适、宜人。"
                  },
                  "cw": {
                    "brf": "不宜",
                    "txt": "不宜洗车，未来24小时内有雨，如果在此期间洗车，雨水和路上的泥水可能会再次弄脏您的爱车。"
                  },
                  "drsg": {
                    "brf": "较冷",
                    "txt": "建议着厚外套加毛衣等服装。年老体弱者宜着大衣、呢外套加羊毛衫。"
                  },
                  "flu": {
                    "brf": "易发",
                    "txt": "天冷空气湿度大，易发生感冒，请注意适当增加衣服，加强自我防护避免感冒。"
                  },
                  "sport": {
                    "brf": "较适宜",
                    "txt": "阴天，较适宜进行各种户内外运动。"
                  },
                  "trav": {
                    "brf": "适宜",
                    "txt": "天气较好，风稍大，但温度适宜，总体来说还是好天气。这样的天气适宜旅游，您可以尽情享受大自然的风光。"
                  },
                  "uv": {
                    "brf": "最弱",
                    "txt": "属弱紫外线辐射天气，无需特别防护。若长期在户外，建议涂擦SPF在8-12之间的防晒护肤品。"
                  }
                }
              }
            ]
          }
        },
        sky_src:sysConf.djangoUrl+'/media/pic/sky-sun.png',
        housesrc:[
          sysConf.djangoUrl+'/media/pic/house-1.jpg',
          sysConf.djangoUrl+'/media/pic/house-2.jpg',
          sysConf.djangoUrl+'/media/pic/house-3.jpg',
          sysConf.djangoUrl+'/media/pic/house-4.jpg',
          sysConf.djangoUrl+'/media/pic/house-5.jpg',
          sysConf.djangoUrl+'/media/pic/house-6.jpg',
          sysConf.djangoUrl+'/media/pic/house-7.jpg',
          sysConf.djangoUrl+'/media/pic/house-1.jpg',
          sysConf.djangoUrl+'/media/pic/house-3.jpg',
          sysConf.djangoUrl+'/media/pic/house-5.jpg',
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
        axios.post(sysConf.djangoUrl+'/beadhouse/sky/', data)
          .then(function (response) {
            vm.sky = response.data;
            console.log(vm.sky);
            var reg1 = /.*?晴.*/;
            var reg2 = /.*?阴.*/;
            var reg3 = /.*?云.*/;
            var reg4 = /.*?雨.*/;
            var reg5 = /.*?雪.*/;

            if (reg1.test(vm.sky.result.HeWeather5[0].daily_forecast.cond.txt_n)) {
              vm.sky_src=sysConf.djangoUrl+'/media/pic/sky-sun.png';
            }
            else if (reg2.test(vm.sky.result.HeWeather5[0].daily_forecast.cond.txt_n)) {
              vm.sky_src=sysConf.djangoUrl+'/media/pic/sky-yin.png';
            }
            else if (reg3.test(vm.sky.result.HeWeather5[0].daily_forecast.cond.txt_n)) {
              vm.sky_src=sysConf.djangoUrl+'/media/pic/sky-yun.png';
            }
            else if (reg4.test(vm.sky.result.HeWeather5[0].daily_forecast.cond.txt_n)) {
              vm.sky_src=sysConf.djangoUrl+'/media/pic/sky-rain.png';
            }
            else if (reg5.test(vm.sky.result.HeWeather5[0].daily_forecast.cond.txt_n)) {
              vm.sky_src=sysConf.djangoUrl+'/media/pic/sky-xue.png';
            }
            else{
              vm.sky_src=sysConf.djangoUrl+'/media/pic/sky-sun.png';
            }
          })
          .catch(function (error) {
            console.log(error)
          });
      },
      // 得到热门公寓
      GetHouseData: function () {
        var that = this;
        axios.get(sysConf.djangoUrl+'/beadhouse/gethouseby///1/1/')
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
