import mongoose, { Schema, Document } from 'mongoose';

interface ICity extends Document {
  name: string;
  distance: number;
}

const CitySchema: Schema = new Schema({
  name: { type: String, required: true },
  distance: { type: Number, required: true }
}, {
  timestamps: true

});

const CityModel = mongoose.model<ICity>('City', CitySchema);

export default CityModel;