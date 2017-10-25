// var $ = require('jquery');
var commons = require('../commons/commons.js');
// var Swiper = require('../commons/swiper.jquery.min.js');

// require('../commons/swiper.min.css');
require('./news.less');

$(document).ready(function() {
    // console.log(commons.urlHost);
    // 获取news的盒子
    var newsList = $('.content .news-list');
    var curpage = 1;
    var allPage = 0;
    var allowFlag = true;
    var prev = $("#prev"),
        next = $("#next"),
        pageInput = $("#pageInput"),
        totalPage = $("#totalPage");
    // 清空newslist列表。
    newsList.empty();
    function getDataList(pageNum){
      pageInput.val(pageNum);
      $.ajax({
        url: commons.urlHost + '/api/queryArticlesOpen',
        type: 'post',
        dataType: 'json',
        data: {
          key: '',
          pageSize: 10,
          curPage: pageNum,
          state: 2
        }
      })
      .done(function(res) {
        // console.log(res.data.data[0].publisher.split(" "));
        var listItemStr = '';
        var list = res.data.data;
        allPage = res.data.totalPage;
        totalPage.html('共'+ res.data.totalPage +'页');
        $('.news-list').show().siblings('.loading').hide();
        if(list.length <= 0){
          $('.error-list').css({
            display: 'block',
          });
        }else{
          $('.error-list').css({
            display: 'none',
          });
          for(var i=0; i<list.length; i++){
            listItemStr += '<div class="item news-item">'+
            '<div class="date phone-hidden">'+
            '<p class="day">'+commons.getDate(list[i].createDate)+'</p>'+
            '<p class="month">'+commons.getMonth(list[i].createDate)+'</p>'+
            '</div>'+
            '<div class="news-detail">'+
            '<div class="new-title">'+list[i].title+'</div>'+
            '<div class="new-time">'+
            '<p>'+commons.getDay(list[i].createDate)+'</p>'+
            '<p class="author">作者：<span>'+ (list[i].publisher) +'</span></p>'+
            '</div>'+
            '<div class="new-content">'+
            '<a href="newsdetail.html?id='+list[i].id+'">'+ list[i].articleAbstract +'</a>'+
            '</div>'+
            // '<div class="new-pic">'+
            //     '<img src="'+ list[i].mainPictureUrl +'" alt="图片">'+
            // '</div>'+
            '<div class="new-link">'+
            '<a href="newsdetail.html?id='+list[i].id+'">阅读全文</a>'+
            '</div>'+
            '</div>'+
            '</div>'
          }
          newsList.html(listItemStr);
        }
        allowFlag = true;
      })
      .fail(function() {
      })
    };
    getDataList(1);
    prev.on('click',function(e){
      e.preventDefault();
      if(curpage <= 1) {
        return false;
      } else {
        curpage--;
        if(allowFlag) {
          allowFlag = false;
          getDataList(curpage);
        }
      }
    })
    next.on('click',function(e){
      e.preventDefault();
      if(curpage >= allPage) {
        return false;
      } else {
        curpage++;
        if(allowFlag) {
          allowFlag = false;
          getDataList(curpage);
        }
      }
    })
    pageInput.on('keypress',function(e) {
      var keycode = e.keyCode;
      var inputVal = $(this).val();
      
      if(keycode=='13') {
        e.preventDefault();
        //请求搜索接口
        // if() {
        //
        // }
      }
    })
});
