        //***************funciones para la entidad clientes***************************

$(document).ready(function(){

                var posUser = "";
                var posQuitar = "";
    
                $("#btnAbrirClientes").click(function() {
                   $("#divCliente").fadeIn();
                });
    
                
    
                $("#btnAgregarClientes").click(function(){ 
                    $("#divAgregarCliente").fadeIn()
                
                });   
    
    
                //Abrir toda la información del cliente
                 $('#tblClientes').on('click', '.btnVerInfoCliente', function(){
                     
                     posUser = $(this).attr("role");
                     
                        $(".titutoInfoCliente").text($("#"+"nombreUser"+posUser+"").attr("alt")+" "+$("#"+"apellidosUser"+posUser+"").attr("alt"));
                     
                        $("#tdCedulaCliente").text($("#"+"cedulaUser"+posUser+"").attr("alt"));
                        $("#tdNacimientoCliente").text($("#"+"fechaNacimientoUser"+posUser+"").attr("alt"));
                        $("#tdCorreoCliente").text($("#"+"correoUser"+posUser+"").attr("alt"));
                        $("#tdDireccionCliente").text($("#"+"direccionUser"+posUser+"").attr("alt"));
                        $("#tdTelefonoCliente").text($("#"+"telefonoUser"+posUser+"").attr("alt"));
                        $("#tdUsuarioCliente").text($("#"+"usuarioUser"+posUser+"").attr("alt"));
                        $("#tdContrasenaCliente").text($("#"+"contraseniaUser"+posUser+"").attr("alt"));
                        $("#tdEstadoCliente").text($("#"+"activoUser"+posUser+"").attr("alt"));
                        $("#tdRolCliente").text($("#"+"rolUser"+posUser+"").attr("alt"));
                      
                     $("#divVerClienteInfo").fadeIn();
                     
                     
                 });

                //Abrir editar cliente
                
                $('#tblClientes').on('click', '.btnEditar', function(){
                    
                    var idCliente = "";
                    idCliente = $(this).attr("alt");
                    $("#divEditarCliente").fadeIn();
                    
                });
                
                //borrar cliente
                
          
                
                $('#tblClientes').on('click', '.btnBorrar', function(){
                    
                    posUser = "idUser"+$(this).attr("role");
                    posQuitar = "tr"+$(this).attr("role");
                    
                    var nombreCliente = $(this).attr("alt");
                    $("#divBorrarCliente").fadeIn();
                    $("#preguntaBorrar").text("¿Eliminar a "+ nombreCliente +" del sistema?");
                    
                });
                
                $("#btnEliminar").click(function(){
                
                   var idUsuario = $("#"+posUser+"").attr("alt");
        
                   $.post('Controlador', {
                                action: "borrarCliente",
                                cedulaCliente: idUsuario
                                
			}, function(responseText) {
                        
                                $("#divBorrarCliente").fadeOut();
                                $("#tblClientes #"+posQuitar+"").fadeOut();
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
			dataType: 'text', //Tipo de Respuesta
			data: formData //Serializamos el formulario
			})
			.done(function(data) {//Cuando nuestra función finalice, recuperamos la respuesta
           
                            if(data.length==3){
                                
                                $("#avisoAjax").text("Error al guardar");
                                $("#avisoAjax").css("color","red");
                                
                            }else if(data.length== 4){
                                
                                $("#avisoAjax").text("El usuario ya existe");
                                $("#avisoAjax").css("color","blue");
                                $("#GuardarClienteForm input[name = 'txtUsuario']").focus();
                                
                            }else if(data.length>6){
                                
                                $("#avisoAjax").text("!Guardado con éxito¡");
                                $("#avisoAjax").css("color","green");
                                
                                limpiarFormClientes();
                               
                                $("#tblClientes").append(data);
                                
                                
                                
                            }
                                
			});
                        
                
           }
          
           function limpiarFormClientes(){
               
                    $("#GuardarClienteForm input[name = 'txtNombre']").val("");
                    $("#GuardarClienteForm input[name = 'txtApellidos']").val("");
                    $("#GuardarClienteForm input[name = 'txtCedula']").val("");
                    $("#contenedorFecha input[name = 'diaCliente']").val("");
                    $("#contenedorFecha input[name = 'mesCliente']").val("");
                    $("#contenedorFecha input[name = 'annioCliente']").val("");
                    $("#GuardarClienteForm input[name = 'txtEmail']").val("");
                    $("#GuardarClienteForm input[name = 'txtTelefono']").val("");
                    $("#GuardarClienteForm input[name = 'txtDirecion']").val("");
                    $("#GuardarClienteForm input[name = 'txtUsuario']").val("");
                    $("#GuardarClienteForm input[name = 'txtContrasenia']").val("");
               
           };
        
            