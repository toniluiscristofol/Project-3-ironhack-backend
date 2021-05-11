const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const partySchema = new Schema({
  name: { type: String},
  city: { type: String},
  age: { type: Number},
  date: { type: Date },
  street: { type: String},
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true,
  toJSON: {
    transform: (doc, ret) => {
      ret.id = doc._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
})

const Party = mongoose.model('Party', partySchema);
module.exports = Party;