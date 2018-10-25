<template>
  <div>
    <message-modal :err_message="err_message" :err_message_info="err_message_info"></message-modal>
    <div class="row my-index-center">
      <!--内容左空白-->
      <div class="col-md-2"></div>
      <!--内容左空白end-->
      <!--中间内容-->
      <div class="col-md-8">
        <div class="row">
          <div class="col-md-12">
            <div class="panel panel-default">
              <!-- Default panel contents -->
              <div class="panel-heading">
                <h4>
                  <span class="glyphicon glyphicon-bed"></span>
                  <span v-text="room_name">豪华单人间</span>
                </h4>
              </div>
              <!-- List group -->
              <ul class="list-group">
                <li class="list-group-item">
                  <div class="row">
                    <div class="col-md-6 room-img">
                      <img src="http://127.0.0.1:8000/media/pic/room-1.jpg" alt="">
                    </div>
                    <div class="col-md-4">
                      <div class="panel panel-default">
                        <div class="panel-body ">
                          <h4 v-for="rs in room_set">
                            <input type="checkbox" :id=rs.id v-model="setmeal_id" :value=rs.id>
                            <label :for=rs.id v-text="rs.name"></label>
                            <span class="glyphicon glyphicon-yen"></span>
                            <span v-text="rs.price" class="text-orange"></span>
                            元
                          </h4>
                        </div>
                        <div class="panel-heading">
                          <ul>
                            <h4>周期:
                              <input type="number" class="input-month"
                                     oninput="if(value>12)value=12 ;if(value<1)value=1"
                                     v-model=number>
                              月
                            </h4>
                          </ul>
                        </div>
                        <div class="panel-body">
                          <button type="button" class="btn btn-warning center-block" @click="addCart()">
                            <img class="icon" src="../assets/images/detail_cart_icon.png" alt="">加入购物车
                          </button>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-2">
                      <a
                        href="http://service.weibo.com/share/share.php?appkey=&title=&url=&searchPic=false&style=simple"
                        target="_blank">
                        <button type="button" class="btn center-block  roombtnmargin">
                          <img class="icon" src="../assets/images/detail_fx_icon.png" alt="">
                          <span> 分 享 </span>
                        </button>
                      </a>
                      <a href="#">

                        <button type="button"
                                class="btn center-block  roombtnmargin" v-if="flag"
                                @click="collRoom()"><img class="icon" src="../assets/images/b_coll.png" alt="">
                          <span>收藏房间</span>
                        </button>
                        <button type="button"
                                class="btn center-block  roombtnmargin mycoll" v-if="!flag"
                                @click="delCollRoom()"><img class="icon" src="../assets/images/a_coll.png" alt="">
                          <span> 已收藏</span>
                        </button>
                      </a>
                      <a href="#">
                        <button type="button"
                                class="btn center-block roombtnmargin" @click="goToBh()">
                          <img class="icon" src="../assets/images/detail_house.png" alt="">
                          <span> 公 寓 </span>
                        </button>
                      </a>
                    </div>
                  </div>
                </li>
                <li class="list-group-item">
                  <div class="row">
                    <div class="col-md-4">
                      <div class="panel panel-default room-other">
                        <div class="panel-body">
                          <h3>
                            <span>房间设施</span>
                          </h3>
                        </div>
                        <div class="panel-body" v-for="rc in room_config"><img :src=rc.srcd><span
                          v-text="rc.configtype__name"></span></div>
                      </div>
                    </div>
                    <div class="col-md-8">
                      <div class="panel panel-success" v-for="rs in room_set">
                        <div class="panel-heading">
                          <span>
                            <img class="icon" src="../assets/images/detail_set_icon.png" alt="">
                          </span>
                          <span v-text="rs.name">标准营养套餐</span>
                        </div>
                        <div class="panel-body row">
                          <div class="col-md-6 room-set-img">
                            <img class="center-block" src="../assets/images/det2.jpg" alt="">
                          </div>
                          <div class="col-md-6" v-text="rs.content">这是标准营养套餐内容介绍</div>
                        </div>
                      </div>

                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>


      </div>

      <!--内容右end-->
      <div class="col-md-2"></div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: "",
    data() {
      return {
        room_id: 0,
        room_config: [],
        rooms_info: [],
        dataList: [],
        unitName: '未选择',
        unitModel: '',
        room_set: [],
        isShowSelect: false,
        unitId: '',
        flag: true,
        setmeal_id: [],
        number: 1,
        room_name: '',
        err_message: '',
        err_message_info:'',
      }
    },
    methods: {
      goToBh: function () {
        var bh_id = sessionStorage.getItem('bhid');
        this.$router.push({path: "/apartinfo"});
      },
      //收藏房间
      collRoom: function () {
        var vm = this;
        vm.room_id = sessionStorage.getItem('roomid');
        vm.user_id = sessionStorage.getItem('u_id');
        if (vm.user_id) {
          var token = sessionStorage.getItem('token')
          var data = {
            "user_id": vm.user_id,
            "room_id": vm.room_id,
          }
          axios.post('http://127.0.0.1:8000/beadhouse/collectroom/', data, {
            headers: {
              "token": token
            }
          })
            .then(function (response) {
              console.log(response.data)
              if (response.data.statuscode == '202') {
                vm.flag = false;
                vm.err_message = '收藏成功';
                vm.err_message_info = '请在个人中心查看我的收藏'
              } else {
                vm.flag = true;
              }
            })
            .catch(function (error) {
              console.log(error)
            })
        }
        else {
          vm.err_message = '请登录';
          vm.err_message_info = '请登录后使用该功能'
        }
      },
      //取消收藏房间
      delCollRoom: function () {
        var vm = this;
        vm.room_id = sessionStorage.getItem('roomid');
        vm.user_id = sessionStorage.getItem('u_id');
        if (vm.user_id) {
          var token = sessionStorage.getItem('token');
          var data = {
            "user_id": vm.user_id,
            "room_id": vm.room_id,
          }
          axios.post('http://127.0.0.1:8000/beadhouse/cancelroomcollect/', data, {
            headers: {
              "token": token
            }
          })
            .then(function (response) {
              if (response.data.statuscode == '202') {
                vm.flag = true;
                vm.err_message = '取消成功';
                vm.err_message_info = '该房间已经从收藏列表移除'
              } else {
                vm.flag = false;
              }
            })
            .catch(function (error) {
              console.log(error)
            })
        }
        else {
          vm.err_message = '请登录';
          vm.err_message_info = '请登录后使用该功能'
        }
      },
      //添加到购物车
      addCart: function () {
        var vm = this;
        vm.user_id = sessionStorage.getItem('u_id');
        if (vm.user_id) {
          var token = sessionStorage.getItem('token')
          var room_id = sessionStorage.getItem('roomid')
          //房间0 套餐1
          if (vm.setmeal_id) {
            var data = {
              "user_id": vm.user_id,
              "good_list": [
                {
                  "id": vm.room_id,
                  "number": vm.number,
                  "type": 0
                },
              ]
            };
            for (let s in vm.setmeal_id) {
              data.good_list.push(
                {
                  "id": vm.setmeal_id[s],
                  "number": vm.number,
                  "type": 1
                },
              )
            }

          }
          else {
            var data = {
              "user_id": vm.user_id,
              "good_list": [
                {
                  "id": vm.room_id,
                  "number": vm.number,
                  "type": 0
                },
              ]
            };
          }
          // var data = {
          //   "user_id": vm.user_id,
          //   "room_id": vm.room_id,
          //   "number":vm.number,
          //   "setmeal_id":vm.setmeal_id
          // }
          // alert(vm.room_id)
          // alert(vm.setmeal_id)
          axios.post('http://127.0.0.1:8000/cart/addcart/', data, {
            headers: {
              "token": token
            }
          })
            .then(function (response) {
              if (response.data.statuscode == '202') {
                vm.err_message = '成功加入购物车';
                vm.err_message_info = '该商品已成功加入到购物车'
              } else {
                vm.err_message = '加入购物车失败';
                vm.err_message_info = '出现了那种不可描述的错误，嘿嘿'
              }
            })
            .catch(function (error) {
              console.log(error)
            })
        }
        else {
          vm.err_message = '请登录';
          vm.err_message_info = '请登录后使用该功能'
        }
      }

    },
    mounted() {

      this.room_id = parseInt(sessionStorage.getItem('roomid'));
      this.room_name = sessionStorage.getItem('roomname');
      this.rooms_info = sessionStorage.getItem('rooms_info');
      //得到所有的配置
      var vm = this;
      axios.get('http://127.0.0.1:8000/beadhouse/getconfigbyid/' + vm.room_id + '/')
        .then(function (response) {
          vm.room_config = response.data;
          for (let c of vm.room_config) {
            c.srcd = "http://localhost:8000/media/pic/detc" + c.configtype_id + '.jpg'
          }
          console.log(vm.room_config)
        })
        .catch(function (error) {
          console.log(error)
        })
      axios.get('http://127.0.0.1:8000/beadhouse/getmealbyroomid/' + vm.room_id + '/')
        .then(function (response) {
          vm.room_set = response.data;
          console.log(vm.room_set)
        })
        .catch(function (error) {
          console.log(error)
        })
      //判断房间是否被收藏
      vm.user_id = sessionStorage.getItem('u_id');
      if (vm.user_id) {
        var token = sessionStorage.getItem('token')
        var room_id = sessionStorage.getItem('roomid')
        var data = {
          "user_id": vm.user_id,
          "room_id": vm.room_id,
        }
        axios.post('http://127.0.0.1:8000/beadhouse/isroomcollect/', data, {
          headers: {
            "token": token
          }
        })
          .then(function (response) {
            console.log(response.data.collectstatus)
            if (response.data.collectstatus) {
              vm.flag = false;
            } else {
              vm.flag = true;
            }
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    }
  }
</script>

<style scoped>
  .room-img img {
    width: 450px;
    height: 300px;
    border-radius: 5px;
  }

  .roombtnmargin {
    width: 115px;
    margin: 10px;
  }

  .room-set-img img {
    width: 185px;
    height: 100px;
    border-radius: 5px;
  }

  .room-other {
    height: 750px;
  }

  .my-index-center {
    padding-top: 20px;
    min-height: 600px;
  }

  .my-input span p {
    margin: 0;
    padding: 0;
    width: 150px;
  }

  .my-active a {
    color: white;
  }

  button {
    color: black;
  }

  img:hover {
    transform: scale(1.2);
  }

  .my-nav-size ul li {
    font-size: 14px;
  }

  .col-md-2 a, .col-md-1 a {
    text-decoration: none;
    border-radius: 2px;
    color: #269abc;
  }

  .text-orange, .glyphicon-bed {
    color: orange;
  }

  .mycoll {
    background: #00cc66;
  }

  .input-month {
    width: 100px;
  }

  h4 {
    margin: 10px 5px;
  }

  input[type='checkbox'] {
    width: 18px;
    height: 18px;
  }

  img.icon {
    width: 25px;
    height: 25px;
  }
</style>
