<template>

  <div class="col-md-9" >
    <div class="row" >
      <div class="col-md-12 ">
        <!--报表1-->
        <div class="row">
          <h3 class=" col-md-8 panel-title">
            <ul class="nav nav-tabs oldtitle">
              <!--<li role="presentation" class="my-active"><a href="#"  @click="showCheckData(checked)">默认</a>-->
              <!--</li>-->
              <li role="presentation" class="my-active" v-for="c in old_info"><a href="#" v-text="c.name"
                                                                                 @click="showCheckData(c)">王小翠</a>
              </li>
            </ul>
          </h3>
        </div>
        <div class="panel panel-info" id="listeat">
          <div class="panel-heading">
            <h3 class="panel-title glyphicon glyphicon-user eat-h3">
              <span>饮食报表</span>
            </h3>
          </div>
          <div class="panel-body" >
            <!--第1.1行-->
            <div v-if="!show||!eshow">还没有信息哦！</div>
            <div class="row" v-if="show&&eshow">
              <div class="col-md-4 my-img-centet eat-img">
                <!--头像(left)-->
                <img class="img-circle my-img" :src="checked.check_info_img" alt="">
                <p v-text="checked.check_info_name">王小翠</p>
              </div>
              <div class="col-md-8">
                <div class="row">
                  <div class="col-md-1"></div>
                  <div class="col-md-10  my-info eat-info">
                    <div class="input-group my-input"  v-for="(e,index) in check_info.eat_dyn" v-if="index<3||eatflag ">
                      <span class="input-group-addon "><p v-text="e.update_time">早饭：</p></span>
                      <input type="text" class="form-control" value="标准营养套餐" disabled="disabled"
                             v-model="e.content">
                    </div>
                  </div>
                  <div class="col-md-1"></div>
                </div>
                <div class="row">
                  <div class="col-md-3"></div>
                  <div class="col-md-5 my-old-change">
                    <button class="btn btn-danger" download="downImg" @click="history(1)">查看更多</button>
                  </div>
                  <div class="col-md-4"></div>
                </div>
                <!--第1.2行end-->
              </div>
            </div>
          </div>
        </div>
        <!--报表1end-->
        <div class="panel panel-danger" id="list-doctor">
          <div class="panel-heading">
            <h3 class="panel-title glyphicon glyphicon-user doctor-h3">
              <span>用药报表</span>
            </h3>
          </div>
          <div class="panel-body">
            <!--第1.1行-->
            <div v-if="!show||!mshow">还没有信息哦！</div>
            <div class="row" v-if="show&&mshow">
              <div class="col-md-4 my-img-centet doctor-img">
                <!--头像(left)-->

                <!--<p v-text="checked.check_info_name">王小翠</p>-->
              </div>
              <div class="col-md-8">
                <div class="row">
                  <div class="col-md-1"></div>
                  <div class="col-md-10  my-info doctor-info">
                    <div class="input-group my-input" v-for="(d,index) in check_info.medicine_dyn" v-if="index<3||docflag ">
                      <span class="input-group-addon" ><p v-text="d.update_time">7:00</p></span>
                      <input type="text" class="form-control" value="罗红霉素胶囊2粒(随餐服用)" disabled="disabled"
                             v-model="d.content">
                    </div>

                  </div>
                  <div class="col-md-1"></div>
                </div>
                <div class="row">
                  <div class="col-md-3"></div>
                  <div class="col-md-5 my-old-change">
                    <button class="btn btn-danger" download="downImg" @click="history(2)">查看更多</button>
                  </div>
                  <div class="col-md-4"></div>
                </div>
                <!--第1.2行end-->
              </div>
            </div>
          </div>
        </div>
        <!--报表3-->
        <div class="panel panel-warning" id="list-active">
          <div class="panel-heading">
            <h3 class="panel-title glyphicon glyphicon-user active-h3">
              <span>活动报表</span>
            </h3>
          </div>
          <div class="panel-body">
            <!--第1.1行-->
            <div v-if="!show||!ashow">还没有信息哦！</div>
            <div class="row" v-if="show&&ashow">
              <div class="col-md-4 my-img-centet active-img">
                <!--头像(left)-->
                <!--<p v-text="checked.check_info_name">王小翠</p>-->
              </div>
              <div class="col-md-8 ">
                <div class="row">
                  <div class="col-md-1"></div>
                  <div class="col-md-10  my-info active-info">
                    <div class="input-group my-input" v-for="(a,index) in check_info.active_dyn" v-if="index<3||artflag ">
                      <span class="input-group-addon "><p v-text="a.update_time">7:00-7:30</p></span>
                      <input type="text" class="form-control" value="晨练太极拳" disabled="disabled" v-model="a.content">
                    </div>

                  </div>
                  <div class="col-md-1"></div>
                </div>
                <div class="row">
                  <div class="col-md-3"></div>
                  <div class="col-md-5 my-old-change">

                    <button class="btn btn-danger" download="downImg" @click="history(3)">查看更多</button>
                  </div>
                  <div class="col-md-4"></div>
                </div>
                <!--第1.2行end-->
              </div>
            </div>

          </div>
        </div>
        <!---->
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
        old_info: [
          {
            "id": 3,
            "name": '王小翠'
          },
          {
            "id": 2,
            "name": '刘大爷'
          },
        ],
        check_info: [
          {
            "eat_dyn": [],
            "medicine_dyn": [],
            "active_dyn": [],
            "person_id": 1,
            "person_name": '王小翠'
          },
        ],
        checked: {
          "check_info_id": '',
          "check_info_name": '',
        },
        num: 0,
        flag: false,
        eatflag:false,
        docflag:false,
        artflag:false,
        show:true,
        eshow:true,
        mshow:true,
        ashow:true,
      }
    },
    methods: {
      //显示当前入住人状态信息
      showCheckData(c) {
        this.eatflag=false,
        this.docflag=false,
        this.artflag=false,
        this.checked.check_info_name = c.name;
        this.checked.check_info_id = c.id;
        this.checked.check_info_img = c.img;
        var vm = this;
        var token = sessionStorage.getItem('token');
        var user_id = sessionStorage.getItem('u_id');
        var data = {
          "user_id": user_id,
          "checkinfo_id": c.id,
          "dyn_type": ''
        }
        axios.post('http://127.0.0.1:8000/user/getdynlistbycheckinfoid/', data, {
          headers: {
            "token": token
          }
        })
          .then(function (response) {
            vm.check_info = response.data
            console.log(response.data)
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      //查看更多
      history: function (type) {
        var vm = this;
        var token = sessionStorage.getItem('token');
        var user_id = sessionStorage.getItem('u_id');
        var data = {
          "user_id": user_id,
          "checkinfo_id": this.checked.check_info_id,
          "dyn_type": type
        }
        axios.post('http://127.0.0.1:8000/user/getdynlistbycheckinfoid/', data, {
          headers: {
            "token": token
          }
        })
          .then(function (response) {
            console.log(response.data)
            if (type == 1) {
              vm.check_info.eat_dyn = response.data.dyn
              vm.eatflag = true
            }
            else if (type == 2) {
              vm.check_info.medicine_dyn = response.data.dyn
              vm.docflag = true
            }
            else {
              vm.check_info.active_dyn = response.data.dyn
              vm.artflag = true
            }

            console.log(response.data)
          })
          .catch(function (error) {
            console.log(error)
          })
      },
    },
    mounted() {
      var vm = this;
      var token = sessionStorage.getItem('token');
      if (token) {

        var user_id = sessionStorage.getItem('u_id');
        let d = {
          "user_id": user_id
        }
        //获取当前用户登记的所有入住人
        axios.post('http://127.0.0.1:8000/user/getcheckinfo/', d, {
          headers: {
            "token": token
          }
        })
          .then(function (response) {
            vm.old_info = response.data
            if(vm.old_info.length<1){
              vm.show=false
            }
            vm.checked.check_info_name = response.data[0].name;
            vm.checked.check_info_id = response.data[0].id;
            vm.checked.check_info_img= response.data[0].img;
            console.log(response.data)
            let data = {
              "user_id": user_id,
              "checkinfo_id": vm.old_info[0].id,
              "dyn_type": null
            }
            axios.post('http://127.0.0.1:8000/user/getdynlistbycheckinfoid/', data, {
              headers: {
                "token": token
              }
            })
              .then(function (response) {
                vm.check_info = response.data;
                if(vm.check_info.eat_dyn.length<1){
                  vm.eshow=false
                }
                if(vm.check_info.medicine_dyn.length<1){
                  vm.mshow=false
                }
                if(vm.check_info.active_dyn.length<1){
                  vm.ashow=false
                }

                console.log(vm.check_info)
              })
              .catch(function (error) {
                console.log(error)
              })

          })
          .catch(function (error) {
            console.log(error)
          })


        //取到当前用户默认的第一个入住人的状态信息


      }
      else {
        alert('请先登录！')
        this.$router.push({path: "/login"});
      }

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

  .my-img {
    width: 150px;
    height: 150px;
    margin: 5px;
  }


  .nav > li > a:hover,
  .nav > li > a:focus {
    color: black;
  }

  .my-input {
    margin-bottom: 10px;
  }

  .my-input span p {
    margin: 0;
    padding: 0;
    width: 150px;
  }

  .my-img-centet {
    text-align: center;
  }

  .my-old-change {
    margin: 10px 25px;
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

  .my-img-btn p {
    position: absolute;
  }


</style>
