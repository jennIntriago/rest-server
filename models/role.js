// Por lo general los modelos tienen el nombre de las tablas/colecciones de la base de datos pero en singular
const { Schema, model } = require("mongoose");

const RoleSchema = Schema({
  rol: {
    type: String,
    required: [true, "El rol es obligatorio"],
  },
});

module.exports = model("Role", RoleSchema);
