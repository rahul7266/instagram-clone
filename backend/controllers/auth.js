const User = require("../models/user");

const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken') ;
const {jwt_key} = require('../keys') ;

exports.signUp = (req, res, next) => {
  const { name, username, email, password } = req.body;
  if (!name || !username || !email || !password) {
   return res.status(422).json({ error: "please add all the fields" });
  }

  User.findOne({ $or: [{ email: email }, { username: username }] }).then(
    (saveduser) => {
      if (saveduser) {
        return res
          .status(422)
          .json({ err: "email or username already exists in database" });
      }

      bcrypt.hash(password, 12).then((hashedPassword) => {
        const user = new User({
          name,
          username,
          email,
          password:hashedPassword
        });

        user
          .save()
          .then((user) => {
            res.json({message:"user registered successfully"});
          })
          .catch((err) => console.log(err));
      });
    }
  );
};

exports.signIn = (req,res,next) =>{
  const {email, password} = req.body ;

  // console.log(email,password) ;
  if(!email || !password){
    return res.status(422).json({error:"please add all the field."}) ;
  }
  User.findOne({email})
  .then((saveduser)=>{
    if(!saveduser){
      return res.status(422).json({error:"email not found in the database"}) ;
    }
    bcrypt.compare(password,saveduser.password).then(match=>{
      if(!match){
        return res.status(422).json({error:"incorrect password."})
      }
      const token = jwt.sign({id:saveduser._id},jwt_key) ;
      // console.log(token) ;
      // return res.json(token) ;
      const {_id,name,email,username} = saveduser
      return res.status(422).json({message:"user signin successfully.",token:token,user:{_id,name,email,username}}) ;
    })

  })
  
}

