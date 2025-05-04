const { object } = require("joi");

const persons = [
  { firstname: "Malcom", lastname: "Reynolds" },
  { firstname: "Kaylee", lastname: "Frye" },
  { firstname: "Jayne", lastname: "Cobb" },
];

// console.log(persons.filter((obj) => obj.firstname == "Malcom"));

// console.log("Malcom" in persons[0]);

console.log(persons.map((obj) => obj.firstname + " " + obj.lastname).join(", "));
empty_array = ["Precious"]
console.log(empty_array.concat("Tobe"))