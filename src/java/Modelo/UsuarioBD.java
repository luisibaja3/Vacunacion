package Modelo;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.Date;
import java.sql.ResultSet;
import java.sql.SQLException;
import javax.servlet.http.HttpServlet;

/**
 *
 * @author LuisAntonio
 */
public class UsuarioBD extends HttpServlet {

    public static Usuario verificarLogin(String user, String password) {
        Connection cn = null;
        CallableStatement cl = null;
        ResultSet rs = null;
        Usuario User = new Usuario();

        try {
            //Nombre del procedimiento almacenado
            String call = "{CALL verificarLogin(?,?)}";
            cn = ConexionBD.getConexion();
            cl = cn.prepareCall(call);
            cl.setString(1, user);
            cl.setString(2, password);
   
            //La sentencia lo almacenamos en un resulset
            rs = cl.executeQuery();
            //Consultamos si hay datos para recorrerlo
            //e insertarlo en nuestro array
            if (rs.next()) {
                
                User.setId(Integer.parseInt(rs.getString("IdUsuario")));
                User.setCedula(Integer.parseInt(rs.getString("Cedula")));
                User.setNombre(rs.getString("Nombre"));
                User.setApellidos(rs.getString("Apellidos"));
                User.setUsuario(rs.getString("Usuario"));
                User.setContrasenia(rs.getString("Contrasenia"));
                User.setDireccion(rs.getString("Direccion"));
                User.setFechaNacimiento(rs.getString("FechaNacimiento"));
                User.setActivo(Integer.parseInt(rs.getString("Activo")));
                User.setRol(rs.getString("Rol"));
                User.setCorreo(rs.getString("Correos"));
                User.setTelefono(rs.getShort("Telefono"));
            }
            ConexionBD.cerrarCall(cl);
            ConexionBD.cerrarConexion(cn);

        } catch (SQLException e) {
            e.printStackTrace();
            ConexionBD.cerrarCall(cl);
            ConexionBD.cerrarConexion(cn);
        } catch (Exception e) {
            System.out.print(e);
            e.printStackTrace();
            ConexionBD.cerrarCall(cl);
            ConexionBD.cerrarConexion(cn);
        }
        return User;
    }
    
    public static int existeUsuario(String user) {
        Connection cn = null;
        CallableStatement cl = null;
        ResultSet rs = null;
        int existe = 0;

        try {
            //Nombre del procedimiento almacenado
            String call = "{CALL existeUsuario(?)}";
            cn = ConexionBD.getConexion();
            cl = cn.prepareCall(call);
            cl.setString(1, user);
   
            //La sentencia lo almacenamos en un resulset
            rs = cl.executeQuery();
            //Consultamos si hay datos para recorrerlo
            //e insertarlo en nuestro array
            if (rs.next()) {
                existe = 1;
            }
            ConexionBD.cerrarCall(cl);
            ConexionBD.cerrarConexion(cn);

        } catch (SQLException e) {
            e.printStackTrace();
            ConexionBD.cerrarCall(cl);
            ConexionBD.cerrarConexion(cn);
        } catch (Exception e) {
            System.out.print(e);
            e.printStackTrace();
            ConexionBD.cerrarCall(cl);
            ConexionBD.cerrarConexion(cn);
        }
        return existe;
    }
    
    public static String guardarUsuario(Usuario user) {
        Connection cn = null;
        CallableStatement cl = null;
        String exito = "ok";
        
        try {
            //Nombre del procedimiento almacenado
            String call = "{CALL guardarUsuario(?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
            cn = ConexionBD.getConexion();
            cl = cn.prepareCall(call);
            cl.setInt(1, user.getCedula());
            cl.setString(2, user.getNombre());
            cl.setString(3, user.getApellidos());
            cl.setString(4, user.getUsuario());
            cl.setString(5, user.getContrasenia());
            cl.setString(6, user.getDireccion());
            cl.setString(7, user.getFechaNacimiento());
            cl.setString(8, user.getCorreo());//
            cl.setInt(9, user.getActivo());
            cl.setString(10, user.getRol());
            cl.setInt(11, user.getTelefono());
            cl.setInt(12, 0);
            cl.setInt(13, 0);
            cl.setInt(14, 0);
            
            //La sentencia lo almacenamos en un resulset
            cl.executeQuery();
            //Consultamos si hay datos para recorrerlo
            //e insertarlo en nuestro array
            ConexionBD.cerrarCall(cl);
            ConexionBD.cerrarConexion(cn);

        } catch (SQLException e) {
            exito = e.toString();
            e.printStackTrace();
            ConexionBD.cerrarCall(cl);
            ConexionBD.cerrarConexion(cn);
            
        } catch (Exception e) {
             exito = e.toString();
            System.out.print(e);
            e.printStackTrace();
            ConexionBD.cerrarCall(cl);
            ConexionBD.cerrarConexion(cn);
        }
        return exito;
    }
    
   
}
