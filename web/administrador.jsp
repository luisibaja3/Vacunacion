<%-- 
    Document   : administrador
    Created on : Jun 18, 2015, 6:09:57 PM
    Author     : LuisAntonio
--%>

<%@page import="javax.swing.JOptionPane"%>
<%@page import="java.io.IOException"%>
<%@page import="java.lang.String"%>
<%@page import="javax.servlet.http.HttpSession"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<%
    
    String usuario = (String) session.getAttribute("usuario");
    String nombre = (String) session.getAttribute("nombre");
    String correo = (String) session.getAttribute("correo");        
    String rol = (String) session.getAttribute("rol");
    
    if(!rol.equals("administrador")){
       if(rol.equals("cliente")){
           response.sendRedirect("cliente.jsp");
       }else{
           response.sendRedirect("index.jsp");
        }
    } 
 
%>
<html>
    <head>
        <title>Sistema de Vacunación</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="viewport" content="width=device-width,initial-scale=1">
        <link rel="shortcut icon" href="images/logo.png">
        <link rel="stylesheet" type="text/css" href="styles/admin.css">
        <link rel="stylesheet" type="text/css" href="styles/animate.css">
        <script type="text/javascript" src="js/jquery-2.1.1.min.js"></script>
        <script type="text/javascript">
            
            $(document).ready(function () {  
                
                //captura de la tecla esc para cerrar varios divs
                $(document).bind('keydown',function(e){
                    if ( e.which == 27 ) {
                               ocultarMenu();
                        cerrarDivSalir();
                        };
                });
                
                //Funciones para el form de cerrar sesion
                $("#btnLogout").click(function() {
                   $("#salirDiv").fadeIn();
                });
            
                $("#noSalir").click(cerrarDivSalir);    
                $("#salirDiv").click(cerrarDivSalir);    
                
                function cerrarDivSalir(){
                
                    $("#salirDiv").fadeOut();
                    
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
            
        </script>
    </head>
    <body>
               
        <div id="salirDiv">
            
            <form role="form" method="post" action="Controlador" id="salirForm">
                
                <h2 id="preguntaSalir">¿<%=nombre%>, realmente desea salir del sistema?</h2>
                
                     <input type="hidden" name="action" value="Logout">
                  
                     <input type="submit" value="Salir" name="btn" id="Salir">
                
                     <input type="button" value="No" name="Nosalir" id="noSalir">
              
             </form>
            
        </div>
          
        <header>
            <h2 id="btnCitas">Citas<img src="images/citas.png" id="citasicon"></h2>
             
            <h1 class="titulos" id="titulo">Próximas citas</h1>
          
            <form method="post" action="Controlador" id="frmBuscar">
            <input type="hidden" name="action" value="Buscar" />
            <input type="text" name="txtBuscar" value="" id="txtBuscar" placeholder="Buscar">
                <input type="submit" value="" name="btnBuscar" id="btnBuscar">   
                <input type="image" name="imgBuscar" src="images/buscarIcon.png" id="buscaricon">
            </form>
           
            <div id="btnConfiguraciones">
            
                <img src="images/conf.png" id="conficon">
                
            </div> 
        </header>
        <div id="contenedorMenu">
        <div id="PanelMenu" class="menu animated">
            
            <img src="images/ocultarMenu.png" id="ocultarMenu">
                 <h2>Menú de opciones</h2>
            
            <button class="btnsMenu" id="btnConfClientes">Clientes +</button>
            <button class="btnsMenu" id="btnConfVacunas">Vacunas +</button>
            <button class="btnsMenu" id="btnConfCitas">Citas +</button>
            
            
            
            
        </div>
        
        </div>
        <section>
            
            <h1>Su usuario es: <%=usuario%></h1>
            <h2>Correo: <%=correo%></h2>
        </section>
        
        <footer>
            <h2 id="nombreUsuario">Bienvenido, <%=nombre%></h2>
                    
            <div id="btnSalir">
                        <img src="images/off.png" id="btnLogout">
                       
                   </div>
            <h1 class="titulos" id="tituloInferior">Control de vacunación <img src="images/logo.png" id="iconvacuna"></h1>
          
        </footer>
    </body>
</html>