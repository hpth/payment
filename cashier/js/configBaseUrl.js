function getConfig() {
    const origin = location.origin;
    
    const ENV_CONFIG = {
        prod: {
            matchOrigins: [
                'https://cashier.haipay.top',
                'https://www.payment-cashier.com',
                'https://cashier.fivezeroone.tech',
                'https://cashier.gcash.tech',
                'https://cashier.payment-plus.com'
            ],
            baseURLMap: {
                'https://www.payment-cashier.com': 'https://checkout.payment-cashier.com',
                'https://cashier.fivezeroone.tech': 'https://checkout.fivezeroone.top',
                'https://cashier.gcash.tech': 'https://checkout.gcash.tech',
                'https://cashier.payment-plus.com': 'https://checkout.payment-plus.com',
                'https://cashier.doublewingames.com': 'https://checkout.doublewingames.com',
                default: 'https://checkout.haipay.top'
            }
        },
        test: {
            matchRule: (origin) => origin.indexOf('uat') > -1,
            baseURLMap: {
                'https://uat.payment-cashier.com': 'https://uat-checkout.payment-cashier.com',
                'https://uat-cashier.fivezeroone.tech': 'https://uat-checkout.fivezeroone.top',
                'https://uat-cashier.doublewingames.com': 'https://uat-checkout.doublewingames.com',
                'https://uat-cashier.flyflymu.com': 'https://uat-checkout.flyflymu.com',
                'https://uat-cashier.fivezeroone.top': 'https://uat-checkout.fivezeroone.top',
                default: 'https://uat-cashier-api.haipay.top'
            }
        },
        dev: {
            baseURL: 'http://192.168.1.101:8095'
        }
    };

    // 确定环境类型
    let env;
    if (ENV_CONFIG.prod.matchOrigins.includes(origin)) {
        env = 'prod';
    } else if (ENV_CONFIG.test.matchRule(origin)) {
        env = 'test';
    } else {
        env = 'dev';
    }

    // 获取对应环境的baseURL
    let baseURL;
    const currentEnvConfig = ENV_CONFIG[env];
    
    if (env === 'dev') {
        baseURL = currentEnvConfig.baseURL;
    } else {
        baseURL = currentEnvConfig.baseURLMap[origin] || currentEnvConfig.baseURLMap.default;
    }

    return {
        env,
        baseURL
    };
}