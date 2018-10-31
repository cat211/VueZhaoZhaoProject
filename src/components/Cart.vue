<template>
  <div class="cart-container">
    <!--提示消息模态框-->
    <message-modal :err_message="err_message" :err_message_info="err_message_info"></message-modal>
    <!--支付订单模态框-->
    <div class="row">
      <div class="modal fade" id="PayModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="border-radius: 10px;margin-top: 200px">
        <div class="modal-dialog" style="border-radius: 10px">
          <div class="modal-content" style="border-radius: 10px">
            <div class="modal-header" style="background:#40a170; border-top-left-radius: 10px ;border-top-right-radius: 10px ;height: 50px;line-height: 50px">
              <!--这里是关闭窗口的小叉叉-->
              <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
              <!--下面这行是窗口标题-->
              <div style="height: 30px;line-height:20px;margin-bottom: 30px"><span style="color: #ffffff;font-size: 18px">请支付您的订单:</span></div>
            </div>
            <!--这里是中间内容-->
            <div class="modal-body" style="display: flex;border-bottom: 1px solid #c6c3bf">
              <!--这里是支付图片-->
              <div style="height: 200px;width: 200px"><img style="object-fit: cover;width: 100%;height: 100%" src="../assets/images/pay_picture.jpg" ></div>
              <!--这里是订单内容-->
              <div style="width: 370px;margin-top: 5px">
                <!--这里是订单的每一行-->
                <div style="width: 100%;height: 40px;margin-bottom: 10px;display: flex" v-for="good in order_list">
                  <div style="width: 50%;text-align: center;line-height: 40px">
                    <span style="font-size: 20px" v-text="good.name"></span>
                  </div>
                  <div style="width: 50%;text-align: center;line-height: 40px">
                    <span style="font-size: 20px" v-text="good.number"></span><span style="font-size: 20px">个月</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-body" style="width: 100%;height: 60px">
              <div class="text-right">
                <span style="font-size: 28px" class="text-center">总计:  </span><span style="font-size: 28px" v-text="sum"></span>元
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default btn-lg" @click="noPay">取消支付</button>
              <button type="button" class="btn btn-primary btn-lg" @click="pay">确认支付</button>
            </div>
          </div><!-- /.modal-content -->
        </div><!-- /.modal -->
      </div>
    </div>  <!-- 支付模态框结束 -->

    <div class=" panel panel-success">
      <div class="cart-con-header panel-heading ">
        <div>
          <input type="checkbox" id="checkbox" v-model="checked" @click="changeAllChecked">
          <label for="checkbox">全选</label>
        </div>
        <div>商品</div>
        <div>公寓</div>
        <div>单价</div>
        <div>周期</div>
        <div>小计</div>
        <div>操作</div>
      </div>
      <div class="cart-con-goods" v-for="c in cart_info" :key="c.id">
        <div class="cart-con-header cart-good-item" :id=c.id>
          <div class="cart-goodsimg">
            <input type="checkbox" :id=c.id :value=c.id v-model="checkedBoxList" :data-type="c.type" @click="">
            <a href="javascript:void 0"><img src="../assets/images/det2.jpg" alt=""></a>
          </div>
          <div v-text="c.name"></div>
          <div v-text="c.beadhouse_name"></div>
          <div v-text="c.price"></div>
          <div class="cart-btn-operator" :id="c.id">
            <input readonly="readonly" type="" value="-" @click="countReduce($event),sumPrice()" :disabled="c.number<1">
            <input class="bigoperator" type="text" v-model.number="c.number">
            <input readonly="readonly" type="" value="+" @click="countAdd($event),sumPrice()">
          </div>
          <div class="row-count" v-text="c.number*c.price"></div>
          <div><a href="" class="a-delete" @click.prevent="delGoods(c.good_id,c.type)">删除</a></div>
        </div>
      </div>
      <div class="cart-con-count">
        <ul class="col-md-9">
          <li class="f-l">
            <div class="por">
              <div class="selectBox">
                <div class="selectBox_show" v-on:click.stop="arrowDown">
                  <i class="icon icon_arrowDown"></i>
                  <a class="input-old" title="请选择" v-text="unitName" :id=unitId @click="getname()"></a>
                  <input type="hidden" name="unit" v-model="unitModel">
                </div>
                <div class="selectBox_list" v-show="isShowSelect">
                  <div class="selectBox_listLi" v-for="(item, index) in dataList"
                       @click.stop="select(item, index)" :id=item.id v-text="item.name">
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <div class="col-md-3 bottom buy">总计:<span v-text="sum"></span>元
          <div class="btn btn-warning btn-lg  " @click.prevent="addOrder">结算</div>
        </div>
      </div>

    </div>
  </div>
</template>


