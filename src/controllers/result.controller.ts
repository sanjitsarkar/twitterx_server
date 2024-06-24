import { Response, Request } from "express";
import resultService from "../services/result.service";



export const getResult = async (req: Request, res: Response) => {
  try {
    const { cops } = req.body;
    const result = await resultService.getResult(cops);
    res.status(200).json(result);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};