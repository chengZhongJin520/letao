/**
 * Created by Lenovo on 2018/3/8.
 */
;(function () {
    $(function () {
        var id= +getSearch().productId;
      $.ajax({
        url:'/product/queryProductDetail',
        type:'get',
        data:{id:id},
        success:function(info){
          $('.mui-scroll').html(template('tmp',info));
          mui('.mui-numbox').numbox();
          //重新初始化轮播图
          mui(".mui-slider").slider();

          //重新初始化numbox
          mui(".mui-numbox").numbox();
        }
      })


      //尺码点击事件

      $('.mui-scroll').on('tap','.span',function(){
        $(this).addClass('active').siblings().removeClass('active');
      })


      //添加购物车
      $('.add_Card').on('click',function(){
        var size=$('.span.active').text();
        var num=$('input[type="number"]').val();
          if(!size){
            mui.toast('请选择尺码');
            return;
          }
          console.log(size,num);

          $.ajax({
            type:'post',
            url:'/cart/addCart',
            data:{
              productId:id,
              size:size,
                num:num,
            },
            success:function(info){
              if(info.success){
                mui.confirm('添加成功','温馨提示',['去购物车','继续浏览'],function(e){
                  if(e.index==0){
                    location.href='cart.html';
                  }
                })
              };
              if(info.error){
                location.href = "login.html?retUrl="+location.href;
              }
            }
          })


      })
    })
})();