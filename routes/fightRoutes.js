import { Router } from "express";
import { fightersService } from "../services/fightService.js";
import {
  createUserValid,
  updateUserValid,
} from "../middlewares/user.validation.middleware.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();
// Get all fighters
router.get("/api/fighters", async (req, res, next) => {
  try {
    const fighters = await fightersService.getFighters();
    res.data = fighters;
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
}, responseMiddleware);

// Get a specific fighter by ID
router.get("/api/fighters/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const fighter = await fightersService.getFighterById(id);
    if (!fighter) {
      res.status(404).json({ error: true, message: "Fighter not found" });
      return;
    }
    res.data = fighter;
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
}, responseMiddleware);

// Create a new fighter
router.post(
  "/api/fighters",
  createFighterValid, // Валидация перед созданием бойца
  async (req, res, next) => {
    const fighterData = req.body;
    try {
      const newFighter = await fightersService.createFighter(fighterData);
      res.data = newFighter;
      res.status(201); // Код статуса 201 означает "Created"
    } catch (err) {
      res.err = err;
    } finally {
      next();
    }
  },
  responseMiddleware
);

// Update an existing fighter by ID
router.put(
  "/api/fighters/:id",
  updateFighterValid, // Валидация перед обновлением бойца
  async (req, res, next) => {
    const { id } = req.params;
    const fighterData = req.body;
    try {
      const updatedFighter = await fightersService.updateFighter(id, fighterData);
      if (!updatedFighter) {
        res.status(404).json({ error: true, message: "Fighter not found" });
        return;
      }
      res.data = updatedFighter;
    } catch (err) {
      res.err = err;
    } finally {
      next();
    }
  },
  responseMiddleware
);

// Delete a fighter by ID
router.delete("/api/fighters/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedFighter = await fightersService.deleteFighter(id);
    if (!deletedFighter) {
      res.status(404).json({ error: true, message: "Fighter not found" });
      return;
    }
    res.data = { message: "Fighter deleted successfully" };
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
}, responseMiddleware);

export { router };