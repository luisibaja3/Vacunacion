/* To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Controlador;

import Modelo.Cita;
import Modelo.CitaBD;
import Modelo.Usuario;
import Modelo.UsuarioBD;
import Modelo.Vacunas;
import Modelo.VacunasBD;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 * @author LuisAntonio
 */
public class Controlador extends HttpServlet {

     //Para controlar peticiones del tipo GET
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }
    //Para controlar peticiones del tipo POST
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }
    //Un metodo que recibe todas las peticiones a si sea GET y POST
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
          request.setCharacterEncoding("UTF-8");
        //La accion se va a guardar en un caja de texto oculto que nos dira que accion
        //debemos hacer
        String accion = request.getParameter("action");
        if (accion.equals("Login")) {
            this.login(request, response);
        }else if (accion.equals("Logout")){
            this.logout(request, response);
        }else if (accion.equals("agregarCliente")){
            this.agregarCliente(request, response);
        }else if(accion.equals("borrarCliente")){
            this.borrarCliente(request, response);
        }else if(accion.equals("editarCliente")){
            this.editarCliente(request, response);
        }if(accion.equals("agregarVacuna")){
            this.agregarVacuna(request, response);
        }else if(accion.equals("borrarVacuna")){
            this.borrarVacuna(request, response);
        }else if(accion.equals("editarVacuna")){
            this.editarVacuna(request, response);
        }else if(accion.equals("cargarOptionsClientes")){
            this.cargarOptionsClientes(request, response);
        }else if(accion.equals("cargarOptionsVacunas")){
            this.cargarOptionsVacunas(request, response);
        }else if(accion.equals("guardarCita")){
            this.guardarCita(request, response);
        }else if(accion.equals("cargarTablaCitas")){
            this.cargarTablaCitas(request, response);
        }

    }
                
    private void login(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
       String usuario = request.getParameter("txtUser");
       String password = request.getParameter("txtPassword");

        Usuario User = UsuarioBD.verificarLogin(usuario, password);
       
        if (User.getActivo() == 1) {
            
            HttpSession session = request.getSession(true);
            
            session.setAttribute("id", User.getId());
            session.setAttribute("nombre", User.getNombre());
            session.setAttribute("apellidos", User.getApellidos());
            session.setAttribute("usuario", User.getUsuario());
            session.setAttribute("correo", User.getCorreo());
            session.setAttribute("rol", User.getRol());
            
            if (User.getRol().equals("administrador")) {
              
                response.sendRedirect("administrador.jsp");
            }else{
                response.sendRedirect("cliente.jsp");
            }
            
        }else {
       
            response.sendRedirect("index.jsp?oh=error");
            
        }   
    }
    
    private void logout(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        HttpSession session = request.getSession(true);
        session.setAttribute("rol", "null");
        response.sendRedirect("index.jsp");
    }
    
    protected void agregarCliente(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException { 
        response.setContentType( "text/html; charset=iso-8859-1" );
        PrintWriter out = response.getWriter();
        
        Usuario cliente = new Usuario();
        String mensaje = "";
        
        
         if(!UsuarioBD.existeUsuario(request.getParameter("txtUsuario")).equals("no")){
            mensaje = "exi"; //ya existe el usuario
        }else{
     
        cliente.setNombre(request.getParameter("txtNombre"));
        cliente.setApellidos(request.getParameter("txtApellidos"));
        cliente.setCedula(Integer.parseInt(request.getParameter("txtCedula")));
        cliente.setFechaNacimiento(request.getParameter("diaCliente")+"/"+request.getParameter("mesCliente")+"/"+request.getParameter("annioCliente"));
        cliente.setCorreo(request.getParameter("txtEmail"));
        cliente.setDireccion(request.getParameter("txtDirecion"));
        cliente.setUsuario(request.getParameter("txtUsuario"));
        cliente.setContrasenia(request.getParameter("txtContrasenia"));
        cliente.setTelefono(Integer.parseInt(request.getParameter("txtTelefono")));
        cliente.setActivo(1);
        cliente.setRol("cliente");
        
            if (UsuarioBD.guardarUsuario(cliente).equals("ok")) {
                 mensaje = cargarTablaCliente();
                 
            }else{
                 mensaje = "er"; //mal
            }   
        }
       
        out.println(mensaje);
     
    }
    
        protected void editarCliente(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException { 
        response.setContentType( "text/html; charset=iso-8859-1" );
        PrintWriter out = response.getWriter();
        
        Usuario cliente = new Usuario();
        String mensaje = "";
        cliente.setId(Integer.parseInt(request.getParameter("txtIdUsuario")));
        cliente.setNombre(request.getParameter("txtNombre"));
        cliente.setApellidos(request.getParameter("txtApellidos"));
        cliente.setCedula(Integer.parseInt(request.getParameter("txtCedula")));
        cliente.setFechaNacimiento(request.getParameter("diaCliente")+"/"+request.getParameter("mesCliente")+"/"+request.getParameter("annioCliente"));
        cliente.setCorreo(request.getParameter("txtEmail"));
        cliente.setDireccion(request.getParameter("txtDirecion"));
        cliente.setUsuario(request.getParameter("txtUsuario"));
        cliente.setContrasenia(request.getParameter("txtContrasenia"));
        cliente.setTelefono(Integer.parseInt(request.getParameter("txtTelefono")));
        cliente.setActivo(1);
        cliente.setRol("cliente");
            
        if (request.getParameter("txtUsuario").equals(request.getParameter("txtOldUser"))) {
                
                 if (UsuarioBD.editarUsuario(cliente).equals("ok")) {
                 mensaje = cargarTablaCliente();
                 
                }else{
                     mensaje = "er"; //mal
                }   
                
            }else{
            
                if(!UsuarioBD.existeUsuario(request.getParameter("txtUsuario")).equals("no")){
                    mensaje = "exi"; //ya existe el usuario
                }else{
        
                    if (UsuarioBD.editarUsuario(cliente).equals("ok")) {
                         mensaje = cargarTablaCliente();

                    }else{
                         mensaje = "er"; //mal
                    }   
                }
                
            }
 
        out.println(mensaje);
        
        }
    
    private void  borrarCliente(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        
        response.setContentType( "text/html; charset=iso-8859-1" );
        PrintWriter out = response.getWriter();
        
        int cedula = Integer.parseInt(request.getParameter("cedulaCliente"));
        
       int estado = UsuarioBD.borrarUsuario(cedula);
        
         out.println(estado);
        
    }
    
    private String cargarTablaCliente(){

        String html = "";
        int conteo = 1;
        ArrayList<Usuario> lista = UsuarioBD.cargarClientes();
        
        html = "<tr><td class='columna'><b>Cédula</b></td><td class='columna'><b>Nombre</b></td><td class='columna'><b>Dirección</b></td><td class='columna'><b>Estado</b></td><td class='columna'><b>Opciones</b></td></tr>";
        
                           
                   for (Usuario User : lista) {
                       
                         String activoS = "";
                         
                                if(User.getActivo()==1){
                                    activoS = "activado";
                                }else{ 
                                    activoS = "desactivado";
                                }
                                
                   html += "<tr id='tr"+conteo+"'><td>"+User.getCedula()+"</td><td>"+User.getNombre()+" "+User.getApellidos()+"</td>";
                   html += "<td>"+User.getDireccion()+"</td>"; 
                   html += "<td>"+activoS+"</td>";
                   html += "<td><a><img src='images/infoIcon.png' class='btnOpciones btnVerInfoCliente' role="+conteo+"></a>";
                   html += "<a><img src='images/edit.png' class='btnOpciones btnEditar' role="+conteo+"></a>";
                   html += "<a><img src='images/delete.png' class='btnOpciones btnBorrar' alt='"+User.getNombre()+" "+User.getApellidos()+"' role="+conteo+"></a>";
                 
                   html += "<input type='hidden' alt="+User.getId()+" id=idUser"+conteo+">";
                   html += "<input type='hidden' alt="+User.getCedula()+" id=cedulaUser"+conteo+">";
                   html += "<input type='hidden' alt="+User.getNombre()+" id=nombreUser"+conteo+">";
                   html += "<input type='hidden' alt="+User.getApellidos()+" id=apellidosUser"+conteo+">";
                   html += "<input type='hidden' alt="+User.getUsuario()+" id=usuarioUser"+conteo+">";
                   html += "<input type='hidden' alt="+User.getContrasenia()+" id=contraseniaUser"+conteo+">";
                   html += "<input type='hidden' alt="+User.getCorreo()+" id=correoUser"+conteo+">";
                   html += "<input type='hidden' alt="+User.getDireccion()+" id=direccionUser"+conteo+">";
                   html += "<input type='hidden' alt="+User.getFechaNacimiento()+" id=fechaNacimientoUser"+conteo+">";
                   html += "<input type='hidden' alt="+activoS+" id='activoUser"+conteo+"'>";
                   html += "<input type='hidden' alt="+User.getRol()+" id=rolUser"+conteo+">";
                   html += "<input type='hidden' alt="+User.getTelefono()+" id=telefonoUser"+conteo+"></td></tr>";
                   
                      conteo++; 
                     }
                
        return html;
    }

    private void agregarVacuna(HttpServletRequest request, HttpServletResponse response) throws IOException {
         response.setContentType( "text/html; charset=iso-8859-1" );
        PrintWriter out = response.getWriter();
        
        Vacunas vacuna = new Vacunas();
        String mensaje = "";
        
        
         if(!VacunasBD.existeVacuna(request.getParameter("txtNombreVacuna")).equals("no")){
            mensaje = "exi"; //ya existe la vacuna
        }else{
     
        vacuna.setNombreVacuna(request.getParameter("txtNombreVacuna"));
        vacuna.setDescripcionVacuna(request.getParameter("txtDescripcionVacuna"));
        vacuna.setTipoVacuna(request.getParameter("txtTipoVacuna"));
        vacuna.setActivoVacuna(1);
        
            if (VacunasBD.guardarVacuna(vacuna).equals("ok")) {
                 mensaje = cargarTablaVacunas();
                 
            }else{
                mensaje = "er"; //mal
               // mensaje = VacunasBD.guardarVacuna(vacuna);
            }   
        }
       
        out.println(mensaje);
    }
    
     private String cargarTablaVacunas(){

        String html = "";
         int conteoVacunas = 1;
        ArrayList<Vacunas> listaVacunas = VacunasBD.cargarVacunas();
        
        html = "<tr><td class='columna'><b>Nombre</b></td><td class='columna'><b>Tipo</b></td><td class='columna'><b>Estado</b></td><td class='columna'><b>Opciones</b></td></tr>";
                
                for (Vacunas vacuna : listaVacunas) {
                         String activoVacuna = "";
                                if(vacuna.getActivoVacuna()==1){
                                    activoVacuna = "activada";
                                }else{ 
                                    activoVacuna = "desactivada";
                                }
                                
                   html += "<tr id='trVacuna"+conteoVacunas+"'> <td>"+vacuna.getNombreVacuna()+"</td><td>"+vacuna.getTipoVacuna()+"</td><td>"+activoVacuna+"</td>";
                   html += "<td><a><img src='images/infoIcon.png' class='btnOpciones btnVerInfoVacunas' role="+conteoVacunas+"></a>";
                   html += "<a><img src='images/edit.png' class='btnOpciones btnEditar' role="+conteoVacunas+"></a>";
                   html += "<a><img src='images/delete.png' class='btnOpciones btnBorrar' alt="+vacuna.getNombreVacuna()+" role="+conteoVacunas+"></a>";
                   
                   html += "<input type='hidden' alt='"+vacuna.getIdVacunas()+"' id=idVacunas"+conteoVacunas+">";
                   html += "<input type='hidden' alt='"+vacuna.getNombreVacuna()+"' id=nombreVacuna"+conteoVacunas+">";
                   html += "<input type='hidden' alt='"+vacuna.getDescripcionVacuna()+"' id=descripcionVacuna"+conteoVacunas+">";
                   html += "<input type='hidden' alt='"+vacuna.getTipoVacuna()+"' id=tipoVacuna"+conteoVacunas+">";
                   html += "<input type='hidden' alt='"+activoVacuna+"' id=estadoVacuna"+conteoVacunas+"></td> </tr>";
                   
                      conteoVacunas++; 
                     }
                
        return html;
    }

    private void borrarVacuna(HttpServletRequest request, HttpServletResponse response) throws IOException {
    
         response.setContentType( "text/html; charset=iso-8859-1" );
        PrintWriter out = response.getWriter();
        
        int idVacuna = Integer.parseInt(request.getParameter("idVacuna"));
        
       int estado = VacunasBD.borrarVacuna(idVacuna);
        
        out.println(estado);
        
    }

    protected void editarVacuna(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException { 
        
        response.setContentType( "text/html; charset=iso-8859-1" );
        PrintWriter out = response.getWriter();
        
        Vacunas vacuna = new Vacunas();
        String mensaje = "";
        
        vacuna.setIdVacunas(Integer.parseInt(request.getParameter("txtIdVacuna")));
        vacuna.setNombreVacuna(request.getParameter("txtNombreVacuna"));
        vacuna.setDescripcionVacuna(request.getParameter("txtDescripcionVacuna"));
        vacuna.setTipoVacuna(request.getParameter("txtTipoVacuna"));
        vacuna.setActivoVacuna(Integer.parseInt(request.getParameter("slActivoVacuna")));
            
        if (request.getParameter("txtNombreVacuna").equals(request.getParameter("txtOldNameVacuna"))) {
                
                 if (VacunasBD.editarVacuna(vacuna).equals("ok")) {
                 mensaje = cargarTablaVacunas();
                 
                }else{
                     mensaje = "er"; //mal
                }   
                
            }else{
            
                if(!VacunasBD.existeVacuna(request.getParameter("txtNombreVacuna")).equals("no")){
                    mensaje = "exi"; //ya existe el usuario
                }else{
        
                    if (VacunasBD.editarVacuna(vacuna).equals("ok")) {
                         mensaje = cargarTablaVacunas();

                    }else{
                         mensaje = "er"; //mal
                    }   
                }
                
            }
 
        out.println(mensaje);
        
        }

    private void cargarOptionsClientes(HttpServletRequest request, HttpServletResponse response) throws IOException {
    
        response.setContentType( "text/html; charset=iso-8859-1" );
        PrintWriter out = response.getWriter();
        
        String html = "";
        ArrayList<Usuario> lista = UsuarioBD.cargarClientes();
        
        html = "";
                for (Usuario user : lista) {
                    
                                if(user.getActivo()==1){
                              
                                       html+="<option value="+user.getId()+">"+user.getNombre()+" "+user.getApellidos()+"</option>";
            
                                }
                     }
                
        out.println(html);
        
    }

    private void cargarOptionsVacunas(HttpServletRequest request, HttpServletResponse response) throws IOException {
    
        response.setContentType( "text/html; charset=iso-8859-1" );
        PrintWriter out = response.getWriter();
        
        String html = "";
        ArrayList<Vacunas> lista = VacunasBD.cargarVacunas();
        
        html = "";
                for (Vacunas vacuna : lista) {
                    
                                if(vacuna.getActivoVacuna()==1){
                              
                                       html+="<option value="+vacuna.getIdVacunas()+">"+vacuna.getNombreVacuna()+"</option>";
            
                                }
                     }
                
        out.println(html);
        
    }

    private void guardarCita(HttpServletRequest request, HttpServletResponse response) throws IOException {
    
        response.setContentType( "text/html; charset=iso-8859-1" );
        PrintWriter out = response.getWriter();
        
        String msj = "mal";
        
        
        Cita cita = new Cita();
        
        cita.setFechaCita(request.getParameter("diaCita")+"/"+request.getParameter("mesCita")+"/"+request.getParameter("annioCita"));
        cita.setNombreClienteCita(request.getParameter("slClienteCita"));
        cita.setDetallesCita(request.getParameter("txtDetallesCita"));
        cita.setCompletada(0);
        cita.setHoraCita(request.getParameter("hora")+":"+request.getParameter("minutos")+" "+request.getParameter("slAmPmCita"));
        cita.setNombreVacunaCita(request.getParameter("slVacunaCita"));
        
        if(CitaBD.guardarCita(cita)=="ok"){
            
            msj = "bien";
            
        }
        
        
        out.println(msj);
    }

    private void cargarTablaCitas(HttpServletRequest request, HttpServletResponse response) throws IOException {
  
        response.setContentType( "text/html; charset=iso-8859-1" );
        PrintWriter out = response.getWriter();
        
      String html = "<table id='tblcitas' border='0px'>";
            
                               
           ArrayList<Cita> listaCitas = CitaBD.cargarCitas();
                           int conteoCitas = 1;
                           int conteoImgs = 1;
                     
                 for (Cita cita : listaCitas) {
                         String completada = "";
                         
                                
                            if(conteoImgs == 3){
                               conteoImgs = 1;
                           }
                         
                                if(cita.getCompletada()==0){
                           
               
               html+= "<tr id='trCita"+conteoCitas+"'>";
                    
                   html+= "<td><img src='images/citas"+conteoImgs+".png' class='imgsCitas btnVerInfoCitas' role='"+conteoCitas+"'></td>";
                    
                  html+=  "<td>Fecha: "+cita.getFechaCita()+"</td><td>Hora: "+cita.getHoraCita()+"</td><td>Vacuna: "+cita.getNombreVacunaCita()+"</td>";
                    html+=  "<td>Paciente: "+cita.getNombreClienteCita()+"</td><td>Lugar: "+cita.getLugarCita()+"</td><td>";
                        
                        html+="<a><img src='images/edit.png' class='btnOpciones btnEditar' role="+conteoCitas+"></a>";
                        
                        html+="<a><img src='images/delete.png' class='btnOpciones btnBorrar' alt="+cita.getNombreClienteCita()+" role="+conteoCitas+"></a>";
                        
                       html+= "<input type='hidden' alt='"+cita.getIdCita()+"' id='idCitas"+conteoCitas+">";
                        
                        html+= "<input type='hidden' alt="+cita.getFechaCita()+" id='fechaCita"+conteoCitas+">";
                        
                        html+= "<input type='hidden' alt="+cita.getNombreClienteCita()+" id='nombreClienteCita"+conteoCitas+">";
                        
                        html+= "<input type='hidden' alt="+cita.getDetallesCita()+" id='detallesCita"+conteoCitas+">";
                        
                        html+= "<input type='hidden' alt="+cita.getCompletada()+" id='completada"+conteoCitas+">";
                        
                        html+= "<input type='hidden' alt="+cita.getHoraCita()+" id='horaCita"+conteoCitas+">";
                        
                        html+= "<input type='hidden' alt="+cita.getNombreVacunaCita()+" id='nombreVacunaCita"+conteoCitas+">";
                        
                       html+= "<input type='hidden' alt="+cita.getLugarCita()+" id='lugarCita"+conteoCitas+"'></td></tr>";
                
                                } 
                                
                                conteoCitas++;
                                conteoImgs++;
                     
                     }
                 
                  html+="</table>";
                
                  out.println(html);
                  
    }
}
