// var $ = require('jquery');
var commons = require('../commons/commons.js');
// var Swiper = require('../commons/swiper.jquery.min.js');

// require('../commons/swiper.min.css');
// const img = require('../commons/images/bj.jpg');
require('./advan.less');
$(function() {
    $(document).on('scroll',function(){
        var self = $(this);
        if((self.width() > 768) && (self.scrollTop() > 300)){
            $('.service-bar').fadeIn(400);
        }else{
            $('.service-bar').fadeOut(400);
        }
    });
    $(document).scroll();
  // swiper滑动
  var advenSwiper = new Swiper('.swiper-container', {
    // swiper变换结束后发生。
    autoHeight: true,
    onTransitionEnd: function(advenSwiper) {
      var dom = $('li', $('.sub-nav .container'));
      console.log(advenSwiper.activeIndex);
      console.log(dom.eq(advenSwiper.activeIndex));
      console.log(dom.eq(advenSwiper.activeIndex).children('a').parent().siblings('li'));
      dom.eq(advenSwiper.activeIndex).children('a').addClass('active-nav').removeClass('active-nav-cancel').parent().siblings('li').children('a').removeClass('active-nav').addClass('active-nav-cancel');
    }
  });
  $('li > a', $('.sub-nav .container')).on('click', function() {
    $(this).addClass('active-nav').removeClass('active-nav-cancel').parent().siblings('li').children('a').removeClass('active-nav').addClass('active-nav-cancel');
    if($(document).width() < 769){
        $(".content .swiper-wrapper").css({
          'transform': 'translate3d(' + (-(($('.advan-list').width()+40) * $(this).parent().index())) + 'px,0px,0px)',
          'transition': 'all .4s',
        })
        $(".content .swiper-wrapper").css({
            height: $('.advan-list').eq($(this).parent().index()).height()+63+'px',
        });
    }else {
        $(".content .swiper-wrapper").css({
          'transform': 'translate3d(' + (-($('.advan-list').width() * $(this).parent().index())) + 'px,0px,0px)',
          'transition': 'all .4s',
        })
        $(".content .swiper-wrapper").css({
            height: $('.advan-list').eq($(this).parent().index()).height()+246+'px',
        });
    }

  });
  /* 手机导航 */

 var oldTab = '';
 if(oldTab != commons.getUrlParam('tab')){
    $('li > a', $('.sub-nav .container')).eq(commons.getUrlParam('tab')).addClass('active-nav').removeClass('active-nav-cancel').parent().siblings('li').children('a').removeClass('active-nav');
    if($(document).width() < 769){
        $(".content .swiper-wrapper").css({
          'transform': 'translate3d(' + (-(($('.advan-list').width()+40) * commons.getUrlParam('tab'))) + 'px,0px,0px)',
          'transition': 'all .4s',
        });
    }else{
        $(".content .swiper-wrapper").css({
          'transform': 'translate3d(' + (-($('.advan-list').width() * commons.getUrlParam('tab'))) + 'px,0px,0px)',
          'transition': 'all .4s',
        });
    }


  oldTab = commons.getUrlParam('tab');
 }

 /**
  * 检测banner图片是否加载完成
  * @return {[type]} [description]
  */
 var timer = setInterval(function(){
   var img = $('.banner img');
   if(!!img.length){
     $('.banner .banner-info').removeClass('banner-info-hide');
     clearInterval(timer)
   }
 },200)
})
