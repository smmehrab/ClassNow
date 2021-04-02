// Tools
const ExcelReader = require('xlsx');

// Classes
const Session = require('./classes/session');
const Teacher = require('./classes/teacher');

// Variables
var sessions = [];
var timeSlots = [];
var teachers = [];

// Methods
function loadInput() {
    const inputPath = './data/input.xlsx';
    const input = ExcelReader.readFile(inputPath);
    const numberOfSheets = input.SheetNames.length;
    for(let i = 0; i < numberOfSheets; i++) {
        const entries = ExcelReader.utils.sheet_to_json(input.Sheets[input.SheetNames[i]]);
        let index = 0;
        entries.forEach((entry) => {
            if(input.SheetNames[i] == "sessions") {
                sessions.push(new Session(entry.semester, entry.course, entry.type, entry.credit, entry.teachers));
            }
            else if(input.SheetNames[i] == "timeSlots") {
                timeSlots.push(entry);
            }
            else if(input.SheetNames[i] == "teachers") {
                delete timeSlots[index].teacher;
                teachers.push(new Teacher(entry.id, entry.name, entry.designation, entry.courses, timeSlots[index]));
            }
            index++;
        });
    }
}

function showInput() {
    console.log(sessions);
    // console.log(timeSlots);
    console.log(teachers);
}

function solve() {

}

loadInput();
showInput();
solve();