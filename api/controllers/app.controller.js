
import App from '../models/app.model.js';
import { errorHandler } from '../utils/error.js';



export const create = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, 'You are not allowed to create a App'));
  }
  if (!req.body.title || !req.body.content) {
    return next(errorHandler(400, 'Please provide all required fields'));
  }
  const newApp = new App({
    ...req.body,
    userId: req.user.id,
  });
  try {
    const savedApp = await newApp.save();
    res.status(201).json(savedApp);
  } catch (error) {
    next(error);
  }
};



export const getallapp = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === 'asc' ? 1 : -1;
    const Apps = await App.find({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.postId && { _id: req.query.postId }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: 'i' } },
          { content: { $regex: req.query.searchTerm, $options: 'i' } },
        ],
      }),
    })
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalApps = await App.countDocuments();

    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthApps = await App.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      Apps,
      totalApps,
      lastMonthApps,
    });
  } catch (error) {
    next(error);
  }
};



export const deleteApp = async (req, res, next) => {
  try {
    const deletedApp = await App.findByIdAndDelete(req.params.id);
    if (!deletedApp) {
      return next(errorHandler(404, 'App not found'));
    }
    res.status(200).json({ message: 'App deleted successfully' });
  } catch (error) {
    next(error);
  }
};
