        //***************funciones para la entidad clientes***************************

$(document).ready(function(){

                var posCita = "";
                var posQuitarCita = "";
                
                
                
                //Abrir editar cita
                
                $('#tblcitas').on('click', '.btnEditar', function(){
                    
                    posCita = $(this).attr("role");
                    
                    var elem = $("#"+"fechaCita"+posCita+"").attr("alt").split('-');
                    
                    var annio = elem[0];
                    var mes = elem[1];
                    var dia = elem[2];
                    
                    var PosHora = $("#"+"horaCita"+posCita+"").attr("alt").split(':');
                    var hora = PosHora[0];
                    var minutos = PosHora[1];
                    var AmPm = parseInt(PosHora[0]);
                    
                    var AmPmFinal = "am";
                    if(AmPm>12){
                        hora-=12;
                        AmPmFinal = "pm";
                    }
                    
                    //id cita
                    
                    $("#EditarCitaForm input[name = 'idCita']").val($("#"+"idCitas"+posCita+"").attr("alt"));
                    
                    //Fecha
                    $("#contenedorFechaEditarCita input[name = 'diaCita']").val(dia);
                    
                    $("#contenedorFechaEditarCita input[name = 'mesCita']").val(mes);
                    
                    $("#contenedorFechaEditarCita input[name = 'annioCita']").val(annio);
                    
                    //hora
                    $("#ContenedorHoraEditarCita input[name = 'hora']").val(hora);
                    
                    $("#ContenedorHoraEditarCita input[name = 'minutos']").val(minutos);
                    
                    $("#ContenedorHoraEditarCita option[value = '"+AmPmFinal+"']").attr("selected",true); 
                    
                    $.post('Controlador', {
                       
                                action: "cargarOptionsClientes"
                                
			}, function(responseText) {
                            
                            $("#clienteEditarCita").html(responseText);
                            $("#clienteEditarCita option[value = '"+$("#"+"idUsuarioCitas"+posCita+"").attr("alt")+"']").attr("selected",true);
                        });
                        
                    $.post('Controlador', {
                       
                                action: "cargarOptionsVacunas"
                                
			}, function(responseText) {
                            
                            $("#vacunaEditarCita").html(responseText);
                            $("#vacunaEditarCita option[value = "+$("#"+"idVacunaCitas"+posCita+"").attr("alt")+"]").attr("selected",true);
                        
                        });
                    
                    $("#txtDetallesEditarcita").text($("#"+"detallesCita"+posCita+"").attr("alt"));
                    
                    $("#completadaEditarCita option[value = '"+$("#"+"completada"+posCita+"").attr("alt")+"']").attr("selected",true); 
                    
                    $("#divEditarCita").fadeIn();
                    
                });
                
                
                $('#tblcitas').on('click', '.btnBorrar', function(){

                    posCita = "idCitas"+$(this).attr("role");
                    posQuitarCita = "trCita"+$(this).attr("role");
                    
                    var nombreCita = $(this).attr("alt");
                    $("#divBorrarCita").fadeIn();
                    $("#preguntaBorrarCita").text("¿Eliminar la cita de "+nombreCita+" del sistema?");
                    
                });
                
                $("#btnEliminarCita").click(function(){
                
                
                   var idCita = $("#"+posCita+"").attr("alt");
        
                   $.post('Controlador', {
                                action: "borrarCita",
                                idCita: idCita
                                
			}, function(responseText) {
                        
                                $("#divBorrarCita").fadeOut();
                                $("#tblcitas #"+posQuitarCita+"").fadeOut();
                        });  
                    
                });
                
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
             $("#completeGuardarCita").fadeOut();
             var tipo = "Guardar";
             var form = "GuardarCitaForm";
             guardarCita(tipo, form);
               
           }
               
            
        });
        
        $("#btnGuardarEditarCita").click(function (){
            
           if ($("#diaEditarCita").val() == ""){
               
               $("#diaEditarCita").focus();
               $("#completeEditarCita").fadeIn();
               
           }else if ($("#mesEditarCita").val() == ""){
               
               $("#mesEditarCita").focus();
               $("#completeEditarCita").fadeIn();
               
           }else if ($("#annioEditarCita").val() == ""){
               
               $("#annioEditarCita").focus();
               $("#completeEditarCita").fadeIn();
               
           }else if ($("#horaEditarCita").val() == ""){
               
               $("#horaEditarCita").focus();
               $("#completeEditarCita").fadeIn();
               
           }else if ($("#minutosEditarCita").val() == ""){
               
               $("#minutosEditarCita").focus();
               $("#completeEditarCita").fadeIn();
               
           }else if($("#txtDetallesEditarCita").val() == ""){
               
               $("#txtDetallesEditarCita").focus();
               $("#completeEditarCita").fadeIn();
               
           }else{
             
             $("#completeEditarCita").fadeOut();
             var tipo = "Editar";
             var form = "EditarCitaForm";
             guardarCita(tipo, form);
               
           }
               
            
        });
        
      function guardarCita(tipo, form){
             
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
           
                                     alert(data)
                            
                            if(data.length()==3){
                                
                                $("#"+aviso+"").text("Error al guardar");
                                $("#"+aviso+"").css("color","red");
                                
                            }else{
                                    
                                    $("#"+aviso+"").text("¡Guardada con éxito!");
                                    $("#"+aviso+"").css("color","green");
                                    
                           
                                    cargarTablaCitas();
                                    limpiarFormCitas();
                                }
                                
                                
                                
                            });
                        
                
           }
                

           function limpiarFormCitas(){
               
               $("#contenedorFechaCita input[name = 'diaCita']").val("");
               $("#contenedorFechaCita input[name = 'mesCita']").val("");
               $("#contenedorFechaCita input[name = 'annioCita']").val("");
               $("#ContenedorHoraCita input[name = 'hora']").val("");
               $("#ContenedorHoraCita input[name = 'minutos']").val("");
               $("#txtDetallesCita").text("");
               
               
           }
            
           function cargarTablaCitas(){
               
                     $.post('Controlador', {
                       
                                action: "cargarTablaCitas"
                                
			}, function(responseText) {
                            
                            $("#tblcitas").html(responseText);
                        
                        });
               
           }
           
});


