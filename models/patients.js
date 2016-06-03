var  mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./user');


var patientShema = new Schema({
	firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    phoneNumber:  {
        type: String,
        required: false,
    },
    email:  {
        type: String,
        required: false
    },
    medicalHistory: {
        type: String,
        required: false
    },
    medicalTreatment: {
        type: String,
        required: false
    },
    nextAppointment: {
        type: Date,
        required: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

var Patients = mongoose.model('Patient', patientShema, 'patients');

// make this available to our Node applications
module.exports = Patients;