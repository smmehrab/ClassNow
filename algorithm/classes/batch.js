class Batch {
    constructor(id) {
        this.id = id;
        this.timeSlotsGA = [0, 0, 0, 0, 0]
        this.timeSlotsGB = [0, 0, 0, 0, 0]
    }
    
    getTimeSlots() {
        timeSlots = [];
        for(let slot=0; slot<5; slot++) {
            timeSlots.push((this.timeSlotsGA[slot] || this.timeSlotsGB[slot]));
        }
        return this.timeSlotsGA;
    }

    getTimeSlotsGA() {
        return this.timeSlotsGA;
    }

    getTimeSlotsGB() {
        return this.timeSlotsGB;
    }

    occupyTimeSlot(slot) {
        this.timeSlotsGA[slot] = 1;
        this.timeSlotsGB[slot] = 1;
    }

    occupyTimeSlotGA(slot) {
        this.timeSlotsGA[slot] = 1;
    }

    occupyTimeSlotGB(slot) {
        this.timeSlotsGB[slot] = 1;
    }

    freeTimeSlot(slot) {
        this.timeSlotsGA[slot] = 0;
        this.timeSlotsGB[slot] = 0;
    }

    freeTimeSlotGA(slot) {
        this.timeSlotsGA[slot] = 0;
    }

    freeTimeSlotGB(slot) {
        this.timeSlotsGB[slot] = 0;
    }
};

module.exports = Batch;