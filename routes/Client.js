const app = require('express').Router();
const connection = require('../mysql');

app.post('/login', function (req, res) {
  const password = req.body.Password;
  const user = req.body.User;
  connection.query(
    "SELECT `idPersona`,`Admin` FROM `heroku_7632f15f2b95b48`.`personas` WHERE `Password`= '" +
      password +
      "' AND `Correo`= '" +
      user +
      "' ;",
    function (error, results) {
      console.log(results)
      if (error) {
        res.json(error);
        throw error;
      }

      res.json(results);
    }
  );
});

app.post('/create', function (req, res) {      
  const name = req.body.Name;
  const studentCard = req.body.StudentCard;
  const id = req.body.Id;
  const firstSurname = req.body.FirstSurname;
  const secondSurname = req.body.SecondSurname;
  const dateBirth = req.body.DateBirth;
  const email = req.body.Email;
  const tecPassword = req.body.TecPassword;
  connection.query(
    "INSERT INTO `heroku_7632f15f2b95b48`.`personas`(`Nombre`, `Carnet`, `Cedula`, `PrimerApellido`, `SegundoApellido`, " +
      "`FechaNacimiento`, `Correo`, `Password`, `Admin`) VALUES ('" +
      name + "', " +
      studentCard + ", " +
      id + ", '" +
      firstSurname + "', '" +
      secondSurname + "', '" +
      dateBirth + "', '" +
      email + "', '" +
      tecPassword + "', " +
      0 +
      " );",
    function (error, results) {
        console.log(results)
      if (error) {
        res.json(error);
        throw error;
      }

      res.json(true);
    }
  ); 
});

app.get('/catalog', function (req, res) {   
  connection.query(
    "SELECT `alimento`.`idAlimento`,`alimento`.`Nombre` AS Alimento, `tipoalimento`.`Nombre` AS Tipo,"+ 
    "`tiempos`.`NombreTiempo`, `alimento`.`Cantidad`, `alimento`.`Precio`"+ 
    "FROM `heroku_7632f15f2b95b48`.`alimento`"+ 
    "INNER JOIN `heroku_7632f15f2b95b48`.`tipoalimento`"+ 
    "  ON `alimento`.`IdTipoAlimento` = `tipoalimento`.`idtipoalimento`"+ 
    "INNER JOIN `heroku_7632f15f2b95b48`.`tiempos`"+ 
    "  ON `alimento`.`IdTiempo` = `tiempos`.`idTiempos`;",
    function (error, results) {
      console.log(results)
      if (error) {
        res.json(error);
        throw error;
      }

      res.json(results);
    }
  ); 
});

app.post('/insertShoppingCart', function (req, res) {   
  const idPersona = req.body.idPersona;
  const idAlimento = req.body.idAlimento;
  const cantidad = req.body.cantidad;
  connection.query(
    "INSERT INTO `heroku_7632f15f2b95b48`.`carrito`(`idPersona`,`idAlimento`,`cantidad`,`estado`) " +
    "VALUES (" + idPersona + "," + idAlimento + "," + cantidad + ", 1);", // estado del carrito: 1-no comprado 0-comprado
    function (error, results) {
        console.log(results)
      if (error) {
        res.json(error);
        throw error;
      }

      res.json(true);
    }
  ); 
});

app.post('/deleteShoppingCart', function (req, res) {   
  const idPersona = req.body.idPersona;
  const idAlimento = req.body.idAlimento;
  connection.query(
    "DELETE FROM `heroku_7632f15f2b95b48`.`carrito` " +
    "WHERE (idPersona=" + idPersona + " AND idAlimento="+ idAlimento +" );",
    function (error, results) {
        console.log(results)
      if (error) {
        res.json(error);
        throw error;
      }

      res.json(true);
    }
  ); 
});

app.post('/getShoppingCart', function(req, res) {
  const idPersona = req.body.idPersona;
  console.log('back: ',idPersona)
  connection.query(
    "SELECT SUM(`carrito`.`cantidad`) AS Cantidad,`carrito`.`idAlimento`,`alimento`.`Nombre`, `alimento`.`Precio`" +
    "FROM `heroku_7632f15f2b95b48`.`carrito` " +
    "INNER JOIN `heroku_7632f15f2b95b48`.`alimento` " +
    "  ON `alimento`.`idAlimento` = `carrito`.`idAlimento` " +
    "WHERE `idPersona` = " + idPersona + " AND `estado` = 1 " +
    "GROUP BY `idAlimento`,`Nombre`;",
    function (error, results) {
      if (error) {
        res.json(error);
        throw error;
      }

      res.json(results);
    }
  ); 
});

app.post('/generateOrder', function (req, res) {   
  const idPersona = req.body.idPersona;
  connection.query(
    "CALL `heroku_7632f15f2b95b48`.`spGenerarPedido` " + idPersona + ");",
    function (error, results) {
        console.log(results)
      if (error) {
        res.json(error);
        throw error;
      }

      res.json(results);
    }
  ); 
});

module.exports = app;
