import CityRepository from "../respository/city.repository";
import { ICity } from "../types/city.types";

class CityService {
  constructor(private readonly _cityRepository: CityRepository) { }

  async getCities() {
    try {
      const cities = await this._cityRepository.getCities();
      return cities;
    }
    catch (e) {
      throw new Error("Error fetching cities");
    }
  }

  async addCity(city: ICity) {
    try {
      const newCity = await this._cityRepository.addCity(city);
      return newCity;
    }
    catch (e) {
      throw new Error("Error adding city");
    }
  }

  async deleteCity(id: string) {
    try {
      const city = await this._cityRepository.deleteCity(id);
      return city;
    }
    catch (e) {
      throw new Error("Error deleting city");
    }
  }

  async updateCity(id: string, city: ICity) {
    try {
      const updatedCity = await this._cityRepository.updateCity(id, city);
      return updatedCity;
    }
    catch (e) {
      throw new Error("Error updating city");
    }
  }

  async getCity(id: string) {
    try {
      const city = await this._cityRepository.getCity(id);
      return city;
    }
    catch (e) {
      throw new Error("Error fetching city");
    }
  }
}

export default new CityService(new CityRepository());
