const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

let userInput = process.argv[2];

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query(`SELECT first_name, last_name, birthdate
                FROM famous_people
                WHERE last_name ILIKE '%${userInput}%' OR first_name ILIKE '%${userInput}%'`,
  (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    outputResults(result);

    client.end();
  });
  console.log("Searching...");
});

function outputResults(result) {
  console.log(`Found ${result.rows.length} person(s) by the name of ${userInput}`)
  for (row in result.rows) {
    console.log(`${Number(row)+1} ${result.rows[row].first_name} ${result.rows[row].last_name}, born ${result.rows[row].birthdate} `);
  }
}