import cityService from "../services/city.service";
import { Request, Response } from "express";
export const getCities = async (req: Request, res: Response) => {
  try {
    const cities = await cityService.getCities();
    res.status(200).json(cities);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

export const addCity = async (req: Request, res: Response) => {
  try {
    const city = await cityService.addCity(req.body);
    res.status(200).json(city);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

export const deleteCity = async (req: Request, res: Response) => {
  try {
    const city = await cityService.deleteCity(req.params.id);
    res.status(200).json(city);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

export const updateCity = async (req: Request, res: Response) => {
  try {
    const city = await cityService.updateCity(req.params.id, req.body);
    res.status(200).json(city);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

export const getCity = async (req: Request, res: Response) => {
  try {
    const city = await cityService.getCity(req.params.id);
    res.status(200).json(city);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

