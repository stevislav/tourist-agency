import mongoose from "mongoose";
//const { Schema } = mongoose;

const OfferSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  transportType: {
    type: String,
    required: true,
  },
  accommodation: {
    type: String,
    required: true,
  },
  continent: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  startDate: {
    type: Number,
    required: true,
  },
  endDate: {
    type: Number,
    required: true,
  },
  location: {
    type: [String],
    required: true,
  },
  daysPerLocation: {
    type: [Number],
    required: true,
  },
  imgPerLocation: {
    type: [String],
    required: true,
  },
  descPerDay: {
    type: [String],
    required: true,
  },
  roomType: {
    type: String,
    required: true,
  },
  accommodationType: {
    type: Number,
    required: true,
  },
  internet: {
    type: Boolean,
    required: true,
  },
  tv: {
    type: Boolean,
    required: true,
  },
  airConditioning: {
    type: Boolean,
    required: true,
  },
  roomFridge: {
    type: Boolean,
    required: true,
  },
});

export default mongoose.model("Offer", OfferSchema);
