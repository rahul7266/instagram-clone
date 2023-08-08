const express = require('express') ;
const router = express.Router() ;
const postController = require('../controllers/createPost') ;
const requireLogin = require('../middleware/requireLogin') ;


router.get('/allposts',requireLogin,postController.getposts) ;
router.post('/createpost',requireLogin,postController.createPost) ;
router.get('/myposts',requireLogin,postController.getmyposts) ;

router.put('/like',requireLogin,postController.putlike) ;
router.put('/unlike',requireLogin,postController.putunlike) ;



module.exports = router ;