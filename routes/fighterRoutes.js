import { Router } from "express";
import { fighterService } from "../services/fighterService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";
import {
  createFighterValid,
  updateFighterValid,
} from "../middlewares/fighter.validation.middleware.js";

const router = Router();

// TODO: Implement route controllers for fighter

// GET /api/fighters
router.get("/", async (req, res, next) => {
  try {
    const fighters = await fighterService.getFighters();
    res.data = fighters;
  } catch (err) {
    res.err = err.message || "Error getting fighters";
  } finally {
    next();
  }
}, responseMiddleware);

// GET /api/fighters/:id
router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const fighter = await fighterService.getFighterDetails(id);
    if (!fighter) {
      res.status(404).json({ error: true, message: "Fighter not found" });
      return;
    }
    res.data = fighter;
  } catch (err) {
    res.err = err.message || "Error getting fighter details";
  } finally {
    next();
  }
}, responseMiddleware);

// POST /api/fighters
router.post("/", createFighterValid, async (req, res, next) => {
  try {
    const newFighter = await fighterService.createFighter(req.body);
    res.data = newFighter;
  } catch (err) {
    res.err = err.message || "Error creating fighter";
  } finally {
    next();
  }
}, responseMiddleware);

// PUT /api/fighters/:id
router.put("/:id", updateFighterValid, async (req, res, next) => {
  const { id } = req.params;
  try {
    const updatedFighter = await fighterService.updateFighter(id, req.body);
    if (!updatedFighter) {
      res.status(404).json({ error: true, message: "Fighter not found" });
      return;
    }
    res.data = updatedFighter;
  } catch (err) {
    res.err = err.message || "Error updating fighter";
  } finally {
    next();
  }
}, responseMiddleware);

// DELETE /api/fighters/:id
router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedFighter = await fighterService.deleteFighter(id);
    if (!deletedFighter) {
      res.status(404).json({ error: true, message: "Fighter not found" });
      return;
    }
    res.data = deletedFighter;
  } catch (err) {
    res.err = err.message || "Error deleting fighter";
  } finally {
    next();
  }
}, responseMiddleware);

export { router };
