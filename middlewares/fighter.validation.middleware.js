import { FIGHTER } from "../models/fighter.js";

const isValidPower = (power) => {
  // Проверка мощности: число, 1 ≤ степень ≤ 100
  return Number.isInteger(power) && power >= 1 && power <= 100;
};

const isValidDefense = (defense) => {
  // Проверка защиты: число, 1 ≤ защита ≤ 10
  return Number.isInteger(defense) && defense >= 1 && defense <= 10;
};

const isValidHealth = (health) => {
  // Проверка здоровья: число, 80 ≤ здоровье ≤ 120
  return Number.isInteger(health) && health >= 80 && health <= 120;
};

const createFighterValid = (req, res, next) => {
  const fighterData = req.body;

  // Проверка обязательных полей
  if (!fighterData.name || !fighterData.power || !fighterData.defense) {
    res.status(400).json({ error: true, message: "Name, power, and defense are required for creating a fighter" });
    return;
  }

  // Проверка формата полей
  if (!isValidPower(fighterData.power)) {
    res.status(400).json({ error: true, message: "Invalid power format. Should be an integer between 1 and 100" });
    return;
  }

  if (!isValidDefense(fighterData.defense)) {
    res.status(400).json({ error: true, message: "Invalid defense format. Should be an integer between 1 and 10" });
    return;
  }

  if (fighterData.health && !isValidHealth(fighterData.health)) {
    res.status(400).json({ error: true, message: "Invalid health format. Should be an integer between 80 and 120" });
    return;
  }

  // Проверка дополнительных условий, если необходимо
  // Например, проверка уникальности имени бойца в базе данных

  next();
};

const updateFighterValid = (req, res, next) => {
  const fighterData = req.body;

  // Проверка наличия хотя бы одного поля для обновления
  if (!fighterData.name && !fighterData.power && !fighterData.defense && !fighterData.health) {
    res.status(400).json({ error: true, message: "At least one field is required for updating a fighter" });
    return;
  }

  // Проверка формата полей, если они указаны
  if (fighterData.power && !isValidPower(fighterData.power)) {
    res.status(400).json({ error: true, message: "Invalid power format. Should be an integer between 1 and 100" });
    return;
  }

  if (fighterData.defense && !isValidDefense(fighterData.defense)) {
    res.status(400).json({ error: true, message: "Invalid defense format. Should be an integer between 1 and 10" });
    return;
  }

  if (fighterData.health && !isValidHealth(fighterData.health)) {
    res.status(400).json({ error: true, message: "Invalid health format. Should be an integer between 80 and 120" });
    return;
  }

  // Проверка дополнительных условий, если необходимо

  next();
};

export { createFighterValid, updateFighterValid };
