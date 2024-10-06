import mongoose from 'mongoose';

const appSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const App = mongoose.model('App', appSchema);

export default App;