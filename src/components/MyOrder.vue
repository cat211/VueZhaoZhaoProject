<template>
  <div class="col-md-9">
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
                <div style="width: 100%;height: 40px;margin-bottom: 10px;display: flex">
                  <div style="width: 50%;text-align: center;line-height: 40px">
                    <span style="font-size: 20px"></span>
                  </div>
                  <div style="width: 50%;text-align: center;line-height: 40px">
                    <span style="font-size: 20px"></span><span style="font-size: 20px"></span>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-body" style="width: 100%;height: 60px">
              <div class="text-right">
                <span style="font-size: 28px" class="text-center">总计:  </span><span style="font-size: 28px" v-text="price"></span>元
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
    <div class="row">
      <div class="col-md-12">
        <div class="my-nav-size">
          <h3 class="panel-title">
            <ul class="nav nav-tabs">
              <li role="presentation" class="my-active maall" id="my-oall"><a href="#"
                                                                              @click="allstate=true,nopaystate=false,ingstate=false,successstate=false,badstate=false">全部订单</a>
              </li>
              <li role="presentation" class="my-active ma" id="my-nopay"><a href="#"
                                                                            @click="allstate=false,nopaystate=true,ingstate=false,successstate=false,badstate=false">未付款订单</a>
              </li>
              <li role="presentation" class="my-active ma" id="my-ing"><a href="#"
                                                                          @click="allstate=false,nopaystate=false,ingstate=true,successstate=false,badstate=false">预定中订单</a>
              </li>
              <li role="presentation" class="my-active ma" id="my-success"><a href="#"
                                                                              @click="allstate=false,nopaystate=false,ingstate=false,successstate=true,badstate=false">已完成订单</a>
              </li>
              <li role="presentation" class="my-active ma" id="my-bad"><a href="#"
                                                                          @click="allstate=false,nopaystate=false,ingstate=false,successstate=false,badstate=true">失效订单</a>
              </li>
            </ul>
          </h3>
        </div>
        <div class="panel panel-primary">

          <div class="panel-heading order-box-top ">
            <div class="row ">
              <div class="col-md-1">编号</div>
              <div class="col-md-2">商品图片</div>
              <div class="col-md-3">商品</div>
              <div class="col-md-1">总价</div>
              <div class="col-md-2">日期</div>
              <div class="col-md-2">状态</div>
              <div class="col-md-1">操作</div>
            </div>
          </div>
          <div class="panel-body" v-if="!show">
            您还没有订单哦！
          </div>
          <!--未付款订单-->
          <div class="my-nopay-order or-model" v-if="show">
            <div class="panel-body my-every row my-order-room " v-if="(nopaystate||allstate)&&nopay.status_id==1"
                 v-for="nopay in user_order">
              <div class="col-md-1" v-text="nopay.id"></div>
              <div class="col-md-2 order-img"><img src="../assets/images/det2.jpg" alt=""></div>
              <div class="col-md-3 word-color">
                <span v-text="nopay.beadhouse_name"></span>
                <span v-text="nopay.name"></span>
                <span v-text="nopay.setname"></span>
              </div>
              <div class="col-md-1" v-text="nopay.price">￥2500</div>
              <div class="col-md-2" v-text="nopay.build_time"></div>
              <div class="col-md-2">未付款 <a href="#" @click="goToPay(nopay.id,nopay.price)"><strong>去付款</strong></a>
              </div>
              <div class="col-md-1 text-danger btn" @click="delOrder(nopay.id)">删除</div>
            </div>
          </div>
          <!--预定中订单-->
          <div class="my-ing-order or-model" v-if="show">
            <div class="panel-body my-every row " v-if="(ingstate||allstate)&&ing.status_id==4"
                 v-for="ing in user_order">
              <div class="col-md-1" v-text="ing.id"></div>
              <div class="col-md-2 order-img"><img src="../assets/images/det2.jpg" alt=""></div>
              <div class="col-md-3 word-color">
                <span v-text="ing.beadhouse_name"> </span>
                <span v-text="ing.name"> </span>
                <span v-text="ing.setname"> </span></div>
              <div class="col-md-1" v-text="ing.price">￥2500</div>
              <div class="col-md-2" v-text="ing.build_time"></div>
              <div class="col-md-2">预定中</div>
              <div class="col-md-1 text-danger btn" @click="delOrder(ing.id)">删除</div>
            </div>
          </div>
          <!--已付款订单-->
          <div class="my-success-order or-model" v-if="show">
            <div class="panel-body my-every row my-order-set " v-if="(successstate||allstate)&&success.status_id==2"
                 v-for="success in user_order">
              <div class="col-md-1" v-text="success.id">1232341466</div>
              <div class="col-md-2 order-img"><img src="../assets/images/det2.jpg" alt=""></div>
              <div class="col-md-3 word-color">
                <span v-text="success.beadhouse_name"> </span>
                <span v-text="success.name"></span>
                <span v-text="success.setname"></span></div>
              <div class="col-md-1" v-text="success.price">￥2500</div>
              <div class="col-md-2" v-text="success.build_time"></div>
              <div class="col-md-2">已付款</div>
              <div class="col-md-1 text-danger btn" @click="delOrder(success.id)">删除</div>
            </div>
          </div>
          <!--已失效订单-->
          <div class="my-bad-order or-model" v-if="show">
            <div class="panel-body my-every row my-order-set " v-if="(badstate||allstate)&&bad.status_id==3"
                 v-for="bad in user_order">
              <div class="col-md-1" v-text="bad.id">12364565126</div>
              <div class="col-md-2 order-img"><img src="../assets/images/det2.jpg" alt=""></div>
              <div class="col-md-3 word-color">
                <span v-text="bad.beadhouse_name"></span>
                <span v-text="bad.name"></span>
                <span v-text="bad.setname"> </span></div>
              <div class="col-md-1" v-text="bad.price">￥2500</div>
              <div class="col-md-2" v-text="bad.build_time"></div>
              <div class="col-md-2">已失效</div>
              <div class="col-md-1 text-danger btn" @click="delOrder(bad.id)">删除</div>
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
        //xxxstate用于标签页切换
        allstate: true,
        nopaystate: false,
        ingstate: false,
        successstate: false,
        badstate: false,
        user_order: [],
        //用于提示信息的显示
        show:true,
        err_message:'',
        err_message_info:'',
        price:0,
      }
    },
    methods: {
      //获取订单信息
      getOrder: function () {
        var vm = this;
        var token = sessionStorage.getItem('token');
        var user_id = sessionStorage.getItem('u_id');
        if (token) {
          var vm = this;
          var data = {
            "user_id": user_id
          }
          axios.post('http://127.0.0.1:8000/order/getorder/', data, {
            headers: {
              "token": token
            }
          })
            .then(function (response) {
              //拿到所有订单
              vm.user_order = response.data;
              if(vm.user_order.length<1){
                vm.show=false
              }
              console.log(vm.user_order)

              for (let o of vm.user_order) {
                var k=0;
                for (let l of  o.order_list) {
                  if (l.name) {
                    o.name = l.name;
                    o.beadhouse_name = l.beadhouse_name;
                    o.roomprice = l.price
                  }
                  if (l.setname) {
                   if(k==0){
                     o.setname =l.setname;
                     o.beadhouse_name = l.beadhouse_name;
                     o.setprice = l.price;
                     k++;
                   }else{
                     o.setname =o.setname+l.setname;
                     o.beadhouse_name = l.beadhouse_name;
                     o.setprice = l.price;
                   }
                  }
                }

              }

            })
            .catch(function (error) {
              console.log(error)
            })


        }
        else {
          this.err_message = '你还未登录';
          this.err_message_info = '请登录后使用该功能';
        }

      },
      //删除订单
      delOrder: function (id) {
        sessionStorage.setItem('orderid',id);
        var token = sessionStorage.getItem('token');
        var user_id = sessionStorage.getItem('u_id');
        var data = {
          "user_id": user_id,
          "order_id": id
        };
        var vm = this;
        axios.post('http://127.0.0.1:8000/order/deleteorder/', data, {
          headers: {
            "token": token
          }
        })
          .then(function (response) {
            if (response.data.statuscode) {
              if (response.data.statuscode == '202') {
                vm.err_message = sessionStorage.getItem('orderid')+'号订单删除成功';
                vm.err_message_info = '您已成功将订单删除';
                vm.getOrder();
              }
            }
            console.log(response)
          })
          .catch(function (error) {
            console.log(error)
          })

      },
      //更改支付状态(未支付订单->完成)
      goToPay: function (orderid, price) {
        sessionStorage.setItem('orderid',orderid);
        this.price = price;
        $('#PayModal').modal('show');
      },
      pay:function () {
        $('#PayModal').modal('hide');
        var data = {
          "order_id": sessionStorage.getItem('orderid'),
          "user_id": sessionStorage.getItem('u_id')
        };
        var vm = this;
        axios.post('http://127.0.0.1:8000/order/changeorderstatus/', data, {
          headers: {
            "token": sessionStorage.getItem('token')
          }
        })
          .then(function (response) {
            if (response.data.statuscode == '202') {
              vm.err_message=sessionStorage.getItem('orderid')+'号订单支付成功';
              vm.err_message_info='您已成功付款'+vm.price+'元';
            }
            else {
              vm.err_message='支付失败';
              vm.err_message_info='如果您遇到支付问题请联系客服解决';
            }
            vm.getOrder();
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      noPay:function () {
        $('#PayModal').modal('hide');
        this.err_message=sessionStorage.getItem('orderid')+'号订单取消支付';
        this.err_message_info='您已取消支付，如果对本网站有什么意见请联系客服';
      }
    },
    mounted() {
      this.getOrder()

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

  .panel-primary > .panel-heading {
    background: #40a170;
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

  .my-img-btn p {
    position: absolute;
  }
  .word-color span:nth-child(1),strong{
    color: orange;
  }

</style>
