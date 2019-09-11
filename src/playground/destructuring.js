console.log('destructuring');

// Object destructuring
// const Person = {
//     name:'Suhana',
//     age:'22',
//     location: {
//         city: 'Dubai',
//         temp: 45
//     }
// }

// // 1st way
// console.log(`${Person.name} is ${Person.age}`)

//simpler way
// const name = Person.name;
// const age = Person.age;
// console.log(`${name} is ${age}`)

//destructured way
// const { name = 'Anonymous', age } = Person;
// console.log(`${name} is ${age}`)

// const { city, temp} = Person.location;
// console.log(`${city} is ${temp}`)

// const { city, temp:temperature } = Person.location;
// console.log(`${city} is ${temperature}`)

// const book ={
//     title: 'Ego is enemy',
//     author: 'Ram',
//     publisher: {
//         name:'Penguin'
//     }
// }

// const { title, author} = book;
// const { name: publisherName = 'Self-published'} = book.publisher;
// console.log(`The book ${title} is written by ${author} and published by ${publisherName}`);

////////////////////////////////////////////////////////////////////////////////////////////////

//Array Destructuring

const item = ['coffee (hot', '$2.00', '$2.50', '$2.75'];

const [coffee,  , medium  ]= item;

// console.log(`${coffee} small costs ${small}`);
console.log(`${coffee} medium costs ${medium}`);
// console.log(`${coffee} large costs ${large}`);


