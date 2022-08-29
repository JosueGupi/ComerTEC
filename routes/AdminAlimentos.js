const app = require('express').Router()
const connection = require('../mysql');
app.post('/crearAlimento', function (req, res) {
    
    const nombre = req.body.Nombre
    const cant = req.body.Cantidad
    const tiempo = req.body.TiempoAlimento
    const precio = req.body.Precio
    const tipo = req.body.TipoAlimento
    
    connection.query("INSERT INTO `heroku_7632f15f2b95b48`.`alimento`(`Nombre`,`IdTipoAlimento`,`IdTiempo`,`Cantidad`,`Precio`)VALUES('"+nombre+"',"+tipo+","+tiempo+","+cant+","+precio+");", function (error, results) {
        if (error) throw error;
        
        res.json(true);
      });
       
    
    // query to the database and get the records
});
app.post('/eliminarAlimento', function (req, res) {
    
    
    
    const IdComida = req.body.IdComida
    
    
    connection.query("DELETE FROM `heroku_7632f15f2b95b48`.`alimento`WHERE `alimento`.`idAlimento` = "+IdComida+";", function (error, results) {
        if (error) throw error;
        
        res.json(true);
      });
       
    
    // query to the database and get the records
});
module.exports = app;