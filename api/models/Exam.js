const mongoose = require('mongoose')

const Schema = mongoose.Schema

//exam schema

const examSchema = new Schema ({
    
       examID:{
        type: String,
       },
       image: {
        type: String,
       },
       note: {
        type: String
       },
       createdOn:{
        type: Date, default: Date.now
       }

    
})
const patientSchema = new Schema ({
    patientId: {
        type: String,
        required: true
    },
    patientName: {
        type: String,
        required: false
    },
    age: {
        type: Number,
        required: true
    },
    sex: {
        type: String,
        required: true
    },
    zipCode: {
        type: String,
        required: true
    },
    bmi: {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    examID: [examSchema],
    brixia:{
        type: String,
        required: true
    },
    icuAdmit: {
        type: String,
        required: true
    },
    icuNum: {
        type: Number,
        required: true
    },
    mortality: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Exam', patientSchema)
