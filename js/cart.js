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
                <label for="${CartmealData.idMeal}" id="checkLabel">
                    <div id="checkDiv">
                        <input type="checkbox" id="${CartmealData.idMeal}">
                        <div class="customCheckbox"></div>
                    </div>
                    <img src="${CartmealData.strMealThumb}" alt="">
                </label>
                <div id="checkinfo">
                    <p>${CartmealData.strMeal}</p>
                    <div id="lowerInfo">
                        <div id="price">
                            <p id="priceAmount">NGN <span>1000</span>.00</p>
                            <p id="shipping">Free Shipping</p>
                        </div>
                        <div id="quantity">
                            <span id="minus" onclick="updateMealQuantity(this)">-</span>
                            <span id="value">1</span>
                            <span id="plus" onclick="updateMealQuantity(this)">+</span>
                        </div>
                    </div>
                </div>
            </div>
        `
        
    }
}





let updateMealQuantity = function (x) {
    // where x is the element that called this function
    
    let mealQuantity = document.querySelector("#value");

    if (x.innerText === "+") {
        mealQuantity.innerText++;
        
    } else if (x.innerText === "-") {
        if (mealQuantity.innerText < 2) {
            alert("Minimum meal is 1")
        } else{
            mealQuantity.innerText--;
            

        }
        
    }
}










// invoking this function(s) whenever the cart page loads
getCartedMealIdFromLS();




/*


let updateMealQuantity = function (x) {
    // where x is the element that called this function
    
    let getMealQuantityValue = document.querySelector("#value");

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



let checkMealQuantityStatus = () => {
    setInterval(checkCurrentMealQuantity, 100)
 }




 
// function to disable the minus button whenever meal quantity is 1
// to avoid setting meal quantity to a negative integers or 0
let checkCurrentMealQuantity = () => {
    let getPlusMealQuantity = document.querySelector("#plus");
    let getMinusMealQuantity = document.querySelector("#minus");
    
    if (getMealQuantityValue.innerText > 1) {
       getMinusMealQuantity.style.backgroundColor = "white"
    } else if (getMealQuantityValue.innerText < 2) {
        getMinusMealQuantity.style.backgroundColor = "rgba(0, 0, 0, 0.193)"
     }
}


*/