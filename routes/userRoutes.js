import { Router } from "express";
import { userService } from "../services/userService.js";
import {
  createUserValid,
  updateUserValid,
} from "../middlewares/user.validation.middleware.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();

// Get all users
router.get("/api/users", async (req, res, next) => {
  try {
    const users = await userService.getUsers();
    res.data = users;
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
}, responseMiddleware);

// Get a specific user by ID
router.get("/api/users/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await userService.getUserById(id);
    if (!user) {
      res.status(404).json({ error: true, message: "User not found" });
      return;
    }
    res.data = user;
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
}, responseMiddleware);

// Create a new user
router.post(
  "/api/users",
  createUserValid, // Валидация перед созданием пользователя
  async (req, res, next) => {
    const userData = req.body;
    try {
      const newUser = await userService.createUser(userData);
      res.data = newUser;
      res.status(201); // Код статуса 201 означает "Created"
    } catch (err) {
      res.err = err;
    } finally {
      next();
    }
  },
  responseMiddleware
);

// Update an existing user by ID
router.put(
  "/api/users/:id",
  updateUserValid, // Валидация перед обновлением пользователя
  async (req, res, next) => {
    const { id } = req.params;
    const userData = req.body;
    try {
      const updatedUser = await userService.updateUser(id, userData);
      if (!updatedUser) {
        res.status(404).json({ error: true, message: "User not found" });
        return;
      }
      res.data = updatedUser;
    } catch (err) {
      res.err = err;
    } finally {
      next();
    }
  },
  responseMiddleware
);

// Delete a user by ID
router.delete("/api/users/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedUser = await userService.deleteUser(id);
    if (!deletedUser) {
      res.status(404).json({ error: true, message: "User not found" });
      return;
    }
    res.data = { message: "User deleted successfully" };
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
}, responseMiddleware);

export { router };