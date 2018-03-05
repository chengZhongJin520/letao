/**
 * Created by Lenovo on 2018/3/4.
 */


;(function() {
  $(function () {
    var page=1;
    var pageSize=5;
   var round=function() {

     $.ajax({
       url: '/user/queryUser',
       type: 'get',
       data: {
         page: page,
         pageSize: pageSize
       },
       success: function (info) {

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

    round()


    //启用禁用按钮
    $('tbody').on('click','a',function(){
      var isDelete=1;
      if($(this).text() === '禁用'){
        isDelete=0;
      }
      $.ajax({
        url:'/user/updateUser',
        type:'post',
        data:{
          id:$(this).data('id'),
          isDelete: isDelete
        },
        success:function(info){
          console.log(info);
          if(info.success){
            round();
          }
        }
      })
    })



  })
})();
