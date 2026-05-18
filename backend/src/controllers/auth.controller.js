const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const User = require("../models/user.model")

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required"
      })
    }

    const existingUser = await User.findOne({ email })

    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists"
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
      name,
      email,
      password: hashedPassword
    })

    res.status(201).json({
      message: "User registered",
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    })
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials"
      })
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    )

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials"
      })
    }

    const token = jwt.sign(
      {
        userId: user._id
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN
      }
    )

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax"
    })

    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    })
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

const logout = async (req, res) => {
  try {
    res.clearCookie("token")

    res.json({
      message: "Logged out successfully"
    })
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

const me = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select(
      "-password"
    )

    res.json(user)
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

module.exports = {
  register,
  login,
  logout,
  me
}