let getCartMealDiv = document.querySelector("#cartDiv");
let getNumofCartedMeals = document.querySelector("#cartHeadTitle span");
let getParentModal = document.querySelector("#modalParent");
let getModal = document.querySelector("#modal");


// function that get the number of carted meals and display at top of the cart page

let numOfCartedMeals = () => {
    const cartedMealsIds =  JSON.parse(localStorage.getItem('cartedMealId'));
    let cartNum = cartedMealsIds.length;
        getNumofCartedMeals.innerText = cartNum;
    
    
}



// getting list of meals id added to cart
let getCartedMealIdFromLS = function () {
    const cartMealsId = JSON.parse(localStorage.getItem('cartedMealId'));
    getCartedMeal(cartMealsId);
}



// fetching carted meal data section
let getCartedMeal = async function (id) {
    if (id == null) {
        getCartMealDiv.innerHTML = "Your haven't add any meals to your cart"
    } else {
        getCartMealDiv.innerHTML = "";
    }

    
    for (let i = 0; i < id.length; i++) {
        let CartmealUrl = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + id[i];
        let Cartmeal = await fetch(CartmealUrl);
        let CartmealRes  = await Cartmeal.json();
        CartmealData = CartmealRes.meals[0];
        getCartMealDiv.innerHTML += `
            <div id="mealcart">
            <input type="checkbox" id="in${CartmealData.idMeal}"/>
             <label for="in${CartmealData.idMeal}" onclick="getCheckedMeal(${CartmealData.idMeal})" id="checkLabel">
                <div id="check${CartmealData.idMeal}" class="customCheckbox"></div>
                <img src="${CartmealData.strMealThumb}" alt="">
              </label>
         
                <div id="a${CartmealData.idMeal}" class="checkinfo">
                    <p>${CartmealData.strMeal}</p>
                    <div id="lowerInfo">
                        <div id="price">
                            <p id="priceAmount">NGN <span>1000</span>.00</p>
                            <p class="shipping">Free Shipping</p>
                        </div>
                        <div class="quantity">
                            <span id="minus" onclick="updateMealQuantity(this, ${CartmealData.idMeal}, 1000)">-</span>
                            <span id="value">1</span>
                            <span id="plus" onclick="updateMealQuantity(this, ${CartmealData.idMeal}, 1000)">+</span>
                        </div>
                    </div>
                </div>
            </div>
        `
    }
}





let updateMealQuantity = function (x, id, p) {
    //  x is the element that called this function
    // y is the meal id
    // p is the price of the meal
    y = String(id);
    let mealQuantity = document.querySelector("#a" + y + " #value");
    let mealPrice = document.querySelector("#a" + y + " #priceAmount span");
    
    let minusBtn = document.querySelector("#a" + y + " #minus");
    let getCheckBox = document.querySelector("#" + "in" + y);
     let getcustomCheckBox = document.querySelector("#" + "check" + y);
     let getCheckedMealPrice = document.querySelector("#a" + y + " #priceAmount span");
     let mealTotalPrice = getCheckedMealPrice.innerText;
    
    
    
   
    if (x.innerText === "+") {
      
      if (getCheckBox.checked) {
        getCheckBox.checked = false;
        getcustomCheckBox.style.cssText = "background-color:white; border:1px solid rgba(0,0,0,0.44);";
        delCheckedMealFromLS(y);
        updateNumOfCheckedMeals();
        minusMealPriceFromCheckoutAmount(mealTotalPrice);
        
        mealQuantity.innerText++;
        minusBtn.style.backgroundColor = "white";
        mealPrice.innerText = p * mealQuantity.innerText;
        
        getCheckBox.checked = true;
        getcustomCheckBox.style.cssText = "background: linear-gradient(to bottom right, rgb(255, 0, 0), rgb(255, 89, 0), yellow); border:none;";
        saveCheckedMealToLS(y);
        updateNumOfCheckedMeals();
        
        let getupCheckedMealPrice = document.querySelector("#a" + y + " #priceAmount span");
        let upmealTotalPrice = getupCheckedMealPrice.innerText;
        
        addMealPriceToCheckoutAmount(upmealTotalPrice);
      } else {
        mealQuantity.innerText++;
        minusBtn.style.backgroundColor = "white";
        mealPrice.innerText = p * mealQuantity.innerText;
        
      }
      
       
         
    } else if (x.innerText === "-") {
        if (mealQuantity.innerText < 2) {
            alert("Minimum meal is 1")
        } else{
          if (getCheckBox.checked) {
            getCheckBox.checked = false;
            getcustomCheckBox.style.cssText = "background-color:white; border:1px solid rgba(0,0,0,0.44);";
            delCheckedMealFromLS(y);
            updateNumOfCheckedMeals();
            minusMealPriceFromCheckoutAmount(mealTotalPrice);
          
          
            mealQuantity.innerText--;
            if (mealQuantity.innerText === "1") {
               minusBtn.style.backgroundColor = "rgba(0,0,0,0.131)";
            }
            mealPrice.innerText = p * mealQuantity.innerText;
            getCheckBox.checked = true;
            getcustomCheckBox.style.cssText = "background: linear-gradient(to bottom right, rgb(255, 0, 0), rgb(255, 89, 0), yellow); border:none;";
            saveCheckedMealToLS(y);
            updateNumOfCheckedMeals();
            
            let getupCheckedMealPrice = document.querySelector("#a" + y + " #priceAmount span");
            let upmealTotalPrice = getupCheckedMealPrice.innerText;
            
                addMealPriceToCheckoutAmount(upmealTotalPrice);
          } else {
            mealQuantity.innerText--;
            if (mealQuantity.innerText === "1") {
              minusBtn.style.backgroundColor = "rgba(0,0,0,0.131)";
            }
            mealPrice.innerText = p * mealQuantity.innerText;
          }
        }
    }
}


