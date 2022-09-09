const app = require('express').Router()
const connection = require('../mysql');
app.post('/crearAlimento', function (req, res) {
    
    const nombre = req.body.Nombre == '' ? "undefined" : req.body.Nombre;
    const cant = req.body.Cantidad == '' ? "undefined" : req.body.Cantidad;
    const tiempo = req.body.TiempoAlimento == '' ? "undefined" : req.body.TiempoAlimento;
    const precio = req.body.Precio == '' ? "undefined" : req.body.Precio;
    const tipo = req.body.TipoAlimento == '' ? "undefined" : req.body.TipoAlimento;
    
    const query = "INSERT INTO `heroku_7632f15f2b95b48`.`alimento`(`Nombre`,`IdTipoAlimento`,`IdTiempo`,`Cantidad`,`Precio`)VALUES('"+nombre+"',"+tipo+","+tiempo+","+cant+","+precio+");";

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
app.post('/eliminarAlimento', function (req, res) {
    
    
    
    const IdComida = req.body.IdComida == '' ? "undefined" : req.body.IdComida;
    
    const query = "CALL `heroku_7632f15f2b95b48`.`SP_DeleteAlimento`("+IdComida+");";
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

app.post('/actualizarAlimento', function (req, res) {
    
    const IdComida = req.body.IdComida == '' ? "undefined" : req.body.IdComida;
    const nombre = req.body.Nombre == '' ? "`Nombre`" : "'"+req.body.Nombre+"'";
    const cant = req.body.Cantidad == '' ? "`Cantidad`" : req.body.Cantidad;
    const tiempo = req.body.TiempoAlimento == '' ? "`IdTiempo`" : req.body.TiempoAlimento;
    const precio = req.body.Precio == '' ? "`Precio`" : req.body.Precio;
    const tipo = req.body.TipoAlimento == '' ? "`IdTipoAlimento`" : req.body.TipoAlimento;
    const query = "UPDATE `heroku_7632f15f2b95b48`.`alimento` SET `Nombre` = "+nombre+",`IdTipoAlimento` = "+tipo+",`IdTiempo` = "+tiempo+",`Cantidad` = "+cant+",`Precio` = "+precio+" WHERE `idAlimento` ="+IdComida;
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
app.get('/obtenerAlimentos', function (req, res) {
  
  connection.query("SELECT `alimento`.`idAlimento`,`alimento`.`Nombre`FROM `heroku_7632f15f2b95b48`.`alimento`;", function (error, results) {
      if (error) {res.json(error);throw error};
      
      res.json(results);
    });
     
  
  // query to the database and get the records
});

app.post('/modificarTiempo', function (req, res) {
    
  const IdComida = req.body.IdAlimento == '' ? "undefined" : req.body.IdAlimento;
  
  const tiempo = req.body.TiempoAlimento == '' ? "undefined" : req.body.IdAlimento;
  
  const query = "UPDATE `heroku_7632f15f2b95b48`.`alimento` SET `IdTiempo` = "+tiempo+" WHERE `idAlimento` ="+IdComida;
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