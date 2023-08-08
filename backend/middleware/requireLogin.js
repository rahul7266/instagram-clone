const jwt = require('jsonwebtoken') ;
const User = require('../models/user') ;
const mongoose = require('mongoose') ;
const {jwt_key} = require('../keys') ;

module.exports= (req,res,next) =>{
      const {authorization} = req.headers ;

      if(!authorization){
        return res.status(401).json({error:'you must have login'}) ;
      }

      const token = authorization.replace("Bearer ","") ;
      jwt.verify(token, jwt_key,(err,payload)=>{
        if(err){
           return res.status(401).json({error:'you must have login2'}) ;
        }
        const {_id} = payload ;
       return   User.findOne(_id).then(user=>{
          
          req.user=user ;
            console.log(user) ;
            next() ;
          
        })
        
      })
      
}