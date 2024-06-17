const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationSchema = new mongoose.Schema({
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
  message: String,
  type: String,
  timestamp: { type: Date, default: Date.now }
});

const appointmentSchema = new Schema({
  patient: { type: Schema.Types.ObjectId, ref: 'Patient' },
  modeOfConsultation: String,
  preferredDateTime: Date,
  symptoms: String,
  status: { type: String, default: 'pending' } // status can be 'pending', 'accepted', 'rejected', etc.
});

const medicationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dosage: { type: String, required: true },
  frequency: { type: String, required: true },
  instructions: { type: String },
});

const prescriptionSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  date: { type: Date, default: Date.now },
  time: { type: String, required: true },
  disease: { type: String },
  bloodPressure: { type: Number, required: true },
  medications: { type: [medicationSchema], required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true }
}, { timestamps: true });


const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  verified: { type: Boolean, default: false },
  medicalSpeciality: String,
  age: Number,
  gender: String,
  degree: String,
  regNumber: String,
  yearOfReg: String,
  stateMedicalCouncil: String,
  experience: String,
  address1: String,
  address2: String,
  city: String,
  state: String,
  pincode: String,
  country: String,
  startTime: String,
  endTime: String,
  imageUrl: String,
  appointments: [{ type: Schema.Types.ObjectId, ref: 'Appointment' }],
  notifications: [notificationSchema],
  prescriptions: [{ type: Schema.Types.ObjectId, ref: 'Prescription' }] // Added prescriptions relationship
});

module.exports = mongoose.model('Doctor', doctorSchema);
