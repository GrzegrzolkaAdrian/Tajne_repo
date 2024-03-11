function calculateMedian(expenses) {
    let monthlyMedians = [];

    for (const month in expenses) {
        let foodAndFuel = [];

        // Create an array of sorted days
        const sortedDays = Object.keys(expenses[month]).sort((a, b) => a - b);

        for (const day of sortedDays) {
            // Get the date for the current month and day
            const currentDate = new Date(`${month}-${day}`);
            const currentDay = currentDate.getDate();
            const currentWeekday = currentDate.getDay();

            // Check if the day is on or before the first Sunday of the month
            if (currentWeekday === 0 && currentDay <= 7) {
                if (expenses[month][day]["food"]) {
                    foodAndFuel = foodAndFuel.concat(expenses[month][day]["food"]);
                }
                if (expenses[month][day]["fuel"].length > 0) {
                    foodAndFuel = foodAndFuel.concat(expenses[month][day]["fuel"]);
                } else {
                    foodAndFuel = foodAndFuel.concat([0]); // If "fuel" list is [] create array with 0 and concat to foodAndFuel
                }
            } else if (currentDay < 7) { // Include all days before the first Sunday as well
                if (expenses[month][day]["food"]) {
                    foodAndFuel = foodAndFuel.concat(expenses[month][day]["food"]);
                }
                if (expenses[month][day]["fuel"].length > 0) {
                    foodAndFuel = foodAndFuel.concat(expenses[month][day]["fuel"]);
                } else {
                    foodAndFuel = foodAndFuel.concat([0]);
                }
            }
        }

        foodAndFuel.sort((a, b) => a - b);

        let median;
        if (foodAndFuel.length === 0) {
            median = 0;
        } else if (foodAndFuel.length % 2 === 0) {
            median = (foodAndFuel[foodAndFuel.length / 2 - 1] + foodAndFuel[foodAndFuel.length / 2]) / 2;
        } else {
            median = foodAndFuel[Math.floor(foodAndFuel.length / 2)];
        }

        console.log(`Monthly Expenses (${month}):`, foodAndFuel);
        console.log(`Median for (${month}):`, median);

        monthlyMedians.push(median);
    }

    monthlyMedians.sort((a, b) => a - b);

    let finalMedian;
    if (monthlyMedians.length === 0) {
        finalMedian = 0;
    } else if (monthlyMedians.length % 2 === 0) {
        finalMedian = (monthlyMedians[monthlyMedians.length / 2 - 1] + monthlyMedians[monthlyMedians.length / 2]) / 2;
    } else {
        finalMedian = monthlyMedians[Math.floor(monthlyMedians.length / 2)];
    }

    console.log("Sorted Monthly Medians:", monthlyMedians);
    console.log("Final Median:", finalMedian);
    return finalMedian;
}

const expenses = {
    "2023-01": {
        "01": {
            "food": [22.11, 43, 11.72, 2.2, 36.29, 2.5, 19],
            "fuel": [210.22]
        },
        "09": {
            "food": [11.9],
            "fuel": [190.22]
        }
    },
    "2023-03": {
        "07": {
            "food": [20, 11.9, 30.20, 11.9]
        },
        "04": {
            "food": [10.20, 11.50, 2.5],
            "fuel": []
        }
    },
    "2023-04": {}
};

calculateMedian(expenses);
