const mongoose = require('mongoose')

const Schema = mongoose.Schema

//exam schema

const imageSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    data: {
        type: Buffer,
        required: true
    },
     contentType: {
        type: String,
        required: true
    }
})

const examSchema = new Schema({

    examID: {
        type: String,
    },
    image: [imageSchema],
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
    exams: [examSchema ],


}, { timestamps: true })

module.exports = mongoose.model('Exam', patientSchema)
