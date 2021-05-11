const express = require('express');
const Party = require('../models/Party.model');
const router = express.Router();

router.get("/", (req, res, next) => {
  Party.find({ user: req.user.id })
  .then(party =>  res.status(200).json(party))
  .catch(err => res.status(500).json(err))
})

router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  Party.findOne({ _id: id, user: req.user.id  })
  .then(party => res.status(200).json(party))
  .catch(err => res.status(500).json(err))
})

router.post("/", (req, res, next) => {
  const { name, age, city, date, street } = req.body;

  if(!name){
    return res.status(400).json({ message: "Name is required"});
  }

  Party.create({ name, images, date, city, street, user: req.user.id,  })
  .then(party => res.status(200).json(party))
  .catch(err => res.status(500).json(err))
})

router.put("/:id", (req, res, next) => {
  const { id } = req.params;
  Party.findOneAndUpdate({ _id: id, user: req.user.id  }, req.body, { new: true })
  .then(party => res.status(200).json(party))
  .catch(err => res.status(500).json(err))
})

router.delete("/:id", (req, res, next) => {
  const { id } = req.params;
  Party.findOneAndRemove({ _id: id, user: req.user.id  })
  .then(() => res.status(200).json({ message: `Party ${id} deleted 🗑`}))
  .catch(err => res.status(500).json(err))
})


module.exports = router;


// name: {type: String, required: true},
//    description: {type: String, required: true},
//    images: {type: Array, required: true},
//    date: {type: Date, required: true},
//    city: {type: String},
//    street: {type: String},
//    ageInterval: {type: String},
//    musicType: {type: String},
//    price: {type: Number},
//    attendants: [{type: Schema.Types.ObjectId,ref:'User'}],
//    smoking: {type: Boolean}
 