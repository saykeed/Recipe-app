


let getAlertBox = document.querySelector("#status");
let transRef = new URLSearchParams(window.location.search).get('trxref');



// function that runs when the user is redirected to the verify page

  const options = {
    method: 'GET',
    headers: {
      //Accept: 'application/json',
     // 'Content-Type': 'application/json',
      Authorization: 'Bearer sk_test_27002a3d2b0750fe0dab8afc4e4305b2516d9969'
    }
  };
  
  let startPay = async function() {
    fetch('https://api.paystack.co/transaction/verify/' + transRef, options)
      .then(response => response.json())
      .then(response => paymentStatus(response))
     
      .catch(err => console.error(err));
  }
  
  startPay();
  
let paymentStatus = function (res) {
  if (res.data.status === 'success') {
    getAlertBox.style.display = "flex";
  } else {
    alert('failed')
  }
}

// https://api.paystack.co/transaction/verify/kid6po8oad