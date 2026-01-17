const express = require('express');
const router = express.Router();
const Diagram = require('../models/Diagram');

// GET all diagrams
router.get('/', async (req, res) => {
  try {
    const diagrams = await Diagram.find().sort({ createdAt: -1 });
    res.json(diagrams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single diagram
router.get('/:id', async (req, res) => {
  try {
    const diagram = await Diagram.findById(req.params.id);
    if (!diagram) return res.status(404).json({ message: 'Diagram not found' });
    res.json(diagram);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create diagram
router.post('/', async (req, res) => {
  const diagram = new Diagram({
    productName: req.body.productName,
    blocks: req.body.blocks,
    connections: req.body.connections,
    comments: req.body.comments
  });

  try {
    const newDiagram = await diagram.save();
    res.status(201).json(newDiagram);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT update diagram
router.put('/:id', async (req, res) => {
  try {
    const diagram = await Diagram.findById(req.params.id);
    if (!diagram) return res.status(404).json({ message: 'Diagram not found' });

    diagram.productName = req.body.productName || diagram.productName;
    diagram.blocks = req.body.blocks || diagram.blocks;
    diagram.connections = req.body.connections || diagram.connections;
    diagram.comments = req.body.comments || diagram.comments;
    diagram.updatedAt = Date.now();

    const updated = await diagram.save();
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE diagram
router.delete('/:id', async (req, res) => {
  try {
    const diagram = await Diagram.findById(req.params.id);
    if (!diagram) return res.status(404).json({ message: 'Diagram not found' });

    await diagram.remove();
    res.json({ message: 'Diagram deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;