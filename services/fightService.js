import { fightRepository } from "../repositories/fightRepository.js";

class FightersService {
  // Получить все бои
  async getFights() {
    return await fightRepository.getAll();
  }

  // Получить информацию о конкретном бое по ID
  async getFightDetails(id) {
    return await fightRepository.getById(id);
  }

  // Создать новый бой
  async createFight(fightData) {
    return await fightRepository.create(fightData);
  }

  // Обновить информацию о бое по ID
  async updateFight(id, fightData) {
    return await fightRepository.update(id, fightData);
  }

  // Удалить бой по ID
  async deleteFight(id) {
    return await fightRepository.delete(id);
  }
}

const fightersService = new FightersService();

export { fightersService };
