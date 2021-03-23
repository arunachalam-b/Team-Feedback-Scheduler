const moment = require("moment");

let intervalInMinutes = 10;
let date = "2021-03-20"
let time = "16:00"
let day = moment(date);
let splitTime = time.split(/:/)
day.hours(parseInt(splitTime[0])).minutes(parseInt(splitTime[1])).seconds(0).milliseconds(0);

let people = ["Arunachalam", "Krithika", "Ashish", "Thamarai"];
let times = [];

for (let i = 0;i < people.length-1;i++) {
    let newDay = day.clone();
    times.push(newDay.add(i * intervalInMinutes, "minutes").format("hh:mm A"));
}

let pairs = {}

people.map((person) => {
    pairs[person] = {}
});

for (let i = 0;i < people.length;i++) {
    for (let j = i+1;j < people.length;j++) {
        let originalPair = `${people[i]} - ${people[j]}`;
        let swappedPair = `${people[j]} - ${people[i]}`;

        let person1Length = Object.keys(pairs[people[i]]).length;
        let person2Length = Object.keys(pairs[people[j]]).length;

        let dayClone = day.clone();
        let feedbackTime = dayClone.format("hh:mm A");

        if (person1Length == 0 && person2Length == 0) {
            
            // pairs[people[i]][originalPair] = feedbackTime;
            // pairs[people[j]][swappedPair] = feedbackTime;
            pairs[people[i]][originalPair] = 0;
            pairs[people[j]][swappedPair] = 0;

        } else if (person1Length == person2Length) {

        } else if (person1Length > person2Length) {
            let timeToAdd = intervalInMinutes * person1Length;
            let newFeedBackTime = dayClone.add(timeToAdd, "minutes").format("hh:mm A");
            console.log("i = ", i, "j = ", j, timeToAdd, newFeedBackTime);
            pairs[people[i]][originalPair] = newFeedBackTime;
            pairs[people[j]][swappedPair] = newFeedBackTime;
        }

    }
}

console.log("Pairs", pairs, "Times", times);

// console.log("Moment 9 AM", moment("09:00 AM").toDate(), moment("09:00 AM").add(10, "minutes").toDate());

console.log("Day", day, "Time", time, "Split Time", splitTime);
