import { Router } from "express";
import { authService } from "../services/authService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();


router.post(
  "/login",
  async (req, res, next) => {
    try {
      const userData = req.body; 

      const user = await authService.login(userData);
      res.data = user;
    } catch (err) {
      res.err = err.message || "Authentication failed";
    } finally {
      next();
    }
  },
  responseMiddleware
);

export { router };
