import ApiError from '../utils/ApiError.js'
import ApiResponse from '../utils/ApiResponse.js'
import asyncHandler from '../utils/asyncHandler.js'
import Trek from '../models/trek.model.js'


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


// @desc Get all treks
// @method GET /api/treks
//@access PUBLIC
const getTrekByID = asyncHandler(async (req, res) => {
    const { id } = req.params;

  const trek = await Trek.findById(id);

  if (!trek) {
    throw new ApiError(404, "Trek not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200,  message="Trek fetched successfully", data=trek));
})


// @desc Get all treks
// @method GET /api/treks
//@access PUBLIC
const createTrek = asyncHandler(async (req, res) => {

    const { trekName, location, date, month, duration, difficulty, price, leaderName, whatsapp, description, createdBy } = req.body

    if (
        !trekName ||
        !location ||
        !date ||
        !month ||
        !duration ||
        !difficulty ||
        !price ||
        !leaderName ||
        !whatsapp
    ) {
        throw new ApiError(400, "All required fields must be provided");
    }

    const trek = await Trek.create({
        trekName, location, date, month, duration, difficulty, price, leaderName, whatsapp, description, createdBy
    })

    res.status(201).json(new ApiResponse(201, message="Trek created successfully.",data=trek))
})

export { getAllTreks, createTrek , getTrekByID}