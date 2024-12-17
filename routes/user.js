const express = require("express");
const ctr = require("../controllers/user");
const { authenticate, validationBody } = require("../middlewares/");
const { schemas } = require("../models/userSchema");
const router = express.Router();

router.post("/register", validationBody(schemas.regValidation), ctr.register);

router.post("/login", validationBody(schemas.loginValidation), ctr.login);

router.post("/forgotPassword", ctr.forgotReq);

router.put("/renewPassword/:tokenRenew", ctr.renewPassword);

router.post("/logout", authenticate, ctr.logout);

module.exports = router;
