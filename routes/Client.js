const app = require("express").Router();
const { response } = require("express");
const connection = require("../mysql");
var QRCode = require("qrcode");

app.post("/login", function (req, res) {
  const password = req.body.Password;
  const user = req.body.User;
  connection.query(
    "SELECT `idPersona`,`Admin` FROM `heroku_7632f15f2b95b48`.`personas` WHERE `Password`= '" +
      password +
      "' AND `Correo`= '" +
      user +
      "' ;",
    function (error, results) {
      console.log(results);
      if (error) {
        res.json(error);
        throw error;
      }

      res.json(results);
    }
  );
});

app.post("/create", function (req, res) {
  const name = req.body.Name;
  const studentCard = req.body.StudentCard;
  const id = req.body.Id;
  const firstSurname = req.body.FirstSurname;
  const secondSurname = req.body.SecondSurname;
  const dateBirth = req.body.DateBirth;
  const email = req.body.Email;
  const tecPassword = req.body.TecPassword;

  if (!email.includes("@estudiantec.cr")) {
    res.json(false);
  } else {
    connection.query(
      "INSERT INTO `heroku_7632f15f2b95b48`.`personas`(`Nombre`, `Carnet`, `Cedula`, `PrimerApellido`, `SegundoApellido`, " +
        "`FechaNacimiento`, `Correo`, `Password`, `Admin`) VALUES ('" +
        name +
        "', " +
        studentCard +
        ", " +
        id +
        ", '" +
        firstSurname +
        "', '" +
        secondSurname +
        "', '" +
        dateBirth +
        "', '" +
        email +
        "', '" +
        tecPassword +
        "', " +
        0 +
        " );",
      function (error, results) {
        console.log(results);
        var nodemailer = require("nodemailer");
        const transporter = nodemailer.createTransport({
          host: "smtp.ethereal.email",
          port: 587,
          secure: false,
          auth: {
            user: "tristian58@ethereal.email",
            pass: "cgfKAmnF7c9541FmMP",
          },
        });
        console.log("sending an email..");

        var mailOptions = {
          from: "ComerTEC",
          to: email,
          subject: "Bienvenid@",
          text:
            "¡Se ha creado una cuenta en ComerTec con los siguientes datos!" +
            "\n\nNombre: " +
            name +
            " \nPrimer Apellido: " +
            firstSurname +
            "\nSegundo Apellido: " +
            secondSurname +
            "\nFecha de Nacimiento: " +
            dateBirth +
            "\nCédula: " +
            id +
            "\nCarnet: " +
            studentCard +
            "\n\nGracias por escogernos!!",
        };
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log(error.message);
          } else {
            console.log("WORKS!!!");
          }
        });
        if (error) {
          res.json(error);
          throw error;
        }

        res.json(true);
      }
    );
  }
});

app.get("/catalog", function (req, res) {
  connection.query(
    "SELECT `alimento`.`idAlimento`,`alimento`.`Nombre` AS Alimento, `tipoalimento`.`Nombre` AS Tipo," +
      "`tiempos`.`NombreTiempo`, `alimento`.`Cantidad`, `alimento`.`Precio`" +
      "FROM `heroku_7632f15f2b95b48`.`alimento`" +
      "INNER JOIN `heroku_7632f15f2b95b48`.`tipoalimento`" +
      "  ON `alimento`.`IdTipoAlimento` = `tipoalimento`.`idtipoalimento`" +
      "INNER JOIN `heroku_7632f15f2b95b48`.`tiempos`" +
      "  ON `alimento`.`IdTiempo` = `tiempos`.`idTiempos`;",
    function (error, results) {
      console.log(results);
      if (error) {
        res.json(error);
        throw error;
      }

      res.json(results);
    }
  );
});

