<%-- 
    Document   : administrador
    Created on : Jun 18, 2015, 6:09:57 PM
    Author     : LuisAntonio
--%>
<%@page import="java.util.ArrayList"%>
<%@page import="java.util.*"%>
<%@page import="Modelo.UsuarioBD"%>
<%@page import="Modelo.Usuario"%>
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
<!DOCTYPE html>
<html>
    <head>
        <title>Sistema de Vacunación</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="viewport" content="width=device-width,initial-scale=1">
        <link rel="shortcut icon" href="images/logo.png">
        <link rel="stylesheet" type="text/css" href="styles/admin.css">
        <link rel="stylesheet" type="text/css" href="styles/animate.css">
        <script type="text/javascript" src="js/jquery-2.1.1.min.js"></script>
         <script type="text/javascript" src="js/admin.js"></script>
       
    </head>
    <body>
               
        <div id="salirDiv" class="FondFrms">
            
            <form role="form" method="post" action="Controlador" id="salirForm">
                
                <h2 id="preguntaSalir">¿<%=nombre%>, realmente desea salir del sistema?</h2>
                
                     <input type="hidden" name="action" value="Logout">
                  
                     <input type="submit" value="Salir" name="btn" id="Salir">
                
                     <input type="button" value="No" name="Nosalir" id="noSalir">
              
             </form>
            
        </div>
          
        <div id="clienteDiv" class="FondFrms">
            
            <form role="form" method="post" action="Controlador" id="clienteForm" onsubmit="return validarFormCliente(this);">
                      <img class="cerrarForm" src="images/close.png">
                <h3 class="titutoFrm">Clientes</h3>
                     
                    <h3 id="VerTodosClientes">+ ver todos</h3>
          
                    <h3>agregar cliente: </h3>
                
                    <input type="hidden" name="action" value="agregarCliente">
                    
                    <input type="text" name="txtNombre" value="" placeholder="Nombre">
                    <input type="text" name="txtApellidos" value="" placeholder="Apellidos">
                    <input type="number" name="txtCedula" value="" placeholder="Cédula" min="1">
                  
                <div id="contenedorFecha">
                    
                    <h3>fecha de nacimiento:</h3>
                    <input class="fechaForm" type="number" name="diaCliente" value="" placeholder="día" id="diaCliente" min="1" max="31">  
                    <input class="fechaForm" type="number" name="mesCliente" value="" placeholder="mes" id="mesCliente" min="1" max="12">
                    <input class="fechaForm" type="number" name="annioCliente" value="" placeholder="año" id="annioCliente" min="1900" max="2200">
                
                </div>
               
                    <input type="email" name="txtEmail" value="" placeholder="Correo">
                    <input type="number" name="txtTelefono" value="" placeholder="Teléfono">
                    <input type="text" name="txtDirecion" value="" placeholder="Dirección">
                    <input type="text" name="txtUsuario" value="" placeholder="Usuario">
                    <input type="text" name="txtContrasenia" value="" placeholder="Contraseña">
             
                    <input type="submit" value="Guardar" class="btnGuardar">
                       <h3 id="complete" class="frmAlertas">Complete todos los campos</h3>
                        <h3 id="existe" class="frmAlertas">Error al guardar, usuario ya existe</h3>
              
             </form>
            
        </div>
            
            <div id="FondoVerTodos">
                
                
                        <div id="borrarForm" class="FondFrms">
            
            <form role="form" method="post" action="Controlador" id="borrarForm">
                
                <h2 id="preguntaBorrar">¿?</h2>
                
                     <input type="hidden" name="action" value="borraCliente">
                  
                     <input type="submit" value="Eliminar" name="btnEliminar" id="btnEliminar">
                
                     <input type="button" value="No" name="NoEliminar" id="btnNoEliminar">
              
             </form>
            
        </div>
                
                
                           <div id="FondoEditarUno" class="FondFrms">
            
                
                           <form role="form" method="post" action="Controlador" id="clienteForm" onsubmit="return validarFormCliente(this);">
                    <img id="cerrarFormEditar" src="images/close.png">
                
                    <h3 class="titutoFrm">Editar cliente</h3>
                
                    <input type="hidden" name="action" value="agregarCliente">
                    
                    <input type="text" name="txtNombre" value="" placeholder="Nombre">
                    <input type="text" name="txtApellidos" value="" placeholder="Apellidos">
                    <input type="number" name="txtCedula" value="" placeholder="Cédula" min="1">
                  
                    <div id="contenedorFecha">
                    
                <h3>fecha de nacimiento:</h3>
                   <input class="fechaForm" type="number" name="diaCliente" value="" placeholder="día" id="diaCliente" min="1" max="31">  
                    <input class="fechaForm" type="number" name="mesCliente" value="" placeholder="mes" id="mesCliente" min="1" max="12">
                   <input class="fechaForm" type="number" name="annioCliente" value="" placeholder="año" id="annioCliente" min="1900" max="2200">
                       
                    </div>
                   
                
                    <input type="email" name="txtEmail" value="" placeholder="Correo">
                    <input type="number" name="txtTelefono" value="" placeholder="Teléfono">
                    <input type="text" name="txtDirecion" value="" placeholder="Dirección">
                    <input type="text" name="txtUsuario" value="" placeholder="Usuario">
                    <input type="text" name="txtContrasenia" value="" placeholder="Contraseña">
                               
                <div class="DivSlEditCliente">
                    
                    <p class="pSlEditCliente">Rol:</p>
                    <select name="slRol"  class="SlEditCliente">
            
            <option value="administrador">Administrador</option>
            <option value="cliente">Cliente</option>
        
                    </select>
                               
                  </div>                 
                    
                     <div class="DivSlEditCliente">           
                   
                         <p class="pSlEditCliente">Estado:</p>
                        <select name="slActivo" class="SlEditCliente">

                <option value="1">activado</option>
                <option value="0">desactivado</option>

                        </select>
                    
                    </div>
                    
                    <input type="submit" value="Guardar" class="btnGuardar">
                       <h3 id="complete" class="frmAlertas">Complete todos los campos</h3>
                        <h3 id="existe" class="frmAlertas">Error al guardar, usuario ya existe</h3>
              
             </form> 
               
            
            </div>
                
            
                <img class="cerrarForm" src="images/close.png">
                
                <h1 id="tituloVerTodos">Clientes</h1>
                
                <h2 id="btnVolverAgregar">+ agregar clientes</h2>
                            
                <br>
                <table border="1" style="margin: 0 auto;">
                <tr>
                    <td class="columna"><b>cédula</b></td>
                    <td class="columna"><b>nombre</b></td>
                    <td class="columna"><b>usuario</b></td>
                    <td class="columna"><b>contraseña</b></td>
                    <td class="columna"><b>dirección</b></td>
                    <td class="columna"><b>nacimiento</b></td>
                    <td class="columna"><b>estado</b></td>
                    <td class="columna"><b>correo</b></td>
                    <td class="columna"><b>teléfono</b></td>
                    <td class="columna"><b>opciones</b></td>
                </tr>
                <%-- Lista de todos los productos --%>
                <%
                            ArrayList<Usuario> lista = UsuarioBD.cargarClientes();
                         
                     for (Usuario User : lista) {
                         String activoS = "";
                                if(User.getActivo()==1){
                                    activoS = "activado";
                                }else{ 
                                    activoS = "desactivado";
                                }
                %>
                <tr>
                    <td><%= User.getCedula()%></td>
                    <td><%= User.getNombre()+" "+User.getApellidos()%></td>
                    <td><%= User.getUsuario() %></td>
                    <td><%= User.getContrasenia()%></td>
                    <td><%= User.getDireccion()%></td>
                    <td><%= User.getFechaNacimiento()%></td>
                    <td><%= activoS%></td>
                    <td><%= User.getCorreo()%></td>
                    <td><%= User.getTelefono()%></td>
                    <%-- Enlaces a las paginas de actualizar o eliminar--%>
                    <td>
                        <a><img src="images/edit.png" id="btnEditar" class="btnOpciones" alt="<%= User.getId()%>"></a>
                        
                        <a><img src="images/delete.png" id="btnBorrar" class="btnOpciones" alt="<%= User.getNombre()+" "+User.getApellidos()%>"></a>
                    </td>
                </tr>
                <%
                            }
                %>

            </table>
            
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
            
            <button class="btnsMenu" id="btnAbrirClientes">Clientes +</button>
            <button class="btnsMenu" id="btnAbrirVacunas">Vacunas +</button>
            <button class="btnsMenu" id="btnAbrirCitas">Citas +</button>
            
            
            
            
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
            <h1 class="titulos" id="tituloInferior">Control de vacunación<img src="images/logo.png" id="iconvacuna"></h1>
          
        </footer>
    </body>
</html>