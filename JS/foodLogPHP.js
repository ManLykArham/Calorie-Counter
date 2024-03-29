// const meals = [
//     "Pancakes with maple syrup",
//     "Omelette with toast",
//     "Yogurt with granola and berries",
//     "Bacon and eggs",
//     "Avocado toast",
//     "Sandwiches",
//     "Caesar salad",
//     "Pizza",
//     "Sushi",
//     "Burritos or tacos",
//     "Grilled chicken with vegetables",
//     "Spaghetti with meatballs",
//     "Stir-fried noodles or rice with   vegetables and protein",
//     "Roast beef with mashed potatoes",
//     "Fish and chips",
//     "Popcorn",
//     "Fruit slices",
//     "Nuts",
//     "Cheese and crackers",
//     "Hummus with carrot sticks",
//     "Chocolate cake",
//     "Ice cream",
//     "Apple pie",
//     "Cheesecake",
//     "Brownies",
//     "checkingWhetherThisIsWorking"
// ];

// const apiKey = 'uqvXuwvG+dMRJNNvCK/eDw==MSB3hIFeNEbBSWx3';
// const url = "https://api.api-ninjas.com/v1/nutrition?query=";

// async function checkMealsInDatabase() {
//     const mealsInDatabase = [];
//     const mealsNotInDatabase = [];

//     for (const meal of meals) {
//         const response = await fetch(`${url}${meal}`, {
//             method: "GET",
//             headers: {
//                 "X-Api-Key": apiKey,
//                 "Content-Type": "application/json",
//             },

//         });

//         const data = await response.json();

//         if (response.status === 200 && data.some(foodItem => foodItem.name.toLowerCase() === meal.toLowerCase())) {
//             // Meal is in the database
//             mealsInDatabase.push(meal);
//         } else {
//             // Meal is not in the database
//             mealsNotInDatabase.push(meal);
//         }
//     }

//     console.log("Meals in the database:", mealsInDatabase);
//     console.log("Meals not in the database:", mealsNotInDatabase);
// }

//loadData() is referenced in foodValidation.js
function loadMealData() {
    getMealData();
}

function getMealData() {
    const showDate = document.getElementById('showLogID').value;

    // Make an AJAX request to fetch meal data
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '../PHP/showFoodLog.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const foodData = JSON.parse(xhr.responseText);
            displayFoodLogData(foodData);
        }
    };

    const data = `showLog=${showDate}&showMealButton=1`;
    xhr.send(data);
}

//POST request being made to deleteMeal.php
function hmlRequest(mealID) {
    let meal = {
        "mealID": mealID
    }
    fetch("../PHP/deleteMeal.php", {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json;"
            },
            "body": JSON.stringify(meal)
        }).then((response) => response.text())
        .then(() => {
            var script = document.createElement('script');
            script.src = '../JS/foodLogPHP.js'; // Replace with the actual path to your mealCalories.js file
            script.type = 'text/javascript';

            script.onload = function() {
                loadMealData();
            };
            document.head.appendChild(script);
        })
        .catch(error => console.error("Error:", error));
}

//Populating meals
function displayFoodLogData(foodData) {
    const container = document.getElementById('trackedFoodContDiv');
    container.innerHTML = ''; // Clear existing data

    if (foodData.length === 0) {
        container.innerHTML = '<p class="noText">There are no meals logged in for this day :)</p>';
    } else {
        foodData.forEach(function(food) {
            const trackedFoodList = document.createElement('ul');
            trackedFoodList.classList.add('trackedList');
            trackedFoodList.innerHTML = `

                <div class="individualListContainer">
                <li class="listItem">
                    <label for="storedMealTime">
                        <p>Time:</p>
                    </label>
                    <input type="time" class="inputType" name="storedMealTime" value="${food.logTime}" readonly>
                </li>
                <li class="listItem">
                    <label for="storedAmount">
                        <p>Amount (grams):</p>
                    </label>
                    <input type="text" class="inputType" name="storedAmount" value="${food.mealType}" readonly>
                </li>
                <li class="listItem">
                    <label for="storedMealName">
                        <p>Food Name:</p>
                    </label>
                    <textarea class="inputType" name="storedMealName" readonly>${food.mealName}</textarea>
                </li>
                <li class="listItem">
                    <label for="storedCaloriesBurned">
                        <p>Calories Gained (kcal):</p>
                    </label>
                    <input type="text" class="inputType" name="storedCaloriesGained" value="${food.caloriesGained}" readonly>
                </li>
                <li class="listItem">
                    <input type="hidden" name="foodLogID" id="mealID" value="${food.foodLogID}">
                    <button class="deleteButton" id="deleteMealButton" name="deleteMeal">Delete</button>
                </li>
            </div>
            `;
            container.appendChild(trackedFoodList);
            //When delete button is clicked POST request will be made to deleteMeal.php
            const deleteButton = trackedFoodList.querySelector('.deleteButton');
            deleteButton.addEventListener('click', function(e) {
                e.preventDefault();
                const mealID = food.foodLogID;
                hmlRequest(mealID);
            });
        });
    }
};

