class Teacher {
    constructor(id, name, designation, courses, timeSlot) {
        this.id = id;
        this.name = name;
        this.designation = designation;
        this.courses = (courses) ? courses.split(";") : []; 
        this.timeSlot = timeSlot;   
    }
};

module.exports = Teacher;