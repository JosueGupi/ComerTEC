const app = require('express').Router();
const connection = require('../mysql');

app.get('/login', function (req, res) {
  const password = req.body.Password;
  const user = req.body.User;
  console.log("Data:", password, user);
  connection.query(
    "SELECT `personas`.`COUNT(idPersona)`FROM `heroku_7632f15f2b95b48`.`personas` WHERE `Password`=" +
      password +
      " AND `Correo`= " +
      user +
      " ;",
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
  const studentCard = req.body.StudentCard;
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

/*INSERT INTO `heroku_7632f15f2b95b48`.`carrito`(`idPersona`,`idAlimento`,`cantidad`)
VALUES (14,4,1);*/
app.post('/insertShoppingCart', function (req, res) {   
  const idPersona = req.body.idPersona;
  const idAlimento = req.body.idAlimento;
  const cantidad = req.body.cantidad;
  connection.query(
    "INSERT INTO `heroku_7632f15f2b95b48`.`carrito`(`idPersona`,`idAlimento`,`cantidad`) " +
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
  const idCarrito = req.body.idCarrito;
  connection.query(
    "DELETE FROM `heroku_7632f15f2b95b48`.`carrito`" +
    "WHERE idCarrito=" + idCarrito + ");",
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



module.exports = app;
