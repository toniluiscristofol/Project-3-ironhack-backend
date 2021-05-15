const express = require("express");
const Review = require("../models/Review.model");
const router = express.Router();

router.get("/user/:id", (req, res, next) => {
  const { id } = req.params
  Review.find({user: id})
    .then((review) => res.status(200).json(review))
    .catch((err) => res.status(500).json(err));
});

// router.get("/party/:id", (req, res, next) => {
//   // const { id } = req.params
//   Review.find({party: req.party.id })
//     .then((review) => res.status(200).json(review))
//     .catch((err) => res.status(500).json(err));
// });


router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  Review.findOne({ _id: id, user: req.user.id })
    .then((review) => res.status(200).json(review))
    .catch((err) => res.status(500).json(err));
});

router.post("/", (req, res, next) => {
  const {
      value,
      description,
      role
  } = req.body;

  if (!value) {
    return res.status(400).json({ message: "Rating is required" });
  }

  Review.create({
      value,
      description,
      role,
    user: req.user.id
  })
    .then((review) => res.status(200).json(review))
    .catch((err) => res.status(500).json(err));
});

router.put("/:id", (req, res, next) => {
  const { id } = req.params;
  Review.findOneAndUpdate({ _id: id, user: req.user.id }, req.body, {
    new: true,
  })
    .then((review) => res.status(200).json(review))
    .catch((err) => res.status(500).json(err));
});

router.delete("/:id", (req, res, next) => {
  const { id } = req.params;
  Review.findOneAndRemove({ _id: id, user: req.user.id })
    .then(() => res.status(200).json({ message: `Review ${id} deleted 🗑` }))
    .catch((err) => res.status(500).json(err));
});


module.exports = router;