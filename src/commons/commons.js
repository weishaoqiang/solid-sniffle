var jQuery= require('jquery'),
    $ = require('jquery');
var Sipwer = require('../commons/swiper.jquery.min.js');
require('../commons/swiper.min.css');
(function(){
    // var bp = document.createElement('script');
    var head = document.getElementsByTagName('head')[0];
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?26beff73e3e838b25ae0aa02a471db5b";

    // var s = document.getElementsByTagName("script")[0];
    head.appendChild(hm);
})();

/* 隐藏浏览器地址栏 */
/*! Normalized address bar hiding for iOS & Android (c) @scottjehl MIT License */
(function(win){
    var doc = win.document;
    // If there's a hash, or addEventListener is undefined, stop here
    if(!win.navigator.standalone && !location.hash && win.addEventListener ){

    //scroll to 1
    win.scrollTo( 0, 1 );
        var scrollTop = 1,
        getScrollTop = function(){
            return win.pageYOffset || doc.compatMode === "CSS1Compat" && doc.documentElement.scrollTop || doc.body.scrollTop || 0;
        },
        //reset to 0 on bodyready, if needed
        bodycheck = setInterval(function(){
            if( doc.body ){
                clearInterval( bodycheck );
                scrollTop = getScrollTop();
                win.scrollTo( 0, scrollTop === 1 ? 0 : 1 );
            }
        }, 15 );
        win.addEventListener( "load", function(){
            setTimeout(function(){
            //at load, if user hasn't scrolled more than 20 or so...
            if( getScrollTop() < 20 ){
            //reset to hide addr bar at onload
                win.scrollTo( 0, scrollTop === 1 ? 0 : 1 );
                }
            }, 0);
        }, false);
    }
})(window);
$(function(){
    /* 底部的资讯推荐，前五条 */
    $.ajax({
        url: gethost() + '/api/queryArticlesOpen',
        type: 'post',
        dataType: 'json',
        data: {
            key: '',
            pageSize: 10,
            curPage: 1,
            state: 2
        }
    })
    .done(function(res) {
        var list = res.data.data;
        var arr = [];
        var htmlStr = '';
        if(list.length > 5){
            for(var i=0;i<5;i++){
                arr.push(list.pop());
            }
        }else {
            arr = list;
        }
        for(var j=0; j<arr.length; j++){
            htmlStr += '<li class="swiper-slide">'+
            '<a href="newsdetail.html?id='+ arr[j].id +'">'+arr[j].title+'</a></li>'
        }
        $('.vks-footer .news-title').empty();
        $('.vks-footer .news-title').html(htmlStr);
        /* 网站底部资讯标题切换 ,请求成功才开起滚动*/
        var infoSlice = new Swiper('.info-swiper',{
            autoplay: 3000,
            loop: true,
            direction: 'vertical',
        })
    }).fail(function(){
    }).always(function(){
    });

    /* 根据页面来判断header样式 */
    (function(window){
        if(window.location.pathname === '/index.html' || window.location.pathname === '/'){
          console.log(window.location.pathname);
            $('.vks-header').addClass('white-header');
            $('.friend-link > .friend-link-list').css({
                display: 'none'
            });
            $('.friend-link > .news-title-list').css({
                display: 'none'
            });
        }else {
            $('.vks-header').addClass('black-header');
            $('.friend-link > .friend-link-list').css({
                display: 'none'
            });
            $('.friend-link > .news-title-list').css({
                display: 'none'
            });
        }
    })(window)
    /* 页面滚动式导航样式的变化 */
    $(document).scroll(function() {
        if(window.location.pathname === '/index.html' || window.location.pathname === '/'){
            if ($(document).scrollTop() > 100) {
                $('.vks-header').removeClass('white-header').addClass('black-header');
                $('.black-logo').css({
                    display:'block'
                })
            }else {
                $('.vks-header').removeClass('black-header').addClass('white-header');
                $('.black-logo').css({
                    display:'none'
                })
            }
        }
        if($(document).scrollTop() > 100){
            $('.vks-header').css({
                'box-shadow':' 2px 0 10px rgba(0,0,0,.05)',
            });

        }else {
            $('.vks-header').css({
                'box-shadow':'none',
            });
        }
    });
    // 导航中子导航的显示样式
    $('.vks-header ul>li').on('mouseenter',function(e){
        if($(document).width() > 768){
            $('.sub-nav',e.currentTarget).css({
                'height': '140px',
                'padding': '10px 0',
                'transition': 'all .2s',
                '-webkit-transition': 'all .2s',
                '-o-transition': 'all .2s',
                '-ms-transition': 'all .2s',
                '-moz-transition': 'all .2s',
            });
        }else{

        }
    })
    $('.vks-header ul>li').on('mouseleave',function(e){
        if($(document).width() > 768){
            $('.sub-nav',e.currentTarget).css({
                'height': '0',
                'padding': '0 0',
                'transition': 'all .2s',
                '-webkit-transition': 'all .2s',
                '-o-transition': 'all .2s',
                '-ms-transition': 'all .2s',
                '-moz-transition': 'all .2s',
            });
        }else{
        }
    })
    /* 定义标记 */
    var flag = true;
    /* 定义触发目标 */
    var oldTarget = null;
    /* 手机导航按钮 */
    /* 禁止屏幕滚动 */
    var disableScroll = false;
    $('#mobile-btn').on('click',function(){
        disableScroll = true;
        if(!flag){
            return;
        }
        flag = false;
        var self = $(this);
        $('.mobile-nav').show();
        //获取ul最终的高度
        var ulH= ($('.mobile-nav>ul').children('li').length)*50;
        $('.mobile-nav>ul').animate({
            'height': ulH,
        }, 300,function(){
            flag = true;
            $('.mobile-nav>ul').css({
                height: 'auto',
            })
        })
    })
    $('#mobile').on('click',function(e){
        // e.preventDefault();
        disableScroll = false;
        // if(!flag){
        //     return;
        // }
        // flag = false;
        // console.log(e.currentTarget == e.target);
        if(e.currentTarget == e.target){
            $('.mobile-nav>ul').animate({
                'height': 0,
            }, 300,function(){
                $('.mobile-nav').hide();
                // flag = true;
                $('.mobile-nav>ul>li').removeClass('li-active');
            })
        }
    })
    $('#mobile-btn-close').on('click',function(e){
        e.stopPropagation();
        disableScroll = false;
        if(!flag){
            return;
        }
        flag = false;
        $('.mobile-nav>ul').animate({
            'height': 0,
        }, 300,function(){
            $('.mobile-nav').hide();
            flag = true;
            $('.mobile-nav>ul>li').removeClass('li-active');
        })
    })
    /* 给document添加触摸滑动事件 */
    $('.mobile-nav').on('touchmove',function(event){
        if(disableScroll){
            event.preventDefault();
        }
    })
    /*sub-nav的效果*/
    $('.mobile-nav>ul>li>a').on('click',function(e){
        var self = $(this);
        if($(e.currentTarget).siblings().hasClass('sub-nav') ){
            if(oldTarget != e.currentTarget){
                self.parent('li').addClass('li-active').siblings().removeClass('li-active');
            }else{
                self.parent('li').toggleClass('li-active');
            }
        }
        // 执行完毕在赋值
        oldTarget = e.currentTarget;
    })
    /* 底部电话鼠标效果 */
    $('.service-phone a').on('mouseenter',function(){

    })
    $('.service-phone a').on('mouseleave',function(){

    });
    var timeCount = 0;
    var timer = setInterval(function(){
      timeCount++;
      var newBridge = $("#newBridge");
      console.log(newBridge);
      if((!!newBridge && (newBridge.length > 0)) || (timeCount> 200)){
        newBridge.css({
          'display': 'none',
        })
        clearInterval(timer);
      }
    },100)
})
// 获取参数
exports.getUrlParam = function(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}
// 判断主机
var gethost =  function(){
    // if(window.location.hostname === '114.55.42.174'|| window.location.hostname === 'chinaministorage.com'|| window.location.hostname === 'www.chinaministorage.com'){
        return 'http://120.27.157.191';
    // }else{
    //     return 'http://114.55.66.232:8666';
    // }
};

exports.urlHost = gethost();

// 获取日期的方法
exports.getDay = function(param){
    // var day = new Date(param);
    return param.slice(0,10);
}
exports.getMonth = function(param){
    // param = param.toString();
    param = new Date(param.slice(0,10)).toString();
    console.log(param);
    return param.slice(3,7);
}
exports.getDate = function(param){
    // param = param.toString();
    param = new Date(param.slice(0,10)).toString();
    return param.slice(7,10);
}
