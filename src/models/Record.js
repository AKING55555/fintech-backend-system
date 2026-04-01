const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  type: { type: String, enum: ['income', 'expense'], required: true },
  category: { type: String, required: true },
  date: { type: Date, default: Date.now },
  notes: String
}, { timestamps: true });

// Clean response
recordSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.__v;
    return ret;
  }
});

// Index
recordSchema.index({ date: -1 });

module.exports = mongoose.model('Record', recordSchema);