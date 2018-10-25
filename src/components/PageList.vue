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
        page_control:[],
        pageindex : 1,
        is_show : true
      }
    },
    mounted () {

    },
    watch:{
      "page_size": function(newpage,oldpage) {
        this.pageindex = 1;
        this.changeIndex(this.pageindex)
        if(this.page_size>1){
          this.is_show = true;
        }else
          this.is_show = false;
      },
    deep:true,
  },
    methods:{
      changeIndex:function(i){
        this.pageindex = i;
        if(this.page_size<=5){
          this.page_control = [];
          for(let j = 1;j<=this.page_size;j++){
            this.page_control.push(j)
          }
        }
        else if(i>=1 && i<4){
          if(this.page_size<=5){
            this.page_control = [];
            for(let j = 1;j<=this.page_size;j++){
              this.page_control.push(j)
            }
          }else {
            this.page_control = [];
            for(let j = 1;j<=5;j++){
              this.page_control.push(j)
            }
          }
        }
        else if(i>=4 && i<=this.page_size-2) {
          this.page_control = [];
          for(let j = i-2;j<=i+2;j++){
            this.page_control.push(j)
          }
        }else if(i+2>this.page_size){
          this.page_control = [];
          for(let j = this.page_size-4;j<=this.page_size;j++){
            this.page_control.push(j)
          }
        }
        else {
          this.page_control = [];
          for(let j = i-2;j<=this.page_size;j++){
            this.page_control.push(j)
          }
        }
      },
      getIndex: function (i) {
        this.changeIndex(i);
        this.$emit('indexclick', i)
      },
      lastPage: function () {
        if (this.pageindex>1) {
          this.pageindex--;
          this.changeIndex(this.pageindex);
        }
        this.$emit('lastindexclick')
      },
      nextPage: function () {
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
