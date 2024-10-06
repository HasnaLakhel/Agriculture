import mongoose from 'mongoose';

const subventionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    prename: {
      type: String,
      required: true,
      unique: true,
    },
    cin: {
      type: String,
      required: true,
    },
    telephone: {
      type: String,
      required: true,
    },
    RIB: {
      type: String,
      required: true,
    },
    Catégorie: {
      type: String,
      required: true,
    },
    Province: {
      type: String,
      required: true,
    },
    juridique: {
      type: String,
      required: true,
    },
    Douar: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Accepted', 'Rejected'],
      default: 'Pending',
    },
  },
  { timestamps: true }
);

const Subvention = mongoose.model('Subvention', subventionSchema);

export default Subvention;
