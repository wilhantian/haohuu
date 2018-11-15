function insertAtCursor(myField, myValue) {
    if (document.selection) { myField.focus(); sel = document.selection.createRange(); sel.text = myValue; sel.select(); }
    else if (myField.selectionStart || myField.selectionStart == '0') {
        var startPos = myField.selectionStart; var endPos = myField.selectionEnd; var restoreTop = myField.scrollTop; myField.value = myField.value.substring(0, startPos) + myValue + myField.value.substring(endPos, myField.value.length); if (restoreTop > 0) { myField.scrollTop = restoreTop; }
        myField.focus(); myField.selectionStart = startPos + myValue.length; myField.selectionEnd = startPos + myValue.length;
    } else { myField.value += myValue; myField.focus(); }
}
function index_in_array(value, array) {
    for (var i = 0; i < array.length; i++) { var v = array[i]; if (v == value) { return i; } }
    return -1;
}
function replace_qq_emoji(str) { str = str.replace(/\[.*?\]/g, function (word) { var w = word.replace('[', '').replace(']', ''); var index = index_in_array(w, qq_emoji); return '<img class="qq_emoji" src="/Public/static/images/qq_emoji/Expression_' + (index + 1) + '@2x.png" />'; }); return str; }
function set_water() {
    var water = $('#iphone .i-water'); if (!water.length) { $('#iphone').append('<div class="i-water" id="waters"></div>'); }
    $('.phone-wrap').css('transform', 'scale(0.5)'); $('.iphone').css('height', '1136px');
}
Date.prototype.format = function (fmt) {
    var o = { "M+": this.getMonth() + 1, "d+": this.getDate(), "h+": this.getHours(), "m+": this.getMinutes(), "s+": this.getSeconds(), "q+": Math.floor((this.getMonth() + 3) / 3), "S": this.getMilliseconds() }; if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length)); for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length))); return fmt;
}
function get_random_num(Min, Max) { var Range = Max - Min; var Rand = Math.random(); return (Min + Math.round(Rand * Range)); }
function randomString(len, words) {
    len = len || 32; var $chars = '0123456789'; if (words) { $chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'; }
    var maxPos = $chars.length; var pwd = ''; for (i = 0; i < len; i++) { pwd += $chars.charAt(Math.floor(Math.random() * maxPos)); }
    return pwd;
}
function mkhandel(mid) {
    $('.pop-pic .tips a#goon').click(function () { $('.pop-pic').hide(); $('#wrapper').show(); }); $('.go_make').click(function () {
        var _this = $(this); var type = $(this).attr('val'); $('.msg-del').hide(); if (mid == 10) { $('#iphone').css('height', '5636px'); }
        var div = $('.phone-wrap'); var box = div; var my_image = $('.my-image'); var mask = $('.mask'); if (!my_image.length) { my_image = $('<div class="my-image">成功生成图片，点击 <a class="my-image-view" target="_blank" href="#">这里</a> 查看，<a class="my-image-continue" href="#">继续制作</a></div>'); $('body').append(my_image); }
        if (!mask.length) { $('body').append('<div class="mask"></div>'); }
        div.css('transform', 'scale(1.0)'); div.css('padding', 0).css('border', 0); $('#ifm').contents().find('body').append(div); _this.hide(); $('.loading').show(); $('.my-image').hide(); $('.mask').hide(); html2canvas(div, {
            onrendered: function (canvas) {
                var myImage = canvas.toDataURL("image/png"); var pop_pic = $('.pop-pic'); var pop_class = 'pc'; if (browser.versions.mobile) { pop_class = 'mobile'; }
                pop_pic.find('.tips').addClass(pop_class); pop_pic.find('img').attr('src', myImage); pop_pic.find('#save_not').attr('href', result.path); $('#save_not').click(function () { alert('点击确定后请稍后，跳出大图后按住三秒即可保存！'); }); pop_pic.show(); $('#wrapper').hide(); $('.loading').hide(); _this.show(); $('.msg-del').show(); div.css('transform', 'scale(0.5)'); div.remove(); $('.clone_box').html(box);
            }
        });  $('.apps-close').click(function () { window.localStorage.setItem("show_app", "close"); $('.apps').hide(); }); $('.my-btns').after($('.apps'));
    })
}
function mkhandel2(mid) {
    $('.pop-pic .tips a#goon').click(function () { $('.pop-pic').hide(); $('#wrapper').show(); }); $('.go_make').click(function () {
        var _this = $(this); var type = $(this).attr('val'); $.post('/make/handle/', { type: type, mid: mid }, function (result) {
            if (result.sy == 1) { $('.phone-wrap').addClass('ok'); $('.phone-wrap').css('transform', 'scale(1.0)'); $('#waters').removeClass('i-water'); } else { $('.phone-wrap').css('transform', 'scale(1.0)'); $('#waters').addClass('i-water'); }
            if (result.status == 'success') {
                var div = $('.phone-wrap'); var box = div; html2canvas(div, {
                    onrendered: function (canvas) {
                        var myImage = canvas.toDataURL("image/png"); $.post('/make/handle_pic/', { myImage: myImage, mid: mid }, function (result) {
                            if (result.status == 'success') {
                                var my_image = $('.my-image'); var mask = $('.mask'); if (!my_image.length) { my_image = $('<div class="my-image">成功生成图片，点击 <a class="my-image-view" target="_blank" href="#">这里</a> 查看，<a class="my-image-continue" href="#">继续制作</a></div>'); $('body').append(my_image); }
                                if (!mask.length) { $('body').append('<div class="mask"></div>'); }
                                $('#ifm').contents().find('body').append(div); _this.hide(); $('.loading').show(); $('.my-image').hide(); $('.mask').hide(); var pop_pic = $('.pop-pic'); var pop_class = 'pc'; if (browser.versions.mobile) { pop_class = 'mobile'; }
                                pop_pic.find('.tips').addClass(pop_class); pop_pic.find('img').attr('src', myImage); pop_pic.show(); $('#wrapper').hide(); $('.loading').hide(); _this.show();
                            } else { layer.msg(result.message); }
                        }, 'json'); div.remove(); $('.clone_box').html(box);
                    }
                }); $('.apps-close').click(function () { window.localStorage.setItem("show_app", "close"); $('.apps').hide(); }); $('.my-btns').after($('.apps'));
            } else { layer.msg(result.message); }
        }, 'json');
    })
}
var water_c; function check_water(water) {
    water = 2;
    water = parseInt(water); if (water == 2) { clearInterval(water_c); }
    else if (water == 1) { var warn = '<div class="alert alert-danger">您的账号已过期，为了您的正常使用，请点击 <a target="_blank" href="/help/water.html">这里</a> 续费</div>'; $('.panel-wx-tab').prepend(warn); set_water(); water_c = setInterval(function () { set_water(); }, 500); }
    else { var warn = '<div class="alert alert-info">您当前是免费会员，成为VIP会员即可去除水印，详情点击 <a target="_blank" href="/help/water.html">这里<a/> 查看</div>'; $('.panel-wx-tab').prepend(warn); set_water(); water_c = setInterval(function () { set_water(); }, 500); }
    // if ($(".my-btns").is(":visible")) {
    //     ajax_http("/api/user/info", "get", {}, function (result) {
    //         if (result['data']['water'] == 0) { clearInterval(water_c); }
    //         else { set_water(); water_c = setInterval(function () { set_water(); }, 500); }
    //     }, function (result) { })
    // }
}