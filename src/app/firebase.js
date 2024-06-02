require ('dotenv').config()
const admin = require('firebase-admin');
const {initializeApp,applicationDefault}=require('firebase-admin/app')
const { getStorage } = require("firebase-admin/storage"); // Cambiar "firebase/storage" a "firebase-admin/storage"


initializeApp({
    credential:applicationDefault(),
    databaseURL:'https://icfes-app-47319-default-rtdb.firebaseio.com',
    storageBucket:'gs://icfes-app-47319.appspot.com'
})

const storage = admin.storage().bucket(); // No es necesario pasar admin como parámetro


module.exports = {
    storage
  };