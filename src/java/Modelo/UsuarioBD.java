package Modelo;

import java.sql.CallableStatement;
import java.sql.Connection;
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
                
                User.setId(Integer.parseInt(rs.getString(1)));
                User.setCedula(rs.getString(2));
                User.setNombre(rs.getString(3));
                User.setApellidos(rs.getString(4));
                User.setUsuario(rs.getString(5));
                User.setContrasenia(rs.getString(6));
                User.setDireccion(rs.getString(7));
                User.setFechaNacimiento(rs.getString(8));
                User.setActivo(Integer.parseInt(rs.getString(9)));
                User.setRol(rs.getString(10));
                User.setCorreo(rs.getString(12));
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
   
}
