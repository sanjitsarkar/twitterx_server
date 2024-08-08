import Joi from "joi";

export const followSchema = Joi.object({
  followingId: Joi.number().integer().required()
});



export const followersOrFollowingsSchema = Joi.object({
  pageNumber: Joi.number().integer().optional(),
  searchQuery: Joi.string().allow("").optional(),
  sortBy: Joi.string().valid('date').optional(),
  orderBy: Joi.string().valid("oldest", "latest").optional()
});