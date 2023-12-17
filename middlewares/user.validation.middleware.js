import { USER } from "../models/user.js";

const isValidEmail = (email) => {
  // Разрешить только домен @gmail
  return email.endsWith("@gmail.com");
};

const isValidPhoneNumber = (phoneNumber) => {
  // Номер телефона: +380xxxxxxxxx
  return /^\+380\d{9}$/.test(phoneNumber);
};

const createUserValid = (req, res, next) => {
  const userData = req.body;

  // Проверка обязательных полей
  if (!userData.name || !userData.email || !userData.password) {
    res.status(400).json({ error: true, message: "All fields are required for creating a user" });
    return;
  }

  // Проверка формата полей
  if (!isValidEmail(userData.email)) {
    res.status(400).json({ error: true, message: "Invalid email format. Only @gmail.com domain is allowed" });
    return;
  }

  if (userData.phoneNumber && !isValidPhoneNumber(userData.phoneNumber)) {
    res.status(400).json({ error: true, message: "Invalid phone number format. Should start with +380 and followed by 9 digits" });
    return;
  }

  // Проверка дополнительных условий, если необходимо

  next();
};

const updateUserValid = (req, res, next) => {
  const userData = req.body;

  // Проверка наличия хотя бы одного поля для обновления
  if (!userData.name && !userData.email && !userData.password && !userData.phoneNumber) {
    res.status(400).json({ error: true, message: "At least one field is required for updating a user" });
    return;
  }

  // Проверка формата полей, если они указаны
  if (userData.email && !isValidEmail(userData.email)) {
    res.status(400).json({ error: true, message: "Invalid email format. Only @gmail.com domain is allowed" });
    return;
  }

  if (userData.phoneNumber && !isValidPhoneNumber(userData.phoneNumber)) {
    res.status(400).json({ error: true, message: "Invalid phone number format. Should start with +380 and followed by 9 digits" });
    return;
  }

  // Проверка дополнительных условий, если необходимо

  next();
};

export { createUserValid, updateUserValid };
