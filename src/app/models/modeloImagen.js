const {Schema, model } = require("mongoose")
const connect=require("../conexionMONGO")

const ImagenModel= new Schema({
    NombreImagen:{
        type: String,
        required: true
    },
    Imagen:{
        type: String,
        required: true
    },
  
    
})

module.exports= model('ImagenModel',ImagenModel)