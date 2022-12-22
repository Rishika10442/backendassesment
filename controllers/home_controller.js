const User = require('../models/user');
const jwt = require('jsonwebtoken');
const friendship = require('../models/friendship');  
const Friendship = require('../models/friendship');
const Posts = require('../models/posts');
const Comment = require('../models/comment');
const Likes = require('../models/likes');

module.exports.home = function(req,res){
    console.log(req.user);
    res.end('<h1>working</h1>');
    return;
}
module.exports.create= async function(req,res){
User.create({email:'10442rishika@gmail.com',password:'abcd'});
User.create({email:'145bookreader@gmail.com',password:'world'});
User.create({email:'xyz@gmail.com',password:'xyz'});
User.create({email:'abc@gmail.com',password:'1234'});
res.end('<h1>here</h1>');
return;
}


module.exports.sendToken = async function(req,res){
    try {
        console.log(req.body);
        const { email, password } = req.body;
    
        
        if (!(email && password)) {
          res.status(400).send("All input is required");
          return;
        }
        // Validate if user exist in our database
        const user = await User.findOne({ email });
    
        if (user && password == user.password) {
          // Create token
          const token = jwt.sign(
            { user_id: user._id, email },
            'dummy_key',
            
          );
    
          // save user token
          user.token = token;
    
          // user
          console.log(token);
          res.status(200).json(token);
          return;
        }
        res.status(400).send("Invalid Credentials");
      } catch (err) {
        console.log(err);
      }   
}

module.exports.followRequest =async function(req,res){
  try{ 
  //console.log(req.user);
//console.log(req.params.id);
    let authUser =await User.findOne({email:req.user.email});
    let followUser =await User.findById(req.params.id);
  //  console.log(followUser);
    let existing = await Friendship.findOne({from_user:authUser,to_user:followUser});
    if(!existing){
        console.log("here at follow");
        let newFollower = await Friendship.create({
            from_user:authUser,
            to_user:followUser
        });
       await authUser.followings.push(followUser._id);
       authUser.save();
       await followUser.followers.push(authUser._id);
       followUser.save();
    }
return res.end('followed');
  }
  catch(exception){
    console.log(exception);
    return res.end('error');
  }
}

module.exports.unfollowRequest =async function(req,res){
  try{ 
  //console.log(req.user);
//console.log(req.params.id);
    let authUser =await User.findOne({email:req.user.email});
    let followUser =await User.findById(req.params.id);
  //  console.log(followUser);
    let existing = await Friendship.findOne({from_user:authUser,to_user:followUser});
    if(existing){
        console.log("here at unfollow");
        let follower = Friendship.findOne({from_user:authUser.id});
        await Friendship.remove(follower);

       await authUser.followings.remove(followUser._id);
       authUser.save();
       await followUser.followers.remove(authUser._id);
       followUser.save();
    }
return res.end('unfollowed');
  }
  catch(exception){
    console.log(exception);
    return res.end('error');
  }
}

module.exports.getUser =async function(req,res){
  let user = await User.findOne({email:req.user.email});
  return res.status(200).json({
    email:user.email,
    followers:user.followers.length,
    followings:user.followings.length
  });
}


module.exports.createPost =async function(req,res){

try{
  let authUser =await User.findOne({email:req.user.email});
//  console.log(authUser);
  let newPost = await Posts.create({
  title:req.body.title,
  content:req.body.description,
  user:authUser._id
});
await newPost.populate('user');
console.log('post created....');
return res.status(200).json({
  id:newPost._id,
  title:newPost.title,
  description:newPost.content,
  time:newPost.createdAt

});
}catch(err){
  console.log(err);
  return res.end('error');
}
}

module.exports.deletePost = async function(req,res){
  try{
    let post =await Posts.findById(req.params.id);
   await Posts.remove(post);
    console.log('post deleted');
    return res.status(200).send('deleted');
  }catch(err){
    console.log(err);
    return res.status(500);
  }
}


module.exports.likePost =async function(req,res){
  try{
    let authUser =await User.findOne({email:req.user.email});
    let post =await Posts.findById(req.params.id);
    let newLike =await Likes.create({
      user:authUser,
      likeable:post
    });
   await post.likes.push(newLike._id);
    post.save();
    return res.status(200).send('post liked');
  }catch(err){
    console.log(err);
    return res.status(500);
  }

}

module.exports.unlikePost =async function(req,res){
  try{
    let authUser =await User.findOne({email:req.user.email});
    let post =await Posts.findById(req.params.id);
    //console.log(post);
    let liked = await Likes.findOne({user:authUser._id});
    //console.log(liked);
    //console.log(liked._id);
    await post.likes.remove(liked._id);
    await Likes.remove(liked);
    
    post.save();
    return res.status(200).send('unliked');
   
  }catch(err){
    console.log(err);
    return res.status(500);
  }

}

module.exports.createComment = async function(req,res){
  try{
    let authUser =await User.findOne({email:req.user.email});
    let post =await Posts.findById(req.params.id);
    let newComment = await Comment.create({
      content:req.body.content,
      user:authUser._id,
      post:post._id
    });
    console.log(newComment);
    await post.comments.push(newComment._id);
    post.save();
    return res.status(200).json({
      id:newComment._id,
      data:'commented'
    })
  }catch(err){
    console.log(err);
    return res.status(500);
  }
}

module.exports.getPost = async function(req,res){
  try{
    console.log('here');
    let authUser =await User.findOne({email:req.user.email});
    let post =await Posts.findById(req.params.id);
    await post.populate('comments');
    return res.status(200).json({
      id:post._id,
      title:post.title,
      description:post.content,
      likes:post.likes.length,
      comments:post.comments
    })
    
  }catch(err){
    console.log(err);
    return res.status(500);
  }
}


module.exports.allPosts = async function(req,res){
  try{
    let authUser =await User.findOne({email:req.user.email});
   let posts = await Posts.find({}).sort('-createdAt').populate('comments');
   
    let posts2=posts;
    for(let i=0;i<posts.length;i++){
      posts2[i].id=posts[i]._id;
      posts2[i].title = posts[i].title;
      posts2[i].content=posts[i].content;
      posts2[i].createdAt=posts[i].createdAt;
      posts2[i].comments=posts[i].comments;
      posts2[i].likes=posts[i].likes.length;
      
      
    }
  return res.status(200).json({
    posts:posts2
  });
  }catch(err){
    console.log(err);
    return res.status(500);
  }
}