/**
 *
 * Created by Lenovo on 2018/3/8.
 */

;(function(){
  $(function () {
      $('.btn_login').on('click',function(){
        var name=$('[type="text"]').val().trim();
        var psw=$('[type="password"]').val().trim();
        if(!name){
          mui.toast("请输入用户名");
          return;
        };
        if(!psw && psw.length<6){
          mui.toast("密码不能小于6位数");
          return;
        };
        $.ajax({
          url:'/user/login',
          type:'post',
          data:{
            username:name,
            password:psw,
          },
          success:function(info){
            if(info.error){
              mui.toast(info.message);
              return;
            }
            if(info.success){
              if(location.search.indexOf('retUrl') !=-1){
                location.href=location.search.replace('?retUrl=','');
              }else{
                location.href='user.html';
              }

            }
          }
        })
      })
  })
})();