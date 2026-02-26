import mongoose, { Schema } from 'mongoose';

import { JsonWebTokenError } from 'jsonwebtoken';

import bcrypt from 'bcrypt'



const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true // Optimizes searching by username
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        fullName: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        avatar: {
            type: String, // Cloudinary/AWS URL
            required: true,
        },
        coverImage: {
            type: String, 
        },
        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: "Video" 
            }
        ],
        password: { // Fixed typo
            type: String,
            required: [true, 'Password is required'],
        },
    },
    { 
        timestamps: true // Adds createdAt and updatedAt automatically
    }
);

// next is used for passing the flag as it is the part of (req,res,next) adn pre is a prehook plugin 


User.pre("save",async function (next) {
    // condition if the password is chnaged  then use the bcrypt to encrypt it 
    if(!this.isModified("password")) return next()
    this.password=bcrypt.hash(this.password,8)
    next()


})

// if the user send the passowrd check if it is already encrypte dor not 
userSchema.methods.isPassowrdCorrect=async function(password){
    return await bcrypt.compare(password,this.password)
}

// this is used to generate the acess tokens
userSchema.methods.generateAcessToken=function(){
    return jwt.sign(
        {
            _id:this.id,
            email:this.email,
            username:this.username,
            fullname:this.fullName,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACESS_TOKEN_EXPIRY
        }
    )
}

// this is used for refresh tokens
userSchema.methods.generateRefreshToken=function(){
        return jwt.sign(
        {
            _id:this.id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema);





