



let getMealInfoDiv = document.querySelector("#mealInfo");
let clickedMealId = new URLSearchParams(window.location.search).get('id');

let instructionStatus = false;


// fetching the clicked meal info
let getClickedMeal = async function () {
    let Cmeal = await fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + clickedMealId);

    let CmealRes  = await Cmeal.json();
    let CmealData = CmealRes.meals[0];

    getMealInfoDiv.innerHTML = `

        <img src="${CmealData.strMealThumb}" alt="clicked meal">
        <div id="randomMealDesc">
            <p>${CmealData.strMeal} <i id="favIcon" class="material-icons" onclick="likeMeal()"></i></p>
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
            <div id="mealBtn" onclick="loadInstructionDiv()">Read Doc</div>
            <div id="instruction">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus sunt neque, et est libero aperiam nihil, animi impedit itaque aliquam laudantium, minima voluptatem. Beatae laudantium modi perferendis vel laboriosam. Mollitia.
            </div>
            <a href="${CmealData.strYoutube}" target="blank" id="mealBtn">Watch Youtube Video</a>
        </div>

    `
    checkIfMealIsAddedToFav();
    
}

// function for loading how to prepare the meal instruction
let loadInstructionDiv = function () {
    let getInstruction = document.querySelector("#instruction");

    if (instructionStatus === false) {
        getInstruction.style.display = "block";
        instructionStatus = true;
    } else if (instructionStatus === true) {
        getInstruction.style.display = "none";
        instructionStatus = false;
    }
    
}



// function that runs when the heart button is clicked
let likeMeal = function () {
    alert("working")
}



// functions that runs when when add to cart button is clicked
let addtoCart = function () {
    saveToLS(clickedMealId)
}

// function to save clickedmeal into local storage to access it in cart

let saveToLS = (mealId) => {
    let newData = mealId;

    if (localStorage.getItem('cartedMealId') == null) {
        localStorage.setItem('cartedMealId', '[]');
    }

    let oldData = JSON.parse(localStorage.getItem('cartedMealId'));
    oldData.push(newData);

    localStorage.setItem('cartedMealId', JSON.stringify(oldData))
}



// functinn to check if meal has already added to favorite meal
let checkIfMealIsAddedToFav = () => {
    const favMealsId = JSON.parse(localStorage.getItem('favMealId'));
    let getFavIcon = document.querySelector("#favIcon");

    if (favMealsId !== null && favMealsId.includes(clickedMealId)) {
        getFavIcon.innerText = "favorite";
    } else {
        getFavIcon.innerText = "favorite_border"
    }
}







getClickedMeal()


