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
  Party.find({ city })
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
  Party.find({ $and: [{ date }, { city }] })
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
  Party.findOne({ _id: id })
    .populate("host")
    .populate("attendees")
    .then((party) => res.status(200).json(party))
    .catch((err) => res.status(500).json(err));
});

router.post("/", uploader.array("images", 5), (req, res, next) => {
  console.log(req.body)
  console.log(`These are the req.files ${req.files}`)
  const {
    name,
    description,
    date,
    city,
    street,
    latitude,
    longitude,
    price,
    maxAttendees
    
  } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }

  // photo: req.file ? req.file.path : req.user.photo; 
  Party.create({
    name,
    description,
     images: req.files.map(file => file.path),
    date,
    city,
    street,
    latitude,
    longitude,
    price,
    maxAttendees,
    attendees: req.user.id,
    host: req.user.id,
    
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

// router.put('/edit', uploader.single('photo'), (req, res, next) => {
//   console.log(req.file);
//   User.findOneAndUpdate({ _id: req.user.id }, { ...req.body, photo: req.file ? req.file.path : req.user.photo }, { new: true })
//   .then(user => res.status(200).json(user))
//   .catch(error => res.status(500).json(error))
// })

router.delete("/:id", (req, res, next) => {
  const { id } = req.params;
  Party.findOneAndRemove({ _id: id})
    .then(() => res.status(200).json({ message: `Party ${id} deleted 🗑` }))
    .catch((err) => res.status(500).json(err));
});

router.get("/host/:id", (req, res, next) => {
console.log(req.user.id)
  Party.find({ host: req.user.id }).sort({date: 1})
    .populate("host")
    .then((parties) =>{
    console.log(parties)
     res.status(200).json(parties)})
    .catch((err) => res.status(500).json(err));
})

router.put("/editParty/:id", uploader.array("images", 5), (req,res)=>{
  const { id } = req.params;
  const {
    name,
    description,
    date,
    city,
    street,
    price,
    maxAttendees
    
  } = req.body;
  Party.findByIdAndUpdate(id, { 
    name,
    description,
     images: req.files.map(file => file.path),
    date,
    city,
    street,
    price,
    maxAttendees,
  })
  .then((response)=>{console.log("edited")
res.status(200).json(response)})
  .catch(()=>console.log("notpushed"))
})

router.post("/updateAttendees/:id", (req,res) => {
  const { id } = req.params;
  
  
  Party.findByIdAndUpdate(id, { $addToSet: { attendees: req.user.id } })
    .populate("host")
  .then((response)=>{console.log("pushedTO ARRAY OF ATEENDEEs")
res.status(200).json(response)})
  .catch(()=>console.log("notpushed"))
})


router.get("/attendees/:id", (req, res, next) => {
  console.log(req.user.id)

  let actualDate = Date.now()
  console.log("ACTUAL DATE IN MILISECONDS", actualDate)
  
    Party.find({$and: [{ attendees: req.user.id }, { date: {"$gt": actualDate } }]})
    .populate("host")
      .then((parties) =>{
      console.log(parties)
       res.status(200).json(parties)})
      .catch((err) => res.status(500).json(err));
  })



module.exports = router;

