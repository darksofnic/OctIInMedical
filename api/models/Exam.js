const mongoose = require('mongoose')

const Schema = mongoose.Schema

//exam schema

const examSchema = new Schema({

    examID: {
        type: String,
    },
    image: {
        type: String,
    },
    note: {
        type: String
    },
    brixia: {
        type: String,
    },
    createdOn: {
        type: Date, default: Date.now
    }


})
const patientSchema = new Schema({
    patientId: {
        type: String,
        required: true
    },
    age: {
        type: Number,
       
    },
    sex: {
        type: String,
        
    },
    zipCode: {
        type: String,
        
    },
    bmi: {
        type: Number,
        
    },
    exams: [{ examSchema }],


}, { timestamps: true })

module.exports = mongoose.model('Exam', patientSchema)
