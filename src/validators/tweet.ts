import Joi from "joi";

export const tweetSchema = Joi.object({
  content: Joi.string().min(1).max(280).required()
});


export const tweetUpdateSchema = Joi.object({
  content: Joi.string().min(1).max(280).required()
});

export const tweetResponseSchema = Joi.object({

  pageNumber: Joi.number().integer().optional(),
  searchQuery: Joi.string().allow("").optional(),
  sortBy: Joi.string().valid('date').optional(),
  orderBy: Joi.string().valid("oldest", "latest").optional()
});

export const userTweetsResponseSchema = Joi.object({
  pageNumber: Joi.number().integer().optional(),
  searchQuery: Joi.string().allow("").optional(),
  sortBy: Joi.string().valid('date').optional(),
  orderBy: Joi.string().valid("oldest", "latest").optional()
});

