import mongoose from 'mongoose';

const UserRegistrationSchema = new mongoose.Schema({
  payment_utr: {
    type: String,
    required: true,
    unique: true,
  },
  tshirt_size: {
    type: String,
    required: true,
  },
  team_id: {
    type: String,
    required: true,
  },
  accomadation_necessary: {
    type: Boolean,
    required: true,
  },
  agenda_domain: {
    type: [String],
    required: true,
  },
  uid: {
    type: String,
    required: true,
  },
  phone_number: {
    type: String,
    required: true,
  },
  team_lead: {
    type: Boolean,
    required: true,
  },
});

const UserRegistration = mongoose.models.userregistrations || mongoose.model('userregistrations', UserRegistrationSchema);

export default UserRegistration;
