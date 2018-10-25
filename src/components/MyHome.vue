<template>
  <div class="col-md-9">
    <!--提示消息模态框-->
    <message-modal :err_message="err_message" :err_message_info="err_message_info"></message-modal>
    <div class="row">
      <div class="col-md-6">
        <div class="panel panel-primary">
          <div class="panel-heading">
            <h3 class="panel-title glyphicon glyphicon-calendar">每日签到</h3>
          </div>
          <div class="panel-body my-every">
            <div class="my-every-btn">
              <button class="btn bg-orange my-sign" @click="flag && Sign()" v-text="signtext">签到+1</button>
            </div>
            <!--<div class="my-every-btn"><button class="btn bg-orange history-sign">历史签到</button></div>-->
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="panel panel-primary">
          <div class="panel-heading">
            <h3 class="panel-title glyphicon glyphicon-euro">我的积分</h3>
          </div>
          <div class="panel-body my-every">
            <div class="my-every-btn">
              <button class="btn bg-orange user-socre">
                <span v-text="user_info.points">375</span>
                <span>分</span></button>
            </div>
            <!--<div class="my-every-btn"><button class="btn bg-orange ">积分记录</button></div>-->
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="panel panel-primary">
          <div class="panel-heading">
            <h3 class="panel-title glyphicon glyphicon-gift">每日奖励</h3>
          </div>
          <div class="panel-body">
            <div class="row">
              <div class="col-md-4  my-img-centet">
                <!--头像(left)-->
                <img class="img-circle my-img" :src="user_info.img"
                     style="object-fit: cover;width: 150px;height: 150px;border: 1px solid">
                <form id="iconform">
                  <button class="btn btn-danger my-img-btn">
                    <p>选择头像</p>
                    <input type="file" name="user_icon" id="user-pic" style="width: 30px">
                  </button>
                  <input name="usericonid" type="text" v-show="false" v-model.lazy="useridicon">
                  <button class="btn btn-danger" v-on:click="upLoadIcon">修改头像</button>
                </form>
              </div>
              <div class="col-md-8">
                <!--头像right-->
                <h4 class="glyphicon glyphicon-user">
                  <span class="user-name" v-text="user_info.user_name">可爱小宝贝</span> LV<span v-text="level">2</span>
                </h4>
                <div class="progress">
                  <div class="progress-bar progress-bar-warning active" role="progressbar" :aria-valuenow=myscore
                       aria-valuemin="0" aria-valuemax="100" :style=myscorestyle>
                    <span class="sr-only"></span>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6"></div>

                  <div class="col-md-2 my-change"><a href="#">
                    <button class="btn btn-danger" @click.prevent.stop="changeInfo()">修改信息</button>
                  </a></div>
                  <div class="col-md-2"></div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import axios from 'axios'

  export default {
    name: "",
    data() {
      return {
        alldata: [],
        signtext: '签到+1',
        flag: true,
        user_info: {},
        useridicon: sessionStorage.getItem('u_id'),
        myscore:0,
        myscorestyle:'',
        level:0,
        err_message:'',
        err_message_info:'',
      }
    },
    methods: {
      // 签到
      Sign: function () {
        this.user_info.points += 1;
        var token = sessionStorage.getItem('token');
        var user_id = sessionStorage.getItem('u_id');
        var data = {
          "user_id": sessionStorage.getItem('u_id'),
          "points": this.user_info.points
        };
        let vm = this;
        //更新积分

        //  更新签到状态
        axios.post('http://127.0.0.1:8000/user/sign/', data, {
          headers: {
            "token": token
          }
        })
          .then(function (response) {
            vm.state = response.data;
            if (vm.state.statuscode == '202') {
              axios.post('http://127.0.0.1:8000/user/updatepoints/', data, {headers: {"token": token}})
                .then(function (response) {
                  vm.state = response.data;
                  if (vm.state.code == '202') {
                    vm.err_message = '签到成功';
                    vm.err_message_info = '签到成功';
                    vm.signtext = '已签到';
                    vm.flag = false;
                    sessionStorage.setItem('u_points',  vm.user_info.points);
                  }
                  console.log(response)
                })
                .catch(function (error) {
                  console.log(error)
                })
            }
          })
          .catch(function (error) {
            console.log(error)
          })

      },
      //跳转更改个人信息
      changeInfo: function () {
        this.$emit('changeinfoclick')

      },
      //修改头像
      upLoadIcon: function () {
        let formdata = new FormData(document.querySelector("#iconform"));
        let that = this;
        axios.post('http://127.0.0.1:8000/user/uploadicon/', formdata)
          .then(function (response) {
            if (response.data.statuscode == '202')
              setTimeout(2);
            that.getUserInfo();
          })
      },
      getUserInfo:function () {
        let vm = this;
        let token = sessionStorage.getItem('token');
        let data = {
          "user_id": sessionStorage.getItem('u_id')
        };
        if (token) {
          axios.post('http://127.0.0.1:8000/user/getuserinfo/', data, {headers: {"token": token}})
            .then(function (response) {
              vm.user_info = response.data;
              vm.myscore=vm.user_info.points%100;
              vm.myscorestyle='width:'+vm.myscore+'%';
              vm.level=Math.ceil(vm.myscore/10);
              console.log(vm.user_info);
            })
            .catch(function (error) {
              console.log(error)
            });
          axios.post('http://127.0.0.1:8000/user/checktest/', data, {headers: {"token": token}})
            .then(function (response) {
              // config.headers.common['token']=token
              console.log(response.data.check_result);
              if (response.data.check_result) {
                vm.flag = true;
                vm.signtext = '签到+1';
              }
              else {
                vm.flag = false;
                vm.signtext = '已签到';


              }
            })
            .catch(function (error) {
              console.log(error)
            });

        }
        else {
          this.err_message='你还未登录';
          this.err_message_info='请登陆后使用该功能';
        }
      }
    },
    mounted() {
      this.getUserInfo();
    }
  }
</script>

<style scoped>
  .my-nav-img img {
    height: 65px;

  }
  .my-nav a, .my-footer {
    color: white;
  }

  .my-every {
    display: flex;
  }

  .my-every-btn {
    flex: 1;
    text-align: center;
  }

  .my-every-btn button {
    color: white;
    width: 80px;
    height: 80px;
    border: solid 0px black;
    border-radius: 50%;
    box-shadow: #7b8099 2px 2px 2px;
  }

  .bg-orange {
    background: #f0ad4e;
  }

  .panel-primary > .panel-heading, .bg-green {
    background: #40a170;
  }

  .nav > li > a:hover,
  .nav > li > a:focus {
    color: black;
  }

  .my-change {
    margin-left: 15px;
  }

  .my-input span p {
    margin: 0;
    padding: 0;
    width: 150px;
  }

  .my-img-centet {
    text-align: center;
  }

  .my-active a {
    color: white;
  }

  .order-img img {
    width: 100px;
    height: 60px;
  }

  .my-nav-size ul li {
    font-size: 14px;

  }

  #user-pic {
    opacity: 0;
    filter: alpha(opacity=0);
  }

  .my-img-btn {
    width: 85px;
    height: 35px;
  }

  .my-img-btn p {
    position: absolute;
  }


</style>
