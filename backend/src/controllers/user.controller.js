import {User} from "../Models/user.model.js"
import ApiResponse from "../utils/ApiResponse.js"
import ApiError from "../utils/ApiError.js"

const generateToken = async (userId) => {
    try {
        const user = await User.findById(userId)
        if (!user) throw new ApiError(404, "User not found")

        const token = await user.generateToken()
        return token
    }
    catch (err) {
        throw new ApiError(500, "Something went wrong while generating token")
    }
}

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.status(400).json(new ApiError(400, "All fields are required."))
        }

        const isUserExists = await User.findOne({ email })

        if (isUserExists) {
            return res.status(400).json(new ApiError(400, "User already exists."))
        }

        const user = await User.create({ name, email, password })

        const createdUser = await User.findById(user._id).select("-password")

        if (!createdUser) {
            return res.status(500).json(new ApiError(500, "Something went wrong while registering the user"));
        }

        return res
            .status(201)
            .json(new ApiResponse(201, createdUser, "User registered successfully"));
    }
    catch (err) {
        console.log(`Registration error: ${err}`)

        return res
            .status(500)
            .json(new ApiError(500, `Failed to register: ${err.message}`))
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json(new ApiError(400, "All fields are required."))
        }

        const isUserExists = await User.findOne({ email })

        if (!isUserExists) {
            return res.status(400).json(new ApiError(400, "User does not exist!"))
        }

        const isPasswordValid = await isUserExists.isPasswordCorrect(password)

        if (!isPasswordValid) {
            return res.status(401).json(new ApiError(401, "Invalid user credentials!"))
        }

        const token = await generateToken(isUserExists._id)

        const loggedInUser = await User.findById(isUserExists._id).select("-password")

        const options = {
            httpOnly: true,
            secure: true,
            maxAge: 24 * 60 * 60 * 1000,
        }

        return res
            .status(200)
            .cookie("token", token, options)
            .json(new ApiResponse(200, { user: loggedInUser, token }, "User logged in successfully"))
    }
    catch (err) {
        console.log(`Login error: ${err}`)

        return res
            .status(500)
            .json(new ApiError(500, `Failed to login: ${err.message}`))
    }
};
