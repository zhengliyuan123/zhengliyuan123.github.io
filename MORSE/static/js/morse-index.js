var isEncode = true;
var encodeSrc = '../static/images/encode.png'
var unlockSrc = '../static/images/unlock.png'
var codeBtn = $('.btn img')
$('.btn-change').click(function() {
    var text_box = $('.text-box');
    var morse_box = $('.morse-box');
    var change_box = $('.change-box');
    if (isEncode) {
        $('.text-box').insertAfter(change_box);
        morse_box.insertBefore(change_box);
        isEncode = false;
        codeBtn.attr('src', unlockSrc)
    }else{
        morse_box.insertAfter(change_box);
        text_box.insertBefore(change_box);
        isEncode = true;
        codeBtn.attr('src', encodeSrc)
        $('.morse-input').change(function (e) { 
            e.preventDefault();
            if($('.morse-input').val() == ''){
                $('.text-input').val('')
            }
        });
    }
});
codeBtn.mousedown(function(){
    let src = $(this).attr('src')
    $(this).attr('src', src.replace('.png', '-active.png'))
})
codeBtn.mouseup(function(){
    let src = $(this).attr('src')
    $(this).attr('src', src.replace('-active.png', '.png'))
})
codeBtn.click(function() {
    console.log('click', isEncode)
    if(isEncode){
        //加密
        var text = $('.text-input').val();
        textToMorse(text);
    }else{
        //解密
        var morse = $('.morse-input').val();
        morseToText(morse);
    }
});
function textToMorse(text){
    if(text == ''){
        alert('请输入文本')
    }
    console.log(text)
    $.ajax({
        type: "post",
        url: "/text2morse",
        data: JSON.stringify({'text': text}),
        dataType: "json",
        success: function (response) {
            console.log(response.result)
            var morse = response.result;
            $('.morse-input').val(morse);
        }
    });
}
function morseToText(morse){
    if(morse == ''){
        alert('请输入摩斯密码')
    }
    $.ajax({
        type: "post",
        url: "/morse2text",
        data: JSON.stringify({'morse': morse}),
        dataType: "json",
        success: function (response) {
            console.log(response)
            var text = response.result;
            $('.text-input').val(text);
        }
    });
}
    $('.text-input').on('input',function (e) { 
        e.preventDefault();
        if(!isEncode) return;
        $('.morse-input').val('')
        // console.log('change')
        // if($('.text-input').val().length === 0){
        //     $('.morse-input').val('')
        // }
    });

    $('.morse-input').on('input',function (e) { 
        e.preventDefault();
        if(isEncode) return;
        $('.text-input').val('')
        // if($('.morse-input').val().length === 0){
        //     $('.text-input').val('')
        // }
    });
