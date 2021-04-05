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
            let dayTimeSlots = timeSlots[day].split(";");

            // 24 Hour Formatting            
            // for(let i=0; i<timeSlots[day].length; i++) {
            //     let times = dayTimeSlots[i].split("-");

            //     for(let j=0; j<2; j++) {
            //         let time = times[j].split(":");                        
            //         let hour = time[0];
            //         let minute = time[1].substring(0, 2);
            //         let pm = (time[1][2] == "p");
            //         if(pm) { 
            //             hour = (12+parseInt(hour)).toString();
            //         }
            //         times[j] = hour + ":" + minute;    
            //     }

            //     dayTimeSlots[i] = {
            //         start: times[0],
            //         end: times[1]
            //     }
            // }

            // 0-1 Formatting
            timeSlots[day] = [1, 1, 1, 1, 1];
            for(let i=0; i<dayTimeSlots.length; i++) {
                let times = dayTimeSlots[i].split("-");                
                // console.log(times);

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
                // console.log(times[0] + " - " + times[1]);

                let start=0;
                switch(times[0]) {
                    case "8:30":
                        start = 0;
                        break;
                    case "10:00":
                        start = 1;
                        break;
                    case "11:30":
                        start = 2;
                        break;
                    case "14:00":
                        start = 3;
                        break;
                    case "15:30":
                        start = 4;
                        break;
                    default:
                }

                let end=start+1;
                switch(times[1]) {
                    case "10:00":
                        end = 1;
                        break;
                    case "11:30":
                        end = 2;
                        break;
                    case "13:00":
                        end = 3;
                        break;
                    case "15:30":
                        end = 4;
                        break;
                    case "17:00":
                        end = 5;
                        break;
                    default:
                }

                // console.log(start + " " + end);
                for(let i=start; i<end; i++) {
                    timeSlots[day][i] = 0;
                }
            }
        }
        // console.log(this.id);
        // console.log(timeSlots);
        return timeSlots;
    }

    getTimeSlots() {
        return this.timeSlots;
    }

    isTimeSlotFree(slot) {
        return this.timeSlots[slot] == 0;
    }

    occupyTimeSlot(slot) {
        this.timeSlots[slot] = 1;
    }

    freeTimeSlot(slot) {
        this.timeSlots[slot] = 0;
    }
};

module.exports = Teacher;