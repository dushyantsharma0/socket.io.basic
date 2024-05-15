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

const multer=require('multer')
const userData=require('./models/PicSChma')
const bodyParser=require('body-parser')
 app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.use(express.urlencoded({extended:true}))
const auth=require('./middleware/auth')
const jwt=require('jsonwebtoken')


// todo:token generate
const generateAccessToken =async(user)=>{
    const token=jwt.sign(user,process.env.ACCESS_TOKEN,{expiresIn:'2h'})
    return token
   
  }


const storage= multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,path.join(__dirname,'./public/images'))
    },
    filename:(req,file,cb)=>{
         const name= Date.now()+'-'+file.originalname;
            cb(null,name)

    }
})

const upload= multer({storage:storage})









app.use(express.json())

  
  app.post('/upload', upload.single('image'), async function (req, res) {
   console.log('Uploading image')
    const data =new userData({
      name:req.body.name,
      image:'images/'+req.file.filename,
      email:req.body.email,
      password:req.body.password
    })
    await data.save()
    res.status(200).json({success:true,msg:"Upload Success"})
         
  })

 

app.post('/login',async(req, res)=>{
  const data = await userData.findOne({email:req.body.email, password:req.body.password})
  if(data){
    const accessToken=await generateAccessToken({user:data})
    res.status(200).json({success:true,msg:"Login Success",
      accessToken:accessToken,
      data:data,
      tokenType:'Bearer'
    })
  }else{
    res.status(200).json({success:false,msg:"Login Failed"})
  }

 
})
 
      app.get('/data',auth,async(req, res)=>{
        const data = await userData.find({ email:{ $ne: req.headers['email']} });
        const mydata = await userData.findOne({ email:req.headers['email'] });
                 
        res.status(200).json({success:true,data:data,mydata:mydata})
      }) 

      app.get('/dashboard',async(req, res)=>{
        res.sendFile(path.join(__dirname,'./public/dashboard.html'))
      })








// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));


app.get('/', (req, res) => {
    
       
    res.sendFile(path.join(__dirname,'./public/homepage.html'))

});
app.get('/register', (req, res) => {
    
       
    res.sendFile(path.join(__dirname,'./public/register.html'))

});
 
app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname,'./public/secondary.html'))
});

app.get('/getchat', async(req, res) => {
  let data = await dataSchma.find({
    $or: [
        { Sender_Id: req.headers.sender_id, Reciver_Id: req.headers.reciver_id },
        { Sender_Id: req.headers.reciver_id, Reciver_Id: req.headers.sender_id }
    ]
}).populate('Reciver_Id Sender_Id')
    res.status(200).json(data)
    console.log(data)
})

io.on('connection', async(socket)=>{
    console.log('new connection')

    //todo: chat ko save karna ka lea 
 socket.on('chat',async(data)=>{
  let saveData= new dataSchma({
    Sender_Id: data.sender_id,
    Reciver_Id: data.reciver_id,
    msg:data.message
  })
  const resp=  await saveData.save()
 
    socket.broadcast.emit('otherUserDisplay',data)
 })
     

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




