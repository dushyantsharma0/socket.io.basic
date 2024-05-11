const mongoose = require('mongoose')
const dataSchma=mongoose.Schema({
    name:{
        type:String,
        required:true
    },msg:{
        type:String,
        required:true
    }

},

{
    timestamps:true
})
module.exports = mongoose.model('chats',dataSchma)
