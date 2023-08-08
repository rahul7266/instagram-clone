const express = require('express') ;
const router = express.Router() ;
const authController = require('../controllers/auth') ;
const requireLogin = require('../middleware/requireLogin') ;

router.post('/signup',authController.signUp) ;
router.post('/signin',authController.signIn) ;



module.exports = router ;