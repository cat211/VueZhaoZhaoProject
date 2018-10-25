<template>
  <div class="col-md-9">
    <div class="row">
      <div class="col-md-12">
        <ul class="nav nav-tabs">
          <li role="presentation" class="my-active mc" id="my-house"><a href="#"
                                                                        @click="getBhInfo()">公寓收藏</a>
          </li>
          <li role="presentation" class="my-active mc" id="my-room"><a href="#"
                                                                       @click="getRoomInfo()">房间收藏</a>
          </li>
          <li role="presentation" class="my-active mc" id="my-set"><a href="#"
                                                                      @click="getArtInfo()">文章</a>
          </li>

        </ul>
        <div class="panel panel-primary my-nav-size">
          <div class="panel-body ">
            <div class="row my-coll-all">
            </div>
            <!--公寓收藏内容-->
            <div class="row my-coll-house mcoll" v-if="bhstate">
              <div class="row panel-body" v-if="showbh">
                您还没有收藏公寓哦！
              </div>
              <div class="col-sm-4 col-md-4 " v-for="b in bh_info" v-if="bh_info.length>=1">
                <div class="thumbnail">
                  <img src="../assets/images/det2.jpg" alt="..." :title=b.long_beadhouse__name>
                  <div class="caption">
                    <h4><strong v-text="b.beadhouse__name"></strong></h4>
                    <p>公寓</p>
                    <p><a href="#" class="btn btn-success" role="button" @click="goToBhiInfo(b.beadhouse__id)">详情</a> <a
                      href="#" class="btn btn-default"
                      role="button"
                      @click="delBhColl(b.beadhouse__id)">取消</a>
                    </p>
                  </div>
                </div>
              </div>

            </div>
            <!--公寓收藏内容end-->

            <!--房间收藏内容-->
            <div class="row my-coll-room mcoll" v-if="roomstate">
              <div class="row panel-body" v-if="showroom">
                您还没有收藏房间哦！
              </div>
              <div class="col-sm-4 col-md-4" v-for="r in room_info">
                <div class="thumbnail">
                  <img src="../assets/images/det2.jpg" :title=r.long_room__beadhouse__name>
                  <div class="caption">
                    <h4><strong v-text="r.room__name"></strong></h4>
                    <p v-text="r.room__beadhouse__name"></p>
                    <p><a href="#" class="btn btn-success" role="button" @click="goToRoomInfo(r.room_id,r.room__name)">详情</a>
                      <a href="#" class="btn btn-default"
                         role="button"
                         @click="delRoomColl(r.room_id)">取消</a>
                    </p>
                  </div>
                </div>
              </div>

            </div>
            <!--房间收藏内容end-->
            <!--文章收藏内容-->
            <div class="row my-coll-set mcoll" v-if="artstate">
              <div class="row panel-body" v-if="showart">
                您还没有收藏文章哦！
              </div>
              <div class="col-sm-4 col-md-4" v-for="a in art_info">
                <div class="thumbnail">
                  <img src="../assets/images/det2.jpg" :title=a.long_article__title+a.long_article__beadhouse__name>
                  <div class="caption">
                    <h4 :id=a.article_id><strong v-text="a.article__title"></strong></h4>
                    <p v-text="a.article__beadhouse__name"></p>
                    <p><a href="#" class="btn btn-success" role="button" @click="goToArtiInfo(a.article_id)">详情</a> <a
                      href="#" class="btn btn-default"
                      role="button"
                      @click="delArtColl(a.article_id)">取消</a>
                    </p>
                  </div>
                </div>
              </div>

            </div>
            <!--文章收藏内容end-->
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
        bhstate: false,
        roomstate: false,
        artstate: false,
        bh_info: [],
        room_info: [],
        art_info: [],
        showbh: false,
        showroom: false,
        showart: false

      }
    },
    methods: {
      //选择公寓收藏，获取公寓信息
      getBhInfo: function () {
        this.bhstate = true;
          this.roomstate = false;
          this.artstate = false;
        var vm = this;
        var token = sessionStorage.getItem('token');
        var user_id = sessionStorage.getItem('u_id');
        var data = {
          "user_id": user_id
        }
        if (token) {
          axios.post('http://127.0.0.1:8000/beadhouse/gethousebyuserid/', data, {
            headers: {
              "token": token
            }
          })
            .then(function (response) {
              vm.bh_info = response.data;
              if (vm.bh_info.statuscode == '409') {
                vm.showbh = true;

              } else {
                for (let i of vm.bh_info) {
                  i.long_beadhouse__name = i.beadhouse__name;
                  if (i.beadhouse__name.length > 9) {
                    i.beadhouse__name = i.beadhouse__name.substring(0, 9) + '...'
                  }

                }
              }
              console.log(vm.bh_info)
            })
            .catch(function (error) {
              console.log(error)
            })

        }
        else {
          alert('请先登录！')
          this.$router.push({path: "/login"});
        }
      },
      //选择房间收藏，获取房间信息
      getRoomInfo: function () {
        this.bhstate = false;
          this.roomstate = true;
          this.artstate = false;
        var vm = this;
        var token = sessionStorage.getItem('token');
        var user_id = sessionStorage.getItem('u_id');
        var data = {
          "user_id": user_id
        }
        axios.post('http://127.0.0.1:8000/beadhouse/getroombyuserid/ ', data, {
          headers: {
            "token": token
          }
        })
          .then(function (response) {
            vm.room_info = response.data;
            if (vm.room_info.length<1) {
              vm.showroom = true;
            }
            else {
              for (let i of vm.room_info) {
                i.long_room__beadhouse__name = i.room__beadhouse__name;
                if (i.room__beadhouse__name.length > 9) {
                  i.room__beadhouse__name = i.room__beadhouse__name.substring(0, 9) + '...'
                }

              }
            }
            console.log(vm.room_info)
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      //选择文章收藏，获取文章信息
      getArtInfo: function () {
        this.bhstate = false,
          this.roomstate = false,
          this.artstate = true
        var vm = this;
        var token = sessionStorage.getItem('token');
        var user_id = sessionStorage.getItem('u_id');
        var data = {
          "user_id": user_id
        }
        axios.post('http://127.0.0.1:8000/article/getarticlebyuserid/ ', data, {
          headers: {
            "token": token
          }
        })
          .then(function (response) {
            vm.art_info = response.data;
            console.log(response.data)
            if (vm.art_info.length<1) {
              vm.showart = true
            }
            else {
              for (let i of vm.art_info) {
                i.long_article__beadhouse__name = i.article__beadhouse__name;
                if (i.article__beadhouse__name.length > 9) {
                  i.article__beadhouse__name = i.article__beadhouse__name.substring(0, 9) + '...'
                }
                i.long_article__title = i.article__title;
                if (i.article__title.length > 9) {
                  i.article__title = i.article__title.substring(0, 9) + '...'
                }
              }
            }
            console.log(vm.art_info)
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      //删除公寓收藏
      delBhColl: function (bhid) {
        var vm = this;
        var user_id = sessionStorage.getItem('u_id');
        if (user_id) {
          var token = sessionStorage.getItem('token')
          var data = {
            "user_id": user_id,
            "house_id": bhid,
          }
          console.log(bhid)
          axios.post('http://127.0.0.1:8000/beadhouse/cancelhousecollect/', data, {
            headers: {
              "token": token
            }
          })
            .then(function (response) {
              if (response.data.statuscode == '202') {

                alert('取消成功')
                vm.getBhInfo();
              } else {
                vm.bhstate = false;
              }
            })
            .catch(function (error) {
              console.log(error)
            })
        }
        else {
          alert('请先登录！')
        }
      },
      delRoomColl: function (roomid) {
        var vm = this;
        var user_id = sessionStorage.getItem('u_id');
        if (user_id) {
          var token = sessionStorage.getItem('token')
          var data = {
            "user_id": user_id,
            "room_id": roomid,
          }
          axios.post('http://127.0.0.1:8000/beadhouse/cancelroomcollect/', data, {
            headers: {
              "token": token
            }
          })
            .then(function (response) {
              if (response.data.statuscode == '202') {
                alert('取消成功');
                vm.getRoomInfo();

              } else {
                vm.roomstate = false;
              }
            })
            .catch(function (error) {
              console.log(error)
            })
        }
        else {
          alert('请先登录！')
        }
      },
      //删除文章收藏
      delArtColl: function (articleid) {
        var vm = this;
        var user_id = sessionStorage.getItem('u_id');
        if (user_id) {
          var token = sessionStorage.getItem('token')
          var data = {
            "user_id": user_id,
            "article_id": articleid,
          }
          console.log(articleid)
          axios.post('http://127.0.0.1:8000/article/cancelarticlecollect/', data, {
            headers: {
              "token": token
            }
          })
            .then(function (response) {
              if (response.data.statuscode == '202') {
                alert('取消成功')
                vm.getArtInfo();
              } else {
                vm.artstate = false;
              }
            })
            .catch(function (error) {
              console.log(error)
            })
        }
        else {
          alert('请先登录！')
        }
      },
      //跳转公寓详情页
      goToBhiInfo: function (bhid) {
        sessionStorage.setItem('bhid', bhid);
        this.$router.push({path: "/apartinfo"});
      },
      goToRoomInfo: function (roomid, roomname) {
        sessionStorage.setItem('roomid', roomid);
        sessionStorage.setItem('roomname', roomname);
        this.$router.push({path: "/details"});
      },
      goToArtiInfo: function (artid) {
        sessionStorage.setItem('artid', artid);
        this.$router.push({path: "/articledetails"});
      }
    },

    mounted() {
      this.getBhInfo();

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

  .my-every-btn button {
    color: white;
    width: 80px;
    height: 80px;
    border: solid 0px black;
    border-radius: 50%;
    box-shadow: #7b8099 2px 2px 2px;
  }

  .nav > li > a:hover,
  .nav > li > a:focus {
    color: black;
  }

  .my-input span p {
    margin: 0;
    padding: 0;
    width: 150px;
  }

  .my-active {
    background: #40a170;
    border: white solid 1px;
    border-radius: 4px 4px 0px 0px;
    margin-right: 5px;
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

  #xdaTanFileImg {
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
