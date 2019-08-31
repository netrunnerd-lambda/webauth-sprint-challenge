const bcrypt = require('bcrypt');
const { generateToken } = require('../middleware');
const router = require('express').Router();
const users = require('./users');

router.post('/register', async (req, res) => {
  let user = req.body;
  const { username, password } = user;
  const length = Object.keys(user).length;

  try {
    if (!length) {
      res.status(400).json({
        message: "No information.",
        success: false
      });
    } else if (!username || !password) {
      res.status(400).json({
        message: "No username or password.",
        success: false
      });
    } else {
      user.password = await bcrypt.hash(password, 10);
      user = await users.new(user);

      if (user) {
        res.status(201).json({
          message: "Head on in. You have registered successfully.",
          success: true
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      error,
      message: "User could not be registered.",
      success: false
    });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await users.findByUsername(username);

    if (user && bcrypt.compareSync(password, user.password)) {
      const { id } = user;

      const load = {
        id,
        loggedIn: true,
        username
      };
      
      const token = generateToken(load);
      
      res.json({
        message: `Welcome, ${username}.`,
        success: true,
        token
      });
    } else {
      res.status(401).json({
        message: "No dice, son.",
        success: false
      });
    }
  } catch (error) {
    res.status(500).json({
      error,
      message: "No information.",
      success: false
    });
  }
});

module.exports = router;
