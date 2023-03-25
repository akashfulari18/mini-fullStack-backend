const jwt  = require('jsonwebtoken')
require('dotenv').config()
const authorizer = (req,res,next)=>{

    const {token}= req.headers
    
    // console.log(token)
    // console.log(decoded.role)
    if(token){
        let decoded = jwt.verify(token,process.env.privateKey)
        
        if(decoded.role !="admin"){
            res.status(400).send({"err":"You are not authorised!"})
        }else{
            
            next()
        }
    }else{
        res.status(400).send({"err":"login first!"})

    }
}

module.exports=authorizer