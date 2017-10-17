// var $ = require('jquery');
var commons = require('../commons/commons.js');
// var Swiper = require('../commons/swiper.jquery.min.js');

// require('../commons/swiper.min.css');
require('./compro.less');

$(function() {
  /* 手风琴的代码 */
  var childH = $('.child-item').height();
  $('.main-body .parent-item').find('a').on('click', function(event) {
    // console.log($(event.target).parent('.parent-item'));
    var self = $(event.target).parent('.parent-item');
    var childLen = self.children('.child-list').find('li')[0];
    var childListH = childLen.offsetHeight;
    if (self.hasClass('active-parent-item')) {
      self.removeClass('active-parent-item');
      self.find('.child-list').css({
        'height': 0 + 'px',
      });
    } else {
      self.addClass('active-parent-item').siblings().removeClass('active-parent-item');
      self.find('.child-list').css({
        'height': childListH + 'px',
      }).parent().siblings('.parent-item').find('.child-list').css({
        'height': 0 + 'px',
      });
    }
  })
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
