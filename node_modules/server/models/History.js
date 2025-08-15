import mongoose from 'mongoose';

const HistorySchema = new mongoose.Schema({
  userId: { type: String, index: true, required: true },
  role: String,
  resumeText: String,
  results: mongoose.Schema.Types.Mixed,
}, { timestamps: true });

export default mongoose.model('History', HistorySchema);
