

let getMealInfoDiv = document.querySelector("#mealInfo");
let clickedMealId = new URLSearchParams(window.location.search).get('id');
let getInstruction = document.querySelector("#instruction");
let instructionStatus = false;


// fetching the clicked meal info

let getClickedMeal = async function () {
    let Cmeal = await fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + clickedMealId);

    let CmealRes  = await Cmeal.json();
    CmealData = CmealRes.meals[0];

    getMealInfoDiv.innerHTML = `

        <img src="${CmealData.strMealThumb}" alt="clicked meal">
        <div id="randomMealDesc">
            <p>${CmealData.strMeal} <i class="material-icons" onclick="like()">favorite_border</i></p>
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
    
}

// function for loading how to prepare the meal instruction


let loadInstructionDiv = function () {
    console.log(instructionStatus);
    
    if (instructionStatus === false) {
        getInstruction.style.display = "block";
        instructionStatus = true;
    } else if (instructionStatus === true) {
        getInstruction.style.display = "none";
        instructionStatus = false;
    }
    
}



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

getClickedMeal()
