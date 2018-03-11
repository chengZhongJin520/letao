;
(function () {
    $(function () {
        var render = function () {
            $.ajax({
                url: '/cart/queryCart',
                type: 'get',
                success: function (info) {
                
                    setTimeout(function () {
                        if (info) {
                            $('.lt_main ul').html(template('tmp', {
                                obj: info
                            }))
                        }
                        $('.lt_order>div>span').text(0.00);
                        mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
                    }, 1000)

                }
            })
        }
        render();

        //下拉刷新
        mui.init({
            pullRefresh: {
                container: ".mui-scroll-wrapper", //下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
                down: {
                    auto: true, //可选,默认false.首次加载自动上拉刷新一次
                    callback: function () { //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
                        render();
                    }
                }
            }
        });



        //删除
        $('.mui-scroll').on('tap', '.btn_delete', function () {
            let id = $(this).data('id');
            console.log(id);
            $.ajax({
                url: '/cart/deleteCart',
                type: 'get',
                data: {
                    id: [id]
                },
                success: function (info) {
                    if (info.success) {
                        render();
                    }
                }
            })
        })

        //修改
        $('.mui-scroll').on('tap','.btn_edit',function(){
            let data = this.dataset;        
            console.log(data);
            let html=template('editTpl',data);
            html=html.replace(/\n/g,'');
            mui.confirm( html, "编辑商品", ["确定", "取消"],function(e){
               
                  if(e.index==0){
                      let size=$('.lt_edit_size span.active').text();
                      let num=$(".mui-numbox input").val();
                      let id=data.id;
                     $.ajax({
                         url:'/cart/updateCart',
                         type:'post',
                         data:{
                             id:id,
                             size:size,
                             num:num
                         },
                         success:function(info){
                             if(info.success){
                                mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();
                             }
                         }
                     })
                  }
            }) 
   
              //初始化numbox
              mui(".mui-numbox").numbox();

        })

                  //给span注册点击tap事件
    $("body").on("tap",'.span', function () {
        console.log(this);
        $(this).addClass("active").siblings().removeClass("active");
      })
    })


})();

$(function(){
    $('.mui-scroll').on('change','[type="checkbox"]',function(){
        let number=0;
        $(':checked').each(function(index,ele){
            let num = $(ele).data('num');
            let price = $(ele).data('price');
            number +=num * price;
        })

        $('.lt_order>div>span').text(number.toFixed(2));
    })
})