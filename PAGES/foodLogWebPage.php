<?php
require '../PHP/checkLogIn.php';
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="../CSS/Calories.css?<?php echo time(); ?>" />
    <!-- Helps when CSS isn't working due to cache -->
    <link rel="stylesheet" type="text/css" href="../CSS/universal.css?<?php echo time(); ?>" />
    <title>Exercise</title>

</head>

<body>
    <div class="container">
        <h1>Food Log</h1>

        <div class="divOrder">
            <form method="POST" action="../PHP/foodLog.php">
                <div class="exerciseApi">
                    <div class="exerciseType">
                        <label for="exerciseType">
                            <p>Food Name:</p>
                        </label>
                        <input type="text" name="foodName" id="etID" placeholder="brisket and fries">
                    </div>
                    <div class="exerciseDuration">
                        <label for="exerciseDuration">
                            <p>Amount (grams):</p>
                        </label>
                        <input type="text" name="foodAmount" id="edID" placeholder="100">
                    </div>
                    <div class="date">
                        <label for="date">
                            <p>Date:</p>
                        </label>
                        <input type="datetime-local" name="dateLog" id="exDateID" value="<?php echo date('Y-m-d H:i'); ?>">
                    </div>

                    <div class="trackCaloriesbttn">
                        <button class="trackButton" id="trackFoodBttnID" name="trackFoodButton">Track</button>
                    </div>
                </div>
            </form>
            <form method="POST" action="../PHP/showFoodLog.php">
                <div class="showExercise">
                    <div class="date">
                        <label for="showDate">
                            <p>Date:</p>
                        </label>
                        <input type="date" class="userInput" id="showLogID" name="showLog" value="<?php echo date('Y-m-d'); ?>">
                    </div>

                    <div class="showExercisesBttn">
                        <button class="showButton" id="showMealBttn" name="showMealButton">Show
                            FoodLog</button>
                    </div>
                </div>
            </form>
            <form method="POST" action="../PHP/deleteMeal.php">
                <div class="trackedContainer" id="trackedFoodContDiv">

                </div>
            </form>
        </div>

        <div>
            <nav>
                <ul class="navBar">
                    <li class="navBarImg">
                        <a href="./dashboardWebPage.php"><img src="../IMG/home.png"></a>
                    </li>
                    <li class="navBarImg ">
                        <a href="./exerciseCaloriesWebPage.php"><img src="../IMG/calorie.png"></a>
                    </li>
                    <li class="navBarImg selected">
                        <a href="./foodLogWebPage.php"><img src="../IMG/food.png"></a>
                    </li>
                    <li class="navBarImg ">
                        <a href="./settingWebPage.php"><img src="../IMG/setting.png"></a>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
    <!-- <script>
        document.getElementById('exDateID').valueAsDate = new Date();
        document.getElementById('exShowDateID').valueAsDate = new Date();
    </script> -->
    <script type="module" src="../JS/foodLog.js"></script>
    <script type="module" src="../JS/foodLogPHP.js"></script>
</body>

</html>