import Joi from 'joi';

export const assetSchema = Joi.object({
  tag: Joi.string().max(40).required(),
  name: Joi.string().max(120).required(),
  category: Joi.string().max(80).required(),
  acquisition_cost: Joi.number().precision(2).min(0).required(),
  acquisition_date: Joi.date().required(),
  cost_center_id: Joi.number().integer().required(),
});
