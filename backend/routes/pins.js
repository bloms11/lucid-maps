const router = require("express").Router();
const Pin = require("../models/Pin");

//create a pin
router.post("/", async (req, res) => {
  const newPin = new Pin(req.body);
  try {
    const savedPin = await newPin.save();
    return res.status(200).json(savedPin);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//get all pins
router.get("/", async (req, res) => {
  try {
    const pins = await Pin.find();
    return res.status(200).json(pins);
  } catch (err) {
    return res.status(500).json(err);
  }
});
 
module.exports = router;