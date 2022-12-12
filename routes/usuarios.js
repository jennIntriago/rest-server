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
const { validarCampos } = require("../middlewares/validar-campos");
const { esRoleValido } = require("../helpers/db-validators");
const router = Router();
router.get("/", usuariosGet);

//forma de definir endpoints con argumentos
router.put("/:id", usuariosPut);

//
router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password es obligatorio y más de 6 letras").isLength({
      min: 6,
    }),
    check("correo", "El correo no es válido").isEmail(),
    // check("rol", "No es un rol permitido").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    check("rol").custom(esRoleValido),
    validarCampos,
  ],
  usuariosPost
);

router.patch("/", usuariosPatch);

//
router.delete("/", usuariosDelete);

module.exports = router;
