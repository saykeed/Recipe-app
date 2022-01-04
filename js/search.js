
let getSearchBox = document.querySelector("#searchMeal");
let getSearchResultBox = document.querySelector("#searchResult");
let SmealData;



let searchForMeal = async function () {
    getSearchResultBox.innerHTML = "";
    let searchedValue = getSearchBox.value;

    if (searchedValue === "" ) {
     getSearchResultBox.innerHTML = "";
    } else if (searchedValue.charAt(0) == " ") {
        getSearchResultBox.innerHTML = `
            <p id="searchInputError">Invalid Input</p>
        `;
    } else {
        
    let Smeal = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=' + searchedValue);

    let SmealRes  = await Smeal.json();
    SmealData = SmealRes.meals;
    for (let i = 0; i < SmealData.length; i++) {
        
        getSearchResultBox.innerHTML += `
            <div id="searchedMeal">
                <img src="${SmealData[i].strMealThumb}" alt="Searched meal">
                <div id="searchedMealDesc">
                    <p>${SmealData[i].strMeal} <i class="material-icons" onclick="like()">favorite_border</i></p>
                    <div id="rating">
                        <i class="material-icons">star</i>
                        <i class="material-icons">star</i>
                        <i class="material-icons">star</i>
                        <i class="material-icons">star</i>
                        <i class="material-icons">star</i>
                    </div>
                </div>
            </div>
        `
    }
    }
    
    

   
    

}


getSearchBox.oninput = searchForMeal;