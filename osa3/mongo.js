// const mongoose = require("mongoose");

// if (process.argv.length < 3) {
//     console.log("give password as argument");
//     process.exit(1);
// };

// const password = process.argv[2];
// const name = process.argv[3];
// const number = process.argv[4]

// const url =
//     `mongodb+srv://fullstack:${password}@puhelinluettelo.lvze3pq.mongodb.net/puhelinluettelo?
// retryWrites=true&w=majority`;

// mongoose.set("strictQuery", false);
// mongoose.connect(url);

// const personSchema = new mongoose.Schema({
//     id: Number,
//     name: String,
//     number: String
// });

// const Person = mongoose.model('Person', personSchema);


// if (process.argv.length === 3) {
//     Person.find({})
//         .then(persons => {
//             console.log("phonebook: ")
//             persons.forEach(person => {
//                 console.log(`${person.name} ${person.number}`);
//             });
//             mongoose.connection.close();
//         });
// } else {

//     const person = new Person({
//         name: name,
//         number: number
//     });

//     person.save().then(result => {
//         console.log(`added ${person.name} number ${person.number} to phonebook`);
//         mongoose.connection.close();
//     });
// }


