/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Controlador;

import Modelo.Usuario;
import Modelo.UsuarioBD;
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
        } else if(accion.equals("cargarClientes")){
            this.cargarClientes(request, response);
        }else if(accion.equals("borrarCliente")){
            this.borrarCliente(request, response);
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
        
        if(UsuarioBD.existeUsuario(request.getParameter("txtUsuario"))==1){
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
    
    
    private void cargarClientes(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        
        
        
    }
    
   
            
    private void  borrarCliente(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        
        response.setContentType( "text/html; charset=iso-8859-1" );
        PrintWriter out = response.getWriter();
        
        int cedula = Integer.parseInt(request.getParameter("cedulaCliente"));
        
       int estado = UsuarioBD.borrarUsuario(cedula);
        
         out.println(estado);
        
    }
    
    private String cargarTablaCliente(){

        String html = "<h2>Hola</h2>";
        int conteo = 1;
        ArrayList<Usuario> lista = UsuarioBD.cargarClientes();
                           
                   for (Usuario User : lista) {
                         String activoS = "";
                                if(User.getActivo()==1){
                                    activoS = "activado";
                                }else{ 
                                    activoS = "desactivado";
                                }
                   html = "<tr id='tr"+conteo+"'><td>"+User.getCedula()+"</td><td>"+User.getNombre()+" "+User.getApellidos()+"</td>";
                   html += "<td>"+User.getDireccion()+"</td>"; 
                   html += "<td>"+activoS+"</td>";
                   html += "<td><a><img src='images/edit.png' class='btnOpciones btnEditar'></a>";
                   html += "<a><img src='images/delete.png' class='btnOpciones btnBorrar' alt='"+User.getNombre()+" "+User.getApellidos()+"' role="+conteo+"></a>";
                   html += "<input type='hidden' alt="+User.getCedula()+" id=info"+conteo+"></td></tr>";
                
                      conteo++; 
                     }
                
        return html;
    }
}
