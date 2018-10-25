<template>
  <div class="col-md-9">
    <!--提示消息模态框-->
    <message-modal :err_message="err_message" :err_message_info="err_message_info"></message-modal>
    <div class="row">
      <div class="col-md-12">
        <div class="panel panel-primary">
          <div class="panel-heading">
            <h3 class="panel-title glyphicon glyphicon-user">我的信息</h3>
          </div>
          <!--第1个人的信息区-->
          <div class="panel-body" v-if="show">
            <p>您还没有添加入住人哦！</p>
          </div>
          <div class="panel-body old_info" v-for=" old in old_info" :id=old.id v-if="old.id||old.sex">
            <!--第1.1行-->
            <div class="row">
              <div class="col-md-4  my-img-centet">
                <!--头像(left)-->
                <img class="img-circle my-img" :src="old.img"
                     style="object-fit: cover;width: 150px;height: 150px;border: 1px solid">
              </div>
              <div class="col-md-8">
                <div class="row">
                  <div class="col-md-10">
                    <div class="input-group my-input">
                      <span class="input-group-addon " id="basic-addon1"><p>姓名：</p></span>
                      <input type="text" class="form-control" placeholder="Username：王小翠" v-model="old.name">
                    </div>
                    <div class="input-group my-input">
                      <span class="input-group-addon " id="basic-addon2"><p>性别：</p></span>
                      <input type="text" class="form-control" placeholder="Sex：女" v-model="old.sex">
                    </div>
                    <div class="input-group my-input">
                      <span class="input-group-addon " id="basic-addon3"><p>出生日期：</p></span>
                      <input type="text" class="form-control" placeholder="Birth：1998-07-07" v-model="old.birthday">
                    </div>
                    <div class="input-group my-input">
                      <span class="input-group-addon " id="basic-addon4"><p>联系电话：</p></span>
                      <input type="number" class="form-control" placeholder="Tel：18842421515"
                             v-model="old.telephone"  >
                    </div>
                    <div class="input-group my-input">
                      <span class="input-group-addon " id="basic-addon5"><p>紧急联系人电话：</p></span>
                      <input type="number" class="form-control" placeholder="Ftel：18845454444"
                             v-model="old.ec_telephone">
                    </div>
                    <div class="input-group my-input">
                      <span class="input-group-addon " id="basic-addon6"><p>紧急联系地址：</p></span>
                      <input type="text" class="form-control" placeholder="Address：江苏省苏州市星湖街创意产业园4栋b202"
                             v-model="old.ec_address">
                    </div>
                    <hr>
                  </div>
                  <div class="col-md-2">
                    <button class="btn btn-danger glyphicon glyphicon-remove" @click="delOldInfo(old.id)"></button>
                  </div>
                </div>
                <!--第1.2行end-->
              </div>
            </div>
          </div>
          <!--第1个人的信息区end-->

          <div class="row">
            <div class="col-md-4"></div>
            <div class="col-md-4 my-old-change">
              <button class="btn btn-danger add-old-info" @click="addOldInfo()">添加人物</button>
              <button class="btn btn-danger save" @click="saveOldInfo()">保存信息</button>
            </div>
            <div class="col-md-4"></div>
          </div>
        </div>
        <!--第1.1行end-->
        <!--第1.2行-->

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
        old_info: [],
        len:0,
        show:false,
        oldidicon: sessionStorage.getItem('old_id'),
        err_message_info:'',
        err_message:'',
      }
    },
    methods: {
      //获取用户信息
      getOldInfo:function(){
        var vm = this;
        var token = sessionStorage.getItem('token');
        var user_id = sessionStorage.getItem('u_id');
        var data = {
          "user_id": user_id
        }
        if (token) {
          axios.post('http://127.0.0.1:8000/user/getcheckinfo/', data, {headers: {"token": token}
          })
            .then(function (response) {
              vm.old_info = response.data
              if(vm.old_info.length<1){
                vm.show=true;
              }
              sessionStorage.setItem('old_id',vm.old_info.id);
              console.log(response.data)
              console.log(response)
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
      //保存全部入住人信息
      saveOldInfo: function () {
        this.show=false;
        var j = 0;
        var reg1 = /^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
        var reg2= /^1[3456789]\d{9}$/;
        for (let i of this.old_info) {
          if (i.name == '') {
            alert('姓名不能为空！');
            break;
          }
          if (!reg2.test(i.telephone)||!reg2.test(i.ec_telephone)) {
            alert('手机号码格式错误！')
            break;
          }
          if (!reg1.test(i.birthday)) {
            alert('日期格式错误！')
            break;
          }
          j++;
        }
        if (j == this.old_info.length) {
          var vm = this;
          var token = sessionStorage.getItem('token');
          var user_id = sessionStorage.getItem('u_id');
          var data = {
            "user_id": user_id,
            "check_infos": this.old_info
          }
          if (token) {
            axios.post('http://127.0.0.1:8000/user/addcheckinfo/', data, {headers: {"token": token}})
              .then(function (response) {
                if (response.data.statuscode == '202') {
                  alert('保存成功！')
                  vm.getOldInfo();
                } else {
                  alert(response.data.statuscode)
                  alert('保存失败！')
                }
                console.log(response.data)
                console.log(response)
              })
              .catch(function (error) {
                console.log(error)
              })
          }
          else {
            alert('请先登录！')
            this.$router.push({path: "/login"});
          }
        }
      },
      //添加入住人信息
      addOldInfo: function () {
        var k = 0
        for (let i of this.old_info) {
          if (i.name =='') {
            alert('姓名不能为空！')
            break;
          }
          else {
            k = k + 1;
          }
        }
        //如果当前填写用户名的入住人字典列表的长度等于当前入住人长度:证明所有当前入住人信息均填写了姓名
        //添加新空的入住人资料框
        if (k == this.old_info.length) {
          this.old_info.push(
            {
              "id": '',
              "telephone": "",
              "name": "",
              "birthday": "",
              "sex": '女',
              "ec_telephone": "",
              "ec_address": "",
              "img": ""
            }
          )
        }
      },
      //删除入住人信息
      delOldInfo: function (id) {
        var vm = this;
        var token = sessionStorage.getItem('token');
        var user_id = sessionStorage.getItem('u_id');
        var data = {
          "user_id": user_id,
          "id": id
        }
        if (token) {
          var result;
          result=confirm("您确定要解除与该入住人的关联吗?注：解除关联将删除包含该入住人的状态、订单，此操作不可逆！"); //在页面上弹出对话框
          if(result==true){

            axios.post('http://127.0.0.1:8000/user/deletecheckinfo/', data, {headers: {"token": token}})
              .then(function (response) {
                if (response.data.statuscode == '202') {
                  for (let i in vm.old_info) {
                    if (vm.old_info[i].id == id) {
                      delete vm.old_info[i]
                    }
                  }
                  vm.err_message = '删除入住人成功';
                  vm.err_message_info = '与入住人相关订单和动态都已删除';
                  vm.getOldInfo();

                }
                else {
                  vm.err_message = '删除入住人失败';
                  vm.err_message_info = '竟然失败了我去！！！！';
                }
                console.log(response.data);
                console.log(response)
              })
              .catch(function (error) {
                console.log(error)
              })
          }
          else{
            vm.err_message = '取消操作';
            vm.err_message_info = '您已取消删除入住人，还是挺孝顺的';
          }

        }
        else {
          vm.err_message = '你还未登录';
          vm.err_message_info = '请登录后使用该功能';
        }
      },
    },
    mounted() {
      this.getOldInfo();
    }
  }
</script>

<style scoped>
  .my-nav-img img {
    height: 65px;

  }
  .my-nav a {
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

  .panel-primary > .panel-heading{
    background: #40a170;
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


  .my-img-btn p {
    position: absolute;
  }


</style>
