class Session {
    constructor(semester, course, type, group, credit, teachers) {
        this.semester = semester;
        this.course = course;
        this.type = type;
        if(group) {
            this.group = group;
        }
        this.credit = credit;
        this.teachers = (teachers) ? teachers.split(";") : [];    
    }
};

module.exports = Session;