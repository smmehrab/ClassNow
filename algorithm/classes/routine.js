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

    _toDay(dayIndex) {
        switch(dayIndex) {
            case 0:
                return "sunday";
            case 1:
                return "monday";
            case 2:
                return "tuesday";
            case 3:
                return "wednesday";
            case 4:
                return "thursday";
            default:
        }
    }

    _toSlot(slotIndex) {
        switch(slotIndex) {
            case 0:
                return "08:30 AM";
            case 1:
                return "10:00 AM";
            case 2:
                return "11:30 AM";
            case 3:
                return "02:00 PM";
            case 4:
                return "03:30 PM";
            default:
        }
    }

    setSession(dayIndex, slotIndex, sessionIndex) {
        let day = this._toDay(dayIndex);
        let slot = this._toSlot(slotIndex);
        this.states[day][slot].push(sessionIndex);    
    }

    removeSession(dayIndex, slotIndex, sessionIndex) {
        let day = this._toDay(dayIndex);
        let slot = this._toSlot(slotIndex);
        for(let index=0; index<this.states[day][slot].length; index++){ 
            if (this.states[day][slot][index] == sessionIndex) { 
                this.states[day][slot].splice(index, 1); 
            }
        }         
    }

    getSessions(dayIndex, slotIndex) {
        let day = this._toDay(dayIndex);
        let slot = this._toSlot(slotIndex);
        return this.states[day][slot];
    }

    isSameDayAlreadyASession(dayIndex, sessionIndex) {
        let day = this._toDay(dayIndex);
        let alreadyASession = false;

        // console.log(this.states[day]);
        // console.log(sessionIndex);

        Object.keys(this.states[day]).forEach((slot) => {
            let index = 0;
            this.states[day][slot].forEach(session => {
                if(sessionIndex == session) {
                    // console.log(day + " " + slot + " " + index + " " + session + " " + sessionIndex);
                    alreadyASession = true;
                }
                index++;
            });
        });
        // console.log(alreadyASession);
        return alreadyASession;
    }
};

module.exports = Routine;