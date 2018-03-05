/**
 * Created by Lenovo on 2018/3/4.
 */

;(function () {





    $(function () {
      round('/category/queryTopCategoryPaging');

      //模态框显示
      $('.btn_add').on("click", function () {

        $("#addModal").modal("show");

      });



      //校验表单
      $('form').bootstrapValidator({

        //配置小图标, 成功 失败  校验中
        feedbackIcons: {
          valid: 'glyphicon glyphicon-ok',
          invalid: 'glyphicon glyphicon-remove',
          validating: 'glyphicon glyphicon-refresh'
        },

        //3. 指定校验字段
        fields: {
          categoryName: {
            validators: {
              notEmpty: {
                message: '一级分类名不能为空'
              }

            }
          }
        }


    });


      $('form').on('success.form.bv',function(e){
        e.preventDefault();
        //e.preventDefault();
        //var info=$('form').serialize();
        //console.log(info);
        $.ajax({
          url:'/category/addTopCategory',
          type:'post',
          data:$('form').serialize(),
          success:function(info){
            if(info.success){
              $("#addModal").modal("hide");
              round();
            }
          }
        })

      })
})



})();
