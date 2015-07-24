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
                
                var pos = 0;
                
                $(".btnBorrar").click(function(){
                    
                    pos = "info"+$(this).attr("role");
                    
                    var nombreCliente = $(this).attr("alt");
                    $("#divBorrarCliente").fadeIn();
                    $("#preguntaBorrar").text("¿Eliminar a "+ nombreCliente +" del sistema?");
                    
                });
                
                $("#btnEliminar").click(function(){
                    
                   var cedula = $("#"+pos+"").attr("alt");
                   
        
                   
                   $.post('Controlador', {
                                action: "borrarCliente",
                                cedulaCliente: cedula
                                
			}, function(responseText) {
				
                                if(responseText==1){
                                    
                                        $("#tr"+pos+"").fadeOut();
                                        $("#divBorrarCliente").fadeOut();
                                        
                                }else{
                                    
                                    alert("no se pudo borrar");
                                    
                                }
                              
                        
			});  
                    
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
                    
                }else if(formulario.txtContrasenia.value==""){
                    formulario.txtContrasenia.focus();
                    $("#complete").fadeIn();
                    return false;
                    
                }else{
                    
                    var formCliente = formulario;
                    guardarUsuario(formCliente);
                    $("#complete").fadeOut();

                }   
                
                
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
           
            function guardarUsuario(form){
               
               $("#avisoAjax").fadeIn();
               
            var formData = new FormData(form[0]);
               
                    $.post('Controlador', {
                                data: formData,
                                
			}, function(responseText) {
				$('#avisoAjax').text(responseText);
			});  
                        
                
           }
          
        
            