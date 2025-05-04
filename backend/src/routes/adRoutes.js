// backend/src/routes/adRoutes.js
const express = require('express');
const router = express.Router();
const Ad = require('../models/adModel');

// Create a new ad
router.post('/', async (req, res) => {
  try {
    const newAd = new Ad(req.body);
    await newAd.save();
    res.status(201).json(newAd);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all ads
router.get('/', async (req, res) => {
  try {
    const ads = await Ad.find().populate('userId postId');
    res.status(200).json(ads);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single ad by ID
router.get('/:adId', async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.adId).populate('userId postId');
    if (!ad) return res.status(404).json({ message: 'Ad not found' });
    res.status(200).json(ad);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update an ad
router.put('/:adId', async (req, res) => {
  try {
    const updatedAd = await Ad.findByIdAndUpdate(req.params.adId, req.body, { new: true });
    if (!updatedAd) return res.status(404).json({ message: 'Ad not found' });
    res.status(200).json(updatedAd);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete an ad
router.delete('/:adId', async (req, res) => {
  try {
    const deletedAd = await Ad.findByIdAndDelete(req.params.adId);
    if (!deletedAd) return res.status(404).json({ message: 'Ad not found' });
    res.status(200).json({ message: 'Ad deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
