const app = require('express').Router()
const connection = require('../mysql');

app.post('/eliminarPedido', function (req, res) {
    
    
    
  const IdComida = req.body.IdPedido
  const query ="DELETE FROM `heroku_7632f15f2b95b48`.`pedido`WHERE `pedido`.`idPedido` = "+IdComida+";";
  
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

app.post('/actualizarPedido', function (req, res) {
    
    const idPedido = req.body.IdPedido;
    const idPersona = req.body.idPersona;
    const fecha = req.body.Fecha;

    const query = "UPDATE `heroku_7632f15f2b95b48`.`pedido` SET `Fecha` = "+fecha+", `idPersona` = "+idPersona+" WHERE `IdPedido` ="+IdPedido+";";
    
    if(query.includes("undefined")){
      res.json(false);
    }else{
      connection.query(query, function (error, results) {
        if (error) {res.json(error);throw error};
        
        res.json(true);
      });
    }
       
    
    // query to the dataase and get the record
});
module.exports = app;