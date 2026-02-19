import mongoose, { Schema } from 'mongoose'

const trekSchema = new Schema(
  {
    trekName: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    date: {
      type: Date,
      required: true,
    },

    month: {
      type: String,
      required: true,
      enum: [
        'Jan', 'Feb', 'Mar', 'Apr',
        'May', 'Jun', 'Jul', 'Aug',
        'Sep', 'Oct', 'Nov', 'Dec',
      ],
    },

    duration: {
      type: String,
      required: true,
    },

    difficulty: {
      type: String,
      required: true,
      enum: ['Easy', 'Moderate', 'Hard'],
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    leaderName: {
      type: String,
      required: true,
      trim: true,
    },

    whatsapp: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
    },
    images: [
      {
        type: String,
      }],

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true }
)

// Fix #2: Add indexes so queries don't do full collection scans
// Filter indexes (equality queries)
trekSchema.index({ month: 1 });
trekSchema.index({ difficulty: 1 });
trekSchema.index({ createdBy: 1 });    // For getMyTreks — huge win per user
trekSchema.index({ createdAt: -1 });   // For default sort

// Fix #3: Text index on trekName for fast, indexed full-text search
// Replaces the unindexed $regex approach
trekSchema.index({ trekName: 'text', location: 'text' });

// Compound index for the most common filtered + sorted query
trekSchema.index({ month: 1, difficulty: 1, createdAt: -1 });

const Trek = mongoose.model('Trek', trekSchema)

export default Trek
