import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { ENV } from '../config/env.cofig';
import UserRepository from '../respositories/user.repository';
import { IUser, IUsersResponse } from '../types/user.types';

class UserService {
  constructor(private readonly _userRepository: UserRepository) { }

  async getUsers(params: IUsersResponse) {
    try {
      return await this._userRepository.getUsers(params);
    } catch (e) {
      throw new Error('Error fetching users');
    }
  }

  async registerUser(user: IUser) {
    try {
      const { firstName, lastName, email, password } = user;
      const existingUser = await this._userRepository.getUserByEmail(email);
      if (existingUser) {
        throw new Error('User already exists');
      }
      const newUser = await this._userRepository.addUser({ firstName, lastName, email, password });
      return newUser;
    } catch (error) {
      throw error;
    }
  }

  async loginUser(email: string, password: string) {
    try {
      const user = await this._userRepository.getUserByEmail(email);
      if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error('Invalid email or password');
      }
      const token = jwt.sign({ id: user.id }, ENV.JWT_SECRET, { expiresIn: '1h' });
      delete user.password;
      return { user, token };
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(id: number) {
    try {
      return await this._userRepository.deleteUser(id);
    } catch (e) {
      throw new Error('Error deleting user');
    }
  }

  async updateUser(id: number, user: IUser) {
    try {
      return await this._userRepository.updateUser(id, user);
    } catch (e) {
      throw new Error('Error updating user');
    }
  }

  async getUser(id: number) {
    try {
      return await this._userRepository.getUser(id);
    } catch (e) {
      throw new Error('Error fetching user');
    }
  }

  async getUserByEmail(email: string) {
    try {
      return await this._userRepository.getUserByEmail(email);
    } catch (e) {
      throw new Error('Error fetching user by email');
    }
  }
}

export default new UserService(new UserRepository());
