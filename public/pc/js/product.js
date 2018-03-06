/**
 * Created by Lenovo on 2018/3/5.
 */

$(function(){
  var $form=$("form");
  var page=1;
  var result=[];
  var pageSize=2;
  var render=function(){
    $.ajax({
      type:'get',
      url:'/product/queryProductDetailList',
      data:{page:page,pageSize:pageSize},
      success:function(info){
        //console.log(info);
        $('tbody').html(template('tmp',info));



        //分页
        $("#setPage").bootstrapPaginator({
          bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
          currentPage:page,//当前页
          totalPages:Math.ceil(info.total/pageSize),//总页数
          size:"small",//设置控件的大小，mini, small, normal,large
          itemTexts:function(type,page,content){
            //console.log(type, page, content);
            switch (type){
              case 'first': return '第一页';
              case 'prec': return '上一页';
              case 'next': return '下一页';
              case 'last': return '尾页';
              default:return "第"+page+'页';

              //case 'first': return '第一页';
            }

          },
          tooltipTitles:function(type,page,content){
            switch (type){
              case 'first': return '第一页';
              case 'prec': return '上一页';
              case 'next': return '下一页';
              case 'last': return '尾页';
              default:return "第"+page+'页';

              //case 'first': return '第一页';
            }
          },
          useBootstrapTooltip:true,
          onPageClicked:function(event, originalEvent, type,p){
          page=p;
            render();
          }
        });
      }
    })
  }
  render();

  //添加商品
$('.btn_add').on('click',function(){
  $('#addModal').modal('show');

  //请求二级分类数据
  $.ajax({
    url:'/category/querySecondCategoryPaging',
    type:'get',
    data:{page:1,pageSize:100},
    success:function(info){
      $('#second').html(template('tmp-second',info));
    }
  })


})



  //分类选择事件
  $('#second').on('click' ,'a' ,function(){

    $('.txt').text($(this).text());
    $('.brandId').val($(this).parent().data('id'));
    //bootstrapValidator  updateStatus VALID
    $form.data('bootstrapValidator').updateStatus('brandId','VALID');
  })

  //上传图片事件
  $('#fileupload').fileupload({
    dataType:'json',
    done:function(e,data){
      if(result.length>=3){
        return ;
      };
      var pic=data.result.picAddr;

      $('<img src="'+pic+'" width="100" height="100" alt="">').appendTo(".imgbox");

      result.push(data.result)
      if(result.length==3){
        $('form').data('bootstrapValidator').updateStatus('productLogo','VALID');
      }else{
        $('form').data('bootstrapValidator').updateStatus('productLogo','INVALID')

      }
    }
  })


  //表单校验
  $form.bootstrapValidator({

    //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
    excluded: [],

    //2. 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    //3. 指定校验字段
    fields: {
      //校验二级分类名，对应brandId表单的brandId属性
      brandId: {
        validators: {
          //不能为空
          notEmpty: {
            message: '二级分类名不能为空'
          },
        }
      },

      //商品
      proName: {
        validators: {
          //不能为空
          notEmpty: {
            message: '商品名称不能为空'
          },
        }
      },

      //商品的描述
      proDesc: {
        validators: {
          //不能为空
          notEmpty: {
            message: '商品描述不能为空'
          },
        }
      },

      //商品的库存
      num: {
        validators: {
          //不能为空
          notEmpty: {
            message: '商品的库存不能为空'
          },
          regexp:{
            regexp:/^[1-9]\d*$/,
            message:'请输入一个正确的库存'
          }
        }


      },
      //尺码
      size: {
        validators: {
          //不能为空
          notEmpty: {
            message: '尺码不能为空'
          },
          regexp:{
            message:'请输入正确格式的尺码，例（33-44）',
            regexp:/^[1-5][1-9]-[1-5][1-9]$/
          }
        }

      },

      //原价
      oldPrice: {
        validators: {
          //不能为空
          notEmpty: {
            message: '原价不能为空'
          },
          regexp:{
            message:'请输入正确的原价',
            regexp:/^[1-9]\d*$/
          }
        },

      },

      //现价
      Price: {
        validators: {
          //不能为空
          notEmpty: {
            message: '现价不能为空'
          },
          regexp:{
            message:'请输入正确的现价',
            regexp:/^[1-9]\d*$/
          }
        },

      },

      productLogo: {
        validators:{
          notEmpty:{
            message:"请上传3张图片"
          }
        }
      }

    }

  });

  //ajax

  $form.on('success.form.bv',function (e) {
    e.preventDefault();
    var data=$form.serialize();
    data += '&picName1="'+result[0].picName+'"&picAddr1="'+result[0].picAddr+'"';
    data += '&picName1="'+result[1].picName+'"&picAddr1="'+result[1].picAddr+'"';
    data += '&picName1="'+result[2].picName+'"&picAddr1="'+result[2].picAddr+'"';
    $.ajax({
      type:'post',
      url:'/product/addProduct',
      data:data,
      success:function (info) {
        if(info.success){
          page=1;
          render();
          $('#addModal').modal('hide');


          //重置
          $form.data('bootstrapValidator').resetForm(true);
          $('.txt').text('选择二级分类');
          result=[];
          $('.imgbox img').remove();
        }
      }
    })
  })
})
