<template>
  <div class="row">
    <!-- 模态框（Modal） -->
    <div class="modal fade" id="errModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="border-radius: 10px;margin-top: 200px">
      <div class="modal-dialog" style="border-radius: 10px">
        <div class="modal-content" style="border-radius: 10px">
          <div class="modal-header" style="background:#40a170; border-top-left-radius: 10px ;border-top-right-radius: 10px ;height: 50px;line-height: 50px">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <div style="height: 30px;line-height:20px;margin-bottom: 30px"><span style="color: #ffffff;font-size: 18px">Message:</span></div>
          </div>
          <div class="modal-body text-left" style="height: 80px;line-height: 50px;font-size: 26px"><span style="color: #5f5f5f" v-text="myerr"></span></div>
          <div class="modal-body text-left" style="color: #a4a4a4"><span v-text="myerr_info"></span></div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-dismiss="modal">确定</button>
          </div>
        </div><!-- /.modal-content -->
      </div><!-- /.modal -->
    </div>
  </div>
</template>

<script>
export default {
    name: 'MessageModal',
    props :['err_message','err_message_info'],
    data () {
      return {
        myerr:'',
        myerr_info:'',
      }
    },
    mounted () {

    },
    watch:{ // 监听传进来的提示信息标题来不断的自动显示模态框
      "err_message": function() {
        this.myerr = this.err_message;
        this.myerr_info = this.err_message_info;
        $('#errModal').modal();
      },
    deep:true,
  },
    methods:{

    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