// function that runs whnever a meal is checked
let getCheckedMeal = function (id) {
  let getcustomCheckBox = document.querySelector("#" + "check" + id);
  let getCheckBox = document.querySelector("#" + "in" + id);
  let getCheckedMealPrice = document.querySelector("#a" + id + " #priceAmount span");
  let mealTotalPrice = getCheckedMealPrice.innerText;
  // converts the id from number to string
  id = String(id);
  
  if (!getCheckBox.checked) {
    getcustomCheckBox.style.cssText = "background: linear-gradient(to bottom right, rgb(255, 0, 0), rgb(255, 89, 0), yellow); border:none;";
    saveCheckedMealToLS(id);
    updateNumOfCheckedMeals();
    addMealPriceToCheckoutAmount(mealTotalPrice);
    
  } else {
   getcustomCheckBox.style.cssText = "background-color:white; border:1px solid rgba(0,0,0,0.44);";
   delCheckedMealFromLS(id);
   updateNumOfCheckedMeals();
   minusMealPriceFromCheckoutAmount(mealTotalPrice);
  }
  
}


// function that add checked meal to checkmealid in LS
let saveCheckedMealToLS = (mealId) => {
    let newData = mealId;

    if (localStorage.getItem('checkedMealId') == null) {
        localStorage.setItem('checkedMealId', '[]');
    }

    let oldData = JSON.parse(localStorage.getItem('checkedMealId'));
    oldData.push(newData);

    localStorage.setItem('checkedMealId', JSON.stringify(oldData))
}


// function that deletes meals from checkedmealsid in LS when unchecked
let delCheckedMealFromLS = (mealId) => {
    const listCheckedMealIds = JSON.parse(localStorage.getItem('checkedMealId'));

    localStorage.setItem('checkedMealId', JSON.stringify(listCheckedMealIds.filter(favId => favId !== mealId)))
}


// function that updates the number of checked meal on the checkout buttons
let updateNumOfCheckedMeals = function () {
  const listCheckedMealIds = JSON.parse(localStorage.getItem('checkedMealId'));
  let getCheckoutSpan = document.querySelector("#checkoutBtn span")
     getCheckoutSpan.innerText = listCheckedMealIds.length;
}


// function that delete the previous checkedMealsId from the local storage whenever the page loads
let delFromLS = function () {
  localStorage.removeItem("checkedMealId");
}


