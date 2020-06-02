const express = require('express')
const path = require('path');
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const http = require('http');
const socketio = require('socket.io');
const Login = require('./model/loginModel')

const url = 'mongodb://localhost:27017/login'
const app = express()
app.use(bodyParser.json())

mongoose.connect(url,{useNewUrlParser:true})
const conn = mongoose.connection

conn.on('open' ,() =>{
    console.log('Connected')
})


app.use(express.static(path.resolve(__dirname, 'build')));

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

const logroute = require('./router/loginRouter')
app.use('/login',logroute)

var server = http.createServer(app);
var io = socketio(server);


io.on("connection", socket => {
  var online = Object.keys(io.engine.clients);
  const { id } = socket.client;
  console.log(`User Connected: ${id}`);

  socket.on("chat message", ({ name, msg }) => { 
        try{
            Login.find({ loginStatus : true}).then(value =>{
                console.log(';;',value)
                for(var i = 0;i< value.length;i++)
                {
                    value[i].message = value[i].message +","+ (name + ":" +msg)
                    value[i].save()
                }
            })
        }
        catch(error) {
            res.send('Error' + error)
        }
    
    io.emit("chat message", { id, name, msg });
  });

  socket.on('disconnect', () => {
    var online = Object.keys(io.engine.clients);
    io.emit('server message', JSON.stringify(online))
    console.log("Disconnected");
  });
});


const PORT = process.env.PORT || 9000;
server.listen(PORT, () => console.log(`Listen on *: ${PORT}`));
