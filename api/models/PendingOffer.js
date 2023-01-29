import mongoose from "mongoose";
//const { Schema } = mongoose;

const PendingOfferSchema = new mongoose.Schema({
  offerID: {
    type: String,
    required: true,
  },
  userID: {
    type: String,
    required: true,
  },
  paymentType: {
    type: String,
    required: true,
  },
  numOfAdults: {
    type: String,
    required: true,
  },
  numOfChildren: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
  },
  fName: {
    type: String,
    required: true,
  },
  lName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

export default mongoose.model("PendingOffer", PendingOfferSchema);