// function that add the checkedMealPrice to the checkout amount
// take note of the uppercase letter P used in (ip and np) in this function
let addMealPriceToCheckoutAmount = function (p) {
  let getCheckoutTotalAmount = document.querySelector("#checkoutPrice span");
  let nP = Number(p);
  let iP = Number(getCheckoutTotalAmount.innerText)
  
   iP += nP;
   getCheckoutTotalAmount.innerText = iP;
   
}


// function that deducts an unchecked meal price from the checkout amount
let minusMealPriceFromCheckoutAmount = function (p) {
 let getCheckoutTotalAmount = document.querySelector("#checkoutPrice span");
 let nP = Number(p);
 let iP = Number(getCheckoutTotalAmount.innerText)
 
 iP -= nP;
 getCheckoutTotalAmount.innerText = iP;
   
}

// function to reset the checkout price and the checkout span
let resetCheckout = () => {
  let getCheckoutAmount = document.querySelector("#checkoutPrice span");
  let getCheckoutmeals = document.querySelector("#checkoutBtn span")
  getCheckoutAmount.innerText = 0;
  getCheckoutmeals.innerText = 0;
}



// function that runs when the delete icon is clicked
let delFromCart = () => {
  const CheckedMeals = JSON.parse(localStorage.getItem('checkedMealId'));
  
  for (var i = 0; i < CheckedMeals.length; i++) {
    const cartMealsId = JSON.parse(localStorage.getItem('cartedMealId'));
  localStorage.setItem('cartedMealId', JSON.stringify(cartMealsId.filter(favId => favId !== CheckedMeals[i])));
  }
  
  getCartedMealIdFromLS();
  numOfCartedMeals();
  delFromLS();
  resetCheckout();
}


// functions that handles the checkout modal

// function that runs whenever the checkout button is clicked

let checkingOut = async function () {
  
 let sAmount = Number(document.querySelector("#checkoutPrice span").innerText);
 const sMeals = JSON.parse(localStorage.getItem('checkedMealId'));
 
 
 if (!sMeals) {
   alert("Nothing to checkout")
 } else {
 
 getParentModal.style.display = "block";

 getModal.innerHTML = `
          <div id="modHead">
            <span onclick="closeModal()">&times;</span>
            <h2>Checkout</h2>
          </div>
          <h4 id="modTab">Delivery</h4>
          <p id="address">USER DETAILS</p>
          <div id="userInfo" class ="animate__animated animate__slideInUp animate__faster">
            <input class ="animate__animated animate__slideInUp animate__fast" id="inputUsername" type="text" placeholder="Username"/>
            <input class ="animate__animated animate__slideInUp animate__fast" id="inputEmail" type="text" placeholder="User email address"/>
          </div>
          <p id="address">ADDRESS DETAILS</p>
          <div id="location" class ="animate__animated animate__slideInUp animate__faster">
            <h3>Would you like this meal delivered to your current location?</h3>
            <div id="yesno">
              <div onclick="getLocation()" id="yes">YES</div>
              <div onclick="manuallyInputLocation()" id="no">NO</div>
            </div>
          </div>
          
          <p class="animate__animated animate__slideInRight animate__fast" id="shippinginfo">SHIPPING DETAILS</p>
          <div id="shipping"></div>
          
          <div class="animate__animated animate__slideInUp animate__fast" id="total">
            <p id="subtotal">Subtotal <span>NGN  <span>${sAmount}</span>.00</span></p>
            <p id="shippingFee">Shipping <span>free</span></p>
             <hr>
            <p id="totalfee">Total <span>NGN <span>${sAmount}</span>.00</span></p>
            <div onclick="loadPaymentTab()" id="propaymentBtn">PROCEED TO PAYMENT</div>
          </div>
 `;
 
 let shiporder = document.querySelector("#shipping");
 for (var i = 0; i < sMeals.length; i++) {
   let mealQuantity = document.querySelector("#a" + sMeals[i] + " #value").innerText;
   let smealUrl = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + sMeals[i];
   let smeal = await fetch(smealUrl);
   let smealRes = await smeal.json();
   let ShipmealData = smealRes.meals[0];
   
   shiporder.innerHTML += `
      <div id="eachorder">
        <p id="package">PACKAGE ${i + 1} OF ${sMeals.length}</p>
        <p id="order"> <span>${mealQuantity} x</span>${ShipmealData.strMeal}</p>
        <p id="eta">delivered to you in less than 1hour</p>
        <p id="prepare">Prepared by <img src="images/logo-small.png" alt=""></p>
      </div>
    `
 };
 
 
 setTimeout(updateScroll, 10);
   }
}

