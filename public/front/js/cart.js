
;(function () { 
    $(function(){
        var render = function () {
            $.ajax({
                url:'/cart/queryCart',
                type:'get',
                success:function (info) {
                    console.log(info);
                    if(info){
                        $('.lt_main ul').html( template('tmp',{obj:info}))
                    }
                }
            })
        }
        render();
    })
 })();