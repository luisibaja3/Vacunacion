$(document).ready(function(){
    
                var posVacuna = "";
                var posQuitar = "";
    
                $("#btnAbrirVacunas").click(function() {
                   $("#divVacunas").fadeIn();
                });
                
                
                $('#tblVacunas').on('click', '.btnBorrar', function(){
                    
                    posVacuna = "idVacunas"+$(this).attr("role");
                    posQuitar = "trVacuna"+$(this).attr("role");
                    
                    var nombreVacuna = $(this).attr("alt");
                    
                    $("#divBorrarVacuna").fadeIn();
                    $("#preguntaBorrarVacuna").text("¿Eliminar a "+ nombreVacuna +" del sistema?");
                    
                });
                
                $("#btnEliminarVacuna").click(function(){
                
                   var idVacuna = $("#"+posVacuna+"").attr("alt");
                   
                   $.post('Controlador', {
                                action: "borrarVacuna",
                                idVacuna: idVacuna
                                
			}, function(responseText) {
                            
                            if (responseText == 1){
                                
                                
                                $("#divBorrarVacuna").fadeOut();
                                $("#tblVacunas #"+posQuitar+"").fadeOut();
                                
                            }else{
                                
                               alert("Error al eliminar la vacuna\n\
                                    Nota: si esta está asociada a una cita debera quitar la cita primero.");
                                
                            }
                        
                        });  
                    
                });
                
                
                //#####Abrir info de las vacunas
                
                //Abrir toda la información del cliente
                
                 $('#tblVacunas').on('click', '.btnVerInfoVacunas', function(){
                     
                     posVacuna = $(this).attr("role");
                     
                        $("#tituloInfoVacuna").text($("#"+"nombreVacuna"+posVacuna+"").attr("alt"));
                     
                        $("#tdDescripcionVacuna").text($("#"+"descripcionVacuna"+posVacuna+"").attr("alt"));
                        $("#tdTipoVacuna").text($("#"+"tipoVacuna"+posVacuna+"").attr("alt"));
                        $("#tdEstadoVacuna").text($("#"+"estadoVacuna"+posVacuna+"").attr("alt"));
                      
                     $("#divVerVacunaInfo").fadeIn();
                     
                 });
                 
                 //*****Abrir agregar cliente
                 
                 $("#btnAgregarVacunas").click(function(){ 
                     
                        $("#divAgregarVacuna").fadeIn();

                    }); 
                    
                 //***capturar btn guardar vacuna
                 
                  $("#btnGuardarVacuna").click(function(){
                    
                    if($("#GuardarVacunaForm input[name = 'txtNombreVacuna']").val() == ""){
                        
                    $("#GuardarVacunaForm input[name = 'txtNombreVacuna']").focus();
                    $("#completeGuardarVacunas").fadeIn();
                        
                    }else if($("#GuardarVacunaForm input[name = 'txtDescripcionVacuna']").val() == ""){
                        
                    $("#GuardarVacunaForm input[name = 'txtDescripcionVacuna']").focus();
                    $("#completeGuardarVacunas").fadeIn();
                        
                    }else if($("#GuardarVacunaForm input[name = 'txtTipoVacuna']").val() == ""){
                        
                    $("#GuardarVacunaForm input[name = 'txtTipoVacuna']").focus();
                    $("#completeGuardarVacunas").fadeIn();
                        
                    }else{ 
                         $("#completeGuardarVacunas").fadeOut();
                         var form = "GuardarVacunaForm";
                         var tipo = "Guardar";
                         guardarVacuna(tipo, form);
                        
                    }
               });
               
               
               
    
});

//ajax para guardar y editar vacunas
    
              function guardarVacuna(tipo, form){
               
               var aviso = "avisoAjaxVacunas"+tipo;
               
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
                                
                               $("#"+aviso+"").text("¡El nombre de la vacuna ya existe!");
                                $("#"+aviso+"").css("color","blue");
                                $("#"+form+" input[name = 'txtNombreVacuna']").focus();
                                
                            }else if(data.length>6){
                                
                                $("#"+aviso+"").css("color","green");
                                
                                if(tipo=="Editar"){
                                    
                                    $("#"+aviso+"").text("¡Editada con éxito!");
                                   
                                    
                                }else{
                                    
                                    $("#"+aviso+"").text("¡Guardada con éxito!");
                                    
                                    limpiarFormVacunas();
                                    
                                }
                                
                                $("#tblVacunas").html(data);
                            
                                }
                        });
                        
              }
              
              //Limpiar form de vacunas
              
              function limpiarFormVacunas(){
               
                    $("#GuardarVacunaForm input[name = 'txtNombreVacuna']").val("");
                    $("#GuardarVacunaForm input[name = 'txtDescripcionVacuna']").val("");
                    $("#GuardarVacunaForm input[name = 'txtTipoVacuna']").val("");
               
           };
