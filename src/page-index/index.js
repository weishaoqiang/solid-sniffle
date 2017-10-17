var commons = require('../commons/commons.js');

require('./index.less');
$(function(){
    $('.item-info').parent('div').css({
        'background-color':'#fff',
    })
    // 获取第一张图片的高度
    var setH = function(){
        var pic1H = $('.item-pic',$('.list .item a')).eq(0).height();
        var pic2H = $('.item-pic',$('.list .item a')).eq(1).height();
        if($(document).width() > 769){
            $('.item-right',$('.list .item a')).eq(0).css({
                'height': pic2H +'px',
                'transform': 'translateY('+(pic1H-pic2H)+'px)'
            })
        }
    }
    setH();
    $(document).on('scroll',function(){
        var self = $(this);
        setH();
        if((self.width() > 768) && (self.scrollTop() > 2500)){
            $('.service-bar').fadeIn(400);
        }else{
            $('.service-bar').fadeOut(400);
        }
    });
    $(document).scroll();
    var indexSwiper = new Swiper('.vks-swiper',{
        loop: true,
        autoplay: 5000,
        pagination : '.vks-pagination',
        paginationClickable :true,
    })
})
