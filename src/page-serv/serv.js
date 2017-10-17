// var $ = require('jquery');
var commons = require('../commons/commons.js');
// var Swiper = require('../commons/swiper.jquery.min.js');

require('../commons/swiper.min.css');
require('./serv.less');

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
})
