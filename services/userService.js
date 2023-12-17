import { userRepository } from "../repositories/userRepository.js";

class UserService {
  // Получить всех пользователей
  async getUsers() {
    return await userRepository.getAll();
  }

  // Получить информацию о конкретном пользователе по ID
  async getUserDetails(id) {
    return await userRepository.getById(id);
  }

  // Создать нового пользователя
  async createUser(userData) {
    return await userRepository.create(userData);
  }

  // Обновить информацию о пользователе по ID
  async updateUser(id, userData) {
    return await userRepository.update(id, userData);
  }

  // Удалить пользователя по ID
  async deleteUser(id) {
    return await userRepository.delete(id);
  }

  // Найти пользователя по определенным критериям (поиск)
  async searchUser(search) {
    return await userRepository.getOne(search);
  }
}

const userService = new UserService();

export { userService };