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
                     
                     var elem = $("#"+"fechaNacimientoUser"+posUser+"").attr("alt").split('-');
                    var annio = elem[0];
                    var mes = elem[1];
                    var dia = elem[2];
                     
                        $(".titutoInfoCliente").text($("#"+"nombreUser"+posUser+"").attr("alt")+" "+$("#"+"apellidosUser"+posUser+"").attr("alt"));
                     
                        $("#tdCedulaCliente").text($("#"+"cedulaUser"+posUser+"").attr("alt"));
                        $("#tdNacimientoCliente").text(dia+"-"+mes+"-"+annio);
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
                    
                    posUser = $(this).attr("role");
                    
                    var elem = $("#"+"fechaNacimientoUser"+posUser+"").attr("alt").split('-');
                    var annio = elem[0];
                    var mes = elem[1];
                    var dia = elem[2];
                    
                    var estado = $("#"+"activoUser"+posUser+"").attr("alt");
                    var rol = $("#"+"rolUser"+posUser+"").attr("alt");
                    
                    $("#FormEditarCliente input[name = 'txtIdUsuario']").val($("#"+"idUser"+posUser+"").attr("alt"));
                    
                    $("#FormEditarCliente input[name = 'txtOldUser']").val($("#"+"usuarioUser"+posUser+"").attr("alt"));
                
                    $("#FormEditarCliente input[name = 'txtNombre']").val($("#"+"nombreUser"+posUser+"").attr("alt"));
                    
                    $("#FormEditarCliente input[name = 'txtApellidos']").val($("#"+"apellidosUser"+posUser+"").attr("alt"));
                    
                    $("#FormEditarCliente input[name = 'txtCedula']").val($("#"+"cedulaUser"+posUser+"").attr("alt"));
                    
                    $(".fechaEditarCliente input[name = 'diaCliente']").val(dia);
                    
                    $(".fechaEditarCliente input[name = 'mesCliente']").val(mes);
                    
                    $(".fechaEditarCliente input[name = 'annioCliente']").val(annio);
                    
                    $("#FormEditarCliente input[name = 'txtEmail']").val($("#"+"correoUser"+posUser+"").attr("alt"));
                    
                    $("#FormEditarCliente input[name = 'txtTelefono']").val($("#"+"telefonoUser"+posUser+"").attr("alt"));
                    
                    $("#FormEditarCliente input[name = 'txtDirecion']").val($("#"+"direccionUser"+posUser+"").attr("alt"));
                    
                    $("#FormEditarCliente input[name = 'txtUsuario']").val($("#"+"usuarioUser"+posUser+"").attr("alt"));
                    
                    $("#FormEditarCliente input[name = 'txtContrasenia']").val($("#"+"contraseniaUser"+posUser+"").attr("alt"));
                    
                    if(estado == "activado"){
                        
                        $(".selectEstado option[value=1]").attr("selected",true); 
                        
                    }else{
                        
                         $(".selectEstado option[value=0]").attr("selected",true); 
                        
                    }
                    
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
                
                //validar guardar cliente
                $("#btnGuardarCliente").click(function(){
                    
                    if($("#GuardarClienteForm input[name = 'txtNombre']").val() == ""){
                        
                    $("#GuardarClienteForm input[name = 'txtNombre']").focus();
                    $("#completeGuardar").fadeIn();
                        
                    }else  if($("#GuardarClienteForm input[name = 'txtApellidos']").val() == ""){
                        
                    $("#GuardarClienteForm input[name = 'txtApellidos']").focus();
                    $("#completeGuardar").fadeIn();
                        
                    }else if($("#GuardarClienteForm input[name = 'txtCedula']").val() == ""){
                        
                    $("#GuardarClienteForm input[name = 'txtCedula']").focus();
                    $("#completeGuardar").fadeIn();
                        
                    }else if($("#contenedorFecha input[name = 'diaCliente']").val() == ""){
                        
                    $("#contenedorFecha input[name = 'diaCliente']").focus();
                    $("#completeGuardar").fadeIn();
                        
                    }else if($("#contenedorFecha input[name = 'mesCliente']").val() == ""){
                        
                    $("#contenedorFecha input[name = 'mesCliente']").focus();
                    $("#completeGuardar").fadeIn();
                        
                    }else if($("#contenedorFecha input[name = 'annioCliente']").val() == ""){
                        
                    $("#contenedorFecha input[name = 'annioCliente']").focus();
                    $("#completeGuardar").fadeIn();
                        
                    }else if($("#GuardarClienteForm input[name = 'txtEmail']").val() == ""){
                        
                    $("#GuardarClienteForm input[name = 'txtEmail']").focus();
                    $("#completeGuardar").fadeIn();
                        
                    }else if($("#GuardarClienteForm input[name = 'txtTelefono']").val() == ""){
                        
                    $("#GuardarClienteForm input[name = 'txtTelefono']").focus();
                    $("#completeGuardar").fadeIn();
                        
                    }else if($("#GuardarClienteForm input[name = 'txtDirecion']").val() == ""){
                        
                    $("#GuardarClienteForm input[name = 'txtDirecion']").focus();
                    $("#completeGuardar").fadeIn();
                        
                    }else if($("#GuardarClienteForm input[name = 'txtUsuario']").val() == ""){
                        
                    $("#GuardarClienteForm input[name = 'txtUsuario']").focus();
                    $("#completeGuardar").fadeIn();
                        
                    }else if($("#GuardarClienteForm input[name = 'txtContrasenia']").val() == ""){
                        
                    $("#GuardarClienteForm input[name = 'txtContrasenia']").focus();
                    $("#completeGuardar").fadeIn();
                        
                    }else{
                        
                         $("#completeGuardar").fadeOut();
                         var form = "GuardarClienteForm";
                         var tipo = "Guardar";
                         guardarUsuario(tipo, form);
                        
                    }
               });
               
               
            $("#btnGuardarEditarCliente").click(function(){
                
                alert($("#FormEditarCliente input[name = 'txtNombre']").val());
                
              if($("#FormEditarCliente input[name = 'txtNombre']").val() == ""){
                        
                    $("#FormEditarCliente input[name = 'txtNombre']").focus();
                    $("#completeEditar").fadeIn();
                        
                    }else  if($("#FormEditarCliente input[name = 'txtApellidos']").val() == ""){
                        
                    $("#FormEditarCliente input[name = 'txtApellidos']").focus();
                    $("#completeEditar").fadeIn();
                        
                    }else if($("#FormEditarCliente input[name = 'txtCedula']").val() == ""){
                        
                    $("#FormEditarCliente input[name = 'txtCedula']").focus();
                    $("#completeEditar").fadeIn();
                        
                    }else if($(".fechaEditarCliente input[name = 'diaCliente']").val() == ""){
                        
                    $(".fechaEditarCliente input[name = 'diaCliente']").focus();
                    $("#completeEditar").fadeIn();
                        
                    }else if($(".fechaEditarCliente input[name = 'mesCliente']").val() == ""){
                        
                    $(".fechaEditarCliente input[name = 'mesCliente']").focus();
                    $("#completeEditar").fadeIn();
                        
                    }else if($(".fechaEditarCliente input[name = 'annioCliente']").val() == ""){
                        
                    $(".fechaEditarCliente input[name = 'annioCliente']").focus();
                    $("#completeEditar").fadeIn();
                        
                    }else if($("#FormEditarCliente input[name = 'txtEmail']").val() == ""){
                        
                    $("#FormEditarCliente input[name = 'txtEmail']").focus();
                    $("#completeEditar").fadeIn();
                        
                    }else if($("#FormEditarCliente input[name = 'txtTelefono']").val() == ""){
                        
                    $("#FormEditarCliente input[name = 'txtTelefono']").focus();
                    $("#completeEditar").fadeIn();
                        
                    }else if($("#FormEditarCliente input[name = 'txtDirecion']").val() == ""){
                        
                    $("#FormEditarCliente input[name = 'txtDirecion']").focus();
                    $("#completeEditar").fadeIn();
                        
                    }else if($("#FormEditarCliente input[name = 'txtUsuario']").val() == ""){
                        
                    $("#FormEditarCliente input[name = 'txtUsuario']").focus();
                    $("#completeEditar").fadeIn();
                        
                    }else if($("#FormEditarCliente input[name = 'txtContrasenia']").val() == ""){
                        
                    $("#FormEditarCliente input[name = 'txtContrasenia']").focus();
                    $("#completeEditar").fadeIn();
                        
                    }else{
                        
                         $("#completeEditar").fadeOut();
                         var form = "FormEditarCliente";
                         var tipo = "Editar";
                         guardarUsuario(tipo, form);
                        
                    }
                
            });
               
                        
            });
            
          function guardarUsuario(tipo, form){
               
               var aviso = "avisoAjax"+tipo;
               
               $("#"+aviso+"").fadeIn();
               $("#"+aviso+"").text("Guardando...");
               $("#"+aviso+"").css("color","#4a3e3e");
               
            var formData = $("#"+form+"").serialize();
               
                    $.ajax({
                        url: 'Controlador',//Url a donde enviaremos los datos
			type: 'POST',// Tipo de envio 
			dataType: 'text', //Tipo de Respuesta
			data: formData //Serializamos el formulario
			})
			.done(function(data) {//Cuando nuestra función finalice, recuperamos la respuesta
           
                            if(data.length==3){
                                
                                $("#"+aviso+"").text("Error al guardar");
                                $("#"+aviso+"").css("color","red");
                                
                            }else if(data.length== 4){
                                
                               $("#"+aviso+"").text("¡El usuario ya existe!");
                                $("#"+aviso+"").css("color","blue");
                                $("#"+form+" input[name = 'txtUsuario']").focus();
                                
                            }else if(data.length>6){
                                
                                $("#"+aviso+"").css("color","green");
                                
                                if(tipo=="Editar"){
                                    
                                    $("#"+aviso+"").text("¡Editado con éxito!");
                                    $("#tblClientes").html(data);
                                    
                                }else{
                                    
                                    $("#"+aviso+"").text("¡Guardado con éxito!");
                                    $("#tblClientes").append(data);
                                    
                                    limpiarFormClientes();
                                    
                                }
                               
                                
                                alert(data);
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
        
            