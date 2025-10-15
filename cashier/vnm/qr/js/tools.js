var mobileClass = 'root';
var websiteClass = 'website'
var resizeTimer = null;
var countdownTimes = 20;

var isMobile = window.navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i) !== null;
$(window).resize(function () {
    console.log('isMobile',isMobile);
    if (resizeTimer) clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
        isMobile = window.navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i) !== null;
        $('.container').removeClass(!isMobile ? mobileClass : websiteClass)
        $('.container').addClass(isMobile ? mobileClass : websiteClass)
    }, 100);
})

window.alert = {
    success: function (msg) {
        var yesDom = $('.cus-alert-success')
        if (yesDom.css('display') == 'block') return
        yesDom.text(msg)
        yesDom.fadeIn(200)
        setTimeout(function () {
            yesDom.fadeOut(200)
        }, 2000)
    },
    error: function (msg) {
        var noDom = $('.cus-alert-error')
        if (noDom.css('display') == 'block') return
        noDom.text(msg)
        noDom.fadeIn(200)
        setTimeout(function () {
            noDom.fadeOut(200)
        }, 2000)
    }
}

window.downloadQr = function () {
    var oA = document.createElement("a");
    oA.download = 'qrcode';
    oA.href = $('.qr-code-box').find('img')[0].src;
    document.body.appendChild(oA);
    oA.click();
    oA.remove();
}

window.openApp = function (appCodeUrl) {
    var ua = navigator.userAgent.toLowerCase();
    var isAndroid = ua.indexOf('android') != -1;
    if (isAndroid) {
        window.location.href = decodeURIComponent(appCodeUrl);
    } else {
        var a = document.createElement('a');
        a.setAttribute('href', decodeURIComponent(appCodeUrl));
        a.setAttribute('target', '_blank');
        a.setAttribute('id', 'transQrCodeId');
        // 防止反复添加
        if (!document.getElementById('transQrCodeId')) {
            document.body.appendChild(a);
        }
        a.click();
    }
}

window.copyText = function (text) {
    var clipboard = new ClipboardJS('.copy', {
        text: function () {
            return text
        }
    });
    clipboard.on('success', function (e) {
        this.alert.success('Thành công')
        e.clearSelection();
    });
    clipboard.on('error', function (e) {
        this.alert.error(e)
    });
}

window.countdownTimer = function () {
    var dom = $('.countdown')
    var timer = setInterval(function () {
        if (countdownTimes === 0) {
            clearInterval(timer)
            // TODO
        } else {
            let t = --countdownTimes
            dom.text(`${t > 9? t: '0' + t}`)
        }
    }, 1000)
}