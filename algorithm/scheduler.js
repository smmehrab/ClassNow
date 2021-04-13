/* Variables */

const Input = require('./utils/input');
const Output = require('./utils/output');

const Session = require('./classes/session');
const Batch = require('./classes/batch');
const Teacher = require('./classes/teacher');
const Routine = require('./classes/routine');

var sessions = [];
var timeSlots = [];
var teachers = [];
var batches = {};
var routines = {
    1 : new Routine(1), 
    2 : new Routine(2), 
    3 : new Routine(3)
};

/* Functions */

function solve(index) {
    if(index == sessions.length) {
        return true;
    }

    if(sessions[index].count == 0) {
        return solve(index+1);
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
                            routines[session.batch].setSession(day, slot, index);
                            routines[session.batch].setSession(day, slot+1, index);
                            sessions[index].decrementCount();

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
                                routines[session.batch].removeSession(day, slot, index);
                                routines[session.batch].removeSession(day, slot+1, index);
                                sessions[index].incrementCount();
                            }
                        }
                    }
                }
            }
        }
    }

    else if(session.type == "Theory") {

        // if(session.count == 1) {
        //     console.log(session);
        //      // Find Which Course is stuck
        // }

        let group = "ALL";
        let teacher = Input.findTeacher(session.teachers[0], teachers);

        for(let day=0; day<5 && !isValidDecision; day++) {
            if(session.count == 1) {
                if(routines[session.batch].isSameDayAlreadyASession(day, index)) {
                    // console.log(session.course);
                    continue;
                }
            }

            for(let slot=0; slot<5 && !isValidDecision; slot++) {
                if(teacher.isTimeSlotFree(day, slot) && batch.isTimeSlotFree(group, day, slot)) {
                    batch.occupyTimeSlot(group, day, slot);
                    teacher.occupyTimeSlot(day, slot);
                    routines[session.batch].setSession(day, slot, index);
                    sessions[index].decrementCount();

                    isValidDecision = solve(index+1);

                    if(!isValidDecision) {
                        batch.freeTimeSlot(group, day, slot);
                        teacher.freeTimeSlot(day, slot);
                        routines[session.batch].removeSession(day, slot, index);
                        sessions[index].incrementCount();
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

    // Assigning One Period Per Session
    var isPossible = solve(0);

    //  Assigning 2nd Period of the 2 Periods' Sessions
    if(isPossible) {
        isPossible = solve(0);
    }

    if(isPossible) {
        Output.saveRoutines(routines, sessions);
        Output.showRoutines(routines, sessions);
    }
    else {
        console.log("Not Possible");
    }

    // Output.debugRoutines(routines);
}

/* Executions */
main();