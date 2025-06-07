// routes/applications.js
const express = require('express');
const router = express.Router();
const Application = require('../models/Application');
const Scheme = require('../models/Scheme');

// @route   GET /api/applications
// @desc    Get all applications (admin use)
router.get('/', async (req, res) => {
  try {
    // Populate the scheme field so we can see scheme title
    const allApps = await Application.find()
      .populate('scheme', 'title')
      .sort({ submittedAt: -1 });
    res.json(allApps);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error fetching applications.' });
  }
});

// @route   POST /api/applications
// @desc    Create a new application
router.post('/', async (req, res) => {
  try {
    const { schemeId, applicantName, applicantEmail, applicantPhone } = req.body;

    // Validate that scheme exists
    const scheme = await Scheme.findById(schemeId);
    if (!scheme) {
      return res.status(404).json({ error: 'Selected scheme not found.' });
    }

    const newApp = new Application({
      scheme: schemeId,
      applicantName,
      applicantEmail,
      applicantPhone,
    });

    const savedApp = await newApp.save();
    res.status(201).json(savedApp);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error creating application.' });
  }
});

// @route   GET /api/applications/:id
// @desc    Get one application by ID (e.g. for tracking)
router.get('/:id', async (req, res) => {
  try {
    const app = await Application.findById(req.params.id).populate('scheme', 'title');
    if (!app) return res.status(404).json({ error: 'Application not found.' });
    res.json(app);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error fetching application.' });
  }
});

// @route   PUT /api/applications/:id
// @desc    Update an application status (admin)
router.put('/:id', async (req, res) => {
  try {
    const { status } = req.body;
    if (!['Pending', 'Approved', 'Rejected'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status.' });
    }

    const updated = await Application.findByIdAndUpdate(
      req.params.id,
      { $set: { status } },
      { new: true }
    ).populate('scheme', 'title');

    if (!updated) return res.status(404).json({ error: 'Application not found.' });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error updating application.' });
  }
});

module.exports = router;
