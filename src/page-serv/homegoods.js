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
    // var idlePartArr = [
    //     require('../commons/images/装修搬家.jpg'),
    //     require('../commons/images/贵重家居.jpg'),
    //     require('../commons/images/生活电器.jpg')
    // ];
    // idlePartArr.forEach(function(val,index){
    //     console.log($('.item-pic',$('.idle-goods .first')));
    //     $('.item-pic',$('.idle-goods .first')).eq(index).css({
    //         'backgroundImage':'url("'+ val +'")',
    //         'backgroundRepeat': 'no-repeat',
    //     });
    // })
});
