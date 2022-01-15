let getCartMealDiv = document.querySelector("#cartDiv");



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
                            <p id="shipping">Free Shipping</p>
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





let updateMealQuantity = function (x, y, p) {
    //  x is the element that called this function
    // y is the meal id
    // p is the price of the meal
    
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
      }
      
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
          }
          
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
        }
    }
}


// function that runs whnever a meal is checked
let getCheckedMeal = function (id) {
  let getcustomCheckBox = document.querySelector("#" + "check" + id);
  let getCheckBox = document.querySelector("#" + "in" + id);
  let getCheckedMealPrice = document.querySelector("#a" + id + " #priceAmount span");
  let mealTotalPrice = getCheckedMealPrice.innerText;
  
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
  
  
  //getCheckBoxStatus();
  
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


// function that runs whenever the checkout button is clicked
let checkingOut = function () {
  alert("Your total price is ...")
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








// invoking this function(s) whenever the cart page loads
getCartedMealIdFromLS();
delFromLS();





/*







*/