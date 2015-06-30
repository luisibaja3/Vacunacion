<%-- 
    Document   : usuario.jsp
    Created on : Jun 28, 2015, 8:38:46 PM
    Author     : LuisAntonio
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>

<%
    
        String usuario = (String) session.getAttribute("usuario");
    String nombre = (String) session.getAttribute("nombre");
    String correo = (String) session.getAttribute("correo");        
    String rol = (String) session.getAttribute("rol");
    String apellidos = (String) session.getAttribute("apellidos");
    
    if(!rol.equals("cliente")){
       if(rol.equals("administrador")){
           response.sendRedirect("administrador.jsp");
       }else{
           response.sendRedirect("index.jsp");
        }
    }
    
    
    
    
%>

<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title><%=nombre%></title>
    </head>
    <body>
        <h1>Cliente <%=nombre +" "+apellidos %></h1>
        <h2>Usuario del cliente: <%=usuario%></h2>
        <h2>Correo del cliente: <%=correo%></h2>
    </body>
</html>
