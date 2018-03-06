/**
 * Created by Lenovo on 2018/3/6.
 */

$(function(){

    $.ajax({
      url:'/category/queryTopCategory',
      type:'get',
      success:function(info){
        //console.log(info);
        $('.lt_first ul').html(template('tmp-first',info));
        $('.lt_first ul').find('a').eq(0).addClass('active');
      }
    })

  var render= function(id){
     var id=id?id:1;
    $.ajax({
      url:'/category/querySecondCategory',
      type:'get',
      data:{id:id},
      success:function(info){
        console.log(info);
        $('.lt_second ul').html(template('tmp-second' ,info));
      }
    })


  };
  render();

  //一级菜单的点击事件
    $('.lt_first ul').on('click','li',function(){
      //$(this).addClass('active').siblings().removeClass();


      $(this).children('a').addClass('active');
      $(this).siblings().children('a').removeClass('active');
      render($(this).data('id'));
      mui('.mui-scroll-wrapper').scroll()[1].scrollTo(0,0,100)
    })


})
