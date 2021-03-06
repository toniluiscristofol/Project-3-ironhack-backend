const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema(
  {
    rating: Number,
    description: String,
    role: {
      type: String,
      enum: ["host", "attendee"],
    },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    images: [String],
    party: { type: Schema.Types.ObjectId, ref: "Party", required: true },
    receiver: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = doc._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
