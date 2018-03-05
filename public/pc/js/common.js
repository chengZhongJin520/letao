/**
 * Created by Lenovo on 2018/3/2.
 */

$(function(){

  //进度条
  //ajax开始
  $(document).ajaxStart(function () {
    NProgress.start();
  });
  //所有ajax结束
  $(document).ajaxStop(function () {
   setTimeout(function(){
     NProgress.done();
   },1000)
  });


  //每进入一个页面就判断下是否登录

  if(location.href.indexOf('login.html')== -1){
    $.ajax({
      url:'/employee/checkRootLogin',
      type:'get',
      data:'',
      success:function(info){
        if(info.error==400){
          location.href='login.html';
        }
      }
    })
  }



  if(location.href.indexOf('first.html') != -1 || location.href.indexOf('second.html') != -1){
    $('.second').slideToggle(500);

  }

//二级菜单点击事件
  $('.second').prev().on('click',function(){
      $(this).next().slideToggle(500);
  })


  //关闭侧边栏事件
  $('.icon_menu').on('click',function(){
    $('.lt_aside').toggleClass('now');
    $('.lt_main').toggleClass('now');
  })


  //显示模态框
  $(".icon_logout").on("click", function () {

    $("#logoutModal").modal("show");

  });


  //退出按钮
  $('.btn_logout').on('click',function(){
    $.ajax({
      type:'get',
      url:'/employee/employeeLogout',
      success:function(info){
        console.log(info);
        if(info.success){
          location.href='login.html';
        }
      }
    })
  })


  //渲染
  window.round=function(obj) {

    var page=1;
    var pageSize= 5;
    var data={page: page, pageSize: pageSize}
    var type = 'get';
    var url='/category/queryTopCategoryPaging';



    if(obj){


    //var data=obj.data ||  {page: page, pageSize: pageSize}
    if(obj.data){
      data=obj.data;
    }
    type = obj.type ||'get';
    url=obj.url ||'/category/queryTopCategoryPaging';
    }
    //console.log(data);
    $.ajax({
      url: url,
      type: type,
      data:data,
      success: function (info1) {
        console.log(info1);
        page = info1.page;
        pageSize = info1.size;
        $("table tbody").html(template('tmp', info1));

        $(".setPage").bootstrapPaginator({
          bootstrapMajorVersion: 3,//默认是2，如果是bootstrap3版本，这个参数必填
          currentPage: page,//当前页
          totalPages: Math.ceil(info1.total / info1.size),//总页数
          //size:"small",//设置控件的大小，mini, small, normal,large
          onPageClicked: function (a, b, c, p) {
            //为按钮绑定点击事件 page:当前点击的按钮值


            round({
              data:{page:p, pageSize: pageSize}
            });
          }

        });

      }

    })
  }
})
