const express = require('express');
const auth = require('../config/auth');
const router = express.Router();
const homeController = require('../controllers/home_controller');

router.get('/',auth,homeController.home);
router.post('/api/authenticate',homeController.sendToken);
router.get('/create',homeController.create);
router.get('/api/user',auth,homeController.getUser);
router.post('/api/follow/:id',auth,homeController.followRequest);
router.post('/api/unfollow/:id',auth,homeController.unfollowRequest);
router.post('/api/posts',auth,homeController.createPost);
router.delete('/api/posts/:id',auth,homeController.deletePost);
router.post('/api/like/:id',auth,homeController.likePost);
router.post('/api/unlike/:id',auth,homeController.unlikePost);
router.post('/api/comment/:id',auth,homeController.createComment);
router.get('/api/posts/:id',auth,homeController.getPost);
router.get('/api/all_posts',auth,homeController.allPosts);
module.exports=router;