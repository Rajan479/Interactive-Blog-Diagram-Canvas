const mongoose = require('mongoose');

const DiagramSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true
  },
  blocks: [{
    id: String,
    name: String,
    components: [String],
    position: {
      x: Number,
      y: Number
    }
  }],
  connections: [{
    from: String,
    to: String,
    label: String
  }],
  comments: {
    type: Map,
    of: String
  },
  userId: {
    type: String,
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Diagram', DiagramSchema);