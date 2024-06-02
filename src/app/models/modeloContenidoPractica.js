const {Schema, model } = require("mongoose")
const connect=require("../conexionMONGO")


const ModelPractice =new Schema({
    IdPractica:{
        type: String,
        require: true
    },
    Preguntas:{
        type:Array,
        require: true
    }
})

module.exports=model('ContentPractice',ModelPractice)