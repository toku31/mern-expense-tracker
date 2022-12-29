
const express = require('express')
const router = express.Router()
const User = require('../models/user')

router.post('/login', async function(req, res){
  try {
    const result = await User.findOne({email: req.body.email, password: req.body.password});
    if (result){
      res.send(result)
    } else {
      res.status(500).json('Error')
    }
  } catch (error) {
    res.status(500).json(error)
  }
})

router.post('/register', async(req, res) =>{
  try {
    // const newUser = new Users(req.body);
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    })
    const user = await newUser.save();
    res.status(200).json(user)
    // res.send('User Registered Successfully')
  } catch (error) {
    res.status(500).json(error)
  }
})

// const {
//   registerUser,
//   loginUser,
//   getMe,
// } = require('../controllers/userController')

// router.post('/', registerUser)
// router.post('/login', loginUser)
// router.get('/me', protect, getMe)

module.exports = router