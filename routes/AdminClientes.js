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
    
    const query = "UPDATE `heroku_7632f15f2b95b48`.`personas` SET `Nombre` = '"+nombre+"', `Carnet` ='"+carnet+"', `PrimerApellido` = '"+apellido1+"',`SegundoApellido` = '"+apellido2+"',`FechaNacimiento` = '"+fecha+"',`Correo` = '"+correo+"', `Password` = '"+password+"' WHERE `Cedula` = "+cedula+";"
    if(query.includes("undefined")){
      res.json(false);
    }else{
      connection.query(query, function (error, results) {
        if (error) {res.json(error);throw error};
        
        res.json(true);
      });
    }
    
       
    
    // query to the database and get the records
});
app.post('/eliminarCliente', function (req, res) {
    
    const idCliente = req.body.IdCliente
    
    const query = "DELETE FROM `heroku_7632f15f2b95b48`.`personas` WHERE `Cedula` = '"+idCliente+"';"

    if(query.includes("undefined")){
      res.json(false);
    }else{
      connection.query(query, function (error, results) {
        if (error) {res.json(error);throw error};
        
        res.json(true);
      });
    }
       
    
    // query to the database and get the records
});
app.get('/obtenerHistorial', function (req, res) {
  
  connection.query("SELECT CAST(pedido.idPedido as CHAR) as idPedido,personas.Carnet,personas.Correo, CONCAT(personas.Nombre,' ',PrimerApellido,' ',SegundoApellido) as Cliente, alimento.Nombre AS Alimento, pedidoxalimento.cantidad, pedido.Fecha FROM pedido INNER JOIN personas ON pedido.idPersona = personas.idPersona INNER JOIN pedidoxalimento ON pedidoxalimento.IdPedido = pedido.idPedido INNER JOIN alimento ON alimento.idAlimento = pedidoxalimento.IdAlimento;  ", function (error, results) {
      if (error) {res.json(error);throw error};
      
      res.json(results);
    });
     
  
  // query to the database and get the records
});
module.exports = app;