const mongoose = require('mongoose')

const blacklistSchema =mongoose.Schema({
    blacklistToken:{
        type:String,
        required:true
    }
},{
    versionKey:false
})

const BlackTokenModel =mongoose.model('BlackToken',blacklistSchema)

module.exports ={
    BlackTokenModel
}