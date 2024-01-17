const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    designation: {
        type: String,
        required: true,
    },
    employeeID: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
    },
    about:{
        type: String,
    },
    workHistory: {
        companyName: {
            type: String,
        },
        position: {
            type: String,
        },
    },
    contactDetails:{
        email: {
            type: String,
        },
        phone: {
            type: Number,
        },
    },
    profiles:{
        linkedIn: {
            type: String,
        },
        github: {
            type: String,
        },
    },
    profilePicture: {
        type: String,
    },
}, {timestamps: true});

const Employee = mongoose.model('employee', employeeSchema);

module.exports = Employee;