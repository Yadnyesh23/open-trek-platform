import ApiError from '../utils/ApiError.js'
import ApiResponse from '../utils/ApiResponse.js'
import asyncHandler from '../utils/asyncHandler.js'
import { User } from '../models/users.model.js'
import jwt from "jsonwebtoken";

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// @desc Registeration
// @method POST
// @access PUBLIC
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, role } = req.body

    if (!name || !email || !password || !role) {
        throw new ApiError(400, 'All fields are required')
    }

    const existedUser = await User.findOne({ email })

    if (existedUser) {
        throw new ApiError(409, 'User already exist. Please login.')
    }

    const user = await User.create({
        name,
        email,
        password,
        role
    })

    res.status(201).json(
        new ApiResponse(201, 'Registration successful', {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        })
    )
})


// @desc Login
// @method POST
// @access PUBLIC
const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body

    if(!email || !password){
        throw new ApiError(400, "All Fields are required.")
    }

    const user = await User.findOne({email})
    if(!user){
        throw new ApiError(401, "Invalid credentials")
    }
    
    const isMatch = await user.isPasswordCorrect(password)
    if(!isMatch){
        throw new ApiError(401, "Invalid credentials")
    }

    const token = await generateToken(user._id)
    res.status(200).json(new ApiResponse(200, "Login successful.",  {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token,
      },))
})

export { registerUser, loginUser }