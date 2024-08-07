import Joi from 'joi';

export const registerSchema = Joi.object({
  firstName: Joi.string().min(1).max(255).required(),
  lastName: Joi.string().min(1).max(255).required(),
  password: Joi.string().min(5).max(15).required(),
  email: Joi.string().email().min(5).max(255).required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().min(5).max(255).required(),
  password: Joi.string().min(5).max(15).required()
});

export const updateUserSchema = Joi.object({
  firstName: Joi.string().min(1).max(255),
  lastName: Joi.string().min(1).max(255),
});

export const usersResponseSchema = Joi.object({
  pageNumber: Joi.number().integer().optional(),
  searchQuery: Joi.string().allow("").optional(),
  sortBy: Joi.string().valid('date').optional(),
  orderBy: Joi.string().valid("asc", "desc").optional()
});



export const deleleUserSchema = Joi.object({
  id: Joi.number().integer().required(),
});
