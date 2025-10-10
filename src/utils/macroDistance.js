function getMacroDistance(calories, fat, protein, carbs, desiredCalories, desiredFat, desiredProtein, desiredCarbs){
    // use euclidean distance for now and eventually add weights
    return Math.sqrt(
        Math.pow((calories - desiredCalories), 2) +
        Math.pow((fat - desiredFat), 2) +
        Math.pow((protein - desiredProtein), 2) +
        Math.pow((carbs - desiredCarbs), 2)
    );
}

module.exports = { getMacroDistance };