const express = require('express');
const socket = require('socket.io');
const http= require('http');
const app = express();
const server=http.createServer(app)

const io=socket(server)
const path=require('path')

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res)=>{
    res.sendFile(__dirname+'/index')

})

io.on('connection', (socket)=>{
    console.log('new connection')
   socket.on('message',(data=>{
    console.log(data)
    io.emit('allmsg', data)
   }))
    socket.on('disconnect', ()=>{
        console.log('user disconnected')
    })
})

server.listen(3000, ()=>{
    console.log('listening on port 3000')
})


