let getRandomMealDiv = document.querySelector("#randomMeal");

let getRandomMeal = async function () {
    let Rmeal = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');

    let RmealRes  = await Rmeal.json();
    RmealData = RmealRes.meals[0];
    console.log(RmealData);

    loadRmeal(RmealData);
}

let loadRmeal = function (x) {
    getRandomMealDiv.innerHTML = `
    <img src="${x.strMealThumb}" alt="Random meal">
        <div id="randomMealDesc">
            <p>${x.strMeal}</p>
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



getRandomMeal();
