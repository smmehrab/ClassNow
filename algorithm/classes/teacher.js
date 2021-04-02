class Teacher {
    constructor(id, name, designation, courses, timeSlots) {
        this.id = id;
        this.name = name;
        this.designation = designation;
        this.courses = (courses) ? courses.split(";") : []; 
        
        for (var day of Object.keys(timeSlots)) {
            timeSlots[day] = timeSlots[day].split(";");
        }
        this.timeSlots = timeSlots;
    }
};

module.exports = Teacher;