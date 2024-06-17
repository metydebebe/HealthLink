const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Appointment = require("./appointmetSchema")
const notificationSchema = new mongoose.Schema({
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
  message: String,
  type: String,
  timestamp: { type: Date, default: Date.now }
});

const appointmentSchema = new Schema({
  doctor: { type: Schema.Types.ObjectId, ref: 'Doctor' },
  patient: { type: Schema.Types.ObjectId, ref: 'Patient' }, // Reference to the Patient model
  modeOfConsultation: String,
  preferredDateTime: Date,
  symptoms: String,
  status: { type: String, default: 'pending' } // status can be 'pending', 'accepted', 'rejected', etc.
});

const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  verified: {
    type: Boolean,
    default: false,
  },
  age: Number,
  gender: String,
  address1: String,
  address2: String,
  city: String,
  country: String,

  imageUrl: String,
  appointments: [{
    type: Schema.Types.ObjectId,
    ref: 'Appointment'
  }],
 notifications: [notificationSchema]
});

module.exports = mongoose.model('Patient', patientSchema);
