var pollingST = null;
var pollingInfo = {};
var maxCount = 50;
var count = 0;

async function polling(orderNo, baseURL) {

  const response = await fetch(`${baseURL}/pay/common/status/${orderNo}`);
  const res = await response.json();
    if(res.status == '1'){
        Object.assign(pollingInfo, res.data);
            
    if (pollingInfo.orderStatus == '1' || pollingInfo.orderStatus == '0') {
       if (count > maxCount) {
            clearTimeout(pollingST);
            count = 0;
            return;
        }
         pollingST = setTimeout(() => {
            clearTimeout(pollingST);
            polling(orderNo, baseURL);
          }, 3000);
          count++;   
    } else  if (["2", "3", "4", "5"].includes(pollingInfo.orderStatus) && pollingInfo.redirectUrl) {
        clearTimeout(pollingST);
        count = 0;
        if (document.getElementById("PaymentStatusId") && document.getElementById("PaymentStatusId").innerHTML) {
             document.getElementById("PaymentStatusId").innerHTML= pollingInfo.orderStatus == "3" ? 'Payment Failed' : 'Payment Successful'
        }
          window.location.href = pollingInfo.redirectUrl;
          return;
    } else {
       clearTimeout(pollingST);
        count = 0;
        alert(res.data.msg);
    }
    } else {
        clearTimeout(pollingST);
        count = 0;
        alert(res.data.msg);
    }
}

function initPolling(orderNo, baseURL) {
  if (pollingST) {
    clearTimeout(pollingST);
    count = 0;
  }
  polling(orderNo, baseURL);
}