app.post("/insertShoppingCart", function (req, res) {
  const idPersona = req.body.idPersona;
  const idAlimento = req.body.idAlimento;
  const cantidad = req.body.cantidad;
  connection.query(
    "INSERT INTO `heroku_7632f15f2b95b48`.`carrito`(`idPersona`,`idAlimento`,`cantidad`,`estado`) " +
      "VALUES (" +
      idPersona +
      "," +
      idAlimento +
      "," +
      cantidad +
      ", 1);", // estado del carrito: 1-no comprado 0-comprado
    function (error, results) {
      console.log(results);
      if (error) {
        res.json(error);
        throw error;
      }

      res.json(true);
    }
  );
});

app.post("/deleteShoppingCart", function (req, res) {
  const idPersona = req.body.idPersona;
  const idAlimento = req.body.idAlimento;
  connection.query(
    "DELETE FROM `heroku_7632f15f2b95b48`.`carrito` " +
      "WHERE (idPersona=" +
      idPersona +
      " AND idAlimento=" +
      idAlimento +
      " );",
    function (error, results) {
      console.log(results);
      if (error) {
        res.json(error);
        throw error;
      }

      res.json(true);
    }
  );
});

app.post("/getShoppingCart", function (req, res) {
  const idPersona = req.body.idPersona;
  console.log("back: ", idPersona);
  connection.query(
    "SELECT SUM(`carrito`.`cantidad`) AS Cantidad,`carrito`.`idAlimento`,`alimento`.`Nombre`, `alimento`.`Precio`" +
      "FROM `heroku_7632f15f2b95b48`.`carrito` " +
      "INNER JOIN `heroku_7632f15f2b95b48`.`alimento` " +
      "  ON `alimento`.`idAlimento` = `carrito`.`idAlimento` " +
      "WHERE `idPersona` = " +
      idPersona +
      " AND `estado` = 1 " +
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

app.post("/generateOrder", function (req, res) {
  const idPersona = req.body.idPersona;
  var pdf = require("html-pdf");
  connection.query(
    "CALL `heroku_7632f15f2b95b48`.`spGenerarPedido` (" + idPersona + ");",
    async function (error, results) {
      try {
        const email = results[0][0].Correo;
        console.log("generateOrder", results[0]);
        var mensaje =
          "<h1>Orden de compra #" + results[0][0].idPedido + "</h1>";
        var precio = 0;
        for (var i in results[0]) {
          console.log(i);
          mensaje +=
            "<p>" +
            results[0][i].alimento +
            "|" +
            results[0][i].Precio +
            "</p>";
          precio += results[0][i].Precio;
        }
        mensaje += "<p> Precio Final: " + precio + "</p>";
        console.log(mensaje);

        let img = await QRCode.toDataURL(
          "IdPedido: " +
            results[0][0].idPedido +
            " Carnet: " +
            results[0][0].carnet +
            " Fecha: " +
            results[0][0].Fecha
        );
        var nodemailer = require("nodemailer");
        const transporter = nodemailer.createTransport({
          host: "smtp.ethereal.email",
          port: 587,
          secure: false,
          auth: {
            user: "tristian58@ethereal.email",
            pass: "cgfKAmnF7c9541FmMP",
          },
        });
        var ruta = "";
        console.log("creating pdf..");
        pdf
          .create(mensaje)
          .toFile("./orden_de_compra.pdf", function (err, res) {
            if (err) {
              console.log(err);
            } else {
              ruta = res.filename;
              console.log(ruta);

              console.log("done pdf..");
              console.log("sending an email..");

              var mailOptions = {
                from: "ComerTEC",
                to: email,
                subject: "Orden de Compra",
                text:
                  "¡Se ha creado una compra en ComerTec con los siguientes datos! \n" +
                  "\n\nGracias por escogernos!!",
                html: 'QR de compra: </br> <img src="' + img + '">',
                attachments: [
                  {
                    filename: "orden_de_compra.pdf", // <= Here: made sure file name match
                    path: ruta, // <= Here
                    contentType: "application/pdf",
                  },
                ],
              };

              transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                  console.log(error.message);
                } else {
                  console.log("WORKS!!!");
                }
              });
            }
          });
        if (error) {
          res.json(error);
          throw error;
        }
        res.json(true);
      } catch (error) {
        console.log(error);
        res.json(false);
      }
    }
  );
});

module.exports = app;
