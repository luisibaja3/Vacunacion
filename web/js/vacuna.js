$(document).ready(function(){
    
                $("#btnAbrirVacunas").click(function() {
                   $("#divVacunas").fadeIn();
                });
                
                
                //#####Abrir info de las vacunas
                
                //Abrir toda la información del cliente
                
                posVacuna = "";
                
                 $('#tblVacunas').on('click', '.btnVerInfoVacunas', function(){
                     
                     posVacuna = $(this).attr("role");
                     
                        $("#tituloInfoVacuna").text($("#"+"nombreVacuna"+posVacuna+"").attr("alt"));
                     
                        $("#tdDescripcionVacuna").text($("#"+"descripcionVacuna"+posVacuna+"").attr("alt"));
                        $("#tdTipoVacuna").text($("#"+"tipoVacuna"+posVacuna+"").attr("alt"));
                        $("#tdEstadoVacuna").text($("#"+"estadoVacuna"+posVacuna+"").attr("alt"));
                      
                     $("#divVerVacunaInfo").fadeIn();
                     
                     
                 });
    
});
