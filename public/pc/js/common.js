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
})
