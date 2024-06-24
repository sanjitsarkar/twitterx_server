import vehicleService from "../services/vehicle.service";
import { Request, Response } from "express";

export const getVehicles = async (req: Request, res: Response) => {
  try {
    const vehicles = await vehicleService.getVehicles();
    res.status(200).json(vehicles);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

export const addVehicle = async (req: Request, res: Response) => {
  try {
    const vehicle = await vehicleService.addVehicle(req.body);
    res.status(200).json(vehicle);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

export const deleteVehicle = async (req: Request, res: Response) => {
  try {
    const vehicle = await vehicleService.deleteVehicle(req.params.id);
    res.status(200).json(vehicle);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

export const updateVehicle = async (req: Request, res: Response) => {
  try {
    const vehicle = await vehicleService.updateVehicle(req.params.id, req.body);
    res.status(200).json(vehicle);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

export const getVehicle = async (req: Request, res: Response) => {
  try {
    const vehicle = await vehicleService.getVehicle(req.params.id);
    res.status(200).json(vehicle);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}


