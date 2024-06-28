import { ICity } from "../types/city.types";
import { ICop } from "../types/result.types";
import { IVehicle } from "../types/vehicle.types";
import cityService from "./city.service";
import vehicleService from "./vehicle.service";

class ResultService {
  constructor() { }
  validateCities(cops: ICop[]) {

    const uniqueCities = new Set(cops.map((cop: ICop) => cop.selectedCityId));
    if (uniqueCities.size !== cops.length) {
      return { result: 'All cops must be in different cities!' };
    }
    return null;
  }
  validateVehicles(cops: ICop[], vehicles: IVehicle[]) {
    const vehicleCounts: { [key: string]: number } = {};
    for (const cop of cops) {
      const copVehicle = vehicles.find((vehicle: IVehicle) => String(vehicle._id) === cop.selectedVehicleId);
      if (!copVehicle) {
        return { result: 'Invalid vehicle!' };
      }
      if (copVehicle?._id && copVehicle.count > 0) {
        if (vehicleCounts[String(copVehicle._id)]) {
          vehicleCounts[String(copVehicle._id)]++;
        } else {
          vehicleCounts[String(copVehicle._id)] = 1;
        }
        if (vehicleCounts[String(copVehicle._id)] > copVehicle.count) {
          return { result: 'Cop vehicle count exceeded!' };
        }
      }
    }
    return null;
  }
  findCapturingCop(fugitiveCity: ICity, cops: ICop[], cities: ICity[], vehicles: IVehicle[]) {
    let capturingCop = null;
    for (const cop of cops) {
      const copCity = cities.find((city: ICity) => String(city._id) === cop.selectedCityId);
      const fugitiveCityDistanceFromCopCity = Math.abs(fugitiveCity.distance + copCity.distance);
      const copVehicle = vehicles.find((vehicle: IVehicle) => String(vehicle._id) === cop.selectedVehicleId);
      if (copCity._id === fugitiveCity._id || copVehicle.range >= (2 * fugitiveCityDistanceFromCopCity)) {
        capturingCop = cop;
        break;
      }
    }
    return capturingCop;
  }

  async getResult(cops: ICop[]) {
    try {
      if (!cops) {
        throw new Error('Cops not found!');

      }
      const cities = await cityService.getCities();
      const vehicles = await vehicleService.getVehicles();
      const fugitiveCity = cities[Math.floor(Math.random() * cities.length)]

      const validateCitiesResult = this.validateCities(cops);
      if (validateCitiesResult) {
        throw new Error(validateCitiesResult.result);
      }

      const validateVehiclesResult = this.validateVehicles(cops, vehicles);
      if (validateVehiclesResult) {
        throw new Error(validateVehiclesResult.result);

      }

      const capturingCop = this.findCapturingCop(fugitiveCity, cops, cities, vehicles);
      return {
        capturingCop: {
          name: capturingCop.name, selectedCity: cities.find(each => String(each._id) === capturingCop.selectedCityId).name, selectedVehicle: vehicles.find((each) => String(each._id) === capturingCop.selectedVehicleId).kind
        }, fugitiveCity
      }

    } catch (e) {
      throw new Error(e.message);
    }
  }
}

export default new ResultService();

