<template>
  <div class="row">
    <div class="col-md-12 page-body text-center">
      <nav aria-label="Page navigation">
        <ul class="pagination pagination-lg">
          <li>
            <a href="javascript:void 0" aria-label="Previous" @click.prevent="lastPage">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li v-show="is_show" v-for="i in page_control"><a href="javascript:void 0" v-text="i" @click.prevent="getIndex(i)"></a></li>
          <li>
            <span v-show="etc_show">...</span>
          </li>
          <li>
            <a href="javascript:void 0" aria-label="Next" @click.prevent="nextPage">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
    name: 'PageList',
    props :['page_size'],
    data () {
      return {
        page_control:[], // 动态显示页码
        pageindex : 1,   // 当前页
        is_show : true,  // 是否显示页码 小于2页的时候不显示页码
        etc_show: false, // 是否显示 "..."
      }
    },
    mounted () {

    },
    watch:{
      "page_size": function(newpage,oldpage) { // 监听page_size参数，根据page_size的改变来更新页码长度
        this.pageindex = 1;
        this.changeIndex(this.pageindex);  // 默认页码为1，调用显示页码函数
        if(this.page_size>1){
          this.is_show = true;            // 如果页码数大于1 就显示页码
        }else
          this.is_show = false;
        if (this.pageindex<=this.page_size-3){   // 如果当前页小于等于页码数-3 就不显示"..." 意思就是快翻到最后一页了，没有更多页了
          this.etc_show = true;
        }else {
          this.etc_show = false;
        }
      },
    deep:true,
      "pageindex":function () {
        if (this.pageindex<=this.page_size-3){   // 监听当前页码
          this.etc_show = true;
        }else {
          this.etc_show = false;
        }
      }
  },
    methods:{
      // 显示页码函数，逻辑有点乱，我自己可能都忘了当时怎么写的了
      changeIndex:function(i){
        this.pageindex = i;
        if(this.page_size<=5){    // 页码数小于5只显示1到最后
          this.page_control = [];
          for(let j = 1;j<=this.page_size;j++){
            this.page_control.push(j)
          }
        }
        else if(i>=1 && i<4){    // 当前页处于1-3 的时候
          if(this.page_size<=5){  // 且页码数小于等于5 ，这个应该是防止显示的页码数超过其本来长度
            this.page_control = [];
            for(let j = 1;j<=this.page_size;j++){
              this.page_control.push(j)
            }
          }else {
            this.page_control = [];
            for(let j = 1;j<=5;j++){   // 显示页码1-5
              this.page_control.push(j)
            }
          }
        }
        else if(i>=4 && i<=this.page_size-2) {  // 如果当前页大于等于4 小于等于页码数-2 就显示i-2到i+2 的页码，为了控制一直只显示5个页码
          this.page_control = [];
          for(let j = i-2;j<=i+2;j++){
            this.page_control.push(j)
          }
        }else if(i+2>this.page_size){     // 如果当前页+2 大于总页码，控制显示的页码不越界
          this.page_control = [];
          for(let j = this.page_size-4;j<=this.page_size;j++){
            this.page_control.push(j)
          }
        }
        else {                            // 这种情况应该是马上翻到最后一页了
          this.page_control = [];
          for(let j = i-2;j<=this.page_size;j++){
            this.page_control.push(j)
          }
        }
      },
      getIndex: function (i) {
        this.changeIndex(i);          // 根据翻页或者切换页码 来更改父组件的数据
        this.$emit('indexclick', i)
      },
      lastPage: function () {         // 触发父组件的上一页函数
        if (this.pageindex>1) {
          this.pageindex--;
          this.changeIndex(this.pageindex);
        }
        this.$emit('lastindexclick')
      },
      nextPage: function () {         // 触发父组件的下一页函数
        this.pageindex++;
        this.changeIndex(this.pageindex);
        this.$emit('nextindexclick')
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
