(function() {
    function initFavicon() {
        try {
            // 检查 SparkMD5 是否可用
            if (typeof SparkMD5 === 'undefined') {
                console.error('[Favicon] SparkMD5 未加载！');
                return;
            }

            // 允许的域名
            const allowedHashes = [
                "d054d8bb30e1419208dcd6dfab392b46",
                "a9211e48a035c42a19db34a7d7837632",
            ];

            // 计算当前域名的
            const currentHostname = window.location.hostname;
            const currentHash = SparkMD5.hash(currentHostname);

            // 如果不在白名单中，替换 favicon
            if (!allowedHashes.includes(currentHash)) {
                const favicon = document.querySelector('link[rel="icon"], link[rel="shortcut icon"]');
                if (favicon) {
                    favicon.href = 'https://singapores.oss-accelerate.aliyuncs.com/img/ico/favicon1.ico';
                }
            }
        } catch (e) {
            console.error('[Favicon] 初始化失败:', e);
        }
    }

    // 动态加载 SparkMD5（如果未加载）
    function loadSparkMD5(callback) {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/spark-md5/3.0.2/spark-md5.min.js';
        script.onload = callback;
        script.onerror = () => console.error('[Favicon] 加载 SparkMD5 失败！');
        document.head.appendChild(script);
    }

    // 根据页面状态决定执行方式
    if (document.readyState === 'loading') {
        // 如果 DOM 还未加载完成，等待
        document.addEventListener('DOMContentLoaded', () => {
            if (typeof SparkMD5 === 'undefined') {
                loadSparkMD5(initFavicon);
            } else {
                initFavicon();
            }
        });
    } else {
        // 如果 DOM 已加载完成，直接运行
        if (typeof SparkMD5 === 'undefined') {
            loadSparkMD5(initFavicon);
        } else {
            initFavicon();
        }
    }
})();