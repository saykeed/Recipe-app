

let getRandomMealDiv = document.querySelector("#randomMeal");
let favMealDiv = document.querySelector("#quick_meals");
let RmealData;


// fetching data section

let getFavMeal =  async function (id) {
    if (id == null) {
        favMealDiv.innerHTML = "Your Favourite meals will appear here"
    } else {
        favMealDiv.innerHTML = "";
    }
    
    for (let i = id.length-1; i >= 0; i--) {
        let FmealUrl = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + id[i];
        let Fmeal = await fetch(FmealUrl);
        let FmealRes  = await Fmeal.json();
        FmealData = FmealRes.meals[0];
        favMealDiv.innerHTML += `
        <div id="qmeal">
            <img src="${FmealData.strMealThumb}" alt="">
            <p>${FmealData.strMeal}</p>
        </div>
        `
    }
    
}

let getRandomMeal = async function () {
    let Rmeal = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');

    let RmealRes  = await Rmeal.json();
    RmealData = RmealRes.meals[0];

    getRandomMealDiv.innerHTML = `
    <img src="${RmealData.strMealThumb}" alt="Random meal">
        <div id="randomMealDesc">
            <p>${RmealData.strMeal}<i class="material-icons" onclick="like()">favorite_border</i></p>
            
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
    if (getFavBtn.innerText === "favorite") {
        alert("It has been added to your Favourite Meal already")
    } else {
        getFavBtn.innerText = "favorite";
        let mealId = RmealData.idMeal;
        saveToLS(mealId)
        getFavMealIdFromLS();
    }
    
}


// saving and getting from local storage section

let saveToLS = (mealId) => {
    let newData = mealId;

    if (localStorage.getItem('favMealId') == null) {
        localStorage.setItem('favMealId', '[]');
    }

    let oldData = JSON.parse(localStorage.getItem('favMealId'));
    oldData.push(newData);

    localStorage.setItem('favMealId', JSON.stringify(oldData))
    
}

let getFavMealIdFromLS = function () {
    const favMealsId = JSON.parse(localStorage.getItem('favMealId'));
    
    getFavMeal(favMealsId);
}







// calling this function onload
getRandomMeal();
getFavMealIdFromLS();
