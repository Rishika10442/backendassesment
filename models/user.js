const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique :true
    },
    password:{
        type:String,
        required:true
    },
    followers:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'friendship'
    }],
    followings:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'friendship'
    }],
},{
    timestamps:true
});

const User = mongoose.model('User',userSchema);
module.exports=User;
