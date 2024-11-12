import express from "express";
import { loginUser, registerUser } from "../controllers/user.controller.js";
import verifyToken from "../middlewares/verifyToken.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", verifyToken, (req, res) => {
  return res.json({
    message: "Success",
  });
});

export default router;
