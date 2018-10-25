<template>

  <div class="row my-index-center">
    <!--内容左空白-->
    <div class="col-md-2"></div>
    <!--内容左空白end-->
    <!--中间内容-->

    <div class="col-md-8">
      <div class="row panel panel-info">
        <div class="col-md-5 panel-heading">
          <h4>热门文章</h4>
        </div>
        <div class="col-md-7 panel-heading">
          <h4>
           最新文章</h4>
        </div>

        <div class="row panel-body">
          <div class="col-md-5">
            <div class=" row" v-for="article in result_list_three" >
              <div class="hot-pic col-md-12 ">
                <img src="../assets/images/room_pic.jpg" alt="">
                <div class="hot-title">
                  <h4 v-text="article.title" v-on:click="toarticledetails(article.id)"></h4>
                  <p v-text="article.beadhouse__name" v-on:click="toapaertinfo(article.beadhouse_id)"></p>
                  <p v-text="article.date"></p>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-7">
            <div class="article-body row" v-for="article in result_list">
              <div class="article-info col-md-8 col-sm-8 col-xs-8" :key="result_list.id">
                <div class="article-title" id="articlelist.id">
                  <a v-text="article.title" v-on:click="toarticledetails(article.id)"></a>
                </div>
                <div class="article-author" :id="result_list.beadhouse_id">
                  <a v-text="article.beadhouse__name" v-on:click="toapaertinfo(article.beadhouse_id)"></a>
                </div>
                <div><span></span><span v-text="article.date"></span></div>
              </div>
              <div class="article-pic col-md-4 col-sm-4 col-xs-4 "><img src="../assets/images/article_picture_01.jpg"
                                                                        alt=""></div>
            </div>
          </div>
        </div>

        <page-list :page_size="page_size" @indexclick="getIndex" @lastindexclick="lastPage"
                   @nextindexclick="nextPage"></page-list>
      </div>

    </div>
    <!--中间内容end-->

  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'Article',
    data() {
      return {
        articlelist: [],
        result_list: [],
        page_index: 1,
        page_size: 1,
        keyword: '',
        flag: true,
        result_list_three:[]
      }
    },
    mounted() {
      let that = this;
      axios.get("http://127.0.0.1:8000/article/getarticles/").then(function (response) {
        that.articlelist = response.data;
        console.log(that.articlelist)
        that.showContent();
        if (that.articlelist.length / 9 == 0) {
          that.page_size = that.articlelist.length / 9;
        } else {
          that.page_size = Math.ceil(that.articlelist.length / 9);
        }
      }).catch();
    },
    methods: {
      showContent: function () {
        let start = (this.page_index - 1) * 9;
        let end = this.articlelist.length <= this.page_index * 9 - 1 ? this.articlelist.length : this.page_index * 9 - 1;
        this.result_list = [];
        for (let i = start; i <= end; i++) {
          this.result_list.push(this.articlelist[i]);
        }
        this.result_list_three=this.result_list.splice(0,3)
      },
      getIndex: function (i) {
        this.page_index = i;
        this.showContent();
      },
      lastPage: function () {
        if (this.page_index > 1) {
          this.page_index -= 1;
          this.flag = true;
          this.showContent();
        }
      },
      nextPage: function () {
        if (this.page_size > this.page_index) {
          this.page_index += 1;
          this.flag = true;
          this.showContent();
        }
      },
      // getkeyWord:function (event) {
      //   this.flag=false
      //   this.keyword=event.target.innerText;
      // },
      toapaertinfo: function (id) {
        sessionStorage.setItem('bhid', id)
      },
      toarticledetails: function (id) {
        sessionStorage.setItem('artid', id)
        this.$router.push({path: "/articledetails"});
      }
    },
    computed: {}
  }
</script>
<style>
  .article-logo span {
    font-size: 22px;
  }

  .article-body {
    height: 130px;
    padding: 5px;
  }

  .article-info {
    height: 100%;
    background: #f0f0f0;
  }

  .article-pic {
    border-radius: 10px;
    height: 100%;
  }

  .article-title {
    margin-top: 4px;
    height: 40px;
    font-size: 18px;
    line-height: 40px;
  }

  .article-author {
    margin-top: 4px;
    height: 30px;
    font-size: 14px;
    line-height: 30px;
  }

  .article-author a {
    color: gray;
  }

  .article-pic {
    padding: 0;
  }
  .article-pic img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
  }
  .hot-pic img{
    width: 400px;
    height: 250px;
    object-fit: cover;
    margin-bottom: 11px;
  }
  .hot-title{
    position: absolute;
    padding-left: 25px;
    bottom:0px;
    width: 400px;
    background: rgba(255, 255, 255, 0.49);
  }
  .hot-title h4{
    color:black;
    text-shadow: black 1px 1px 1px;
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
</style>


