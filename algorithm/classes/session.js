class Session {
    constructor(semester, course, type, group, credit, teachers) {
        this.semester = semester;
        this.course = course;
        this.type = type;
        this.batch = course.split(" ")[1][0];
        if(group) {
            this.group = group;
        }
        this.credit = credit;
        this.count = (type == "Theory") ? (credit == 1.5 ? 1 : 2) : 1; 
        if(type == "Lab") {
            this.isAlternate = (credit == 0.75);
        }
        this.duration = (type == "Theory") ? 1 : 2;
        this.teachers = (teachers) ? teachers.split(";") : [];    
    }

    decrementCount() {
        this.count--;
    }

    incrementCount() {
        this.count++;
    }
};

module.exports = Session;