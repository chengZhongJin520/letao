/**
 * Created by Lenovo on 2018/3/5.
 */


;(function(){


  $(function(){
    var page=1;
    var pageSize=5;
    var round=function() {

      $.ajax({
        url: '/category/querySecondCategoryPaging',
        type: 'get',
        data: {
          page: page,
          pageSize: pageSize
        },
        success: function (info) {
          //console.log(info);
          page = info.page;
          pageSize = info.size;

          $('tbody').html(template('tmp', info));


          //设置分页
          $(".setPage").bootstrapPaginator({
            bootstrapMajorVersion: 3,//默认是2，如果是bootstrap3版本，这个参数必填
            currentPage: page,//当前页
            totalPages: Math.ceil(info.total / info.size),//总页数
            //size:"small",//设置控件的大小，mini, small, normal,large
            onPageClicked: function (a, b, c, p) {
              page=p;
              round();
            }

          })
        }
      })
    }

    round();

    //添加分类点击事件
    $('.btn_add').on('click',function () {
        $("#addModal").modal('show');

      $.ajax({
        type:'get',
        url:'/category/queryTopCategoryPaging',
        data:{page:1,pageSize:100},
        success:function(info){
          $('#first').html(template('tmp-first',info))
        }
      })
    })

    //一级菜单点击事件
    $('.dropdown-menu').on('click','a',function(){
      $('.dropdown .txt').text($(this).text());
      $('.dropdown .categoryId').val($(this).parent().data('id'));
      //让categoryId的校验通过
      $('form').data("bootstrapValidator").updateStatus("categoryId", "VALID");
    })



    //添加图片发送ajax验证
    $('#fileupload').fileupload({
      dataType:"json",
      //e：事件对象
      //data：图片上传后的对象，通过e.result.picAddr可以获取上传后的图片地址
      done:function (e, data) {
        var pic=data.result.picAddr
        $('.imgbox img').attr('src',pic);
        $('.brandLogo').val(pic);
        $('form').data('bootstrapValidator').updateStatus('brandLogo','VALID')
      }
    });


    //表单验证
    $('form').bootstrapValidator({


      //2. 指定校验时的图标显示，默认是bootstrap风格
      feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
      },

      //3. 指定校验字段
      fields: {
        //校验用户名，对应brandName表单的brandName属性
        categoryId: {
          validators: {
            //不能为空
            notEmpty: {
              message: '一级级类名不能为空'
            },


          }
        },

        brandName: {
          validators: {
            //不能为空
            notEmpty: {
              message: '二级类名不能为空'
            },


          }
        },

        brandLogo: {
          validators: {
            //不能为空
            notEmpty: {
              message: '图片不能为空'
            },


          }
        },
      },


      //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
      excluded: [],

    });

    //添加

    $('form').on('success.form.bv',function(e){
      e.preventDefault();
      var info=$('form').serialize();
      console.log(info);
      $.ajax({
        type:'post',
        url:'/category/addSecondCategory',
        data:info,
        success:function(data){
          console.log(data);
          if(data.success){
            $("#addModal").modal('hide');
            page=1;
            round();
          }
        }

      })
    })


  })
})();
