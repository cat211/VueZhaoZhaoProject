<template>

  <div class="row my-index-center">
    <!--内容左空白-->
    <div class="col-md-2"></div>
    <!--内容左空白end-->
    <!--中间内容-->

    <div class="col-md-8">
      <div class="row panel panel-info">
        <div class="col-md-3 panel-heading">
          <h4>筛选本页公寓</h4>
        </div>
        <div class="col-md-9 panel-heading">
          <h4>
            <img class="icon" src="../assets/images/art_book_icon.png" alt="">最新文章</h4>
        </div>
        <div class="row panel-body">
          <div class="col-md-3 choice" >
            <div><a href="#" @click="flag=true">不限</a></div>
            <div v-for="a in result_list"><a href="#" @click="getkeyWord($event)"  v-text="a.beadhouse__name"></a></div>
          </div>
          <div class="col-md-9">
            <div class="article-body row" v-for="article in result_list" v-if="article.beadhouse__name==keyword||flag">
              <div class="article-info col-md-8 col-sm-8 col-xs-8" :key="result_list.id">
                <div class="article-title" id="articlelist.id">
                  <a v-text="article.title" v-on:click="toarticledetails(article.id)"></a>
                </div>
                <div class="article-author" :id="result_list.beadhouse_id">
                  <a  v-text="article.beadhouse__name" v-on:click="toapaertinfo(article.beadhouse_id)"></a>
                </div>
                <div class="article-time"><span></span><span v-text="article.date"></span></div>
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
        keyword:'',
        flag:true
      }
    },
    mounted() {
      let that = this;
      axios.get("http://127.0.0.1:8000/article/getarticles/").then(function (response) {
        that.articlelist = response.data;
        console.log(that.articlelist)
        that.showContent();
        if (that.articlelist.length / 10 == 0) {
          that.page_size = that.articlelist.length / 10;
        } else {
          that.page_size = Math.ceil(that.articlelist.length / 10);
        }
      }).catch();
    },
    methods: {
      showContent: function () {
        let start = (this.page_index - 1) * 10;
        let end = this.articlelist.length <= this.page_index * 10 - 1 ? this.articlelist.length : this.page_index * 10 - 1;
        this.result_list = [];
        for (let i = start; i <= end; i++) {
          this.result_list.push(this.articlelist[i]);
        }
      },
      getIndex: function (i) {
        this.page_index = i;
        this.showContent();
      },
      lastPage: function () {
        if (this.page_index > 1) {
          this.page_index -= 1;
          this.flag=true;
          this.showContent();
        }
      },
      nextPage: function () {
        if (this.page_size > this.page_index) {
          this.page_index += 1;
          this.flag=true;
          this.showContent();
        }
      },
      getkeyWord:function (event) {
        this.flag=false
        this.keyword=event.target.innerText;
      },
      toapaertinfo:function (id) {
        sessionStorage.setItem('bhid',id)
      },
      toarticledetails:function (id) {
        sessionStorage.setItem('artid',id)
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
    font-size: 22px;
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

  .article-time {
    margin-top: 4px;
    height: 30px;
    font-size: 14px;
    line-height: 30px;
    color: gray;
  }

  .article-info span {
    margin-left: 1px;

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
  .choice div {
    width: 95%;
    height: 45px;
    margin: 10px auto;
    padding: 5px;
    background: #d8ecf6;
    border-radius: 5px;
    text-align: center;
  }
  img.icon {
    width: 25px;
    height: 19px;
  }
</style>


