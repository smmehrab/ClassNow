// Tools
const ExcelReader = require('xlsx');

// Classes
const Session = require('./../classes/session');
const Batch = require('./../classes/batch');
const Teacher = require('./../classes/teacher');

// For Sorting Sessions According to Our Need
// Lab/Theory, Semester, CourseCode, LabGroup (Labs First, Junior Semester First)
function sessionCompare(a, b){
    if(a.type.length == b.type.length) {
        if(a.semester == b.semester) {
            if(a.course.substring(3) == b.course.substring(3) && a.type == "Lab") {
                return (a.group > b.group) ? 1 : -1;
            }
            else{
                return (a.course.substring(3) > b.course.substring(3)) ? 1 : -1;
            }
        }
        else{
            return (a.semester > b.semester) ? 1 : -1;
        }
    }
    return (a.type.length > b.type.length) ? 1 : -1;
}

// Loading Input from Excel File
// Populating sessions, timeSlots, teachers, batches
function load(inputPath, sessions, timeSlots, teachers, batches) {
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

    sessions.sort(sessionCompare);
}
  
// For Debugging
function show(sessions, timeSlots, teachers, batches) {
    console.log(sessions);
    console.log(timeSlots);
    console.log(teachers);
    console.log(batches);

    teachers.forEach(teacher => {
        console.log(teacher.timeSlots);
    });
}

module.exports.load = load;
module.exports.show = show;