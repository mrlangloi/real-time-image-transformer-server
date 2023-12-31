const Image = require('../models/image');

// For debugging
const util = require('util');

const addImage = async (req, res) => {
  try {
    console.log('Upload body: ');
    console.log(util.inspect(req.body, false, null, true /* enable colors */));
    const image = await Image.create(req.body);
    await image.save();
    res.status(201).json(image);
  }
  catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllImages = async (req, res) => {
  try {
    const images = await Image.find({}).sort({ createdAt: 1});
    res.status(200).json(images);
  }
  catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteImage = async (req, res) => {
  try {
    console.log(util.inspect(req.params, false, null, true /* enable colors */));
    const imageID = req.params.id;
    const deleted = await Image.findOneAndDelete({ imageID: imageID });
    if (deleted) {
      return res.status(200).send("Image deleted");
    }
  }
  catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update the image in the database
const updateImage = async (req, res) => {
  try {
    const ID = req.params.id;
    const updatedValues = req.body;
    // console.log("Request body : ");
    // console.log(util.inspect(updatedValues, false, null, true /* enable colors */));
    const updated = await Image.findOneAndUpdate({ imageID: ID }, updatedValues);
    if (updated) {
      return res.status(200).send("Image updated");
    }
  }
  catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  addImage,
  getAllImages,
  deleteImage,
  updateImage,
};