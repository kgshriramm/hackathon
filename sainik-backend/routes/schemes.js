// routes/schemes.js
const express = require('express');
const router = express.Router();
const Scheme = require('../models/Scheme');

// @route   GET /api/schemes
// @desc    Retrieve all schemes
router.get('/', async (req, res) => {
  try {
    const schemes = await Scheme.find().sort({ createdAt: -1 });
    res.json(schemes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error while fetching schemes.' });
  }
});

// @route   POST /api/schemes
// @desc    Create a new scheme
router.post('/', async (req, res) => {
  try {
    const { title, description } = req.body;
    const exists = await Scheme.findOne({ title });
    if (exists) {
      return res.status(400).json({ error: 'Scheme already exists.' });
    }
    const newScheme = new Scheme({ title, description });
    const saved = await newScheme.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error while creating scheme.' });
  }
});

// @route   PUT /api/schemes/:id
// @desc    Update a scheme by ID
router.put('/:id', async (req, res) => {
  try {
    const updated = await Scheme.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: 'Scheme not found.' });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error while updating scheme.' });
  }
});

// @route   DELETE /api/schemes/:id
// @desc    Delete a scheme
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Scheme.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Scheme not found.' });
    res.json({ message: 'Scheme deleted.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error while deleting scheme.' });
  }
});

module.exports = router;
