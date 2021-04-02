class Session {
    constructor(semester, course, type, credit, teachers) {
        this.semester = semester;
        this.course = course;
        this.type = type;
        this.credit = credit;
        this.teachers = (teachers) ? teachers.split(";") : [];    
    }
};

module.exports = Session;