import mongoose from 'mongoose';

const TeamSchema = new mongoose.Schema({
  team_name: {
    type: String,
    required: true,
    unique: true
  },
  team_size: {
    type: Number,
    required: true,
    min: [1, 'Team size must be at least 1']
  },
  team_details: {
    type: [{
      type: String,
      match: [/.+\@.+\..+/, 'Please enter a valid email address']
    }],
    validate: {
      validator: function(v) {
        return v.length === 4;
      },
      message: 'Team must have exactly 4 members'
    },
    required: true
  },
  domain: {
    type: String,
    required: true
  },
  team_lead: {
    type: Boolean,
    required: true
  }
});

const Team = mongoose.models.teams || mongoose.model('teams', TeamSchema);

export default Team;

