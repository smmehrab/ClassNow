class Batch {
    constructor(id) {
        this.id = id;
        this.timeSlotsGA = [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];
        this.timeSlotsGB = [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];
    }
    
    getTimeSlots(group) {
        if(group == "GA") {
            return this.timeSlotsGA;
        }

        if(group == "GB") {
            return this.timeSlotsGB;
        }

        timeSlots = [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];
        for(let day=0; day<5; day++) {
            for(let slot=0; slot<5; slot++) {
                timeSlots[day][slot] = (this.timeSlotsGA[day][slot] || this.timeSlotsGB[day][slot]);
            }
        }
        return this.timeSlots;
    }

    isTimeSlotFree(group, day, slot) {
        if(group == "GA") {
            return (this.timeSlotsGA[day][slot]==0);
        }
        else if(group == "GB") {
            return (this.timeSlotsGB[day][slot]==0);
        }
        else {
            return (this.timeSlotsGA[day][slot]==0 && this.timeSlotsGB[day][slot]==0);
        }
    }

    occupyTimeSlot(group, day, slot) {
        if(group == "GA") {
            this.timeSlotsGA[day][slot] = 1;
        }
        else if(group == "GB") {
            this.timeSlotsGB[day][slot] = 1;
        }
        else {
            this.timeSlotsGA[day][slot] = 1;
            this.timeSlotsGB[day][slot] = 1;
        }
    }

    freeTimeSlot(group, day, slot) {
        if(group == "GA") {
            this.timeSlotsGA[day][slot] = 0;
        }
        else if(group == "GB") {
            this.timeSlotsGB[day][slot] = 0;
        }
        else {
            this.timeSlotsGA[day][slot] = 0;
            this.timeSlotsGB[day][slot] = 0;
        }
    }
};

module.exports = Batch;