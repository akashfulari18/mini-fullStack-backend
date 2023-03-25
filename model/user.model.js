
const { default: mongoose } = require('mongoose')
const userSchema = mongoose.Schema({
    username:{type:String ,required:true,unique: true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    role:{type:String,
        enum:['user','admin'],
        required:true},
    address:{
        city:{type:String,required:true},
        state:{type:String,required:true}
    },
    dob:{type:String,required:true}
})

const UserModel = mongoose.model("user",userSchema)

module.exports=UserModel