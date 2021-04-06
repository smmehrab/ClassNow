const Table = require('table');
const Routine = require('./../classes/routine');

function showRoutines(routines, sessions) {
    
    var config = {
        columns: {
            0: {
                alignment: 'left',
                width: 10
            },
            1: {
                alignment: 'center',
                width: 15
            },
            2: {
                alignment: 'center',
                width: 15
            },
            3: {
                alignment: 'center',
                width: 15
            },
            4: {
                alignment: 'center',
                width: 15
            },
            5: {
                alignment: 'center',
                width: 15
            }
        }
    };

    var data, output;
    let yearNames = ["First", "Second", "Third", "Fourth"];

    console.log("CSEDU Routines");
    console.log();
    for(let batch=1; batch<=3; batch++) {
        console.log(yearNames[batch-1] + " Year Routine");

        data = [
            ['Day/Time', '08:30 AM', '10:00 AM', '11:30 AM', '02:00 PM', '03:30 PM'],
            ['Sunday', '', '', '', '', ''],
            ['Monday', '', '', '', '', ''],
            ['Tuesday', '', '', '', '', ''],
            ['Wednesday', '', '', '', '', ''],
            ['Thursday', '', '', '', '', '']
        ];

        for(let day=0; day<5; day++) {
            for(let slot=0; slot<5; slot++) {
                var sessionIndices = routines[batch].getSessions(day, slot);
                if(sessionIndices.length>0) {
                    sessionIndices.forEach(index => {
                        let session = sessions[index];
                        let sessionName = session.course;
                        if(session.type == "Lab") {
                            sessionName += " " + session.group;
                        }
                        if(data[day+1][slot+1].length>0) {
                            data[day+1][slot+1] += '\n';
                        }
                        data[day+1][slot+1] += sessionName;
                    });
                }
            }
        }

        output = Table.table(data, config);
        console.log(output);
    }
}

function debugRoutines(routines) {
    // routines[1].setSession(0, 1, 0);
    // routines[1].setSession(0, 2, 0);
    // routines[1].setSession(0, 3, 1);
    // routines[1].setSession(0, 4, 1);
    // routines[1].setSession(1, 1, 2);
    // routines[1].setSession(1, 2, 2);    

    // console.log(routines[1].states);
    Object.keys(routines).forEach((batch)=>{ 
        console.log(routines[batch].states);
    });
    // console.log(routines);
}

module.exports.showRoutines = showRoutines;
module.exports.debugRoutines = debugRoutines;