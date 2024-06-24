import VehicleModel from "../models/Vehicle.model";
import { IVehicle } from "../types/vehicle.types";

export default class VehicleRepository {
  _vehicleModel = VehicleModel;
  constructor() { }
  getVehicles(): Promise<IVehicle[]> {
    return this._vehicleModel.find();
  }
  addVehicle(vehicle: IVehicle) {
    return this._vehicleModel.create(vehicle);
  }
  deleteVehicle(id: string) {
    return this._vehicleModel.findByIdAndDelete(id);
  }
  updateVehicle(id: string, vehicle: IVehicle) {
    return this._vehicleModel.findByIdAndUpdate(id, vehicle);
  }
  getVehicle(id: string) {
    return this._vehicleModel.findById(id);
  }
}