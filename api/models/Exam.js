const mongoose = require('mongoose')

const Schema = mongoose.Schema
const examSchema = new Schema ({
    examID: {
        type: String,
        required: true
    },
    imageURL: {
        type: String,
        required: true
    },
    notes: {
        type: String,
        required: true
    },
    Score: {
        type: String,
    },
    createOn: {
        type: Date, 
        default: DataTransfer.now
    },
    lastUpdate: {
        type: Date
    }
});

//exam schema
const patientSchema = new Schema ({
    patientId: {
        type: String,
        required: true
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
    exams: [
        examSchema
    ],
    note: {
        type: String,
        required: false
    }
}, { timestamps: true })

module.exports = mongoose.model('Exam', examSchema)
