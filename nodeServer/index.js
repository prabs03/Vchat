// const io=require('socket.io')(8000)
const {Server}=require('socket.io');
const io=new Server(8000,{
    cors:{
        origin:'*'
    }
    
})
// const io=require(Socket);
const users={};
io.on('connection',socket=>{
    socket.on('new-user-joined',name=>{
        users[socket.id]=name;
        socket.broadcast.emit('user-joined',name);
        console.log(name);
    });
    socket.on('send',message=>{
        socket.broadcast.emit('recieve',{message:message,name:users[socket.id]})
    });
    socket.on('disconnet',message=>{
        socket.broadcast.emit('right',users[socket.id])
        delete users[socket.id]; 
    })
})