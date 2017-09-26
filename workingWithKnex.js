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

let userInput = process.argv[2];

knex('famous_people')
.where('first_name','like',`%${userInput}%`)
.orWhere('last_name', 'like', `%${userInput}%`)
.select('first_name', 'last_name', 'birthdate')
.then((result, err) => {
  outputResults(result);
})
.catch((err) => {
  console.log("Err: ", err);
})
knex.destroy();
console.log("Searching...");





function outputResults(result) {
  console.log(`Found ${result.length} person(s) by the name of ${userInput}`)
  for (row in result) {
    console.log(`${Number(row)+1} ${result[row].first_name} ${result[row].last_name}, born ${result[row].birthdate} `);
  }
}