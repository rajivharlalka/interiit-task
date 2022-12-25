import express from "express";
import authController from "../controllers/auth.controller";
import validate from "../middleware/validate";
import authValidation from "../validations/auth.validation";

const router = express.Router();

router.post(
  "/register/password",
  validate(authValidation.registerWithEmail),
  authController.registerWithEmailandPassword
);
router.post("/login", validate(authValidation.login), authController.login);

export {router};
