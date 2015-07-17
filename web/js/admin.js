$(document).ready(function () {
                
                //captura de la tecla esc para cerrar varios divs
                $(document).bind('keydown',function(e){
                    if ( e.which == 27 ) {
                               ocultarMenu();
                        cerrarDivSalir();
                        };
                });
                
                //Funciones para cerrar forms
                $("#btnLogout").click(function() {
                   $("#salirDiv").fadeIn();
                });
                
                $("#btnAbrirClientes").click(function() {
                   $("#clienteDiv").fadeIn();
                });
            
                $("#noSalir").click(cerrarDivSalir);  
                
                $("#cerrarFormEditar").click(function(){
                     $("#FondoEditarUno").fadeOut();
                });
                
                $("#btnVolverAgregar").click(function(){ $("#FondoVerTodos").fadeOut()});
                                $(".cerrarForm").click(cerrarDivSalir);     

                function cerrarDivSalir(){
                    $(".FondFrms").fadeOut();
                    $("#FondoVerTodos").fadeOut();                    
                }
                
                //Funciones para el panel del menu
                
                $("#btnConfiguraciones").click(function(){
                
                    
                    animate(".menu", 'fadeInRight');
                    $("#PanelMenu").fadeIn();
                    
                });
                
                $("#ocultarMenu").click(ocultarMenu);
                
                function ocultarMenu(){
                $("#PanelMenu").fadeOut();
                    animate(".menu", 'fadeOutRight');
                    
                }
                
                
              function animate(element_ID, animation) {
                $(element_ID).addClass(animation);
                var wait = window.setTimeout( function(){
                $(element_ID).removeClass(animation)}, 1000
            );
        }
                
            
                //funciones para ver todos los datos de las entidades
                
          $("#VerTodosClientes").click(function(){
            
             $("#FondoVerTodos").fadeIn();
                
            
            });
        
            
                //Abrir editar cliente
                
                $("#btnEditar").click(function(){
                
                    var idCliente = $(this).attr("alt");
                    $("#FondoEditarUno").fadeIn();
                
                    alert(idCliente);
                    
                });
                
                //borrar cliente
    
                $("#btnBorrar").click(function(){
                    
                    var nombreCliente = $(this).attr("alt");
                    $("#borrarForm").fadeIn();
                    $("#preguntaBorrar").text("¿Eliminar a "+ nombreCliente +" del sistema?");
           
                });
               
            });
            
            //Validacion del form cliente
            function validarFormCliente(formulario){
            
                if(formulario.txtNombre.value==""){
                    formulario.txtNombre.focus();
                    $("#complete").fadeIn();
                    return false;
                    
                }else if(formulario.txtApellidos.value==""){
                    formulario.txtApellidos.focus();
                    $("#complete").fadeIn();
                    return false;
                    
                }else if(formulario.txtCedula.value==""){
                    formulario.txtCedula.focus();
                    $("#complete").fadeIn();
                    return false;
                    
                }else if(formulario.diaCliente.value==""){
                    formulario.diaCliente.focus();
                    $("#complete").fadeIn();
                    return false;
                    
                }else if(formulario.mesCliente.value==""){
                    formulario.mesCliente.focus();
                    $("#complete").fadeIn();
                    return false;
                    
                }else if(formulario.annioCliente.value==""){
                    formulario.annioCliente.focus();
                    $("#complete").fadeIn();
                    return false;
                    
                }else if(formulario.txtEmail.value==""){
                    formulario.txtEmail.focus();
                    $("#complete").fadeIn();
                    return false;
                    
                }else if(formulario.txtTelefono.value==""){
                    formulario.txtTelefono.focus();
                    $("#complete").fadeIn();
                    return false;
                    
                }else if(formulario.txtDirecion.value==""){
                    formulario.txtDirecion.focus();
                    $("#complete").fadeIn();
                    return false;
                    
                }else if(formulario.txtUsuario.value==""){
                    formulario.txtUsuario.focus();
                    $("#complete").fadeIn();
                    return false;
                    
                }else if(existeUsuario()==""){
                     formulario.txtUsuario.focus();
                    $("#complete").fadeIn();
                    return false;
                    
                }else if(formulario.txtContrasenia.value==""){
                    formulario.txtContrasenia.focus();
                    $("#complete").fadeIn();
                    return false;
                    
                }else{
                   
                    return true;
                    $("#complete").fadeOut();
                }   
                 alert(formulario.txtFecha.value);
            }
            
            function validarFecha(fecha){
                
                var validacion = 0;
                
                var date = $("#fechaCliente").val();
            
                if(String(date)==""){
                    validacion = 0;
                
                }else{
                    validacion = 1;
                    
                }
                
                return validacion;
            }
           
           function existeUsuario(){
               
               $.post('Controlador', {
                   
                action : 'existeUsuario',
                usuario : formulario.txtUsuario.value
            }
      , function(responseText){
				alert(responseText);
			});
               return reponseText;
           }
            