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
  console.log("Query:", "INSERT INTO `heroku_7632f15f2b95b48`.`personas`(`Nombre`, `Carnet`, `Cedula`, `PrimerApellido`, `SegundoApellido`, " +
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
  " );");
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

      res.json(results);
    }
  ); 
});

module.exports = app;
