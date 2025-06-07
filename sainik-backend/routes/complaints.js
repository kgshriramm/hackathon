// routes/complaints.js
const express = require('express');
const router = express.Router();
const Complaint = require('../models/Complaint');

// @route   GET /api/complaints
// @desc    Retrieve all complaints (admin)
router.get('/', async (req, res) => {
  try {
    const allComplaints = await Complaint.find().sort({ createdAt: -1 });
    res.json(allComplaints);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error fetching complaints.' });
  }
});

// @route   POST /api/complaints
// @desc    Submit a new complaint
router.post('/', async (req, res) => {
  try {
    const { userName, userEmail, message } = req.body;
    const newComplaint = new Complaint({ userName, userEmail, message });
    const saved = await newComplaint.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error creating complaint.' });
  }
});

// @route   PUT /api/complaints/:id
// @desc    Update complaint status (admin)
router.put('/:id', async (req, res) => {
  try {
    const { status } = req.body;
    if (!['Open', 'In Progress', 'Resolved'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status.' });
    }

    const updated = await Complaint.findByIdAndUpdate(
      req.params.id,
      { $set: { status } },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: 'Complaint not found.' });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error updating complaint.' });
  }
});

module.exports = router;
