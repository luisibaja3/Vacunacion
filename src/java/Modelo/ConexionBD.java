package Modelo;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;

//@author Henry Joe Wong Urquiza

public class ConexionBD {
    //La url con la cual nos conectariamos a la base de datos
    private static String url = "jdbc:mysql://localhost/sysvacunacion";
    //El usuario de la base de datos
    private static String user = "root";
    //La clave del usuario de la base de datos
    private static String password = "";
    //Metodo para obtener la conexion con la base de datos
    public static synchronized Connection getConexion() {
        Connection cn = null;
        try {
            //Cargamos el driver y le decimos que vamos a usar
            //una conexion con mysql
            Class.forName("com.mysql.jdbc.Driver");
            //Obtenemos la conexion
            cn = DriverManager.getConnection(url, user, password);
        } catch (Exception e) {
            cn = null;
        } finally {
            return cn;
        }
    }
    //Metodo utilizado para cerrar el callablestatemente
    public static synchronized void cerrarCall(CallableStatement cl) {
        try{cl.close();}catch(Exception e){}
    }
    //Metodo utilizado para cerrar el resulset de datos
    public static synchronized void cerrarConexion(ResultSet rs) {
        try{rs.close();} catch (Exception e) {}
    }
    //Metodo utilizado para cerrar la conexion
    public static synchronized void cerrarConexion(Connection cn) {
        try{cn.close();} catch (Exception e) {}
    }
    //Metodo utilizado para deshacer los cambios en la base de datos
    public static synchronized void deshacerCambios(Connection cn) {
        try{cn.rollback();}catch (Exception e){}
    }
}
