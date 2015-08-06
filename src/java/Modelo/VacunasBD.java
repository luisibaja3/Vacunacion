/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Modelo;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import javax.servlet.http.HttpServlet;

/**
 *
 * @author lasc
 */
public class VacunasBD extends HttpServlet {
    
        public static synchronized ArrayList<Vacunas> cargarVacunas() {
        //El array que contendra todos nuestros productos
        ArrayList<Vacunas> lista = new ArrayList<Vacunas>();
        Connection cn = null;
        CallableStatement cl = null;
        ResultSet rs = null;
        try {
            //Nombre del procedimiento almacenado
            String call = "{CALL cargarVacunas()}";
            cn = ConexionBD.getConexion();
            cl = cn.prepareCall(call);
            //La sentencia lo almacenamos en un resulset
            rs = cl.executeQuery();
            //Consultamos si hay datos para recorrerlo
            //e insertarlo en nuestro array
            while (rs.next()) {
                Vacunas vacunin = new Vacunas();
                //Obtenemos los valores de la consulta y creamos
                //nuestro objeto usuario
                               
                vacunin.setIdVacunas(Integer.parseInt(rs.getString("IdVacunas")));
                vacunin.setNombreVacuna(rs.getString("NombreVacuna"));
                vacunin.setDescripcionVacuna(rs.getString("DescripcionVacuna"));
                vacunin.setTipoVacuna(rs.getString("TipoVacuna"));
                vacunin.setActivoVacuna(Integer.parseInt(rs.getString("ActivoVacuna")));
                
                //Lo adicionamos a nuestra lista
                lista.add(vacunin);
            }
            ConexionBD.cerrarCall(cl);
            ConexionBD.cerrarConexion(cn);
        } catch (SQLException e) {
            e.printStackTrace();
            ConexionBD.cerrarCall(cl);
            ConexionBD.cerrarConexion(cn);
            
        } catch (Exception e) {
            e.printStackTrace();
            ConexionBD.cerrarCall(cl);
            ConexionBD.cerrarConexion(cn);
        }
        return lista;
    }
        
        
    public static String guardarVacuna(Vacunas vacuna) {
        Connection cn = null;
        CallableStatement cl = null;
        String exito = "ok";
        
        try {
            //Nombre del procedimiento almacenado
            String call = "{CALL guardarVacuna(?,?,?,?)}";
            cn = ConexionBD.getConexion();
            cl = cn.prepareCall(call);
            cl.setString(1, vacuna.getNombreVacuna());
            cl.setString(2, vacuna.getDescripcionVacuna());
            cl.setString(3, vacuna.getTipoVacuna());
            cl.setInt(4, vacuna.getActivoVacuna());
            
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
    
        public static String existeVacuna(String nombreVacuna) {
        Connection cn = null;
        CallableStatement cl = null;
        ResultSet rs = null;
        String existe = "no";

        try {
            //Nombre del procedimiento almacenado
            String call = "{CALL existeNombreVacuna(?)}";
            cn = ConexionBD.getConexion();
            cl = cn.prepareCall(call);
            cl.setString(1, nombreVacuna);
   
            //La sentencia lo almacenamos en un resulset
            rs = cl.executeQuery();
            //Consultamos si hay datos para recorrerlo
            //e insertarlo en nuestro array
            if (rs.next()) {
                existe = rs.getString("NombreVacuna");
                
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
    
        
    public static int borrarVacuna(int idVacuna) {
        
            Connection cn = null;
            CallableStatement cl = null;
            int exito = 0;
        
        try {
            //Nombre del procedimiento almacenado
            String call = "{CALL eliminarVacunas(?)}";
            cn = ConexionBD.getConexion();
            cl = cn.prepareCall(call);
            cl.setInt(1, idVacuna);
            
       
            //La sentencia lo almacenamos en un resulset
            cl.executeQuery();
            //Consultamos si hay datos para recorrerlo
            //e insertarlo en nuestro array
            ConexionBD.cerrarCall(cl);
            ConexionBD.cerrarConexion(cn);
            exito = 1;

        } catch (SQLException e) {
            exito = 0;
            e.printStackTrace();
            ConexionBD.cerrarCall(cl);
            ConexionBD.cerrarConexion(cn);
            
        } catch (Exception e) {
             exito = 0;
            System.out.print(e);
            e.printStackTrace();
            ConexionBD.cerrarCall(cl);
            ConexionBD.cerrarConexion(cn);
        }
            
            return exito;
            
        }
    
     public static String editarVacuna(Vacunas vacuna) {
        Connection cn = null;
        CallableStatement cl = null;
        String exito = "ok";
        
        try {
            //Nombre del procedimiento almacenado
            String call = "{CALL actualizarVacunas(?,?,?,?,?)}";
            cn = ConexionBD.getConexion();
            cl = cn.prepareCall(call);
            cl.setInt(1, vacuna.getIdVacunas());
            cl.setString(2, vacuna.getNombreVacuna());
            cl.setString(3, vacuna.getDescripcionVacuna());
            cl.setString(4, vacuna.getTipoVacuna());
            cl.setInt(5, vacuna.getActivoVacuna());
            
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
