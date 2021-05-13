const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const partySchema = new Schema(
  {
    name: { type: String },
    description: { type: String },
    images: { type: [String] },
    date: { type: Object },
    
      city: String,
      street: String,
    price: { type: Number },
    attendees: [{ type: Schema.Types.ObjectId, ref: "User" }],
    author: { type: Schema.Types.ObjectId, ref: "User" },
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

const Party = mongoose.model("Party", partySchema);
module.exports = Party;
