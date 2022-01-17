

let getTogMenu = document.querySelector("#togmenu");
let togMenuStatus = false;
let getRandomMealDiv = document.querySelector("#randomMeal");
let favMealDiv = document.querySelector("#quick_meals");
let RmealData;
let getCartWindow = document.querySelector("#cartwindow");


// section for the menu toggling

let popMenu = function () {
  if (togMenuStatus === false) {
    getTogMenu.style.cssText = "margin-left: 0; opacity: 1;";
    togMenuStatus = true;
  } else {
    getTogMenu.style.cssText = "opacity: 0; margin-left: -260px;";
    togMenuStatus = false;
  }
}






// fetching data section

let getFavMeal =  async function (id) {
    if (id == null || id == "") {
        favMealDiv.innerHTML = `
         <p id="favNote">click the ❤️ icon to add meals here</p>
        `
    } else {
        favMealDiv.innerHTML = "";
    }
    
    for (let i = id.length-1; i >= 0; i--) {
        let FmealUrl = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + id[i];
        let Fmeal = await fetch(FmealUrl);
        let FmealRes  = await Fmeal.json();
        let FmealData = FmealRes.meals[0];
        favMealDiv.innerHTML += `
            <div id="qmeal">
               <a id="qmeal_link" href="mealinfo.html?id=${FmealData.idMeal}"> 
                <img src="${FmealData.strMealThumb}" alt="">
                </a>
                <p>${FmealData.strMeal}</p>
                <div id="re${FmealData.idMeal}" class="remove" onclick="removeFav(${FmealData.idMeal})">Remove</div>
            </div>
        `
    }
}



// functions that loads the random meal
let getRandomMeal = async function () {
    let Rmeal = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');

    let RmealRes  = await Rmeal.json();
    RmealData = RmealRes.meals[0];

    getRandomMealDiv.innerHTML = `
        <a href="mealinfo.html?id=${RmealData.idMeal}"><img src="${RmealData.strMealThumb}" alt="Random meal"></a>
        <div id="randomMealDesc">
            <p>${RmealData.strMeal}<i class="material-icons" id="fav${RmealData.idMeal}" onclick="like(${RmealData.idMeal})">favorite_border</i></p>
 
            <div id="rating">
                <i class="material-icons">star</i>
                <i class="material-icons">star</i>
                <i class="material-icons">star</i>
                <i class="material-icons">star</i>
                <i class="material-icons">star</i>
            </div>
        </div>
    `
}







// function that runs when the heart button is clicked
let like = function () {
    let getFavBtn = document.querySelector("#randomMealDesc p i");
    let mealId = RmealData.idMeal;
    const favMealsId = JSON.parse(localStorage.getItem('favMealId'));
    if (favMealsId !== null && favMealsId.includes(mealId)) {
        getFavBtn.innerText = "favorite_border";
        delFromLS(mealId)
        getFavMealIdFromLS();
    } else {
        getFavBtn.innerText = "favorite";
        saveToLS(mealId)
        getFavMealIdFromLS();
    }
}


// function that runs when the remove button on the favmeal is clicked 

let removeFav = function (id) {
   let getFavBtn = document.querySelector("#fav" + id);
  let mealId = String(id);
  let x = RmealData.idMeal;
  if (mealId == x) {
    getFavBtn.innerText = "favorite_border";
  }
   delFromLS(mealId);
   getFavMealIdFromLS();
}



// saving, deleting and getting from local storage section
let saveToLS = (mealId) => {
    let newData = mealId;

    if (localStorage.getItem('favMealId') === null) {
        localStorage.setItem('favMealId', '[]');
    }

    let oldData = JSON.parse(localStorage.getItem('favMealId'));
    oldData.push(newData);

    localStorage.setItem('favMealId', JSON.stringify(oldData))
}

let delFromLS = (mealId) => {
    const favMealsId = JSON.parse(localStorage.getItem('favMealId'));

    localStorage.setItem('favMealId', JSON.stringify(favMealsId.filter(favId => favId !== mealId)));
}

// getting fav meal id and loading then into the page
let getFavMealIdFromLS = function () {
    const favMealsId = JSON.parse(localStorage.getItem('favMealId'));
    
    getFavMeal(favMealsId);
}



// function that get the number of carted meals and display at top of the cart icon

let numOfCartedMeals = () => {
    const cartedMealsIds =  JSON.parse(localStorage.getItem('cartedMealId'));
    let cartNum = cartedMealsIds.length;
    if (cartNum < 1) {
        getCartWindow.style.display = "none";
    } else {
        getCartWindow.style.display = "block";
        getCartWindow.innerText = cartNum;
    }
    
}






// calling this function onload
getRandomMeal();
getFavMealIdFromLS();
numOfCartedMeals();


