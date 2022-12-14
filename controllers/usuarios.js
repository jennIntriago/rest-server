const { response, request } = require("express");
const bcryptjs = require("bcryptjs");
const Usuario = require("../models/usuario");

const usuariosGet = async (req = request, res = response) => {
  //extraer parametros enviados por ruta
  // const { q, nombre = "NOT NAME", apikey, page = 1, limit } = req.query;

  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };
  // obtener todos los usuarios
  // const usuarios = await Usuario.find(query)
  //   .skip(Number(desde))
  //   .limit(Number(limite));
  // const total = await Usuario.countDocuments(query);

  // Mi respuesta es una coleccion de promesas
  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query).skip(Number(desde)).limit(Number(limite)),
  ]);

  res.json({
    total,
    usuarios,
  });
};

const usuariosPost = async (req, res = response) => {
  const { nombre, correo, password, rol } = req.body;

  // Crear instancia de usuario
  const usuario = new Usuario({ nombre, correo, password, rol });

  //Encriptar la contraseña
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);

  // decirle a mongoose que guarde.
  await usuario.save();

  res.status(201).json({
    usuario,
  });
};

const usuariosPut = async (req, res = response) => {
  const { id } = req.params;
  // extraer lo que no se necesita y hacer spread de lo demás
  const { _id, password, google, correo, ...resto } = req.body;

  // TODO Validar contra la base de datos

  // para actualizar contraseña
  if (password) {
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }

  // busca por id y actualizalo
  const usuario = await Usuario.findByIdAndUpdate(id, resto);

  res.json(usuario);
};

const usuariosPatch = (req, res = response) => {
  res.json({
    msg: "patch API - controlador",
  });
};

const usuariosDelete = async (req, res = response) => {
  const { id } = req.params;

  // borrado físico
  const usuario = await Usuario.findByIdAndDelete();

  res.json({
    usuario,
  });
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
  usuariosPatch,
};
