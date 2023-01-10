const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    // disparar el puerto
    this.port = process.env.PORT;
    // Buena practica para indicar que rutas son
    this.usuariosPath = "/api/usuarios";

    //autenticcion por jwt
    this.authPath = "/api/auth";

    // Conectar a base de datos
    this.conectarDB();

    // Middlewares
    this.middlewares();
    // Rutas de mi aplicacion
    this.routes();
  }

  async conectarDB() {
    await dbConnection();
  }

  middlewares() {
    //CORS
    this.app.use(cors());

    // Parseo y lectura del body- lo que venga lo va a serializar en JSON
    this.app.use(express.json());

    // Directorio publico
    this.app.use(express.static("public"));
  }

  //Metodo para manejar las rutas
  routes() {
    // Aplicar middleware condicional
    this.app.use(this.authPath, require("../routes/auth"));
    this.app.use(this.usuariosPath, require("../routes/usuarios"));
  }

  //   Configuracion de puerto
  listen() {
    this.app.listen(this.port, () => {
      console.log("Escuchando en el puerto: ", this.port);
    });
  }
}

module.exports = Server;
