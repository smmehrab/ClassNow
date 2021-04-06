class Routine {
    constructor(batch) {
        this.batch = batch;
        this.states = {
            sunday: {
                "08:30 AM": [],
                "10:00 AM": [],
                "11:30 AM": [],
                "02:00 PM": [],
                "03:30 PM": [],
            },
            monday: {
                "08:30 AM": [],
                "10:00 AM": [],
                "11:30 AM": [],
                "02:00 PM": [],
                "03:30 PM": [],
            },
            tuesday: {
                "08:30 AM": [],
                "10:00 AM": [],
                "11:30 AM": [],
                "02:00 PM": [],
                "03:30 PM": [],
            },
            wednesday: {
                "08:30 AM": [],
                "10:00 AM": [],
                "11:30 AM": [],
                "02:00 PM": [],
                "03:30 PM": [],
            },
            thursday: {
                "08:30 AM": [],
                "10:00 AM": [],
                "11:30 AM": [],
                "02:00 PM": [],
                "03:30 PM": [],
            }
        }
    }

    setSession(dayIndex, slotIndex, sessionIndex) {
        let dayCount = 0;
        Object.keys(this.states).forEach((day)=>{
            if(dayCount == dayIndex) {
                let slotCount = 0;
                Object.keys(this.states[day]).forEach((slot)=>{ 
                    if(slotCount == slotIndex) {
                        this.states[day][slot].push(sessionIndex);    
                    }
                    slotCount++;
                });
            }
            dayCount++;
        });
    }

    removeSession(dayIndex, slotIndex, sessionIndex) {
        let dayCount = 0;
        Object.keys(this.states).forEach((day)=>{
            if(dayCount == dayIndex) {
                let slotCount = 0;
                Object.keys(this.states[day]).forEach((slot)=>{ 
                    if(slotCount == slotIndex) {
                        for(let index=0; index<this.states[day][slot].length; index++){ 
                            if (this.states[day][slot][index] == sessionIndex) { 
                                this.states[day][slot].splice(index, 1); 
                            }
                        }                
                    }
                    slotCount++;
                });
            }
            dayCount++;
        });
    }
};

module.exports = Routine;