const express = require('express') ;
const cors = require('cors') ;

const mongoose = require('mongoose') ;
const {mongoUri} = require('./keys') ;


const authRoute = require('./routes/auth') ;
const postRoute = require('./routes/createPost') ;

const app = express() ;

app.use(cors()) ;

// app.use(function (req, res, next) {
//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     res.setHeader('Access-Control-Allow-Credentials', true);
//     // Pass to next layer of middleware
//     next();
// });

// app.get('/',(req,res,next)=>{
//     res.json({name:'rahul singh',branch:"computer science"}) ;
//     next() ;
// })
app.use(express.json()) ;

app.use(authRoute) ;
app.use(postRoute) ;


mongoose.connect(mongoUri) ;

mongoose.connection.on('connected',()=>{
    console.log('Database connected. ')
})
mongoose.connection.on('error',()=>{
    console.log('Database not connected. ') ;
})


app.listen(5000,()=>{
   console.log('server started on port 5000') ;
});