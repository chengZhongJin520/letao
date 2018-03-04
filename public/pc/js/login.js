/**
 * Created by Lenovo on 2018/3/2.
 */


$(function () {

  //校验表单
  $('#form').bootstrapValidator({


    //3. 指定校验字段
    fields: {
      //校验用户名，对应name表单的name属性
      username: {
        validators: {
          //不能为空
          notEmpty: {
            message: '用户名不能为空'
          },
          //长度校验
          stringLength: {
            min: 2,
            max: 6,
            message: '用户名长度必须在2到6之间'
          },
          callback:{
            message:'用户名错误'
          }
        }
      },



      //校验密码，对应name表单的name属性
      password: {
        validators: {
          //不能为空
          notEmpty: {
            message: '密码不能为空'
          },
          //长度校验
          stringLength: {
            min: 6,
            max: 10,
            message: '用户名长度必须在6到10之间'
          },
          callback:{
            message:'密码错误'
          }
        }
      },
    },


    //配置小图标, 成功 失败  校验中
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
  })

  //给登录一个事件，成功时阻止默认提交，使用ajax
  $('#form').on('success.form.bv',function(e){
    e.preventDefault();

    //发送ajax
    $.ajax({
      url:'/employee/employeeLogin',
      type:'post',
      data: $("form").serialize(),
      dataType:'json',
      success:function(info){
        console.log(info);
        if(info.error===1000){
           $("#form").data('bootstrapValidator').updateStatus("username", "INVALID", "callback");
        }
        if(info.error===1001){
          $("#form").data('bootstrapValidator').updateStatus("password", "INVALID", "callback");
        }

        if(info.success) {
          $("form").data("bootstrapValidator").resetForm(true);
          location.href = "index.html";
        }
      }

    })

  })


  //重置表单
  $("[type='reset]").on('click',function(){
    $("form").data("bootstrapValidator").resetForm(true);
  })
})