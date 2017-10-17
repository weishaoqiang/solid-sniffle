// var $ = require('jquery');
var commons = require('../commons/commons.js');
// var Swiper = require('../commons/swiper.jquery.min.js');

// require('../commons/swiper.min.css');
require('./newsdetail.less');

$(document).ready(function() {
    // 获取文章的id
    var articleID = commons.getUrlParam('id');
    // console.log(articleID);
    var newsItem = $('.content .news-item');
    newsItem.empty();
    var detailStr = '';
    $.ajax({
        url: commons.urlHost+'/api/getArticleOpen',
        type: 'POST',
        dataType: 'json',
        data: {
            id: articleID
        }
    })
    .done(function(res) {
        $('.news-item').show().siblings('.loading').hide();
        console.log(res.data);
        detailStr = '<div class="date  phone-hidden">'+
            '<p class="day">'+commons.getDate(res.data.createDate)+'</p>'+
            '<p class="month">'+commons.getMonth(res.data.createDate)+'</p>'+
        '</div>'+
        '<div class="news-detail">'+
            '<div class="new-title">'+ res.data.title +'</div>'+
            '<div class="date-count">'+
                '<div class="day">'+ commons.getDay(res.data.createDate) +'</div>'+
                '<div class="author">作者：<span>'+ res.data.publisher +'</span></div>'+
                '<div class="count">浏览次数：<span>'+res.data.readCount+'</span></div>'+
            '</div>'+
                (res.data.content.replace(/&nbsp;/g,''))
        '</div>';

        newsItem.html(detailStr);
        settitle(res.data.title);
    })
    .fail(function() {
        // console.log("error");
    })
    .always(function() {
        // console.log("complete");
    });
    // 增加文章的浏览次数，在数据请求完城才算查看一次
    $.ajax({
        url: commons.urlHost+'/api/addReadCountsOpen',
        type: 'POST',
        dataType: 'json',
        data: {
            id: articleID,
            count: 1,
        }
    })
    // 设置文章title
    function settitle(title) {
      document.title = title+'_万物仓';
    };
});