<script>
  import axios from 'axios'
  import 'bootstrap/dist/css/bootstrap.min.css'
  import 'jquery'
  import 'bootstrap/dist/js/bootstrap.min'
  export default {
    name: 'Cart',
    data() {
      return {
        cart_info: [],   // 用来显示所有商品
        checked: false,
        checkedBoxList: [],  // 用来控制全选和反选
        checkNames: [],
        cart_info_id: 0,
        dataList: [],
        unitName: '请选择入住人',
        unitModel: '',
        room_set: [],
        isShowSelect: false,
        unitId: 0, // 当前选中的入驻人id
        sum: 0,    // 用来显示总价
        order_list: [], //订单列表用来存放添加到订单里的房间和套餐
        err_message:'', // 模态框消息的标题
        err_message_info:'', // 模态框消息的详细信息
      }
    },
    // 钩子获取数据
    mounted() {
      this.getData();
    },

    methods: {
      // 全选与选项
      changeAllChecked: function () {
        if (this.checked) {//实现反选
          this.checkedBoxList = [];
        } else { //实现全选
          this.checkedBoxList = [];
          this.cart_info.forEach((item) => {
            this.checkedBoxList.push(item.id);
          });
        }
      },
      arrowDown() {
        if (sessionStorage.getItem('u_points')) {
          this.isShowSelect = !this.isShowSelect;
        } else {
        }
      },
      // 计算总价
      sumPrice: function () {
        this.sum = 0;
        for (let i of this.cart_info) {
          for (let j of this.checkedBoxList) {
            if (i.id === j) {
              this.sum += i.price * i.number
            }
          }
        }
      },
      countAdd: function (event) {
        let cart_id = event.target.parentNode.id;
        for (let i of this.cart_info) {
          if (i.id == cart_id) {
            i.number++;
          }
        }
      },
      countReduce: function (event) {
        let cart_id = event.target.parentNode.id;
        for (let i of this.cart_info) {
          if (i.id == cart_id) {
            i.number--;
          }
        }
      },
      select(item, index) {
        this.isShowSelect = false;
        this.unitModel = index;
        this.unitName = item.name;
        this.unitId = item.id;
      },
      // 得到入驻人信息
      getname: function () {
        var user_id = sessionStorage.getItem('u_id');
        if (user_id) {
          this.dataList = [];
          var u_id = {
            "user_id": user_id
          };
          var token = sessionStorage.getItem('token');
          var that = this;
          axios.post(sysConf.djangoUrl+'/user/getcheckinfo/', u_id, {
            headers: {
              "token": token
            }
          })
            .then(function (response) {
              response.data.forEach((item, index) => {
                that.dataList.push(item)
              });
            })
            .catch(function (error) {
              console.log(error)
            })
        }
        else {
          this.err_message = '请登录';
          this.err_message_info = '你还未登录，请登陆后使用该功能';

        }
      },
      // 删除商品函数
      delGoods: function (good_id, good_type) {
        let data = {
          "user_id": sessionStorage.getItem('u_id'),
          "good_id": parseInt(good_id),
          "type": parseInt(good_type),
        };
        let that = this;
        axios.post(sysConf.djangoUrl+'/cart/deletecart/', data, {"headers": {"token": sessionStorage.getItem('token')}}).then(function (response) {
          that.getData();
          that.err_message = good_id+'号商品删除成功';
          that.err_message_info = '您已经成功将商品从购物车中删除';
        })
      },
      // 用来获取购物车列表的函数
      getData: function () {
        var vm = this;
        this.cart_info = [];
        var token = sessionStorage.getItem('token');
        var user_id = sessionStorage.getItem('u_id');
        var data = {
          "user_id": user_id
        };
        var that = this;
        if (token) {
          axios.post(sysConf.djangoUrl+'/cart/getcart/', data, {
            headers: {
              "token": token
            }
          })
            .then(function (response) {
              // config.headers.common['token']=token
              let i = 0;
              for (let room of response.data.room) {
                i += 1;
                let json_room = {
                  "id": i,
                  "name": room.name,
                  "price": room.price,
                  "beadhouse_name": room.beadhouse_name,
                  "number": room.number,
                  "good_id": room.id,
                  "type": 0,
                };
                that.cart_info.push(json_room)
              }
              for (let meal of response.data.meal) {
                i += 1;
                let json_meal = {
                  "id": i,
                  "name": meal.name,
                  "price": meal.price,
                  "beadhouse_name": meal.beadhouse_name,
                  "number": meal.number,
                  "good_id": meal.id,
                  "type": 1,
                };
                that.cart_info.push(json_meal)
              }
            })
            .catch(function (error) {
              console.log(error)
            })
        }
        else {
          this.err_message = '请登录';
          this.err_message_info = '你还未登录，请登陆后使用该功能';
          // this.$router.push({path: "/login"});
        }

      },
      // 结算函数
      addOrder: function () {
        this.order_list = [];
        if (this.unitId == 0) {
          this.err_message='请选择入住人';
          this.err_message_info = '您还未选择入住人，请选择入住人后提交订单';
        } else {
          for (let good of this.cart_info) {
            if (this.checkedBoxList.indexOf(good.id) >= 0) { // 判断商品是否被选中
              this.order_list.push(good)
            }
          }
          if (this.order_list.length <= 0){ // 判断商品有没有被选中
            this.err_message = '请选择商品';
            this.err_message_info = '您还未选择商品，请选择商品后提交订单';
          }
          else {
            $('#PayModal').modal('show');  // 显示结算模态框，模态框上两个按钮会触发不同的函数
          }
        }
      },
      // 生成订单函数 已结算
      pay:function () {
        $('#PayModal').modal('hide');
        // 获得购物车中选中商品数据
        let data = {
          "user_id": sessionStorage.getItem('u_id'),
          "price": this.sum,
          "check_info_id": this.unitId,
          "good_list": this.order_list,
          "status": 2,
        };
        let that = this;
        axios.post(sysConf.djangoUrl+'/order/addorder/', data, {
          headers: {
            "token": sessionStorage.getItem('token')
          }
        }).then(function (response) {
          if (response.data.statuscode == '202'){
            that.err_message = '下单成功';
            that.err_message_info = '订单'+response.data.orderid+'生成成功，请在个人中心查看订单状态';
            that.getData();
            that.checkedBoxList = []
          }
          else if(response.data.statuscode == '407'){
            that.err_message = '下单失败';
            that.err_message_info = '订单中包含无效商品,请查看商品剩余数量';
          }
          else {
            that.err_message = '生成订单失败';
            that.err_message_info = '由于某些未知的原因订单生成失败，作为开发人员都没遇到过这种情况，你真的点背';
          }
        })
      },
      // 生成订单函数 未结算
      noPay:function () {
        $('#PayModal').modal('hide');
        let data = {
          "user_id": sessionStorage.getItem('u_id'),
          "price": this.sum,
          "check_info_id": this.unitId,
          "good_list": this.order_list,
          "status": 1,
        };
        let that = this;
        axios.post(sysConf.djangoUrl+'/order/addorder/', data, {
          headers: {
            "token": sessionStorage.getItem('token')
          }
        }).then(function (response) {
          if (response.data.statuscode == '202'){
            that.err_message = '订单'+response.data.orderid+'下单成功';
            that.err_message_info = '订单生成成功，请在个人中心查看订单状态';
            that.getData();
            that.checkedBoxList = []
          }else {
            that.err_message = '生成订单失败';
            that.err_message_info = '由于某些未知的原因订单生成失败，作为开发人员都没遇到过这种情况，你真的点背';
          }
        })
      }
    },
    watch: {
      "checkedBoxList": function () {
        // 每当checkedBoxList发生改变时，更新总价
        this.sumPrice();
        // 如果checkedBoxList长度不等于购物车列表长度，全选状态为false
        if (this.checkedBoxList.length != this.cart_info.length) {
          this.checked = false
        }
        else {
          this.checked = true
        }
      },
      deep: true,
    },
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .cart-container {
    font-size: 16px;
    width: 1100px;
    min-height: 550px;
    margin: auto;
    margin-top: 20px;
    margin-bottom: 100px;
  }

  .cart-con-header {
    width: 100%;
    height: 50px;
    line-height: 50px;
    display: flex;
  }

  .cart-con-header div, .good-item div {
    padding-left: 10px;
    flex: 1;
    margin: auto;
  }

  .cart-con-header div:nth-child(6), .good-item div:nth-child(6) {
    flex: 1.5;
  }

  .cart-con-header div:nth-child(1), .good-item div:nth-child(1),
  .cart-con-header div:nth-child(2), .good-item div:nth-child(2),
  .cart-con-header div:nth-child(3), .good-item div:nth-child(3) {
    flex: 2.6;
  }

  .cart-good-item input {
    margin: auto 0;
  }

  .cart-good-item {
    height: 100px;
    box-sizing: border-box;
    border: #ebebeb solid 1px;
    line-height: 100px;
    font-size: 15px;
  }

  .cart-good-item img {
    width: 130px;
    height: 80px;
    border-radius: 5px;
  }

  .cart-goodsimg div {
    height: 70px;
    float: left;
    margin: auto 0;
  }

  .cart-btn-operator input {
    height: 20px;
    border: solid 1px grey;
    outline: none;
    box-sizing: border-box;
    width: 20px;
    text-align: center;
    line-height: 20px;
  }
  input.bigoperator{
    width: 28px;
  }

  .cart-btn-operator input[type="button"] {
    width: 20px;
  }

  .cart-opt input {
    height: 20px;
    width: 80px;
  }

  .cart-con-count {
    position: relative;
    background: #e7e7e7;
    height: 50px;
  }

  .cart-btn-operator input {
    background: white;
    border: gainsboro solid 1px;
  }

  ul li {
    list-style: none;
  }

  .selectBox {
    width: 120px;
    margin-top: 7px;
    padding: 6px;
    border: darkgray 1px solid;
    background: white;
    font-size: 16px;
  }

  input[type='checkbox'] {
    width: 18px;
    height: 18px;
  }

  .cart-good-item input[type='checkbox'] {
    margin-left: 15px;
  }

  .btn-lg {
    width: 120px;
    height: 45px;

  }

  .selectBox_list {
    max-height: 100px;
    width: 80px;
    display: block;
  }
  .buy{
    line-height: 50px;
  }
  .buy div{
    position:absolute;
    right: 5px;
  }

</style>