// function that loads the modal payment tab
let loadPaymentTab = function () {
 let sAmount = Number(document.querySelector("#checkoutPrice span").innerText);
 let getDeliveryAddress = document.querySelector("#inputAddress");
 let getUsername = document.querySelector("#inputUsername");
 let getEmail = document.querySelector("#inputEmail");
 let emailPattern = /^([\w\d-_]+)@([a-z-\.]+)\.([a-z]{2,9})([\.[a-z]{2,8})?$/
 
 if (getUsername.value == "") {
   alert("Username cannot be empty")
 } else if (getUsername.value.length < 3) {
   alert("Username too short")
   }else if (!emailPattern.test(getEmail.value)) {
   alert("Kindly provide a valid email address")
 } else if (getDeliveryAddress == null || getDeliveryAddress.value == "") {
   alert("Delivery address cannot be empty")
 } else if (getDeliveryAddress.value.length < 10) {
   alert("Delivery address too short")
   }else {
  getModal.innerHTML = `
         <div id="modHead">
            <span onclick="closeModal()">&times;</span>
            <h2>Checkout</h2>
         </div> 
         <h4 id="modTab">summary</h4> 
         <p id ="address">CONFIRM THE DETAILS</p> 
         <div class ="animate__animated animate__slideInUp animate__faster" id="confirm">
           <p>Username: <span>${getUsername.value}</span></p>
            <hr>
            <p id="confirmEmail">Email: <span>${getEmail.value}</span></p> 
            <hr>
            <p>Address: <span>${getDeliveryAddress.value}</span></p> 
            <hr>
            <p>Total: <span>NGN ${sAmount}.00</span></p>
           </div>
       
        <p id="address">PAYMENT METHOD</p>
         <div id="paymentMethod">
           Pay now. Stay safe. Go cashless with Paystack
          </div>
          <div id="propaymentBtn" onclick="callPaystack()">CONFIRM</div>
           <div onclick="checkingOut()" id="prevBtn">BACK TO DELIVERY TAB</div>
  `
  setTimeout(updateScroll, 10);
 }
}

// function that scroll it back to top
let updateScroll = () => {
  getModal.scrollTop = 0;
}

// function that closes the modal whenever the close button is clicked
let closeModal = function () {
  getParentModal.style.display = "none";
}


// function that get the users location
let getLocation = function () {
  alert("Sorry, we are unable to connect to google maps API, kindly click on the NO button 👉 to input ur address manually")
};

let manuallyInputLocation = function () {
  let getLocationDiv = document.querySelector("#location");
 if (getLocationDiv.querySelector("input")) {
   // do nothing
 } else {
   getLocationDiv.innerHTML += `
     <input class ="animate__animated animate__slideInDown animate__fast" id="inputAddress" type="text" placeholder="User address here"/>
    `
 }
}


// function that runs when the confirm button is clicked to pay

let callPaystack = function () {
let sAmount = Number(document.querySelector("#checkoutPrice span").innerText);
let getEmail = document.querySelector("#confirmEmail span").innerText;
  
  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer sk_test_27002a3d2b0750fe0dab8afc4e4305b2516d9969'
    },
  
    body: JSON.stringify({
  
      email: getEmail,
      amount: sAmount * 100,
      callback_url: 'https://saykeed.github.io/Recipe-app/verify.html'
    })
  
  };
  // https://saykeed.github.io/Recipe-app/verify.html
  let startPay = async function() {
    fetch('https://api.paystack.co/transaction/initialize', options)
      .then(response => response.json())
      .then(response => window.location.href = response.data.authorization_url)
      .catch(err => console.error(err));
  }
  startPay();
}






// invoking this function(s) whenever the cart page loads
getCartedMealIdFromLS();
delFromLS();
numOfCartedMeals();





/*




*/