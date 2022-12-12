// Permite llamar una Router
const { Router } = require("express");
const { check } = require("express-validator");
const {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
  usuariosPatch,
} = require("../controllers/usuarios");

const router = Router();
router.get("/", usuariosGet);

//forma de definir endpoints con argumentos
router.put("/:id", usuariosPut);

//
router.post(
  "/",
  [check("correo", "El correo no es válido").isEmail()],
  usuariosPost
);

router.patch("/", usuariosPatch);

//
router.delete("/", usuariosDelete);

module.exports = router;
