const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId
    },
    //this defines the objId of the liked object
    likeable:{
        type:mongoose.Schema.ObjectId,
        required:true,
        refPath:'onModel'
    }
},{
    timestamps:true
}) 

const Like = mongoose.model('Like',likeSchema);

module.exports = Like;