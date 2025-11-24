// configManager.js
function getConfig() {
    const origin = location.origin;
    const env = origin == 'https://cashier.haipay.top' ? 'prod' : origin == 'https://www.payment-cashier.com' ? 'prod': origin == 'https://cashier.fivezeroone.tech' ? 'prod': origin == 'https://cashier.gcash.tech' ? 'prod' : origin.indexOf('uat') > -1 ? 'test' : 'dev'
    
    let baseURL = '';
   if(env=='dev'){
      baseURL='http://192.168.1.101:8095'//开发环境
    }
    if(env=='test'){  //测试环境
      if(origin ==='https://uat.payment-cashier.com') {
         baseURL = 'https://uat-checkout.payment-cashier.com'
      }else if( origin === 'https://uat-cashier.fivezeroone.tech') {
        baseURL = 'https://uat-checkout.fivezeroone.top'
      }else {
        baseURL = 'https://uat-cashier-api.haipay.top' //测试环境
      }
    }
    if(env=='prod'){
      if(origin == 'https://www.payment-cashier.com' || origin == 'https://cashier.gcash.tech') {
         baseURL = 'https://checkout.payment-cashier.com' //正式环境新地址
      } else if(origin == 'https://cashier.fivezeroone.tech') {
         baseURL = 'https://checkout.fivezeroone.top' //正式环境新地址
      } else {
         baseURL = 'https://checkout.haipay.top' //正式环境新地址
      }
    }
    return {
        env,
        baseURL
    };
}