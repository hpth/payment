$(document).ready(function () {
    if (isMobile) {
        $('.container').addClass(mobileClass);
    } else {
        $('.container').addClass(websiteClass);
    }

    var buildBankIcons = function () {
        var count = 19
        var banksDom = $('.banks-box')
        for (var i=1; i<=count; i++) {
            var dom = document.createElement('img')
            dom.src = `img/icon-vip-${i}.png`
            banksDom.append(dom)
        }
    }

    // buildBankIcons() //取消银行图片创建

    function countdownTimer() {
        var dom = $('.countdown')
        var timeSeconds = 120
        var timer = setInterval(function () {
            if (timeSeconds === 0) {
                clearInterval(timer)
                // TODO
            } else {
                dom.text(--timeSeconds + '')
            }
        }, 1000)
    }

    // countdownTimer() //取消倒计时
})
