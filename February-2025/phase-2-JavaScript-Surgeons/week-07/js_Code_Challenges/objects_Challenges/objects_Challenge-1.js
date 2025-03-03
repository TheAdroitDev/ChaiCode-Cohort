// You just need to implement the createStudentProfile function
function createStudentProfile(name, age, grade) {
    // Return an object with name, age, and grade
    if (typeof name !== "string" || typeof age !== "number" || typeof grade !== "string" || name === "" || age <= 5) {
        return "Invalid input";
    } else {
        return { name, age, grade };
    }
};
