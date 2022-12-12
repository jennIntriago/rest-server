const { validationResult } = require("express-validator");

const validarCampos = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }

  // next es lo que se tiene que llamar si todo pasa correctamente
  next();
};

module.exports = {
  validarCampos,
};
