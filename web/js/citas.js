        //***************funciones para la entidad clientes***************************

$(document).ready(function(){

                var posCita = "";
                var posQuitarCita = "";
                
                
                //ver info de las citas
                
                                //Abrir toda la información del cliente
            $('#tblcitas').on('click', '.btnVerInfoCitas', function(){
                     
                     posCita = $(this).attr("role");
                     
                     var elem = $("#"+"fechaCita"+posCita+"").attr("alt").split('-');
                       
                        var annio = elem[0];
                        var mes = elem[1];
                        var dia = elem[2];
                     
                        if($("#"+"completada"+posCita+"").attr("alt")=="0"){
                                
                            $("#tdCompletada").text("no");
                        }else{
                            
                            $("#tdCompletada").text("sí");
                        }
                        
                        $("#tituloInfoCitas").text("Información de cita");
                     
                     
                        $("#tdFechaCita").text(dia+"-"+mes+"-"+annio);
                        $("#tdHoraCita").text($("#"+"horaCita"+posCita+"").attr("alt"));
                        $("#tdDetalleCita").text($("#"+"detallesCita"+posCita+"").attr("alt"));
                        
                        $("#tdPacienteCita").text($("#"+"nombreClienteCita"+posCita+"").attr("alt"));
                        $("#tdLugarCita").text($("#"+"lugarCita"+posCita+"").attr("alt"));
                        $("#tdVacunaCita").text($("#"+"nombreVacunaCita"+posCita+"").attr("alt"));
                        
                      
                     $("#divInfoCitas").fadeIn();
                     
                     
                 });
                
                
            
        $("#btnCitas").click(function(){
            
                        $.post('Controlador', {
                       
                                action: "cargarOptionsClientes"
                                
			}, function(responseText) {
                            
                            $("#clienteGuardarCita").html(responseText);
                        
                        });
                        
                    $.post('Controlador', {
                       
                                action: "cargarOptionsVacunas"
                                
			}, function(responseText) {
                            
                            $("#vacunaGuardarCita").html(responseText);
                        
                        });
            
            $("#divAgregarCita").fadeIn();
            
        });    
        
        $("#btnGuardarCita").click(function (){
            
           if ($("#contenedorFechaCita input[name = 'diaCita']").val() == ""){
               
               $("#contenedorFechaCita input[name = 'diaCita']").focus();
               $("#completeGuardarCita").fadeIn();
               
           }else if ($("#contenedorFechaCita input[name = 'mesCita']").val() == ""){
               
               $("#contenedorFechaCita input[name = 'mesCita']").focus();
               $("#completeGuardarCita").fadeIn();
               
           }else if ($("#contenedorFechaCita input[name = 'annioCita']").val() == ""){
               
               $("#contenedorFechaCita input[name = 'annioCita']").focus();
               $("#completeGuardarCita").fadeIn();
               
           }else if ($("#ContenedorHoraCita input[name = 'hora']").val() == ""){
               
               $("#ContenedorHoraCita input[name = 'hora']").focus();
               $("#completeGuardarCita").fadeIn();
               
           }else if ($("#ContenedorHoraCita input[name = 'minutos']").val() == ""){
               
               $("#ContenedorHoraCita input[name = 'minutos']").focus();
               $("#completeGuardarCita").fadeIn();
               
           }else if($("#txtDetallesCita").val() == ""){
               
               $("#txtDetallesCita").focus();
               $("#completeGuardarCita").fadeIn();
               
           }else{
               
             var tipo = "Guardar";
             var form = "GuardarCitaForm";
             guardarCita(tipo, form);
               
           }
               
            
        });
        
      function guardarCita(tipo, form){
               
               alert($("#"+form+"").serialize());
               
               var aviso = "avisoAjax"+tipo+"Cita";
               
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
           
                            if(data == "mal"){
                                
                                $("#"+aviso+"").text("Error al guardar");
                                $("#"+aviso+"").css("color","red");
                                
                            }else{
                                    
                                    $("#"+aviso+"").text("¡Guardada con éxito!");
                                    $("#"+aviso+"").css("color","green");
                                    limpiarFormCitas();
                                    cargarTablaCitas();
                                    
                                }
                                
                                
                                
                            });
                        
                
           }
                

           function limpiarFormCitas(){
               
               $("#contenedorFechaCita input[name = 'diaCita']").val("");
               $("#contenedorFechaCita input[name = 'mesCita']").val("");
               $("#contenedorFechaCita input[name = 'annioCita']").val("");
               $("#ContenedorHoraCita input[name = 'hora']").val("");
               $("#ContenedorHoraCita input[name = 'minutos']").val("");
               $("#txtDetallesCita").val("");
               
               
           }
            
           function cargarTablaCitas(){
               
                     $.post('Controlador', {
                       
                                action: "cargarTablaCitas"
                                
			}, function(responseText) {
                            
                            $("#tblcitas").html(responseText);
                        
                        });
               
           }
           
});


