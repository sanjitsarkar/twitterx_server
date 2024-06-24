import express from 'express';
const router = express.Router();
import { addVehicle, deleteVehicle, getVehicle, getVehicles, updateVehicle } from '../controllers/vehicle.controller';

router.get('/', getVehicles);
router.post('/', addVehicle);
router.delete('/:id', deleteVehicle);
router.put('/:id', updateVehicle);
router.get('/:id', getVehicle);

export default router;
