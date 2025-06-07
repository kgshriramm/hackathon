const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Serve frontend files from /public
app.use(express.static('public'));
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/sainikconnect', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Schema and Model
const ApplicationSchema = new mongoose.Schema({
  scheme: String,
  name: String,
  email: String,
  serviceId: String,
  createdAt: { type: Date, default: Date.now }
});

const Application = mongoose.model('Application', ApplicationSchema);

// API route
app.post('/api/apply', async (req, res) => {
  try {
    const application = new Application(req.body);
    await application.save();
    res.status(201).send({ message: 'Application saved.' });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Error saving application.' });
  }
});

// Start server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
