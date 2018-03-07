/**
 * Created by Lenovo on 2018/3/7.
 */



;(function () {
    $(function () {

      var obj=getSearch();
      $('.lt_search input').val(obj.key);


      var render=function(){
        if($('.lt_search input').val().trim()){
         var txt=$('.lt_search input').val().trim();
        }else{
          return ;
        }
        var obj1={
          page:1,
          pageSize:100,
          proName:txt,
        }
        var eles=$('.lt_sort a.active');

        if(eles.length>0){
          var name=$(eles[0]).data('type');
          console.log(name);
          var value=eles.find('span').hasClass('fa fa-angle-down')?2:1;
          obj1[name]=value;
        }

        $.ajax({
          url:'/product/queryProduct',
          type:'get',
          data:obj1,
          beforeSend:function(){
            $('.lt_product').html('<div class="zhanBox"></div>')
          },
          success:function(info){
            console.log(info);
            setTimeout(function () {
              $('.lt_product').html(template('tmp',info));
            },1000)

          }
        })
      };
      render();


      //搜索点击事件
      $('.btn_search').on('click',function(){

        if($('.lt_search input').val().trim()){
          var txt=$('.lt_search input').val().trim();
        }else{
          return
        }

        //得到数据
        var arr=localStorage.getItem('record') || '[]';
        //转码
        var arr= JSON.parse(arr);
        var index=arr.indexOf(txt);
        if(index !=-1){
          arr.splice(index,1)
        }
        arr.unshift(txt);

        if(arr.length>10){
          arr.pop();
        }
        localStorage.setItem('record',JSON.stringify(arr));
        $('.lt_sort [data-type]').removeClass('active').find('span').addClass('fa-angle-down').removeClass(' fa-angle-up')

        render();
      });


      //排序
      $('.lt_sort [data-type]').on('click',function(){
        if($(this).hasClass('active')){
          $(this).find('span').toggleClass('fa-angle-up').toggleClass('fa-angle-down');
        }else{
          $(this).addClass('active').siblings().removeClass('active');
          $(this).siblings().find('span').removeClass('fa-angle-up').addClass('fa-angle-down');
        }
          render();

      })
    })
})();
