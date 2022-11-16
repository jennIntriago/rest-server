const express = require("express");

class Server {
  constructor() {
    this.app = express();
    // disparar el puerto
    this.port = process.env.PORT;

    // Middlewares
    this.middlewares();
    // Rutas de mi aplicacion
    this.routes();
  }

  middlewares() {
    // Directorio publico
    this.app.use(express.static("public"));
  }

  //Metodo para manejar las rutas
  routes() {
    this.app.get("/api", (req, res) => {
      res.json({
        msg: "get API",
      });
    });

    //
    this.app.put("/api", (req, res) => {
      res.json({
        msg: "put API",
      });
    });

    //
    this.app.post("/api", (req, res) => {
      res.json({
        msg: "post API",
      });
    });

    //
    this.app.delete("/api", (req, res) => {
      res.json({
        msg: "delete API",
      });
    });
  }

  //   Configuracion de puerto
  listen() {
    this.app.listen(this.port, () => {
      console.log("Escuchando en el puerto: ", this.port);
    });
  }
}

module.exports = Server;
