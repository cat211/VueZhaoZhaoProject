<template>
  <!--内容-->
  <div class="row my-index-center">
    <!--内容左空白-->
    <div class="col-md-2"></div>
    <!--内容左空白end-->
    <!--中间内容-->

    <div class="col-md-8">
      <!--筛选-->
      <div class="row">
        <div class="col-lg-12">
          <div class="panel panel-success">
            <div class="panel-heading">
              <div class="row">
                <div class="col-lg-4">
                  <input class="city inputkey form-control" @click="toAddress" v-model="city" placeholder="请选择地区">
                  <v-distpicker type="mobile" @selected='selected' v-show="addInp">
                  </v-distpicker>
                </div>
                <div class="col-md-3"></div>
                <div class="col-md-3">
                  <input type="text" class="form-control" placeholder="请输入关键字" v-model="search_data">

                </div>
                <div class="col-lg-2">
                  <button type="button" class="btn btn-lg btn-success" @click="Search()">
                    <span class="glyphicon glyphicon-search"></span>搜索
                  </button>
                </div>
              </div>
            </div>
            <ul class="list-group">
              <li class="list-group-item">
                <div class="row">
                  <div class="col-md-1"><span class="glyphicon glyphicon-yen"></span><a href="javascript:void 0">价位</a></div>
                  <div class="col-md-1"><a href="javascript:void 0" data-min=0 data-max=50000 @click="getPrice($event)">不限</a>
                  </div>
                  <div class="col-md-2"><a href="javascript:void 0" data-min=0 data-max=1000 @click="getPrice($event)">1千元以下</a>
                  </div>
                  <div class="col-md-2"><a href="javascript:void 0" data-min=1000 data-max=2000 @click="getPrice($event)">1-2千元</a></div>
                  <div class="col-md-2"><a href="javascript:void 0" data-min=2000 data-max=3000 @click="getPrice($event)">2-3千元</a></div>
                  <div class="col-md-2"><a href="javascript:void 0" data-min=3000 data-max=4000 @click="getPrice($event)">3-4千元</a></div>
                  <div class="col-md-2"><a href="javascript:void 0" data-min=5000 data-max=50000 @click="getPrice($event)">5千元以上</a></div>
                </div>
              </li>
              <li class="list-group-item">
                <div class="row">
                  <div class="col-md-1"><span class="glyphicon glyphicon-star"></span><a href="javascript:void 0" data-min=0 data-max=50000>评分</a></div>
                  <div class="col-md-1"><a href="javascript:void 0" data-min=0 data-max=5
                                           @click="getScore($event)">不限</a></div>
                  <div class="col-md-2"><a href="javascript:void 0" data-min=4 data-max=5
                                           @click="getScore($event)">4分以上</a></div>
                  <div class="col-md-2"><a href="javascript:void 0" data-min=3 data-max=4
                                           @click="getScore($event)">3-4分</a></div>
                  <div class="col-md-2"><a href="javascript:void 0" data-min=2 data-max=3
                                           @click="getScore($event)">2-3分</a></div>
                  <div class="col-md-2"><a href="javascript:void 0" data-min=1 data-max=2
                                           @click="getScore($event)">1-2分</a></div>
                  <div class="col-md-2"><a href="javascript:void 0" data-min=0 data-max=1
                                           @click="getScore($event)">1分以下</a></div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!--筛选end-->
      <!--公寓展示-->
      <div class="row">
        <div class="col-md-12">
          <div class="panel panel-success">
            <div class="panel-heading">
              <div class="row">
                <div class="col-md-4">
                  <div class="row">
                    <div class="col-md-4"><a href="#" >默认排序</a></div>
                    <div class="col-md-4"><a href="#" @click.prevent="PriceSort(0)">价格排序</a></div>
                    <div class="col-md-4"><a href="#" @click.prevent="MarkSort(1)">评分排序</a></div>
                  </div>
                </div>
                <div class="col-md-8"></div>
              </div>
            </div>
            <div class="panel-body bh-info" v-for="b in result_list" >
              <div class="bh-border-bottom" :id="b.id">
                <div class="row">
                  <div class="col-md-3 bhimg">
                    <img src="../assets/images/room_pic.jpg" class="bigimg" alt="..." @click="getBhid()">
                  </div>
                  <div class="col-md-5">
                    <h4 @click="saveBhId(b.id)">
                      <span class="glyphicon glyphicon-home"> </span>
                      <span v-text="b.name">苏州小太阳养老公寓老年招待所等公寓</span>
                    </h4>
                    <p v-text="b.address">地址:江苏省苏州市工业园区创意产业园产业园院院</p>
                    <p >人员规模:<span v-text="b.staff">120人</span></p>
                    <p v-text="b.property">机构类型:民营机构</p>
                  </div>
                  <div class="col-md-2 bh-border-left">
                    <h4 class="bh-score">评分:<span class="text-orange" v-text="b.score"></span>分</h4>
                    <h4>起价:<span class="bh-price" v-text="b.min_price"></span>元</h4>
                  </div>
                  <div class="col-md-2 bh-border-left">
                    <h3>
                      <button class="btn btn-warning btn-lg showinfo " @click="saveBhId(b.id,b.name)">查看详情</button>
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--公寓展示end-->
      <!--页码-->
      <page-list :page_size="page_size" @indexclick="getIndex" @lastindexclick="lastPage" @nextindexclick="nextPage"></page-list>

      <!--页码end-->
    </div>
    <!--中间内容end-->

  </div>


