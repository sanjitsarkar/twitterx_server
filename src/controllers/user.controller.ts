import { Request, Response } from 'express';
import UserService from '../services/user.service';

export const getUsers = async (req: any, res: Response) => {
  try {
    const { page, searchKey = '', orderBy = "latest", sortBy = "date" } = req.query;
    const userId = req.user.id;
    const users = await UserService.getUsers({ limit: 10, pageNumber: Number(page), searchQuery: String(searchKey), orderBy: String(orderBy), sortBy: String(sortBy), userId });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const response = await UserService.loginUser(email, password);
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password, firstName, lastName } = req.body;
    const response = await UserService.registerUser({ email, firstName, lastName, password });
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await UserService.deleteUser(Number(id));
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req: any, res: Response) => {
  try {
    const id = req.user.id;
    const { firstName, lastName } = req.body;
    const updatedUser = await UserService.updateUser(Number(id), { firstName, lastName });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await UserService.getUser(Number(id));
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getUserProfile = async (req: any, res: Response) => {
  try {
    const id = req.user.id;
    const user = await UserService.getUser(Number(id));
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserByEmail = async (req: Request, res: Response) => {
  try {
    const { email } = req.params;
    const user = await UserService.getUserByEmail(email);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
