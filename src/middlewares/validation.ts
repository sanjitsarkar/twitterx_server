import { NextFunction, Response, Request } from 'express';

const validateRequest = (schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const { error } = schema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
      next();
    }

    catch (err) {
      return res.status(400).json({ error: err.message });
    }
  };
};

export default validateRequest;
