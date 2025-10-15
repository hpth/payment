// pollingManager.js
class PollingManager {
    constructor(vueInstance, options = {}) {
        this.vm = vueInstance;
        this.maxCount = options.maxCount || 50;
        this.interval = options.interval || 3000;
        this.count = 0;
        this.pollingST = null;
        this.pollingInfo = {};
    }

    startPolling(orderNo) {
        this.count = 0;
        if (this.pollingST) {
            clearTimeout(this.pollingST);
        }
        this._poll(orderNo);
    }

    stopPolling() {
        this.count = 0;
        if (this.pollingST) {
            clearTimeout(this.pollingST);
            this.pollingST = null;
        }
    }

    async _poll(orderNo) {
        this.count++;
        const response = await fetch(`${this.vm.baseURL}/pay/common/status/${orderNo}`);
            const res = await response.json();
        if(res.status == '1'){
            Object.assign(this.pollingInfo, res.data);
                
        // Order status handling
        if (this.pollingInfo.orderStatus == '1' || this.pollingInfo.orderStatus == '0') {
            // Check max count
            if (this.count > this.maxCount) {
                this.stopPolling();
                return;
            }
            
            // Continue polling
            this.pollingST = setTimeout(() => {
                this._poll(orderNo);
            }, this.interval);
        } else if (["2", "3", "4", "5"].includes(this.pollingInfo.orderStatus) && this.pollingInfo.redirectUrl) {
            // Success or failure - stop polling and redirect
            this.stopPolling();
            window.location.href = this.pollingInfo.redirectUrl;
        }
        } else {
            this.stopPolling();
            this.vm.$message.error(res.msg);
        }
    }
}