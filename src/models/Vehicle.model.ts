import mongoose, { Document, Schema } from 'mongoose';

interface IVehicle extends Document {
  kind: string;
  range: number;
  count: number;
}

const VehicleSchema = new Schema<IVehicle>({
  kind: { type: String, required: true },
  range: { type: Number, required: true },
  count: { type: Number, required: true },
}, {
  timestamps: true

});

const VehicleModel = mongoose.model<IVehicle>('Vehicle', VehicleSchema);

export default VehicleModel;