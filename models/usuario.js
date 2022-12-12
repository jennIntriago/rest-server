const { Schema, model } = require("mongoose");

const UsuarioSchema = Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio"],
  },
  correo: {
    type: String,
    required: [true, "El correo es obligatorio"],
    unique: true,
  },

  password: {
    type: String,
    required: [true, "El contraseña es obligatorio"],
  },

  img: {
    type: String,
  },

  rol: {
    type: String,
    required: true,
    emun: ["ADMIN_ROLE", "USER_ROLE"],
  },

  estado: {
    type: Boolean,
    default: true,
  },

  google: {
    type: Boolean,
    default: false,
  },
});

// Para reescribir este metodo, se debe usar una función normal para acceder al objeto actual [this]
UsuarioSchema.methods.toJSON = function () {
  // Sacamos el objeto la version y password y mantenemos los demas
  const { __v, password, ...usuario } = this.toObject();
  return usuario;
};

// usamos el model y le pasamos el nombre del modelo y mongoose ubica el mismo nombre a la colección en plural
module.exports = model("Usuario", UsuarioSchema);
