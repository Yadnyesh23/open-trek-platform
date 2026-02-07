import ApiError from '../utils/ApiError.js'
import ApiResponse from '../utils/ApiResponse.js'
import asyncHandler from '../utils/asyncHandler.js'
import Trek from '../models/trek.model.js'
import mongoose from 'mongoose'
import cloudinary from "../config/cloudinary.js";


// @desc Get all treks
// @method GET /api/treks
//@access PUBLIC
const getAllTreks = asyncHandler(async (req, res) => {
  const { month, difficulty, search, page = 1, limit = 10 } = req.query;

  const query = {};

  if (month) query.month = month;
  if (difficulty) query.difficulty = difficulty;
  if (search) {
    query.trekName = { $regex: search, $options: "i" };
  }

  const skip = (Number(page) - 1) * Number(limit);

  const [treks, total] = await Promise.all([
    Trek.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit)),
    Trek.countDocuments(query),
  ]);

  res.status(200).json(
    new ApiResponse(200, "Treks fetched successfully",  {
      total,
      page: Number(page),
      limit: Number(limit),
      treks,
    })
  );
})


// @desc Get trek by id
// @method GET /api/treks/:id
//@access PUBLIC
const getTrekByID = asyncHandler(async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid trek ID")
  }

  const trek = await Trek.findById(id)

  if (!trek) {
    throw new ApiError(404, "Trek not found")
  }

  res.status(200).json(
    new ApiResponse(200, "Trek fetched successfully", trek)
  )
})



// @desc Trek leader can create trek
// @method GET /api/treks
//@access PRIVATE
const createTrek = asyncHandler(async (req, res) => {
  const {
    trekName,
    location,
    date,
    month,
    duration,
    difficulty,
    price,
    leaderName,
    whatsapp,
    description,
  } = req.body;

  if (!trekName || !location || !date || !month) {
    throw new ApiError(400, "Required fields missing");
  }

  let imageUrls = [];

  if (req.files && req.files.length > 0) {
    for (const file of req.files) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "open-trek-platform",
      });
      imageUrls.push(result.secure_url);
    }
  }

  const trek = await Trek.create({
    trekName,
    location,
    date,
    month,
    duration,
    difficulty,
    price,
    leaderName,
    whatsapp,
    description,
    images: imageUrls,
    createdBy: req.user._id,
  });

  res
    .status(201)
    .json(new ApiResponse(201,  "Trek created with images",trek));
});


// @desc Get logged-in user's treks
// @route GET /api/treks/my
// @access PRIVATE
const getMyTreks = asyncHandler(async (req, res) => {
  const treks = await Trek.find({ createdBy: req.user._id })
    .sort({ createdAt: -1 });

  res.status(200).json(
    new ApiResponse(200, "Your treks fetched successfully",treks)
  );
});

// @desc Update trek (owner only)
// @route PUT /api/treks/:id
// @access PRIVATE
const updateTrek = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const trek = await Trek.findById(id);

  if (!trek) {
    throw new ApiError(404, "Trek not found");
  }

  if (trek.createdBy.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not allowed to update this trek");
  }

  const updatedTrek = await Trek.findByIdAndUpdate(
    id,
    req.body,
    { new: true, runValidators: true }
  );

  res.status(200).json(
    new ApiResponse(200, updatedTrek, "Trek updated successfully")
  );
});

// @desc Delete trek (owner only)
// @route DELETE /api/treks/:id
// @access PRIVATE
const deleteTrek = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const trek = await Trek.findById(id);

  if (!trek) {
    throw new ApiError(404, "Trek not found");
  }

  if (trek.createdBy.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not allowed to delete this trek");
  }

  await trek.deleteOne();

  res.status(200).json(
    new ApiResponse(200, null, "Trek deleted successfully")
  );
});

export { getAllTreks, createTrek , getTrekByID, getMyTreks , updateTrek, deleteTrek}