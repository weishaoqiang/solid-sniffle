var $ = require('jquery');
var commons = require('../commons/commons.js');
var Swiper = require('../commons/swiper.jquery.min.js');

require('../commons/swiper.min.css');
require('./contact.less');

$(function(){
    $(document).on('scroll',function(){
        var self = $(this);
        if((self.width() > 768) && (self.scrollTop() > 100)){
            $('.service-bar').fadeIn(400);
        }else{
            $('.service-bar').fadeOut(400);
        }
    });
    $(document).scroll();
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
