const mongoose = require('mongoose')
const dataSchma=mongoose.Schema({
    Sender_Id:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:'UserRegister'
    },
    Reciver_Id:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:'UserRegister'
    },
    msg:{
        type:String,
        required:true
    }

},

{
    timestamps:true
})
module.exports = mongoose.model('chats',dataSchma)
