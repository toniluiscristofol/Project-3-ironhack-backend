const express = require("express");
const Party = require("../models/Party.model");
const router = express.Router();
const uploader = require('../configs/cloudinary.config');

router.get("/", (req, res, next) => {
  Party.find({})
    .then((party) => res.status(200).json(party))
    .catch((err) => res.status(500).json(err));
});

router.get("/search", (req, res, next) => {
  const { city } = req.query;
  Party.find({ "location.city":city })
    .then((parties) => res.status(200).json(parties))
    .catch((err) => res.status(500).json(err));
});

router.get("/searchbydate", (req, res, next) => {
  const { date } = req.query;
  Party.find({ date })
    .then((parties) => res.status(200).json(parties))
    .catch((err) => res.status(500).json(err));
});
router.get("/searchmany", (req, res, next) => {
  const { date, city } = req.query;
  Party.find({ $and: [{ date }, { "location.city": city }] })
    .then((parties) => res.status(200).json(parties))
    .catch((err) => res.status(500).json(err));
});


// router.get("/searchAll", (req, res, next) => {
//   const { search } = req.query;
//   Party.find({ $or: [{ description: {$regex :`.*(?i)${search}.*`} },{ "city: {$regex :`.*(?i)${search}.*`} }] })
//     .then((parties) => res.status(200).json(parties))
//     .catch((err) => res.status(500).json(err));
// });



router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  console.log(id)
  Party.findOne({ _id: id})
    .then((party) => res.status(200).json(party))
    .catch((err) => res.status(500).json(err));
});

router.get("/userparties", (req, res, next) =>{
  Party.find({host: req.user.id})
  .then((parties) => res.status(200).json(parties))
  .catch((err) => res.status(500).json(err));
} );

router.post("/", (req, res, next) => {
  // const reqFiles = [];
  // console.log("req.files", req.files)
  // for (var i = 0; i < req.files.length; i++) {
  //   reqFiles.push(req.files[i].filename)
  // }

  console.log("req.file", req.file)
  const {
    name,
    description,
    date,
    location,
    price,
    
  } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }

  Party.create({
    name,
    description,
    images,
    date,
    location,
    price,
    user: req.user.id,
  })
 
    .then((party) => res.status(200).json(party))
    .catch((err) => res.status(500).json(err));
});

router.put("/:id", (req, res, next) => {
  const { id } = req.params;
  Party.findOneAndUpdate({ _id: id, user: req.user.id }, req.body, {
    new: true,
  })
    .then((party) => res.status(200).json(party))
    .catch((err) => res.status(500).json(err));
});

// router.put('/edit', uploader.array('images',12), (req, res, next) => {
//   console.log("reqfile" , req.file);
//   console.log("req.userid", req.user.id)
//   console.log("reqbody", req.body)
//   User.findByIdAndUpdate( req.user.id , { ...req.body, photo: req.files ? req.files.path : req.user.photo }, { new: true })
//   .then(user => res.status(200).json(user))
//   .catch(error => {
//     console.log("holaquetal")
//     res.status(500).json(error)
//   })
  
// })

router.delete("/:id", (req, res, next) => {
  const { id } = req.params;
  Party.findOneAndRemove({ _id: id, user: req.user.id })
    .then(() => res.status(200).json({ message: `Party ${id} deleted 🗑` }))
    .catch((err) => res.status(500).json(err));
});

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
