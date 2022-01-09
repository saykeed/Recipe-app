



let getMealInfoDiv = document.querySelector("#mealInfo");
let clickedMealId = new URLSearchParams(window.location.search).get('id');
let CmealData;

let instructionStatus = false;


// fetching the clicked meal info
let getClickedMeal = async function () {
    let Cmeal = await fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + clickedMealId);

    let CmealRes  = await Cmeal.json();
    CmealData = CmealRes.meals[0];

    getMealInfoDiv.innerHTML = `

        <img src="${CmealData.strMealThumb}" alt="clicked meal">
        <div id="randomMealDesc">
            <p>${CmealData.strMeal} <i id="favIcon" class="material-icons" onclick="likeMeal(this)"></i></p>
            <div id="rating">
                <i class="material-icons">star</i>
                <i class="material-icons">star</i>
                <i class="material-icons">star</i>
                <i class="material-icons">star</i>
                <i class="material-icons">star</i>
            </div>
        </div>
        <div id="others">
            <div id="mealBtn" onclick="addtoCart()">Add to Cart</div>
            <p>Wanna Prepare it Yourself?</p>
            <div id="mealBtn" class="docBtn" onclick="loadInstructionDiv()">Read Doc<i class="material-icons">keyboard_arrow_up</i></div>
            <div id="instruction">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus sunt neque, et est libero aperiam nihil, animi impedit itaque aliquam laudantium, minima voluptatem. Beatae laudantium modi perferendis vel laboriosam. Mollitia.
            </div>
            <a href="${CmealData.strYoutube}" target="_blank" id="mealBtn">Watch Youtube Video</a>
        </div>

    `
    checkIfMealIsAddedToFav();
    
}

// function to check if meal has already added to favorite meal
let checkIfMealIsAddedToFav = () => {
    const favMealsId = JSON.parse(localStorage.getItem('favMealId'));
    let getFavIcon = document.querySelector("#favIcon");

    if (favMealsId !== null && favMealsId.includes(clickedMealId)) {
        getFavIcon.innerText = "favorite";
    } else {
        getFavIcon.innerText = "favorite_border"
    }
}





// function that runs when the heart button is clicked
let likeMeal = function (x) {
    let getFavIcon = x;
    let mealId = clickedMealId;
    const favMealsId = JSON.parse(localStorage.getItem('favMealId'));
    if (favMealsId !== null && favMealsId.includes(mealId)) {
        getFavIcon.innerText = "favorite_border";
        delFromLS(mealId)
    } else {
        getFavIcon.innerText = "favorite";
        saveToLS(mealId)
    }
}

// functions that add, delete, or get from favMealsId local storage
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

    localStorage.setItem('favMealId', JSON.stringify(favMealsId.filter(favId => favId !== mealId)))
}




// functions that runs when when add to cart button is clicked
let addtoCart = function () {
    const cartedMealsIds =  JSON.parse(localStorage.getItem('cartedMealId'));

    if (cartedMealsIds !== null && cartedMealsIds.includes(clickedMealId)) {
        // do not add this meal to cart
        alert('It has been added to cart')
    } else {
        saveCartToLS(clickedMealId);
    }
    
    
}

// function to save clickedmeal into local storage to access it in cart
let saveCartToLS = (mealId) => {
    let newData = mealId;

    if (localStorage.getItem('cartedMealId') == null) {
        localStorage.setItem('cartedMealId', '[]');
    }

    let oldData = JSON.parse(localStorage.getItem('cartedMealId'));
    oldData.push(newData);

    localStorage.setItem('cartedMealId', JSON.stringify(oldData))
}






// function for loading how to prepare the meal instruction
let loadInstructionDiv = function () {
    let getInstruction = document.querySelector("#instruction");
    let getReadDocIcon = document.querySelector(".docBtn i")
    if (instructionStatus === false) {
        getInstruction.style.display = "block";
        getReadDocIcon.style.transform= "rotate(180deg)";
        getInstruction.innerText = CmealData.strInstructions;
        instructionStatus = true;
    } else if (instructionStatus === true) {
        getReadDocIcon.style.transform= "rotate(0deg)";
        getInstruction.style.display = "none";
        instructionStatus = false;
    }
    
}




getClickedMeal()


