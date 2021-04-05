function showRoutine(routine, sessions) {
    let yearNames = ["First", "Second", "Third", "Fourth"];
    let dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"];
    console.log("CSEDU Routines");
    console.log();
    for(let batch=1; batch<=3; batch++) {
        console.log(yearNames[batch-1] + " Year Routine");
        for(let day=0; day<5; day++) {
            process.stdout.write(dayNames[day] + ": ");
            for(let slot=0; slot<5; slot++) {
                if(routine[1][day][slot]!=-1) {
                    process.stdout.write(sessions[routine[1][day][slot]].course + " ");
                }
                else{
                    process.stdout.write("None ");
                }
            }
            console.log();
        }
        console.log();
        console.log();
    }
}

module.exports.showRoutine = showRoutine;