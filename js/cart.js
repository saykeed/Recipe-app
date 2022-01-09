let getCartMealDiv = document.querySelector("#cartDiv");



// getting list of meals id added to cart
let getCartedMealIdFromLS = function () {
    const cartMealsId = JSON.parse(localStorage.getItem('cartedMealId'));
    console.log(cartMealsId);
    getCartedMeal(cartMealsId);
}

/*

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



// invoking this function(s) whenever the cart page loads
getCartedMealIdFromLS();

*/