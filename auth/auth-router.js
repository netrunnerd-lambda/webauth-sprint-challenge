const bcrypt = require('bcrypt');
const router = require('express').Router();
const users = require('./users');

router.post('/register', async (req, res) => {
  let user = req.body;
  const { username, password } = user;
  const length = Object.keys(user).length;

  console.log(user);

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
      
      console.log('post-hash', user);

      user = await users.new(user);

      if (user) {
        const newUser = await users.findByUsername(username);

        console.log('newUser', newUser);

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

router.post('/login', (req, res) => {
  // implement login
});

module.exports = router;
