const {Schema, model } = require("mongoose")
const connect=require("../conexionMONGO")

const QuestionBank= new Schema({
    id: {
        type: String,
        required: true
    },
    Question:{
        type: String,
        required: true
    },
    Answer:{
        type: String,
        required: true
    },
    OptionA:{
        type: String,
        required: true
    },
    OptionB:{
        type: String,
        required: true
    },
    OptionC:{
        type: String,
        required: true
    },
    OptionD:{
        type: String,
        required: true
    },
    Photo:{
        type: String,
        required: false
    },
    Subject:{
        type: String,
        required: true
    },
    
})

module.exports= model('QuestionBankModel',QuestionBank)