const app = require('express').Router()
const connection = require('../mysql');
app.post('/crearAlimento', function (req, res) {

    // connect to your database
    connection.connect();
    
        

        // create Request object
    
    const nombre = req.body.Nombre
    const cant = req.body.Cantidad
    const tiempo = req.body.TiempoAlimento
    const precio = req.body.Precio
    const tipo = req.body.TipoAlimento
    
    connection.query("INSERT INTO `heroku_7632f15f2b95b48`.`alimento`(`Nombre`,`IdTipoAlimento`,`IdTiempo`,`Cantidad`,`Precio`)VALUES('"+nombre+"',"+tipo+","+tiempo+","+cant+","+precio+");", function (error, results) {
        if (error) throw error;
        
        res.json(results);
      });
       
    connection.end();
    // query to the database and get the records
});
module.exports = app;