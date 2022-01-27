




//let transRef = new URLSearchParams(window.location.search).get('reference');
let transRef = 'grva34z5w4';
alert(transRef)

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
    alert("working")
    fetch('https://api.paystack.co/transaction/verify/' + transRef, options)
      .then(response => response.json())
      .then(response => console.log(response))
     // .then(response => window.location.href = response.data.authorization_url)
      .catch(err => console.error(err));
  }
  
  startPay();


// https://api.paystack.co/transaction/verify/kid6po8oad