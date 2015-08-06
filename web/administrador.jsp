<%-- 
    Document   : Administrador
    Created on : Jun 18, 2015, 6:09:57 PM
    Author     : LuisAntonio
--%>
<%@page import="Modelo.CitaBD"%>
<%@page import="Modelo.Cita"%>
<%@page import="Modelo.VacunasBD"%>
<%@page import="Modelo.Vacunas"%>
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
        <script type="text/javascript" src="js/cliente.js"></script>
        <script type="text/javascript" src="js/vacuna.js"></script>
        <script type="text/javascript" src="js/citas.js"></script>
    </head>
    <body>
               
        <div id="salirDiv" class="FondFrms">
            
            <form role="form" method="post" action="Controlador" id="salirForm" class="formSiNo">
                
                <h2 id="preguntaSalir" class="preguntaSINO">¿<%=nombre%>, realmente desea salir del sistema?</h2>
                
                     <input type="hidden" name="action" value="Logout">
                  
                     <input class="btnPositivo" type="submit" value="Salir" name="btn" id="Salir">
                
                     <input class="btnNegativo" type="button" value="No" name="Nosalir" id="noSalir">
              
             </form>
            
        </div>
            
            <!--************CLIENTES**********************-->
            
            <div class="divEntidades" id="divCliente">
                  
                <img class="cerrarForm cerrarDivsEntidades" src="images/close.png" id="cerrarDivCliente">
                  
                  
                  <div id="divVerClienteInfo" class="FondFrms">
                
                    <div id="contenedorInfo">
                        
                        <img class="btnEditDos" src="images/edit.png">
                        
                        <img class="cerrarForm" src="images/close.png" id="cerrarDivCliente">
                        
                        <br>
                        
                        <h3 class="titutoInfo" id="tituloInfoCliente"></h3>
                        
                    <table border="0">
                     
                        <tr>
                            <td><b>Cédula:</b></td><b><td id="tdCedulaCliente"></td></b>
                        </tr>
                        <tr>
                            <td><b>Nacimiento: </b></td><td id="tdNacimientoCliente"></td>
                        </tr>
                        <tr>
                            <td><b>Correo: </b></td><td id="tdCorreoCliente"></td>
                        </tr>
                        <tr>
                            <td><b>Dirección: </b></td><td id="tdDireccionCliente"></td>
                        </tr>
                        <tr>
                            <td><b>Teléfono:</b> </td><td id="tdTelefonoCliente"></td>
                        </tr>
                        <tr>
                            <td><b>Usuario:</b> </td><td id="tdUsuarioCliente"></td>
                        </tr>
                        <tr>
                            <td><b>Contraseña: </b></td><td id="tdContrasenaCliente"></td>
                        </tr>
                        <tr>
                            <td><b>Activo: </b></td><td id="tdEstadoCliente"></td>
                        </tr>
                        <tr>
                            <td><b>Rol: </b></td><td id="tdRolCliente"></td>
                        </tr>
                    
                    </table>
                
                    </div>
                    
                </div>
            
                <div id="divAgregarCliente" class="FondFrms">
                    
                    <!--######################Agregar clientes##################################-->
                
                    <form role="form" method="post" id="GuardarClienteForm" class="clienteForm" onsubmit="return validarFormCliente(this)">
                     
                    <img class="cerrarForm" src="images/close.png">
          
                     <h3 class="titutoFrm">Agregar cliente</h3>
                
                    <input type="hidden" name="action" value="agregarCliente">
                    
                    <input type="text" name="txtNombre" value="" placeholder="Nombre">
                    <input type="text" name="txtApellidos" value="" placeholder="Apellidos">
                    <input type="number" name="txtCedula" value="" placeholder="Cédula" min="1">
                  
                    <div class="contenedorFecha">
                    
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
             
                    <input type="button" value="Guardar" class="btnGuardar" id="btnGuardarCliente">
                       <h3 id="completeGuardar" class="frmAlertas">Complete todos los campos</h3>
                        <h3 id="avisoAjaxGuardar" class="frmAlertas">Guardando cliente...</h3>
              
             </form>
                
                    
                
                </div>
                
                <!--############# Editar cliente ##################-->
                
                <div id="divEditarCliente" class="FondFrms">
                
                    <form role="form" method="post" id="FormEditarCliente" class="clienteForm">
                   
                    <img class="cerrarForm" src="images/close.png">
                
                    <h3 class="titutoFrm">Editar cliente</h3>
                
                    <input type="hidden" name="action" value="editarCliente">
                    <input type="hidden" name="txtIdUsuario" value="">
                    <input type="hidden" name="txtOldUser" value="">
                    
                    <input type="text" name="txtNombre" value="" placeholder="Nombre">
                    <input type="text" name="txtApellidos" value="" placeholder="Apellidos">
                    <input type="number" name="txtCedula" value="" placeholder="Cédula" min="1">
                  
                    <div class="contenedorFecha" class="fechaEditarCliente">
                    
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
                   
                    <select name="slRol"  class="SlEditCliente selectRol">

                    <option value="cliente">cliente</option>
                    <option value="administrador">administrador</option>
        
                    </select>
                               
                  </div>                 
                    
                  <div class="DivSlEditCliente">           
                   
                         <p class="pSlEditCliente">Estado:</p>
                       
                        <select name="slActivo" class="SlEditCliente selectEstado">

                        <option value="1">activado</option>
                        <option value="0">desactivado</option>

                        </select>
                    
                  </div>
                    
                    <input type="button" value="Guardar" class="btnGuardar" id="btnGuardarEditarCliente">
                        
                        <h3 id="completeEditar" class="frmAlertas">Complete todos los campos</h3>
                        <h3 id="avisoAjaxEditar" class="frmAlertas">Guardando cliente...</h3>
              
                    </form> 
                
                </div>
                
                <div id="divBorrarCliente" class="FondFrms">
            
                <form role="form" method="post" action="Controlador" id="borrarForm" class="formSiNo">

                    <h2 id="preguntaBorrar">¿?</h2>

                        

                         <input type="button" value="Sí" name="btnEliminar" id="btnEliminar" class="btnPositivo">

                         <input type="button" value="No" name="NoEliminar" id="btnNoEliminar" class="btnNegativo">

                 </form>
            
                </div>
                
                <h1 id="tituloVerTodos">Clientes</h1>
                
                <h2 id="btnAgregarClientes" class="btnAgregarEntidades">+ agregar clientes</h2>
                            
                <br>
                
                <table border="1" style="margin: 0 auto;" id="tblClientes">
                <tr>
                     <td class="columna"><b>Cédula</b></td>
                    <td class="columna"><b>Nombre</b></td>
                    <td class="columna"><b>Dirección</b></td>
                    <td class="columna"><b>Estado</b></td>
                    <td class="columna"><b>Opciones</b></td>
                </tr>
                
                <%
                            ArrayList<Usuario> lista = UsuarioBD.cargarClientes();
                           int conteo = 1;
                     for (Usuario User : lista) {
                         String activoS = "";
                                if(User.getActivo()==1){
                                    activoS = "activado";
                                }else{ 
                                    activoS = "desactivado";
                                }
                %>
                <tr id="tr<%=conteo%>">
                    <td><%= User.getCedula()%></td>
                    <td><%= User.getNombre()+" "+User.getApellidos()%></td>
                    <td><%= User.getDireccion()%></td>
                    <td><%= activoS%></td>
                    <%-- Enlaces a las paginas de actualizar o eliminar--%>
                    <td>
                        
                        <a><img src="images/infoIcon.png" class="btnOpciones btnVerInfoCliente" role="<%=conteo%>"></a>
                        
                        <a><img src="images/edit.png" class="btnOpciones btnEditar" role="<%=conteo%>"></a>
                        
                        <a><img src="images/delete.png" class="btnOpciones btnBorrar" alt="<%= User.getNombre()+" "+User.getApellidos()%>" role="<%=conteo%>"></a>
                        
                        <input type="hidden" alt="<%= User.getId()%>" id="idUser<%=conteo%>">
                        
                        <input type="hidden" alt="<%= User.getCedula()%>" id="cedulaUser<%=conteo%>">
                        
                        <input type="hidden" alt="<%= User.getNombre()%>" id="nombreUser<%=conteo%>">
                        
                        <input type="hidden" alt="<%= User.getApellidos()%>" id="apellidosUser<%=conteo%>">
                        
                        <input type="hidden" alt="<%= User.getUsuario()%>" id="usuarioUser<%=conteo%>">
                        
                        <input type="hidden" alt="<%= User.getContrasenia()%>" id="contraseniaUser<%=conteo%>">
                        
                        <input type="hidden" alt="<%= User.getCorreo()%>" id="correoUser<%=conteo%>">
                        
                        <input type="hidden" alt="<%= User.getDireccion()%>" id="direccionUser<%=conteo%>">
                        
                        <input type="hidden" alt="<%= User.getFechaNacimiento()%>" id="fechaNacimientoUser<%=conteo%>">
                        
                        <input type="hidden" alt="<%= activoS%>" id="activoUser<%=conteo%>">
                        
                        <input type="hidden" alt="<%= User.getRol()%>" id="rolUser<%=conteo%>">
                        
                        <input type="hidden" alt="<%= User.getTelefono()%>" id="telefonoUser<%=conteo%>">
                        
                    </td>
                    
                </tr>
                <%
                      conteo++;     }
                %>
            </table>
            
            </div>
            
            <!--************VACUNAS**********************-->
            
            <div class="divEntidades" id="divVacunas">
                  
                <img class="cerrarForm cerrarDivsEntidades" src="images/close.png" id="cerrarDivCliente">
                
                <!--*****Borrar vacunas******-->
                
                                
                <div id="divBorrarVacuna" class="FondFrms">
            
                <form role="form" method="post" action="Controlador" id="borrarForm" class="formSiNo">

                    <h2 id="preguntaBorrarVacuna">¿?</h2>

                        

                         <input type="button" value="Sí" name="btnEliminar" id="btnEliminarVacuna" class="btnPositivo">

                         <input type="button" value="No" name="NoEliminar" id="btnNoEliminarVacuna" class="btnNegativo">

                 </form>
            
                </div>
                
                <!--############# Editar vacunas ##################-->
                
                <div id="divEditarVacuna" class="FondFrms">
                
                    <form role="form" method="post" id="FormEditarVacuna" class="clienteForm">
                   
                    <img class="cerrarForm" src="images/close.png">
                
                    <h3 class="titutoFrm">Editar vacuna</h3>
                
                    <input type="hidden" name="action" value="editarVacuna">
                    
                    <input type="hidden" name="txtIdVacuna" value="">
                    <input type="hidden" name="txtOldNameVacuna" value="">
                    
                    <input type="text" name="txtNombreVacuna" value="" placeholder="Nombre">
                    <input type="text" name="txtDescripcionVacuna" value="" placeholder="Descripción">
                    <input type="text" name="txtTipoVacuna" value="" placeholder="Tipo">

                  <div class="DivSlEditCliente">           
                   
                         <p class="pSlEditCliente">Estado:</p>
                       
                        <select name="slActivoVacuna" class="SlEditCliente selectEstadoVacuna">

                        <option value="1">activada</option>
                        <option value="0">desactivada</option>

                        </select>
                    
                  </div>
                    
                    <input type="button" value="Guardar" class="btnGuardar" id="btnGuardarEditarVacuna">
                        
                        <h3 id="completeEditarVacunas" class="frmAlertas">Complete todos los campos</h3>
                        <h3 id="avisoAjaxVacunasEditar" class="frmAlertas">Guardando vacuna...</h3>
              
                    </form> 
                
                </div>
                
                
                <!--*********Agregar vacunas**************-->
                
                  <div id="divAgregarVacuna" class="FondFrms">
                
                    <form role="form" method="post" id="GuardarVacunaForm" class="clienteForm">
                     
                    <img class="cerrarForm" src="images/close.png">
          
                     <h3 class="titutoFrm">Agregar vacuna</h3>
                
                    <input type="hidden" name="action" value="agregarVacuna">
                    
                    <input type="text" name="txtNombreVacuna" value="" placeholder="Nombre">
                    <input type="text" name="txtDescripcionVacuna" value="" placeholder="Descripción">
                    <input type="text" name="txtTipoVacuna" value="" placeholder="Tipo">
                  
                     <input type="button" value="Guardar" class="btnGuardar" id="btnGuardarVacuna">
                    
                       <h3 id="completeGuardarVacunas" class="frmAlertas">Complete todos los campos</h3>
                        <h3 id="avisoAjaxVacunasGuardar" class="frmAlertas">Guardando vacuna...</h3>
              
             </form>
                
                    
                
                </div>
                
                
                <!--**************Ver info de las vacunas*************-->
                
                  <div id="divVerVacunaInfo" class="FondFrms">
                
                    <div id="contenedorInfo">
                        
                        <img class="btnEditDos" src="images/edit.png">
                        
                        <img class="cerrarForm" src="images/close.png" id="cerrarDivVacunas">
                        
                        <br>
                        
                        <h3 class="titutoInfo" id="tituloInfoVacuna"></h3>
                        
                    <table border="0">
                     
                        <tr>
                            <td><b>Descripción:</b></td><b><td id="tdDescripcionVacuna"></td></b>
                        </tr>
                        <tr>
                            <td><b>Tipo: </b></td><td id="tdTipoVacuna"></td>
                        </tr>
                        <tr>
                            <td><b>Estado: </b></td><td id="tdEstadoVacuna"></td>
                        </tr>
                        
                    </table>
                
                    </div>
                    
                </div>
                
                <!--TBLVACUNAS*************************************************************-->
                
                 <h1 id="tituloVerTodos">Vacunas</h1>
                
                 <h2 id="btnAgregarVacunas" class="btnAgregarEntidades">+ agregar vacunas</h2>
                            
                <br>
                
                <table border="1" style="margin: 0 auto;" id="tblVacunas">
                <tr>
                    <td class="columna"><b>Nombre</b></td>
                    <td class="columna"><b>Tipo</b></td>
                    <td class="columna"><b>Estado</b></td>
                    <td class="columna"><b>Opciones</b></td>
                </tr>
                
                <%
                     ArrayList<Vacunas> listaVacunas = VacunasBD.cargarVacunas();
                           int conteoVacunas = 1;
                     for (Vacunas vacuna : listaVacunas) {
                         String activoVacuna = "";
                                if(vacuna.getActivoVacuna()==1){
                                    activoVacuna = "activada";
                                }else{ 
                                    activoVacuna = "desactivada";
                                }
                %>
                <tr id="trVacuna<%=conteoVacunas%>">
                    <td><%= vacuna.getNombreVacuna()%></td>
                    <td><%= vacuna.getTipoVacuna()%></td>
                    <td><%= activoVacuna%></td>
                    <%-- Enlaces a las paginas de actualizar o eliminar--%>
                    <td>
                        
                        <a><img src="images/infoIcon.png" class="btnOpciones btnVerInfoVacunas" role="<%=conteoVacunas%>"></a>
                        
                        <a><img src="images/edit.png" class="btnOpciones btnEditar" role="<%=conteoVacunas%>"></a>
                        
                        <a><img src="images/delete.png" class="btnOpciones btnBorrar" alt="<%= vacuna.getNombreVacuna()%>" role="<%=conteoVacunas%>"></a>
                        
                        <input type="hidden" alt="<%= vacuna.getIdVacunas()%>" id="idVacunas<%=conteoVacunas%>">
                        
                        <input type="hidden" alt="<%= vacuna.getNombreVacuna()%>" id="nombreVacuna<%=conteoVacunas%>">
                        
                        <input type="hidden" alt="<%= vacuna.getDescripcionVacuna()%>" id="descripcionVacuna<%=conteoVacunas%>">
                        
                        <input type="hidden" alt="<%= vacuna.getTipoVacuna()%>" id="tipoVacuna<%=conteoVacunas%>">
                        
                        <input type="hidden" alt="<%= activoVacuna%>" id="estadoVacuna<%=conteoVacunas%>">
                        
                    </td>
                    
                </tr>
                <%
                      conteoVacunas++;     }
                %>

            </table>
                
            </div>
            
        <header>
            <h2 id="btnCitas">Citas<img src="images/citas.png" id="citasicon"></h2>
             
            <h1 class="titulos" id="titulo">Próximas citas</h1>
          
            <form method="post" action="Controlador" id="frmBuscar">
            <input type="hidden" name="action" value="Buscar" />
            <input type="text" name="txtBuscar" value="" id="txtBuscar" placeholder="Buscar">
                <input type="button" value="" name="btnBuscar" id="btnBuscar">   
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
            
            <div id="contenedorBtnConfAdmin">
      
                <div id="btnConfAdmin">

                    <img src="images/adminConfIcon.png">
                    <h3>Mi perfil</h3>

                </div>
                
            </div>
            
            
        </div>
        
        </div>

        <section>
                
            <table id="tblcitas" border="0px">
            
                                <%
                     ArrayList<Cita> listaCitas = CitaBD.cargarCitas();
                           int conteoCitas = 1;
                           int conteoImgs = 1;
                           
                           
                           
                           
                     for (Cita cita : listaCitas) {
                         String completada = "";
                         
                                
                            if(conteoImgs == 3){
                               conteoImgs = 1;
                           }
                         
                                if(cita.getCompletada()==0){
                           
                %>
                <tr id="trCita<%=conteoCitas%>">
                    
                    <td><img src="images/citas<%=conteoImgs+".png"%>" class="imgsCitas btnVerInfoCitas" role="<%=conteoCitas%>"></td>
                    
                    <td>Fecha: <%= cita.getFechaCita()%></td>
                    <td>Hora: <%= cita.getHoraCita()%></td>
                    <td>Vacuna: <%= cita.getNombreVacunaCita()%></td>
                    <td>Paciente: <%= cita.getNombreClienteCita()%></td>
                    <td>Lugar: <%= cita.getLugarCita()%></td>
                    
                    <%-- Enlaces a las paginas de actualizar o eliminar--%>
                    <td>
                        
                        <a><img src="images/edit.png" class="btnOpciones btnEditar btnOpcionesCitas" role="<%=conteoCitas%>"></a>
                        
                        <a><img src="images/delete.png" class="btnOpciones btnBorrar btnOpcionesCitas" alt="<%= cita.getNombreClienteCita()%>" role="<%=conteoCitas%>"></a>
                        
                        
                        <input type="hidden" alt="<%= cita.getIdCita()%>" id="idCitas<%=conteoCitas%>">
                        
                        <input type="hidden" alt="<%= cita.getFechaCita()%>" id="fechaCita<%=conteoCitas%>">
                        
                        <input type="hidden" alt="<%= cita.getNombreClienteCita()%>" id="nombreClienteCita<%=conteoCitas%>">
                        
                        <input type="hidden" alt="<%= cita.getIdUsuario()%>" id="idUsuarioCitas<%=conteoCitas%>">
                        
                        <input type="hidden" alt="<%= cita.getIdVacuna()%>" id="idVacunaCitas<%=conteoCitas%>">
                        
                        <input type="hidden" alt="<%= cita.getDetallesCita()%>" id="detallesCita<%=conteoCitas%>">
                        
                        <input type="hidden" alt="<%= cita.getCompletada()%>" id="completada<%=conteoCitas%>">
                        
                        <input type="hidden" alt="<%= cita.getHoraCita()%>" id="horaCita<%=conteoCitas%>">
                        
                        <input type="hidden" alt="<%= cita.getNombreVacunaCita()%>" id="nombreVacunaCita<%=conteoCitas%>">
                        
                        <input type="hidden" alt="<%= cita.getLugarCita()%>" id="lugarCita<%=conteoCitas%>">
                        
                    </td>
                    
                </tr>
                <%
                                } 
                                
                                conteoCitas++;
                                conteoImgs++;
                     
                     }
                %>
                
            </table>
                
                
        </section>
                
                
                  <div id="divInfoCitas" class="FondFrms">
               
                    <div id="contenedorInfo">
                        
                        <img class="cerrarForm" src="images/close.png" id="cerrarDivVacunas">
                        
                        <br>
                        
                        <h3 class="titutoInfo" id="tituloInfoCitas"></h3>
                        
                    <table border="0">
                     
                        <tr>
                            <td><b>Fecha:</b></td><b><td id="tdFechaCita"></td></b>
                        </tr>
                        <tr>
                            <td><b>Hora: </b></td><td id="tdHoraCita"></td>
                        </tr>
                        <tr>
                            <td><b>Detalle: </b></td><td id="tdDetalleCita"></td>
                        </tr>
                        <tr>
                            <td><b>Completada: </b></td><td id="tdCompletada"></td>
                        </tr>
                         <tr>
                            <td><b>Paciente: </b></td><td id="tdPacienteCita"></td>
                        </tr>
                         <tr>
                            <td><b>Lugar: </b></td><td id="tdLugarCita"></td>
                        </tr>
                         <tr>
                            <td><b>Vacuna: </b></td><td id="tdVacunaCita"></td>
                        </tr>
                        
                        
                    </table>
                
                    </div>
                    
                </div>
                
                
                <!--**************Editar Citas**********************-->
                
                <div class="FondFrms" id="divEditarCita">
            
                <form role="form" method="post" id="EditarCitaForm" class="clienteForm">
                     
                     <input type="hidden" name="action" value="editarCita">
                     <input type="hidden" name="idCita" value="">
                    
                    <img class="cerrarForm" src="images/close.png">
          
                     <h3 class="titutoFrm">Editar cita</h3>
                  
                    <div id="contenedorFechaEditarCita" class="contenedorFecha">
                    
                        <h3>fecha de la cita:</h3>
                            <input class="fechaForm" type="number" name="diaCita" value="" placeholder="día" id="diaEditarCita" min="1" max="31">  
                            <input class="fechaForm" type="number" name="mesCita" value="" placeholder="mes" id="mesEditarCita" min="1" max="12">
                            <input class="fechaForm" type="number" name="annioCita" value="" placeholder="año" id="annioEditarCita" min="1900" max="2200">

                    </div>
                    
                    <div id="ContenedorHoraEditarCita" class="contenedorFecha">
                    <br>
                        <h3>Hora de la cita:</h3>
                            <input class="fechaForm" type="number" name="hora" value="" placeholder="hora" id="horaEditarCita" min="1" max="12">
                            <input class="fechaForm" type="number" name="minutos" value="" placeholder="minutos" id="minutosEditarCita" min="1" max="59">
                            
                            <select name="slAmPmCita" id="AmPmEditarCita" class="selectCitas">
                                <option value="am">am</option>
                                <option value="pm">pm</option>
                        </select>
                            
                    </div>
                    <br>
                    <h3>Descripción:</h3>
                    
                    <textarea name="txtDetallesEditarCita" class="txtAreaCitas" id="txtDetallesEditarcita"></textarea>
                    
                <div class="DivSlEditCliente">
                    
                    <p class="pSlEditCliente">Cliente:</p>
                   
                        <select name="slClienteEditarCita"  class="SlEditCliente" id="clienteEditarCita">

                         <option value="123421">Cargando..</option>

                        </select>
                               
                  </div>   
                    
                    
                <div class="DivSlEditCliente">
                    
                    <p class="pSlEditCliente">Vacuna:</p>
                   
                        <select name="slVacunaEditarCita"  class="SlEditCliente" id="vacunaEditarCita">

                        <option value="123421">Cargando..</option>

                        </select>
                               
                  </div>
                    
                    <div class="DivSlEditCliente">
                    
                    <p class="pSlEditCliente">Estado:</p>
                   
                        <select name="slCompletada"  class="SlEditCliente" id="completadaEditarCita">

                        <option value="1">Completada</option>
                        <option value="0">Sin completar</option>

                        </select>
                               
                  </div>
                    
                    <input type="button" value="Guardar" class="btnGuardar" id="btnGuardarEditarCita">
                    
                       <h3 id="completeEditarCita" class="frmAlertas">Complete todos los campos</h3>
                        <h3 id="avisoAjaxEditarCita" class="frmAlertas">Guardando cita...</h3>
              
                </form>
            
            </div>
        
                <!--****************Agregar citas****************-->
                
                <div class="FondFrms" id="divAgregarCita">
            
                <form role="form" method="post" id="GuardarCitaForm" class="clienteForm">
                     
                     <input type="hidden" name="action" value="guardarCita">
                    
                    <img class="cerrarForm" src="images/close.png">
          
                     <h3 class="titutoFrm">Agregar cita</h3>
                  
                    <div id="contenedorFechaCita" class="contenedorFecha">
                    
                        <h3>fecha de la cita:</h3>
                            <input class="fechaForm" type="number" name="diaCita" value="" placeholder="día" id="diaCita" min="1" max="31">  
                            <input class="fechaForm" type="number" name="mesCita" value="" placeholder="mes" id="mesCita" min="1" max="12">
                            <input class="fechaForm" type="number" name="annioCita" value="" placeholder="año" id="annioCita" min="1900" max="2200">

                    </div>
                    
                    <div id="ContenedorHoraCita" class="contenedorFecha">
                    <br>
                        <h3>Hora de la cita:</h3>
                            <input class="fechaForm" type="number" name="hora" value="" placeholder="hora" id="horaCita" min="1" max="12">
                            <input class="fechaForm" type="number" name="minutos" value="" placeholder="minutos" id="minutosCita" min="1" max="59">
                            
                            <select name="slAmPmCita" id="AmPmCita" class="selectCitas">
                                <option value="am">am</option>
                                <option value="pm">pm</option>
                        </select>
                    </div>
                    <br>
                    <h3>Descripción:</h3>
                    <textarea name="txtDetallesCita" class="txtAreaCitas" id="txtGuardarCita"></textarea>
                    
                <div class="DivSlEditCliente">
                    
                    <p class="pSlEditCliente">Cliente:</p>
                   
                        <select name="slClienteCita"  class="SlEditCliente" id="clienteGuardarCita">

                        <option value="123421">Cargando..</option>

                        </select>
                               
                  </div>   
                    
                    
                <div class="DivSlEditCliente">
                    
                    <p class="pSlEditCliente">Vacuna:</p>
                   
                        <select name="slVacunaCita"  class="SlEditCliente" id="vacunaGuardarCita">

                        <option value="123421">Cargando..</option>

                        </select>
                               
                  </div>
                    
                    <input type="button" value="Guardar" class="btnGuardar" id="btnGuardarCita">
                    
                       <h3 id="completeGuardarCita" class="frmAlertas">Complete todos los campos</h3>
                        <h3 id="avisoAjaxGuardarCita" class="frmAlertas">Guardando cita...</h3>
              
                </form>
            
            </div>
                
                 <div id="divBorrarCita" class="FondFrms">
            
                <form role="form" method="post" action="Controlador" class="formSiNo">

                    <h2 id="preguntaBorrarCita">¿?</h2>

                        

                         <input type="button" value="Sí" name="btnEliminar" id="btnEliminarCita" class="btnPositivo">

                         <input type="button" value="No" name="NoEliminar" class="btnNegativo">

                 </form>
            
                </div>
                
        <footer>
            <h2 id="nombreUsuario">Bienvenido, <%=nombre%></h2>
                    
            <div id="btnSalir">
                        <img src="images/off.png" id="btnLogout">
                       
                   </div>
            <h1 class="titulos" id="tituloInferior">Control de vacunación <img src="images/logo.png" id="iconvacuna"></h1>
          
        </footer>
    </body>
</html>
