class Batch {
    constructor(id) {
        this.id = id;
        this.timeSlotsGA = [0, 0, 0, 0, 0]
        this.timeSlotsGB = [0, 0, 0, 0, 0]
    }
    
    getTimeSlots(group) {
        if(group == "GA") {
            return this.timeSlotsGA;
        }

        if(group == "GB") {
            return this.timeSlotsGB;
        }

        timeSlots = [];
        for(let slot=0; slot<5; slot++) {
            timeSlots.push((this.timeSlotsGA[slot] || this.timeSlotsGB[slot]));
        }
        return this.timeSlots;
    }

    isTimeSlotFree(group, slot) {
        if(group == "GA") {
            return (this.timeSlotsGA[slot]==0);
        }
        else if(group == "GB") {
            return (this.timeSlotsGB[slot]==0);
        }
        else {
            return (this.timeSlotsGA[slot]==0 && this.timeSlotsGB[slot]==0);
        }
    }

    occupyTimeSlot(group, slot) {
        if(group == "GA") {
            this.timeSlotsGA[slot] = 1;
        }
        else if(group == "GB") {
            this.timeSlotsGB[slot] = 1;
        }
        else {
            this.timeSlotsGA[slot] = 1;
            this.timeSlotsGB[slot] = 1;
        }
    }

    freeTimeSlot(group, slot) {
        if(group == "GA") {
            this.timeSlotsGA[slot] = 0;
        }
        else if(group == "GB") {
            this.timeSlotsGB[slot] = 0;
        }
        else {
            this.timeSlotsGA[slot] = 0;
            this.timeSlotsGB[slot] = 0;
        }
    }
};

module.exports = Batch;