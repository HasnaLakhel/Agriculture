import Subvention from '../models/subvention.model.js';
import { errorHandler } from '../utils/error.js';


export const applicate = async (req, res, next) => {
  try {
    const { name, prename, cin, telephone, Catégorie, juridique, Province, Douar ,RIB} = req.body;

    if (!name || !prename || !cin || name === '' || prename === '' || cin === '') {
      return next(errorHandler(400, 'All fields are required'));
    }
    const newsubvention = new Subvention({
      userId: req.user.id, 
      name,
      prename,
      cin,
      telephone,
      Catégorie,
      Province,
      Douar,
      juridique,
      RIB,
    });

    await newsubvention.save();
    res.status(200).json(newsubvention);
  } catch (error) {
    next(error);
  }
};




export const getallapplicate = async (req, res, next) => {
  try {
    const allApplicates = await Subvention.find();
    res.json(allApplicates);
  } catch (error) {
    next(error);
  }
};


export const acceptApplicate = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedApplicate = await Subvention.findByIdAndUpdate(
      id,
      { status: 'Accepté' },
      { new: true }
    );
    res.json(updatedApplicate);
  } catch (error) {
    next(error);
  }
};

export const rejectApplicate = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedApplicate = await Subvention.findByIdAndUpdate(
      id,
      { status: 'Rejetée' },
      { new: true }
    );
    res.json(updatedApplicate);
  } catch (error) {
    next(error);
  }
};



export const getApplicationStatus = async (req, res, next) => {
  try {
    const userId = req.user.id; 
    const application = await Subvention.findOne({ userId });
    if (!application) {
      return res.status(404).json({ status: 'Not Applied', application: null });
    }
    res.json({ status: application.status, application });
  } catch (error) {
    next(error);
  }
};
