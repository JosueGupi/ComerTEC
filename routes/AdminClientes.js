const app = require('express').Router()
const connection = require('../mysql');
app.post('/actualizarCliente', function (req, res) {
    
    const nombre = req.body.Nombre
    const apellido1 = req.body.Apellido1
    const apellido2 = req.body.Apellido2
    const carnet = req.body.Carnet
    const cedula = req.body.Cedula
    const fecha = req.body.Fecha
    const correo = req.body.Correo
    const password = req.body.Password
    
    connection.query("UPDATE `heroku_7632f15f2b95b48`.`personas` SET `Nombre` = '"+nombre+"', `Carnet` ='"+carnet+"', `PrimerApellido` = '"+apellido1+"',`SegundoApellido` = '"+apellido2+"',`FechaNacimiento` = '"+fecha+"',`Correo` = '"+fecha+"', `Password` = '"+password+"' WHERE `Cedula` = "+cedula+";", function (error, results) {
        if (error) {res.json(error);throw error};
        
        res.json(true);
      });
       
    
    // query to the database and get the records
});
app.post('/eliminarCliente', function (req, res) {
    
    const idCliente = req.params.IdCliente
    
    connection.query("DELETE FROM `heroku_7632f15f2b95b48`.`personas` WHERE `Cedula` = "+idCliente+";", function (error, results) {
        if (error) {res.json(error);throw error};
        
        res.json(true);
      });
       
    
    // query to the database and get the records
});
module.exports = app;