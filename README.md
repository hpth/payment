
# 01.华为云基于全站加速WSA的OBS传输加速最佳实践
https://support.huaweicloud.com/bestpractice-obs/obs_05_2218.html

# 02.基于git

```text
1. GitHub图片路径
https://github.com/hpth/payment/blob/main/cashier/crypto/BSC.svg

2.项目位置：

hpth：项目组名称
payment：项目名称
cashier/crypto/BSC.svg： 文件在项目中的位置

3.对应GitHub自身cdn图片地址, 中间有main单词
https://raw.githubusercontent.com/hpth/payment/main/cashier/crypto/BSC.svg

4.使用三方cdn对GitHub进行加速地址， 优点：速度快, 文件类型: content-type响应准确, 完美适配前端
https://cdn.jsdelivr.net/gh/hpth/payment/cashier/crypto/BSC.svg

gh： github
hpth：项目组名称
payment：项目名称
cashier/crypto/BSC.svg： 文件在项目中的位置
```

# 刷新jsdelivr cdn脚本

```shell
curl -X POST https://purge.jsdelivr.net/  -H "Content-Type: application/json"  -d '{"path": ["/gh/hpth/payment/cashier/js/configBaseUrl.js"]}'
```