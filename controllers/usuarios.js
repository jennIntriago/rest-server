const { response, request } = require("express");
const bcryptjs = require("bcryptjs");
const Usuario = require("../models/usuario");

const usuariosGet = (req = request, res = response) => {
  //extraer parametros enviados por ruta
  const { q, nombre = "NOT NAME", apikey, page = 1, limit } = req.query;

  res.json({
    msg: "get API - controlador",
    q,
    nombre,
    apikey,
    page,
    limit,
  });
};

const usuariosPost = async (req, res = response) => {
  const { nombre, correo, password, rol } = req.body;

  // Crear instancia de usuario
  const usuario = new Usuario({ nombre, correo, password, rol });

  // verificar si el correo existe

  //Encriptar la contraseña
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);

  // decirle a mongoose que guarde.
  await usuario.save();

  res.status(201).json({
    usuario,
  });
};

const usuariosPut = (req, res = response) => {
  const { id } = req.params;
  res.json({
    msg: "put API - controlador",
    id,
  });
};

const usuariosPatch = (req, res = response) => {
  res.json({
    msg: "patch API - controlador",
  });
};

const usuariosDelete = (req, res = response) => {
  res.json({
    msg: "delete API - controlador",
  });
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
  usuariosPatch,
};
