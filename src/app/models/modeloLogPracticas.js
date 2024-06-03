const {Schema, model } = require("mongoose")
const connect=require("../conexionMONGO")


const ModelRegistroPractices =new Schema({
    IdPractica:{
        type: String,
        require: true
    },
    Alumno:{
        type:Object,
        require: true
    },
    Nota:{
        type:Number,
        require:true
    },
    Fecha:{
        type:Date,
        require:true
    }
})

module.exports=model('ModelRegistroPractices',ModelRegistroPractices)