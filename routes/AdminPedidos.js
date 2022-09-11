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
     
  
  // query to the database and get the records
});

app.post('/alimentosNuevos', function (req, res) {
    
    const idPedido = req.body.IdPedido == '' ? "undefined" : req.body.idPedido;
    

    const query = "SELECT alimento.idAlimento ,alimento.Nombre From alimento WHERE NOT EXISTS (SELECT * FROM pedidoxalimento WHERE pedidoxalimento.IdPedido = "+idPedido+" and pedidoxalimento.idalimento = alimento.idalimento);";
    console.log(query);
    if(query.includes("undefined")){
      res.json(false);
    }else{
      connection.query(query, function (error, results) {
        if (error) {res.json(error);throw error};
        
        res.json(results);
      });
    }
       
    
    // query to the dataase and get the record
});
app.post('/alimentosAgregados', function (req, res) {
    
  const idPedido = req.body.IdPedido == '' ? "undefined" : req.body.idPedido;
  

  const query = "SELECT alimento.idAlimento ,alimento.Nombre From alimento WHERE EXISTS (SELECT * FROM pedidoxalimento WHERE pedidoxalimento.IdPedido = "+idPedido+" and pedidoxalimento.idalimento = alimento.idalimento);";
  console.log(query);
  if(query.includes("undefined")){
    res.json(false);
  }else{
    connection.query(query, function (error, results) {
      if (error) {res.json(error);throw error};
      
      res.json(results);
    });
  }
     
  
  // query to the dataase and get the record
});

app.post('/eliminarAlimentoPedido', function (req, res) {
    
  const idPedido = req.body.IdPedido == '' ? "undefined" : req.body.idPedido;
  const IdAlimento = req.body.IdAlimentoAgregar == '' ? "undefined" : req.body.IdAlimentoEliminar;

  const query = "DELETE FROM `heroku_7632f15f2b95b48`.`pedidoxalimento` WHERE IdPedido = "+idPedido+" AND IdAlimento ="+IdAlimento+" ;";
  console.log(query);
  if(query.includes("undefined")){
    res.json(false);
  }else{
    connection.query(query, function (error, results) {
      if (error) {res.json(error);throw error};
      
      res.json(true);
    });
  }
     
  
  // query t the dataase and get the record
});
app.post('/agregarAlimentoPedido', function (req, res) {
    
  const IdAlimento = req.body.IdAlimentoAgregar == '' ? "undefined" : req.body.IdAlimentoAgregar;
  const idPedido = req.body.IdPedido == '' ? "undefined" : req.body.idPedido;
  const cantidad = req.body.cantidad == '' ? "undefined" : req.body.Cantidad;
  

  const query = "INSERT INTO `heroku_7632f15f2b95b48`.`pedidoxalimento`(`IdPedido`,`IdAlimento`,`Cantidad`)VALUES("+idPedido+","+IdAlimento+","+cantidad+");";
  console.log(query);
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