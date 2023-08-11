const sqliteConnection = require("../../sqlite");
const createUsers = require("./createUsers")
const createPlatesTags = require("./createPlatesTags");
const createPlates = require("./createPlates");
const createProfiles = require("./createProfiles");
const createPopulate = require("./populateProfiles");

async function migrationsRun(){

const schemas = [
    createUsers,
    createPlates,
    createPlatesTags,
    createProfiles,
    createPopulate
].join('');

sqliteConnection()
    .then(db => db.exec(schemas))
    .catch(error => console.error(error));

}

module.exports = migrationsRun 