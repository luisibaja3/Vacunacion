$(document).ready(function () {
                
                //captura de la tecla esc para cerrar varios divs
                $(document).bind('keydown',function(e){
                    if ( e.which == 27 ) {
                               ocultarMenu();
                               cerrarDivsCRUDE();
                                
                        };
                });
                
                //Funciones para cerrar forms
                $("#btnLogout").click(function() {
                   $("#salirDiv").fadeIn();
                });
                
                $(".cerrarDivsEntidades").click(function(){
                    $(".divEntidades").fadeOut();
                })
                
                $("#btnNoEliminar").click(function(){
                      cerrarDivsCRUDE();
                });
    
                    
                $(".cerrarForm").click(cerrarDivsCRUDE);

                function cerrarDivsCRUDE(){
                    $(".FondFrms").fadeOut();                    
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
    
});