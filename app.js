require('dotenv').config()
const express = require('express');
const socket = require('socket.io');
const http= require('http');
const app = express();
const server=http.createServer(app)
const mongoose=require('mongoose');
const dataSchma=require('./models/chatmodel')
mongoose.connect(process.env.MONGODB_URl)

const io=socket(server)
const path=require('path')

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res)=>{
    res.sendFile(__dirname+'/index')

})

io.on('connection', async(socket)=>{
    console.log('new connection')
    socket.on('sendname', async (data) => {
        console.log(data);
        const allmsg = await dataSchma.find();
       
        
        console.log(allmsg);
        socket.emit('fistAllMsgsend',allmsg );
    });

   socket.on('message',async(data)=>{
    console.log(data)
    const user= new dataSchma({
        name:data.name,
        msg:data.msg
    })
    await user.save()
    
    socket.broadcast.emit('allmsg', data)
   })
    socket.on('disconnect', ()=>{
        console.log('user disconnected')
    })
})

server.listen(3000, ()=>{
    console.log('listening on port 3000')
})


