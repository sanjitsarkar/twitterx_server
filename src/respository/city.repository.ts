
import CityModel from "../models/City.model";
import { ICity } from "../types/city.types";

export default class CityRepository {
  _cityModel = CityModel;
  constructor() { }
  getCities(): Promise<ICity[]> {
    return this._cityModel.find();
  }
  addCity(city: ICity) {
    return this._cityModel.create(city);
  }
  deleteCity(id: string) {
    return this._cityModel.findByIdAndDelete(id);
  }
  updateCity(id: string, city: ICity) {
    return this._cityModel.findByIdAndUpdate(id, city);
  }
  getCity(id: string) {
    return this._cityModel.findById(id);
  }
}