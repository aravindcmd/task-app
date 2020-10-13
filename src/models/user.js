const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const validator = require('validator')
const Task = require('./tasks')
const userSchema = new mongoose.Schema({
    name :{
        type :String,
        trim: true,
        required:true
    },email: {
        type: String,
        required :true,
        unique:true,
        lowercase:true,
        trim: true,
    
        
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email invalid')
            }
        }
    },
    age:{
        type :Number,
        validate(value){
            if(value<0){
                throw new Error('Age cant be negative!')
            }
        }
    },
    password:{
        type: String,
        required:true,
        minlength: 7,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('passowrd cant be password')
            }
            
            
        }
    },
    tokens:[{
        token:{
        
            type: String,
            require : true
        }
        }],
    avatar : {
        type: Buffer
    }

    
},{
    timestamps:true
})

userSchema.virtual('tasks',{
    ref:'Tasks',
    localField:'_id',
    foreignField:'owner'
})

userSchema.methods.toJSON = function(){
    const user = this
    const userObject = user.toObject()
    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar
    return userObject
}

userSchema.methods.generateAuthToken = async function(){
    const user = this
    const token = jwt.sign({_id:user._id.toString()},process.env.JWT_SECRET)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token


}
userSchema.statics.findByCredentials = async (email,password)=>{
    const user = await User.findOne({email})
    if(!user){
        throw new Error('unable to login')
    }

    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch){
        throw new Error('unable to login')
    }
    return user

}

userSchema.pre('save',async function (next) {
    const user = this

    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8)
    }

    next()
})

//Delete tasks when user gets deleted
userSchema.pre('remove',async function(next){
    const user = this
    await Task.deleteMany({owner:user._id})
    next()

})
const User = mongoose.model('User',userSchema)

module.exports = User
