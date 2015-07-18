        //***************funciones para la entidad clientes***************************

$(document).ready(function(){

                $("#btnAbrirClientes").click(function() {
                   $("#divCliente").fadeIn();
                });
    
                $("#btnAgregarClientes").click(function(){ 
                    $("#divAgregarCliente").fadeIn()
                
                });   

                //Abrir editar cliente
                
                $(".btnEditar").click(function(){
                    
                    var idCliente = "";
                    idCliente = $(this).attr("alt");
                    $("#divEditarCliente").fadeIn();
                    
                });
                
                //borrar cliente
    
                $(".btnBorrar").click(function(){
                    
                    var nombreCliente = $(this).attr("alt");
                    $("#divBorrarCliente").fadeIn();
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
           
           function existeUsuario(form){
               
               $.post('Controlador', {
                   
                action : 'existeUsuario',
                usuario : formulario.txtUsuario.value
                   
            }
      , function(responseText){
				alert(responseText);
			});
               return reponseText;
           }
            