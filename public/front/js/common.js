/**
 * Created by Lenovo on 2018/3/6.
 */
mui(".mui-slider").slider({
  interval:2000
});
mui(".mui-scroll-wrapper").scroll({
  scrollY:true,
  bounce:true,
  indicators: false
})


var getSearch=function(){
  var arr=decodeURI(location.search).slice(1).split('=');
  var obj={};
  obj[arr[0]]=arr[1];
  return obj
}
