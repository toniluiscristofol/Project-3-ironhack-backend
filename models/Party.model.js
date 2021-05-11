const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const partySchema = new Schema({
  
   name: {type: String, required: true},
   description: {type: String, required: true},
   images: {type: Array, required: true},
   date: {type: Date, required: true},
   city: {type: String},
   street: {type: String},
   ageInterval: {type: String},
   musicType: {type: String},
   price: {type: Number},
   attendants: [{type: Schema.Types.ObjectId,ref:'User'}],
   smoking: {type: Boolean}
 
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