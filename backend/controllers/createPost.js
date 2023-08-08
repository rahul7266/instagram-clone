
const Post = require('../models/post') ;

exports.createPost = (req,res,next) =>{
     const {body,pic} = req.body ;

     if(!pic||!body){
        return res.status(402).json({error:'please add all the field'}) ;
     }
     console.log(req.user) ;
    

     const post = new Post({
      body,
      photo:pic,
      postedBy:req.user
     })

     post.save().then(post=>{
      return res.json({post:post,message:"post created successfully. "}) ;
     }).catch(err=>console.log(err)) ;
}

exports.getposts = (req,res,next) =>{
   Post.find()
   .populate("postedBy","_id name")
   .then(posts=>
      res.json(posts) 
   )
   .catch(err=>console.log(err))
}

exports.getmyposts = (req,res,next) =>{
  
   Post.find({postedBy:req.user._id})
   .populate("postedBy","_id name")
   .then(posts=>
      res.json(posts) 
   )
   .catch(err=>console.log(err))
}

exports.putlike=(req,res,next) =>{
   Post.findByIdAndUpdate(req.body.postId,{
      $push:{likes:req.user._id}
   },{
      new:true
   }).then((result)=>{
      return res.json(result) ;
   }).catch(err=>res.status(422).json({error:err}))
}

exports.putunlike=(req,res,next) =>{
   Post.findByIdAndUpdate(req.body.postId,{
      $pull:{likes:req.user._id}
   },{
      new:true
   }).then((result)=>{
      return res.json(result) ;
   }).catch(err=>res.status(422).json({error:err}))
}