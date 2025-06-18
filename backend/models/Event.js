import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['Reunion', 'Networking', 'Workshop', 'Seminar', 'Social', 'Career', 'Other'],
    default: 'Other'
  },
  capacity: {
    type: Number,
    default: 100
  },
  registeredCount: {
    type: Number,
    default: 0
  },
  isVirtual: {
    type: Boolean,
    default: false
  },
  meetingLink: {
    type: String
  },
  image: {
    type: String
  },
  organizer: {
    name: String,
    email: String,
    phone: String
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['Draft', 'Published', 'Cancelled', 'Completed'],
    default: 'Published'
  }
}, {
  timestamps: true
});

// Indexes
eventSchema.index({ date: 1, status: 1 });
eventSchema.index({ type: 1 });

const Event = mongoose.model('Event', eventSchema);
export default Event;
