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


  //分类选择事件
  $('#second').on('click' ,'a' ,function(){

    $('.txt').text($(this).text());
    $('.brandId').val($(this).parent().data('id'));
    //bootstrapValidator  updateStatus VALID
    $form.data(bootstrapValidator).updateStatus('brandId','VALID');
  })

  //上传图片事件
    $('#fileupload').fileupload({
      dataType:'json',
      done:function(e,data){
        console.log(result);
        if(data.result.length>=3){
        return ;
        };
        var pic=data.result.picAddr;

        $('<img src="'+pic+'" width="100" height="100" alt="">').appendTo(".imgbox");
      }
    })

})
})
