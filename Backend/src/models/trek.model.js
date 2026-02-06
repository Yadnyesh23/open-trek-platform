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

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'Leader',
      default: null,
    },
  },
  { timestamps: true }
)

const Trek = mongoose.model('Trek', trekSchema)

export default Trek
