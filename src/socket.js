module.exports = (io) =>{
    io.on('connection',socket =>{
        //console.log("Nuevo Usuario Conectado")

        let nickNames = [];

        //Recibi el mensaje y lo recogemos:
        socket.on('enviar',(datos) =>{
            //console.log(datos);
            
            //Envia el mensaje al cliente
            io.sockets.emit('mensaje',{  
                msg:datos
            });


        });
        
        socket.on('new-user', (datos,callback) =>{

            if(nickNames.indexOf(datos) != -1){
                callback(false);
            }else{
                callback(true);
                socket.nickname = datos;
                nickNames.push(socket.nickname)
                
                io.sockets.emit('user-active',nickNames)
            }
        });
    })
    
}