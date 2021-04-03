// Tools
const ExcelReader = require('xlsx');

// Classes
const Session = require('./classes/session');
const Batch = require('./classes/batch');
const Teacher = require('./classes/teacher');

// Variables
var sessions = [];
var timeSlots = [];
var teachers = [];
var batches = {};

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
                if(entry.teachers && entry.teachers.length>0) {
                    sessions.push(new Session(entry.semester, entry.course, entry.type, entry.group, entry.credit, entry.teachers));
                }
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

    for(let id=1; id<4; id++) {
        batches[id] = new Batch(id);
    }
}

function showInput() {
    // console.log(sessions);
    // console.log(timeSlots);
    // console.log(teachers);
    // console.log(batches);
}

function solve() {

}

loadInput();
showInput();
solve();



/*

Routines = [ Routine1[5][5], Routine2[5][5], Routine3[5][5] ];




*/