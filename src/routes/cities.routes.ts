import express from 'express';
const router = express.Router();
import { addCity, deleteCity, getCities, getCity, updateCity } from '../controllers/city.controller';

router.get('/', getCities);

router.post('/', addCity);

router.delete('/:id', deleteCity);

router.put('/:id', updateCity);

router.get('/:id', getCity);



export default router;
