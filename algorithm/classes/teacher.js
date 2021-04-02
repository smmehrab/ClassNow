class Teacher {
    constructor(id, name, designation, courses, timeSlots) {
        this.id = id;
        this.name = name;
        this.designation = designation;
        this.courses = (courses) ? courses.split(";") : []; 
        this.timeSlots = this.formatTimeSlots(timeSlots);
    }

    formatTimeSlots(timeSlots) {
        for (var day of Object.keys(timeSlots)) {
            timeSlots[day] = timeSlots[day].split(";");
            
            for(let i=0; i<timeSlots[day].length; i++) {
                let times = timeSlots[day][i].split("-");

                for(let j=0; j<2; j++) {
                    let time = times[j].split(":");                        
                    let hour = time[0];
                    let minute = time[1].substring(0, 2);
                    let pm = (time[1][2] == "p");
                    if(pm) { 
                        hour = (12+parseInt(hour)).toString();
                    }
                    times[j] = hour + ":" + minute;    
                }

                timeSlots[day][i] = {
                    start: times[0],
                    end: times[1]
                }
            }
        }
        return timeSlots;
    }
};

module.exports = Teacher;