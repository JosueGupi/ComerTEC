const app = require('express').Router()
const connection = require('../mysql');

app.post('/eliminarPedido', function (req, res) {
    
  console.log('Llego hasta aca antes');
    
  const IdComida = req.body.IdPedido == '' ? "undefined" : req.body.IdPedido;
  const query ="CALL `heroku_7632f15f2b95b48`.`SP_DeletePedido`("+IdComida+");"
  console.log('Llego hasta aca');
  if(query.includes("undefined")){
    res.json(false);
  }else{
    connection.query(query, function (error, results) {
      if (error) {res.json(error);throw error};
      
      res.json(true);
    });
  }
     
  
  // query to the database andget the records
});

app.post('/actualizarPedido', function (req, res) {
    
    const idPedido = req.body.IdPedido == '' ? "undefined" : req.body.IdPedido;
    const idPersona = req.body.idPersona == '' ? "undefined" : req.body.idPersona;
    const fecha = req.body.Fecha == '' ? "undefined" : req.body.Fecha;

    const query = "UPDATE `heroku_7632f15f2b95b48`.`pedido` SET `Fecha` = "+fecha+", `idPersona` = "+idPersona+" WHERE `IdPedido` ="+idPedido+";";
    
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