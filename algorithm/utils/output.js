const Excel = require('xlsx');
const Table = require('table');
const Routine = require('./../classes/routine');

function saveRoutines(routines, sessions) {
    var wordbook = Excel.utils.book_new();
    var worksheetName, worksheetData, worksheet, worksheetColumns;
    var worksheetRows = [
        {hpt: 20}, 
        {hpt: 20}, 
        {hpt: 20}, 
        {hpt: 20}, 
        {hpt: 20}, 
        {hpt: 20}
    ];
    let yearNames = ["First Year", "Second Year", "Third Year", "Fourth Year"];

    title = [
        ['CSEDU Routines']
    ];

    for(let batch=1; batch<=3; batch++) {

        worksheetName = yearNames[batch-1]; 
        worksheetData = [
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
                            if(session.isAlternate) {
                                sessionName += " " + "(alternate)";
                            }
                        }
                        if(worksheetData[day+1][slot+1].length>0) {
                            worksheetData[day+1][slot+1] += '; ';
                        }
                        worksheetData[day+1][slot+1] += sessionName;
                    });
                }
            }
        }


        worksheetColumns = [
            {wch:10},
            {wch:10},
            {wch:10},
            {wch:10},
            {wch:10},
            {wch:10}
        ];
        for(let slot=0; slot<5; slot++) {
            let maxWidth = worksheetColumns[slot+1].wch;
            for(let day=0; day<5; day++) {
                if(worksheetData[day+1][slot+1].length>0) {
                    maxWidth = Math.max(maxWidth, worksheetData[day+1][slot+1].length+2);
                }
            }
            worksheetColumns[slot+1].wch = maxWidth;
        }

        worksheet = Excel.utils.aoa_to_sheet(worksheetData);     
        worksheet['!rows'] = worksheetRows;
        worksheet['!cols'] = worksheetColumns;
        Excel.utils.book_append_sheet(wordbook, worksheet, worksheetName);
    }

    Excel.writeFile(wordbook, './output/routines.xlsx');
}

function showRoutines(routines, sessions) {
    
    var titleConfig = {
        columns: {
            0: {
                alignment: 'center',
                width: 100
            }
        }
    }

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

    var title, data, output;
    let yearNames = ["First", "Second", "Third", "Fourth"];

    title = [
        ['CSEDU Routines']
    ];

    output = Table.table(title, titleConfig);
    console.log(output);

    for(let batch=1; batch<=3; batch++) {

        title = [
            [yearNames[batch-1] + " Year Routine"]
        ];

        console.log();
        output = Table.table(title, titleConfig);
        console.log(output);
    
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
                            if(session.isAlternate) {
                                sessionName += "\n" + "(alternate)";
                            }
                        }
                        if(data[day+1][slot+1].length>0) {
                            data[day+1][slot+1] += '\n\n';
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

module.exports.saveRoutines = saveRoutines;
module.exports.showRoutines = showRoutines;
module.exports.debugRoutines = debugRoutines;