/* Variables */

const Input = require('./utils/input');

const Session = require('./classes/session');
const Batch = require('./classes/batch');
const Teacher = require('./classes/teacher');

var sessions = [];
var timeSlots = [];
var teachers = [];
var batches = {};

/* Functions */

function solve(courseIndex) {

}

function main() {
    Input.load('./data/input.xlsx', sessions, timeSlots, teachers, batches);
    Input.show(sessions, timeSlots, teachers, batches);
}

/* Executions */

main();