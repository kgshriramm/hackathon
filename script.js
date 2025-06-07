const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/sainik-connect', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Define Schema and Model
const ApplicationSchema = new mongoose.Schema({
  name: String,
  service: String,
  scheme: String,
  comments: String,
  submittedAt: { type: Date, default: Date.now }
});

const response = await fetch('http://localhost:3000/api/apply', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data)
});

app.get('/', (req, res) => {
  res.send('Server is running!');
});

const Application = mongoose.model('Application', ApplicationSchema);

// POST endpoint to receive form data
app.post('/api/apply', async (req, res) => {
  try {
    const application = new Application(req.body);
    await application.save();
    res.status(200).json({ message: 'Application saved successfully' });
  } catch (error) {
    console.error('Error saving application:', error);
    res.status(500).json({ message: 'Failed to save application' });
  }
});


// Optional: GET endpoint to view all applications
app.get('/api/applications', async (req, res) => {
  const applications = await Application.find();
  res.json(applications);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
