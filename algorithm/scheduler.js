/* Variables */

const Input = require('./utils/input');
const Output = require('./utils/output');

const Session = require('./classes/session');
const Batch = require('./classes/batch');
const Teacher = require('./classes/teacher');

var sessions = [];
var timeSlots = [];
var teachers = [];
var batches = {};

var routine = {
    1 : [ [-1, -1, -1, -1, -1], [-1, -1, -1, -1, -1], [-1, -1, -1, -1, -1], [-1, -1, -1, -1, -1], [-1, -1, -1, -1, -1] ],
    2 : [ [-1, -1, -1, -1, -1], [-1, -1, -1, -1, -1], [-1, -1, -1, -1, -1], [-1, -1, -1, -1, -1], [-1, -1, -1, -1, -1] ],
    3 : [ [-1, -1, -1, -1, -1], [-1, -1, -1, -1, -1], [-1, -1, -1, -1, -1], [-1, -1, -1, -1, -1], [-1, -1, -1, -1, -1] ],
}

/* Functions */

function solve(index) {
    if(index == sessions.length) {
        return true;
    }

    let isValidDecision = false;
    let session = sessions[index];
    let batch = batches[session.batch];
    // console.log(session);

    if(session.type == "Lab") {

        let group = session.group;
        let teacher1 = Input.findTeacher(session.teachers[0], teachers);
        let teacher2 = Input.findTeacher(session.teachers[1], teachers);

        for(let day=0; day<5 && !isValidDecision; day++) {
            for(let slot=0; slot<5 && !isValidDecision; slot++) {
                if(slot<2 || slot==3) {
                    if((!teacher1 || teacher1.isTimeSlotFree(day, slot) && teacher1.isTimeSlotFree(day, slot+1)) && (!teacher2 || teacher2.isTimeSlotFree(day, slot) && teacher2.isTimeSlotFree(day, slot+1))) {
                        if(batch.isTimeSlotFree(group, day, slot) && batch.isTimeSlotFree(group, day, slot+1) ) {
                            batch.occupyTimeSlot(group, day, slot);
                            batch.occupyTimeSlot(group, day, slot+1);
                            if(teacher1) {
                                teacher1.occupyTimeSlot(day, slot);
                                teacher1.occupyTimeSlot(day, slot+1);
                            }
                            if(teacher2) {
                                teacher2.occupyTimeSlot(day, slot);
                                teacher2.occupyTimeSlot(day, slot+1);
                            }
                            routine[session.batch][day][slot] = index;
                            routine[session.batch][day][slot+1] = index;

                            isValidDecision = solve(index+1);

                            if(!isValidDecision) {
                                batch.freeTimeSlot(group, day, slot);
                                batch.freeTimeSlot(group, day, slot+1);
                                if(teacher1) {
                                    teacher1.freeTimeSlot(day, slot);
                                    teacher1.freeTimeSlot(day, slot+1);
                                }
                                if(teacher2) {
                                    teacher2.freeTimeSlot(day, slot);
                                    teacher2.freeTimeSlot(day, slot+1);
                                }
                                routine[session.batch][day][slot] = -1;
                                routine[session.batch][day][slot+1] = -1;
                            }
                        }
                    }
                }
            }
        }
    }

    else if(session.type == "Theory") {

        let group = "ALL";
        let teacher = Input.findTeacher(session.teachers[0], teachers);

        for(let day=0; day<5 && !isValidDecision; day++) {
            for(let slot=0; slot<5 && !isValidDecision; slot++) {
                if(teacher.isTimeSlotFree(day, slot) && batch.isTimeSlotFree(group, day, slot)) {
                    batch.occupyTimeSlot(group, day, slot);
                    teacher.occupyTimeSlot(day, slot);
                    routine[session.batch][day][slot] = index;
                    isValidDecision = solve(index+1);

                    if(!isValidDecision) {
                        batch.freeTimeSlot(group, day, slot);
                        teacher.freeTimeSlot(day, slot);
                        routine[session.batch][day][slot] = -1;
                    }
                }
            }
        }
    }

    return isValidDecision;
}

function main() {
    Input.load('./data/input.xlsx', sessions, timeSlots, teachers, batches);
    // Input.show(sessions, timeSlots, teachers, batches);

    let isPossible = solve(0);

    console.log(isPossible);
    Output.showRoutine(routine, sessions);
}

/* Executions */

main();