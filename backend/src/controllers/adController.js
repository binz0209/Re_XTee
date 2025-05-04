// backend/src/controllers/adController.js
const Ad = require('../models/adModel');

// Create a new ad
exports.createAd = async (req, res) => {
  try {
    const newAd = new Ad(req.body);
    await newAd.save();
    res.status(201).json(newAd);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all ads
exports.getAllAds = async (req, res) => {
  try {
    const ads = await Ad.find().populate('userId postId');
    res.status(200).json(ads);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single ad by ID
exports.getAdById = async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.adId).populate('userId postId');
    if (!ad) return res.status(404).json({ message: 'Ad not found' });
    res.status(200).json(ad);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update an ad
exports.updateAd = async (req, res) => {
  try {
    const updatedAd = await Ad.findByIdAndUpdate(req.params.adId, req.body, { new: true });
    if (!updatedAd) return res.status(404).json({ message: 'Ad not found' });
    res.status(200).json(updatedAd);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete an ad
exports.deleteAd = async (req, res) => {
  try {
    const deletedAd = await Ad.findByIdAndDelete(req.params.adId);
    if (!deletedAd) return res.status(404).json({ message: 'Ad not found' });
    res.status(200).json({ message: 'Ad deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
