// var $ = require('jquery');
var commons = require('../commons/commons.js');
// var Sipwer = require('../commons/swiper.jquery.min.js');
// require('../commons/swiper.min.css');
require('./sub.less');

// 城市对象
var shenzhen = ['罗湖区', '南山区', '宝安区', '福田区', '盐田区', '龙岗区', '龙华新区', '光明新区', '大鹏新区', '坪山新区'],
  beijing = ['东城区', '西城区', '朝阳区', '丰台区', '石景山区', '通州区', '昌平区', '大兴区', '亦庄开发区', '顺义区', '房山区', '门头沟区', '平谷区', '怀柔区', '密云区', '延庆区', '燕郊区'],
  shanghai = ['黄浦区', '徐汇区', '长宁区', '静安区', '普陀区', '虹口区', '杨浦区', '宝山区', '闵行区', '嘉定区', '浦东新区', '松江区', '金山区', '青浦区', '奉贤区', '崇明区'],
  guangzhou = ['荔湾区','越秀区','海珠区','天河区','白云区','黄浦区','番禺区','花都区','南沙区','从化区','增城区'],
  hangzhou = ['上城区','下城区','江干区','拱墅区','西湖区','滨江区','萧山区','余杭区','富阳区','桐庐区','淳安县','建德县','临安市'];
// 选择的种类
var currentType = 1;
var sessionID = '';

$(function() {

  $('.type-item', $('.sub-box .type-sec')).on('click', function() {
      $(this).addClass('select-type-item').siblings().removeClass('select-type-item');
    })
    /* 控制箭头的函数 */
  $('select', $('.select-city .sec-box')).on('click', function() {
    if ($(this).siblings('span').hasClass('arrow-icon-turn')) {
      $(this).siblings('span').removeClass('arrow-icon-turn');
    } else {
      $(this).siblings('span').addClass('arrow-icon-turn');
    }
  });
  $('select', $('.select-city .sec-box')).on('blur', function() {
    $(this).siblings('span').removeClass('arrow-icon-turn');
  })

  /* 根据城市名拿到城市区域 */
  // $('main').css('opacity', '1');
  var subSelect = $('#city_area');
  $('#city_name').change(function() {
    var value = $('#city_name option:selected').val();
    subSelect.html("");
    if (value === "深圳市") {
      console.log(shenzhen);
      for (var i = 0; i < shenzhen.length; i++) {
        subSelect.append("<option value='" + shenzhen[i] + "'>" + shenzhen[i] + "</option>")
      }
    } else if (value === "北京市") {
      for (var i = 0; i < beijing.length; i++) {
        subSelect.append("<option value='" + beijing[i] + "'>" + beijing[i] + "</option>")
      }
    } else if (value === "上海市") {
      for (var i = 0; i < shanghai.length; i++) {
        subSelect.append("<option value='" + shanghai[i] + "'>" + shanghai[i] + "</option>")
      }
    }else if (value === "广州市") {
      for (var i = 0; i < guangzhou.length; i++) {
        subSelect.append("<option value='" + guangzhou[i] + "'>" + guangzhou[i] + "</option>")
      }
    }else if (value === "杭州市") {
      for (var i = 0; i < hangzhou.length; i++) {
        subSelect.append("<option value='" + hangzhou[i] + "'>" + hangzhou[i] + "</option>")
      }
    }
  });
  $('#city_name').change();

  if (commons.getUrlParam('city') === "3") {
    $('#city_name').val('上海市');
    $('#city_name').change();
  } else if (commons.getUrlParam('city') === "5") {
    $('#city_name').val('北京市');
    $('#city_name').change();
  } else if (commons.getUrlParam('city') === "2") {
    $('#city_name').val('广州市');
    $('#city_name').change();
  } else if (commons.getUrlParam('city') === "4") {
    $('#city_name').val('杭州市');
    $('#city_name').change();
  } if (commons.getUrlParam('city') === "1") {
    $('#city_name').val('深圳市');
    $('#city_name').change();
  }else {}

  /* 选择存储类型 */
  $('#type-sec-list .type-item').click(function(event) {
    var currentTarget = event.currentTarget;
    if (currentTarget.id === 'type1') {
      currentType = 1;
    } else if (currentTarget.id === 'type2') {
      currentType = 2;
    } else if (currentTarget.id === 'type3') {
      currentType = 3;
    } else {
      currentType = 4;
    }
    console.log(currentType);
  });

  // 定义参数
  var cityID = '',
    username = '',
    userphone = '',
    usercode = '',
    useraddress = '';

  /*验证码按钮点击事件*/
  $('#security-btn').click(function() {
    userphone = $('#userphone').val();
    console.log(userphone);
    if (userphone === '') {
      $('#userphone').parent().addClass('error');
      return;
    } else {
      // TODO: 请求验证码
      // console.log('success');
      if ($('#security-btn').html().trim() !== '获取验证码' && $('#security-btn').html().trim() !== '重新获取') {
        return;
      }
      console.log('success');
      $.get("http://youminfo.com/api/getSMS?phone=" + userphone, function(response) {
        var resp = response.data;
        if (response.success) {
          sessionID = resp.sessionID;
          var count = 60;
          var clock = setInterval(function() {
            if (count > 0) {
              count--;
              $('#security-btn').html(count + 's');
            } else {
              $('#security-btn').html('重新获取');
              clearInterval(clock);
            }
          }, 1000);
        } else {}
      }, "json");
    }
  });
  /**
   * 预约点击事件
   */
  $('#sub-btn').click(function() {
    username = $('#username').val();
    userphone = $('#userphone').val();
    usercode = $('#usercode').val();
    useraddress = $('#city_name').val() + $('#city_area').val() + $('#city_address').val();

    if ($('#city_name').val() === '北京市') {
      cityID = 5;
    } else if ($('#city_name').val() === '上海市') {
      cityID = 3;
    } else if ($('#city_name').val() === '广州市') {
      cityID = 2;
    } else if ($('#city_name').val() === '杭州') {
      cityID = 4;
    } else {
      cityID = 1;
    }
    if (username === '') {
      $('#username').parent().addClass('error');
      return;
    }
    if (userphone === '') {
      $('#userphone').parent().addClass('error');
      return;
    }
    if (usercode === '') {
      $('#usercode').parent().addClass('error');
      return;
    }
    if ($('#city_address').val() === '') {
      $('#city_address').css('border', '1px solid #ff9889');
      return;
    }
    // TODO: 请求预定
    $.ajax({
      url: "http://youminfo.com/api/addReserveMoveWXUser",
      headers: {
        "sessionID": sessionID
      },
      type: 'POST',
      data: {
        'cityID': cityID,
        'type': currentType,
        'name': username,
        'address': useraddress,
        'phone': userphone,
        'securityCode': usercode
      },
      success: function(response) {
        if (response.success) {
          $('.compelet-mask').css('display', 'block');
        }
      },
      dataType: 'json'
    });
  });
  $('#close-mask').click(function() {
    $('.compelet-mask').css('display', 'none');
  });
})
