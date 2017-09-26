const settings = require("./settings"); // settings.json


const knex = require('knex')({
  client: 'pg',
  connection: {
    host : settings.hostname,
    user : settings.user,
    password : settings.password,
    database : settings.database
  }
});

let first = process.argv[2];
let last = process.argv[3];
let birth = process.argv[4];

knex('famous_people').insert({first_name: first, last_name: last, birthdate: birth})
.then((result) => {
  console.log("Success!");
})
.catch((err) => {
  console.log("Failure!");
})

knex.destroy();
