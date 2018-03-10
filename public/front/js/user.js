/**
 * Created by Lenovo on 2018/3/8.
 */


;(function(){
  $(function () {
    $.ajax({
      url:'/user/queryUserMessage',
      type:'get',
      success:function(info){
        if(info.error){
          location.href='login.html';
        }
          
          $('.user').html(template('tmp',info))
        
      }
    });



    //退出功能
      $('.btn_logout').on('click',function(){
        $.ajax({
          url:'/user/logout',
          type:'get',
          success:function(info){
            console.log(info);  
            if(info.success){
              location.href='login.html';
            }   
          }
        })
      })
  })
})();
