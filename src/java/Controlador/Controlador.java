/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Controlador;

import Modelo.Usuario;
import Modelo.UsuarioBD;
import java.io.IOException;
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
}
