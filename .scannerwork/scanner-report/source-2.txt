const config = require("../config");
const express = require('express');
const morgan = require('morgan');
const app = express();

var createError = require('http-errors');
const cors = require('cors');
var path = require('path');
/////////

const routerUser =require ('../router/routerUsuario');
const routerinstitucion= require('../router/routerInstituciones');
const routerEstudiantil=require("../router/routerEstudiantes");
const routerCursos=require("../router/routerCurso");
const routerDocente=require("../router/routerDocente");
const routerCartera=require("../router/routerCartera");
const routerGasto=require("../router/routerGasto");
const routerNotas= require("../router/routerNotas");
const routerSimulacros= require("../router/routerSimulacro");
/////
app.use(morgan("dev"));
app.get('/', (req, res) => {
    res.send('express');
});
app.use(express.json());
app.use('/MEDIA', express.static(path.join(__dirname, 'MEDIA')));
app.use(cors(config.application.cors.server));



app.use("/API/V2", routerUser); // Corrected mounting paths
app.use("/API/V2", routerinstitucion); // Corrected mounting paths
app.use("/API/V2", routerEstudiantil);
app.use("/API/V2",routerCursos);
app.use("/API/V2",routerDocente);
app.use("/API/V2",routerCartera);
app.use("/API/V2",routerGasto);
app.use("/API/V2",routerNotas);
app.use("/API/V2",routerSimulacros);





module.exports = app;
