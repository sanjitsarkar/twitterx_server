import VehicleRepository from "../respository/vehicle.repository";
import { IVehicle } from "../types/vehicle.types";

class VehicleService {
  constructor(private readonly _vehicleRepository: VehicleRepository) { }

  async getVehicles() {
    try {
      const vehicles = await this._vehicleRepository.getVehicles();
      return vehicles;
    }
    catch (e) {
      throw new Error("Error fetching cities");
    }
  }

  async addVehicle(vehicle: IVehicle) {
    try {
      const newVehicle = await this._vehicleRepository.addVehicle(vehicle);
      return newVehicle;
    }
    catch (e) {
      throw new Error("Error adding vehicle");
    }
  }

  async deleteVehicle(id: string) {
    try {
      const vehicle = await this._vehicleRepository.deleteVehicle(id);
      return vehicle;
    }
    catch (e) {
      throw new Error("Error deleting vehicle");
    }
  }

  async updateVehicle(id: string, vehicle: IVehicle) {
    try {
      const updatedVehicle = await this._vehicleRepository.updateVehicle(id, vehicle);
      return updatedVehicle;
    }
    catch (e) {
      throw new Error("Error updating vehicle");
    }
  }

  async getVehicle(id: string) {
    try {
      const vehicle = await this._vehicleRepository.getVehicle(id);
      return vehicle;
    }
    catch (e) {
      throw new Error("Error fetching vehicle");
    }
  }


}




export default new VehicleService(new VehicleRepository());