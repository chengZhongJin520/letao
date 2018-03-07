/**
 * Created by Lenovo on 2018/3/7.
 */

;(function(){
  $(function(){
    //1、渲染历史记录

      var render=function(){
        var arr=JSON.parse(localStorage.getItem('record')) ;
        $('.lt_lishi').html(template('tmp',{obj:arr}))

      }
      render();


    //2、点击删除此条记录，然后重新渲染页面
      $('.lt_lishi ').on('click','.btn_delete',function(){
       delLocalStorage($(this).text());

      })


    //3、点击清空按钮清空历史，然后重新渲染页面
      $('.lt_lishi').on('click','.btn_del',function () {
        localStorage.removeItem('record');
        render();
      })

    //4、点击搜索按钮，保存记录 并跳转页面（最多存储10条记录，若果有相同的历史记录就删除以前的记录，并添加到前面）
      $('.btn_search').on('click',function(){
        if($(".lt_search input").val().trim()){
          var val=$(".lt_search input").val().trim();
        }else{
          return ;
        }

        setLocalStorage(val);
        render();
        $(".lt_search input").val('');

        location.href="searchList.html?key="+val;
      })



    //获取；
    var getLocalStorage=function(){
      //得到数据
      var arr=localStorage.getItem('record') || '[]';
      //转码
      return JSON.parse(arr);
    }

    //存储
    var setLocalStorage=function(data){
      var arr=getLocalStorage();
      var index=arr.indexOf(data);
      if(index !=-1){
       arr.splice(index,1)
      }
      arr.unshift(data);

      if(arr.length>10){
        arr.pop();
      }
      localStorage.setItem('record',JSON.stringify(arr));
    }

    //删除
    var delLocalStorage=function(txt) {
      var arr = getLocalStorage();
      var index = arr.indexOf(txt);
      if (index == -1) {
        arr.splice(index, 1);
        localStorage.setItem('record', JSON.stringify(arr));
        render();
      }
    }
  })
})();