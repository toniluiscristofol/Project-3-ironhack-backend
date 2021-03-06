const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const partySchema = new Schema(
  {
    name: { type: String },
    description: { type: String, default: Date.now },
    images: { type: [String], default:["https://onlyibizaboatparty.com/img/clubberPack.jpg"] },
    date: { type: Date },
    city: String,
    street: String,
    latitude: Number,
    longitude: Number,
    price: { type: Number },
    attendees: [{ type: Schema.Types.ObjectId, ref: "User"}],
    host: { type: Schema.Types.ObjectId, ref: "User" },
    maxAttendees: { type: Number },
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
