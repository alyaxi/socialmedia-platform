const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const { user } = require("../models");
const authConfig = require("../config/authConfig");

const generateAccessToken = (user) => {
  return jwt.sign({ id: user.id }, authConfig.access_token, {
    expiresIn: "1m",
  });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ id: user.id }, authConfig.refresh_token);
};

const authController = {
  async login(req, res) {
    try {
      const { username, password } = req.body;
      const User = await user.findOne({ where: { username } });

      if (!User) {
        return res.status(404).json({ error: "User not found" });
      }

      const isPasswordValid = await bcrypt.compare(password, User.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid password" });
      }

      const accessToken = generateAccessToken(User);
      const refreshToken = generateRefreshToken(User);

      //IF PROBLEM WITH ANY COOKIES SETUP REPLACE THE SETTING OF COOKEIES BELOW COMMENTED CODE

      // res.cookie('refresh_token', tokens.refreshToken, {...(process.env.COOKIE_DOMAIN && {domain: process.env.COOKIE_DOMAIN}) , httpOnly: true,sameSite: 'none', secure: true}

      // Save refresh token in your database or cache

      res.cookie("refresh_token", refreshToken, { httpOnly: true });
      res.json({ accessToken, refreshToken });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
  async register(req, res) {
    try {
      const { username, password } = req.body;
      const existingUser = await user.findOne({ where: { username } });

      if (existingUser) {
        return res.status(400).json({ error: "Username already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await user.create({
        username,
        password: hashedPassword,
      });

      const accessToken = generateAccessToken(newUser);
      const refreshToken = generateRefreshToken(newUser);

      //IF PROBLEM WITH ANY COOKIES SETUP REPLACE THE SETTING OF COOKEIES BELOW COMMENTED CODE

      // res.cookie('refresh_token', tokens.refreshToken, {...(process.env.COOKIE_DOMAIN && {domain: process.env.COOKIE_DOMAIN}) , httpOnly: true,sameSite: 'none', secure: true}

      // Save refresh token in your database or cache

      res.cookie("refresh_token", refreshToken, { httpOnly: true });

      res.json({ accessToken, refreshToken });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async refreshToken(req, res) {
    try {
      const refreshToken = req.cookies.refresh_token;
      console.log(refreshToken, "refreshtokennnnnnn");

      // Verify the refresh token here, check if it's valid
      if (refreshToken == null)
        return res
          .status(401)
          .json({ error: " refresh token is not provided" });

      jwt.verify(
        refreshToken,
        authConfig.refresh_token,
        async function (err, decoded) {
          if (!decoded || err) {
            return res.sendStatus(403).json({ error: err.message });
          }
          const accessToken = generateAccessToken(decoded);
          const refreshToken = generateRefreshToken(decoded);

          //IF PROBLEM WITH ANY COOKIES SETUP REPLACE THE SETTING OF COOKEIES BELOW COMMENTED CODE

          // res.cookie('refresh_token', tokens.refreshToken, {...(process.env.COOKIE_DOMAIN && {domain: process.env.COOKIE_DOMAIN}) , httpOnly: true,sameSite: 'none', secure: true}

          res.cookie("refresh_token", refreshToken, { httpOnly: true });
          res.json({ accessToken, refreshToken });
        }
      );
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async deleteRefreshTOken(req, res) {
    try {
      res.clearCookie("refresh_token");
      return res.status(200).json({ message: "refresh token is deleted" });
    } catch (error) {
      console.log(object);
      res.status(500).json({ error: error.message });
    }
  },
  // Add other auth methods like refresh token, logout, etc.
};

module.exports = authController;
