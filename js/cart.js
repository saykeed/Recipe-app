let getCartMealDiv = document.querySelector("#cartDiv");
let getPlusMealQuantity = document.querySelector("#plus");
let getMinusMealQuantity = document.querySelector("#minus");
let getMealQuantityValue = document.querySelector("#value");
let getMealPrice = document.querySelector("#priceAmount span")
let defaultMealPrice = 1000;

getMealQuantityValue.innerHTML = 1;
getMealPrice.innerHTML = defaultMealPrice;



// getting list of meals id added to cart
let getCartedMealIdFromLS = function () {
    const cartMealsId = JSON.parse(localStorage.getItem('cartedMealId'));
    console.log(cartMealsId);
    getCartedMeal(cartMealsId);
}



// fetching carted meal data section
let getCartedMeal =  async function (id) {
    if (id == null) {
        getCartMealDiv.innerHTML = "Your haven't add any meals to your cart"
    } else {
        getCartMealDiv.innerHTML = "";
    }
    
    for (let i = id.length-1; i >= 0; i--) {
        let CartmealUrl = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + id[i];
        let Cartmeal = await fetch(CartmealUrl);
        let CartmealRes  = await Cartmeal.json();
        CartmealData = CartmealRes.meals[0];
        getCartMealDiv.innerHTML += id[i]
    }
}




let updateMealQuantity = function (x) {
    // where x is the element that called this function
    if (x.innerText === "+") {
        getMealQuantityValue.innerText++;
        getMealPrice.innerText = getMealQuantityValue.innerText * defaultMealPrice;
    } else if (x.innerText === "-") {
        if (getMealQuantityValue.innerText < 2) {
            alert("Minimum meal is 1")
        } else{
            getMealQuantityValue.innerText--;
            getMealPrice.innerText = getMealQuantityValue.innerText * defaultMealPrice;

        }
        
    }
}

// function to disable the minus button whenever meal quantity is 1
// to avoid setting meal quantity to a negative integers or 0
let checkCurrentMealQuantity = () => {
    
    if (getMealQuantityValue.innerText > 1) {
       getMinusMealQuantity.style.backgroundColor = "white"
    } else if (getMealQuantityValue.innerText < 2) {
        getMinusMealQuantity.style.backgroundColor = "rgba(0, 0, 0, 0.193)"
     }
}

 let checkMealQuantityStatus = () => {
    setInterval(checkCurrentMealQuantity, 100)
 }










// invoking this function(s) whenever the cart page loads
// getCartedMealIdFromLS();
checkMealQuantityStatus()
