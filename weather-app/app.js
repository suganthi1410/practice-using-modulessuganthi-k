// Imported yargs,chalk and hideBin

import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import chalk from "chalk";

// Parse command line arguments

const argv = yargs(hideBin(process.argv))
  .option("city", {
    describe: "City name",
    type: "string",
    demandOption: true,
  })
  .argv; 

//validation

function validateAndGetWeather(city) {
  if (!city || city.trim() === "") {
    console.log(chalk.red.bold("Error: Please provide a city name."));
    process.exit(1);
  }

  if (!isNaN(city)) {
    console.log(chalk.red.bold("Error: City name cannot be a number."));
    process.exit(1);
  }

  // Convert user input to lowercase
  const cityLower = city.toLowerCase();

  // FIXED: all keys are lowercase for case‑insensitive lookup

  const data = {
    fairbanks_alaska:-20,
    seattle:65,
    ofallon :82,
    losvegas:100,
  };

  const weather = data[cityLower];
  if (weather === undefined) {
    console.log(chalk.red.bold("Error: City not found in weather database."));
    process.exit(1);
  }

  return { cityLower, weather };
}


// Temperature description

function getHeatDescription(temp) {
  if (temp >= 100) return "extremely hot";
  if (temp >= 90) return "very hot";
  if (temp >= 80) return "hot";
  if (temp >= 70) return "warm";
  return "cold";
}

// Use the unified function

const { cityLower, weather } = validateAndGetWeather(argv.city);
const cityUpper = argv.city.toUpperCase();
const description = getHeatDescription(weather);

// Output

console.log(chalk.green.bold("City: ") + chalk.yellow(cityUpper));
console.log(
  chalk.blue.bold("Weather: ") +
    chalk.magenta(`${weather}\u00B0F`) +
    chalk.cyan(` — It is ${description}.`)
);

//TEST case-city name : lowercase,uppercase,empty,number and also city not in data

//$ node app.js --city=fairbanks_alaska
//City: FAIRBANKS_ALASKA
//Weather: -20°F — It is cold.

//$ node app.js --city=OFallon
//City: OFALLON
//Weather: 82°F — It is hot.

//$ node app.js --city=
//Error: Please provide a city name.

//$ node app.js --city=chennai
//Error: City not found in weather database.

//$ node app.js --city=123
//Error: City name cannot be a number.