</template>

<script>
  import axios from 'axios'
  export default {
    name: 'Apart',
    data() {
      return {
        bh_info: [],
        min_price: 0,
        max_price: 50000,
        city_address: '',
        min_score: 0,
        max_score: 5,
        city: '请选择地区',
        addInp: false,
        mask: false,
        search_data: '',
        search_city:'',
        sort_type_one:0,
        sort_type_two:0,
        page_index : 1,
        page_size : 0,
        result_list:[],
        new_result_list:[],
      }
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
        this.search_city=data.city.value
      },
      //根据地址+关键字搜索
      Search: function () {
        var vm = this;
        axios.get('http://127.0.0.1:8000/beadhouse/gethouseby/' + vm.search_city + '/' + vm.search_data + '/'+ vm.sort_type_one+'/'+ vm.sort_type_two+'/')
          .then(function (response) {
            vm.bh_info = response.data;
            vm.new_result_list = vm.bh_info;
            vm.showContent();
            vm.search_city='';
            vm.search_data='';
            vm.city='';
          })
          .catch(function (error) {
            console.log(error)
          });

      },
      // 筛选价格
      getPrice:function(event){
        var childrens = event.target.parentElement.parentElement.children;
        for (let c of childrens) {
          c.firstElementChild.style.background = 'white';
          c.firstElementChild.style.color = '#269abc';
        }
        event.target.style.background = '#efac50';
        event.target.style.color = 'white';
        this.min_price = event.target.dataset.min;
        this.max_price = event.target.dataset.max;
        this.page_index = 1;
        this.changeNewResultList();
      },
      //评分筛选
      getScore: function (event) {
        var childrens = event.target.parentElement.parentElement.children;
        for (let c of childrens) {
          c.firstElementChild.style.background = 'white';
          c.firstElementChild.style.color = '#269abc';
        }
        event.target.style.background = '#efac50';
        event.target.style.color = 'white';
        this.min_score = event.target.dataset.min;
        this.max_score = event.target.dataset.max;
        this.page_index = 1;
        this.changeNewResultList();
      },
      changeNewResultList:function(event){
        this.new_result_list=[];
        for(let beadhouse of this.bh_info){
          if (beadhouse.score>=this.min_score && beadhouse.score<this.max_score && beadhouse.min_price>=this.min_price && beadhouse.min_price<this.max_price){
            this.new_result_list.push(beadhouse)
          }
        }
        this.showContent();
      },

      //跳转详情页
      saveBhId:function (id,name) {
        sessionStorage.setItem('bhid',id);
        sessionStorage.setItem('bhname',name);
        this.$router.push({path: "/house"});
      },
      // 价格排序
      PriceSort:function(type){
        this.search_city = '';
        this.search_data = '';
        this.page_index = 1;
        this.sort_type_one = type;
        if (this.sort_type_two === 0){
          this.sort_type_two = 1;
        } else
          this.sort_type_two = 0;
        this.getData();
      },
      // 评分排序
      MarkSort:function(type){
        this.search_city = '';
        this.search_data = '';
        this.page_index = 1;
        this.sort_type_one = type;
        if (this.sort_type_two === 0){
          this.sort_type_two = 1;
        } else
          this.sort_type_two = 0;
        this.getData();
      },
      showContent:function () {
        if (this.new_result_list.length<1){
          this.page_size = 0;
        }
        let start = (this.page_index-1) * 10;
        let end = this.new_result_list.length-1<=this.page_index*10-1?this.new_result_list.length-1:this.page_index*10-1;
        this.result_list = [];
        if (this.new_result_list.length>0){
          for (let i = start;i<=end;i++){
            this.result_list.push(this.new_result_list[i]);
          }
          if(this.new_result_list.length/10 == 0){
            this.page_size = this.new_result_list.length/10;
          } else{
            this.page_size = Math.ceil(this.new_result_list.length/10);
          }
        }
      },
      getIndex: function (i) {
        this.page_index = i;
        this.showContent();
      },
      lastPage: function () {
        if (this.page_index > 1) {
          this.page_index -= 1;
          this.showContent();
        }
      },
      nextPage: function () {
        if (this.page_size > this.page_index) {
          this.page_index += 1;
          this.showContent();
        }
      },
      getData:function () {
        let vm = this;
        axios.get('http://127.0.0.1:8000/beadhouse/gethouseby/'+vm.search_city+'/'+vm.search_data+'/'+vm.sort_type_one+'/'+vm.sort_type_two+'/')
          .then(function (response) {
            vm.bh_info = response.data;
            vm.new_result_list = vm.bh_info;
            vm.showContent();
            if(vm.new_result_list.length/10 == 0){
              vm.page_size = vm.new_result_list.length/10;
            } else{
              vm.page_size = Math.ceil(vm.new_result_list.length/10);
            }
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    },

    mounted() {
      var vm = this;
      var already_searched=sessionStorage.getItem('already_searched');
      sessionStorage.setItem('already_searched','');
      if(already_searched){
        vm.search_data=already_searched;
      }else {
        vm.search_data=''
      }
      this.getData()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .bhimg img {
    width: 200px;
    height: 135px;
    border-radius: 5px;
  }

  .bh-price, .text-orange {
    color: #ffa500;
    font-size: 30px;
    font-weight: bold;
  }

  .bh-border-left {
    height: 135px;
    border-left: lightgrey solid 1px;
    padding: 20px;
  }

  .bh-border-bottom {
    border-bottom: #deefd8 solid 2px;
    padding: 25px;
  }

  .bh-info {
    padding: 0;
  }

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

  .my-index-center {
    padding-top: 20px;
    min-height: 600px;
  }
  .my-active a {
    color: white;
  }

  .my-nav-size ul li {
    font-size: 14px;
  }

  .my-img-btn p {
    position: absolute;
  }
  .col-md-2 a, .col-md-1 a {
    padding: 5px;
    text-decoration: none;
    border-radius: 2px;
    color: #269abc;
  }
  .showinfo,.showinfo:visited,.showinfo:link{
    color: white;
  }
  .glyphicon-home,.glyphicon-star,.glyphicon-yen{
    color: orange;
  }
  .btn-lg{
    width: 100px;
    height:35px;
    padding: 0px;
  }
  .bigimg:hover{
    transform: scale(1.3);
  }
</style>
