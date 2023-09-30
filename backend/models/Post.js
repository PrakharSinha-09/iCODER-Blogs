const mongoose=require('mongoose')

const PostSchema=new mongoose.Schema({
    title:{
        type: String,
        require:true,
    },
    summary:{
        type: String,
        require:true,
    },
    content:{
        type: String,
        require:true,
    },
    cover:{
        type: String,         //this will be for image
        // require:true,
    },
    author:{type:mongoose.Schema.ObjectId, ref: 'User'}
    

},{
    timestamps:true
})

const PostModel=mongoose.model('Post',PostSchema)
module.exports=PostModel