const mealInput = document.getElementById("mealName");
const mealDropdown = document.getElementById("mealDropdown");

// Fetch meal data from JSON file
async function fetchMealData() {
    try {
        const response = await fetch("../JSON/mealData.json");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching meal data:", error);
        return [];
    }
}


// Dummy meal data for testing
// const mealss = ["Running", "Cycling", "Swimming", "Weightlifting", "Yoga", "Skiing"];
// console.log(mealss)


// Function to populate dropdown with meal names
function populateDropdown(meals) {
    mealDropdown.innerHTML = "";

    meals.forEach(meal => {
        const mealItem = document.createElement("div");
        mealItem.className = "meal-dropdown-item";
        mealItem.textContent = meal;

        mealItem.addEventListener("click", function() {
            mealInput.value = meal;
            hideDropdown();
        });

        mealDropdown.appendChild(mealItem);
    });

    showDropdown();
}

// Function to show the dropdown
function showDropdown() {
    const inputRect = mealInput.getBoundingClientRect();
    mealDropdown.style.top = inputRect.bottom + "px";
    mealDropdown.style.left = inputRect.left + "px";
    mealDropdown.classList.add("showMeal");
    console.log(mealDropdown)
}

// Function to hide the dropdown
function hideDropdown() {
    mealDropdown.classList.remove("showMeal");
}

// Function to update the dropdown based on user input
async function updateDropdown(filter) {
    fetchMealData().then(meals => {
        const filteredMeals = meals.filter(meal =>
            meal.toLowerCase().includes(filter.toLowerCase())
        );
        populateDropdown(filteredMeals);
    });
}

// Event listener for input changes
mealInput.addEventListener("input", function() {
    // Initial fetch and populate dropdown
    fetchMealData().then(meals => {
        populateDropdown(meals);
    });
    const filter = mealInput.value;
    updateDropdown(filter);
});

mealInput.addEventListener("click", function() {
    // Initial fetch and populate dropdown
    fetchMealData().then(meals => {
        populateDropdown(meals);
    });
});

// Event listener to close the dropdown when clicking outside of it
document.addEventListener("click", function(event) {
    if (!event.target.closest(".meal-dropdown") && event.target !== mealInput) {
        hideDropdown();
    }
});




//Show list of meals when plage loads 
window.addEventListener('load', function(e) {
    e.preventDefault();
    //checkMealsInDatabase();

    const showDate = document.getElementById('showLogID').value;

    // Make an AJAX request to fetch meal data
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '../PHP/showFoodLog.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const foodData = JSON.parse(xhr.responseText);
            displayFoodLogData(foodData);
        }
    };

    const data = `showLog=${showDate}&showMealButton=1`;
    xhr.send(data);
});

//Show list of meals when showButton is clicked
document.getElementById('showMealBttn').addEventListener('click', function(e) {
    e.preventDefault();

    const showDate = document.getElementById('showLogID').value;

    // Make an AJAX request to fetch meal data
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '../PHP/showFoodLog.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const foodData = JSON.parse(xhr.responseText);
            displayFoodLogData(foodData);
        }
    };

    const data = `showLog=${showDate}&showMealButton=1`;
    xhr.send(data);
});