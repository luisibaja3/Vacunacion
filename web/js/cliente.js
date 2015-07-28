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
                var posBorrar = 0;
                
                $(".btnBorrar").click(function(){
                    
                    pos = "info"+$(this).attr("role");
                    posBorrar = $(this).attr("role");
                    
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
                            	
                                alert(responseText);
                                    
                                    
                                    
                                    var quitar = $("#tr"+posBorrar);
                                    
                                    alert(quitar);
                                    
                                        
                                        $("#divBorrarCliente").fadeOut();
                                        
                            
                              
                        
			});  
                    
                });
                
                $("#btnGuardarCliente").click(function(){
                    
                    if($("#GuardarClienteForm input[name = 'txtNombre']").val() == ""){
                        
                    $("#GuardarClienteForm input[name = 'txtNombre']").focus();
                    $("#complete").fadeIn();
                        
                    }else  if($("#GuardarClienteForm input[name = 'txtApellidos']").val() == ""){
                        
                    $("#GuardarClienteForm input[name = 'txtApellidos']").focus();
                    $("#complete").fadeIn();
                        
                    }else if($("#GuardarClienteForm input[name = 'txtCedula']").val() == ""){
                        
                    $("#GuardarClienteForm input[name = 'txtCedula']").focus();
                    $("#complete").fadeIn();
                        
                    }else if($("#contenedorFecha input[name = 'diaCliente']").val() == ""){
                        
                    $("#contenedorFecha input[name = 'diaCliente']").focus();
                    $("#complete").fadeIn();
                        
                    }else if($("#contenedorFecha input[name = 'mesCliente']").val() == ""){
                        
                    $("#contenedorFecha input[name = 'mesCliente']").focus();
                    $("#complete").fadeIn();
                        
                    }else if($("#contenedorFecha input[name = 'annioCliente']").val() == ""){
                        
                    $("#contenedorFecha input[name = 'annioCliente']").focus();
                    $("#complete").fadeIn();
                        
                    }else if($("#GuardarClienteForm input[name = 'txtEmail']").val() == ""){
                        
                    $("#GuardarClienteForm input[name = 'txtEmail']").focus();
                    $("#complete").fadeIn();
                        
                    }else if($("#GuardarClienteForm input[name = 'txtTelefono']").val() == ""){
                        
                    $("#GuardarClienteForm input[name = 'txtTelefono']").focus();
                    $("#complete").fadeIn();
                        
                    }else if($("#GuardarClienteForm input[name = 'txtDirecion']").val() == ""){
                        
                    $("#GuardarClienteForm input[name = 'txtDirecion']").focus();
                    $("#complete").fadeIn();
                        
                    }else if($("#GuardarClienteForm input[name = 'txtUsuario']").val() == ""){
                        
                    $("#GuardarClienteForm input[name = 'txtUsuario']").focus();
                    $("#complete").fadeIn();
                        
                    }else if($("#GuardarClienteForm input[name = 'txtContrasenia']").val() == ""){
                        
                    $("#GuardarClienteForm input[name = 'txtContrasenia']").focus();
                    $("#complete").fadeIn();
                        
                    }else{
                        
                         $("#complete").fadeOut();
                       guardarUsuario();
                        
                    }
               });
                        
            });
            
            function guardarUsuario(){
               
               $("#avisoAjax").fadeIn();
               $("#avisoAjax").text("Guardando...");
               $("#avisoAjax").css("color","#4a3e3e");
               
            var formData = $("#GuardarClienteForm").serialize();
               
                    $.ajax({
                        url: 'Controlador',//Url a donde enviaremos los datos
			type: 'POST',// Tipo de envio 
			dataType: 'html', //Tipo de Respuesta
			data: formData //Serializamos el formulario
			})
			.done(function(data) {//Cuando nuestra función finalice, recuperamos la respuesta
                            if(data == "1"){
                                
                                $("#avisoAjax").text("Error al guardar");
                                $("#avisoAjax").css("color","red");
                            }else if(data == "2"){
                                
                                $("#avisoAjax").text("El usuario ya existe");
                                $("#avisoAjax").css("color","blue");
                                
                            }else if(data.length>3){
                                
                                $("#avisoAjax").text("!Guardado con éxito¡");
                                $("#avisoAjax").css("color","green");
                                
                                $("#tblClientes").append(data);
                                
                                limpiarFormlientes();
                                
                            }
                                
			});
                        
                
           }
          
           function limpiarFormlientes(){
               
               $("#GuardarClienteForm input").each(function(){
                  
                   $(this).text("");
                   
               });
               
           };
        
            