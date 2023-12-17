import { fighterRepository } from "../repositories/fighterRepository.js";

class FighterService {
  async getFighters() {
    return await fighterRepository.getAll();
  }

  async getFighterDetails(id) {
    return await fighterRepository.getById(id);
  }

  async createFighter(fighterData) {
    return await fighterRepository.create(fighterData);
  }

  async updateFighter(id, fighterData) {
    return await fighterRepository.update(id, fighterData);
  }

  async deleteFighter(id) {
    return await fighterRepository.delete(id);
  }
}

const fighterService = new FighterService();

export { fighterService };