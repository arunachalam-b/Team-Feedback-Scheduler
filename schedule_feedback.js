const moment = require("moment");

let intervalInMinutes = 10;
let date = "2021-03-20"
let time = "16:00"
let day = moment(date);
let splitTime = time.split(/:/)
day.hours(parseInt(splitTime[0])).minutes(parseInt(splitTime[1])).seconds(0).milliseconds(0);

let people = ["Arunachalam", "Krithika", "Ashish", "Thamarai", "Raja", "Zenobia", "Agalya", "Harshita"];
let totalSlots = people.length - 1;

let pairs = {};
let count = 0;
let slotTimings = [];

people.map((person) => {
    pairs[person] = {}
    slotTimings.push(day.clone().add(intervalInMinutes * count, "minutes").format("hh:mm A"));
    count++;
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
            pairs[people[i]][originalPair] = 1;
            pairs[people[j]][swappedPair] = 1;
        } else if (person1Length >= person2Length) {
            let miniumUnBookedSlot = getMinimumIdentialSlot(pairs[people[i]], pairs[people[j]]);

            pairs[people[i]][originalPair] = miniumUnBookedSlot;
            pairs[people[j]][swappedPair] = miniumUnBookedSlot;
        }

    }
}

function getMinimumIdentialSlot(person1Schedule, person2Schedule) {
    let person1BookedSlots = getBookedSlotsOfAPerson(person1Schedule);
    let person2BookedSlots = getBookedSlotsOfAPerson(person2Schedule);
    let remainingSlots = getUnBookedSlots(person1BookedSlots, person2BookedSlots);
    remainingSlots.sort();
    return remainingSlots[0];
}

function getBookedSlotsOfAPerson(personSchedule) {
    return Object.values(personSchedule);
}

function getUnBookedSlots(person1BookedSlots, person2BookedSlots) {
    let allSlots = [];
    for (let start = 0;start < totalSlots;start++) {
        allSlots.push(start);
    }
    let unBookedPerson1Slots = allSlots.filter(value => !person1BookedSlots.includes(value));
    let unBookedPerson2Slots = allSlots.filter(value => !person2BookedSlots.includes(value));
    return unBookedPerson1Slots.filter(value => unBookedPerson2Slots.includes(value));
}

function sortByValues(pairs) {
    let sortable = [];

    for (let person in pairs) {
        sortable.push([person, pairs[person]]);
    }
    
    sortable.sort(function(a, b) {
        return a[1] - b[1];
    });
    
    let objSorted = {}
    
    sortable.forEach(function(item){
        objSorted[item[0]]=slotTimings[item[1]];
        console.log(`${item[0]} = ${slotTimings[item[1]]}`);
    });
    
    return objSorted;
}

Object.keys(pairs).map((pair) => {
    console.log(`Name: ${pair}\n\n`);
    pairs[pair] = sortByValues(pairs[pair]);
    console.log(`\n\n`);
})

// console.log("Pairs", pairs);
