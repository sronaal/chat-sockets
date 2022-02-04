$(function() {
    const socket = io();

    let nick = ''
    // Acceder a los elementos del DOM

    const messageForm = $('#messages-form');
    const messageBox = $('#message');
    const chat = $("#chat");
    
    const nickForm = $("#nick-form");
    const nickError = $("#nick-error");
    const nickName = $("#nick-name");

    const userNames = $("#usernames")
    // Eventos
    
    //Enviamos mensaje al servidor
    messageForm.submit(e =>{
        
        e.preventDefault();
        socket.emit('enviar',messageBox.val()); // Envia el mensaje al servidor
        messageBox.val('');
    })

    //Obtener respuesta del server:

    socket.on('mensaje',function(datos){
       // console.log(datos)
        chat.append(`<div class="msg-area mb-2"><p>${datos.msg}</p></div>`) // Muestra el mensaje el elemento Chat
    })

    // Nuevo Usuario

    nickForm.submit(e =>{

        e.preventDefault();
        socket.emit('new-user',nickName.val(), datos =>{
            
            if(datos){
                nick = nickName.val(); 

                $('#nick-wrap').hide(); // Se escode un elemento del DOM
                $('#container-wrap').show(); // Se muestra el formulario CHAT

            }else{
                nickError.html("<div class='alert alert-danger'>El Usuario Ya Existe</div>")
            }

            nickName.val("");
        });
    })

    socket.on('user-active',function(datos){
        userNames.append(`<p>${datos}</p>`)
    })


})

