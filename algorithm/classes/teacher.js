class Teacher {
    constructor(id, name, designation, courses, timeSlotsInput) {
        this.id = id;
        this.name = name;
        this.designation = designation;
        this.courses = (courses) ? courses.split(";") : []; 
        this.timeSlots = this.parseTimeSlots(timeSlotsInput);
    }
    
    _toDayIndex(day) {
        switch(day) {
            case "sunday":
                return 0;
            case "monday":
                return 1;
            case "tuesday":
                return 2;
            case "wednesday":
                return 3;
            case "thursday":
                return 4;
            default:
        }
    }

    _toSlot(time) {
        switch(time) {
            case "8:30":
                return 0;
            case "08:30":
                return 0;
            case "10:00":
                return 1;
            case "11:30":
                return 2;
            case "13:00":
                return 3;
            case "15:30":
                return 4;
            case "17:00":
                return 5;
            default:
                return 0;
        }
    }

    parseTimeSlots(timeSlotsInput) {
        var timeSlots = [[1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1]];

        for (var day of Object.keys(timeSlotsInput)) {
            let dayTimeSlots = timeSlotsInput[day].split(";");

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

                let start = this._toSlot(times[0]);
                let end = this._toSlot(times[1]);
                let dayIndex = this._toDayIndex(day);

                // console.log(start + " " + end);
                for(let i=start; i<end; i++) {
                    timeSlots[dayIndex][i] = 0;
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

    isTimeSlotFree(day, slot) {
        return this.timeSlots[day][slot] == 0;
    }

    occupyTimeSlot(day, slot) {
        this.timeSlots[day][slot] = 1;
    }

    freeTimeSlot(day, slot) {
        this.timeSlots[day][slot] = 0;
    }
};

module.exports = Teacher;