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
public class CitaBD extends HttpServlet{
    
    //cargar citas
    
     public static synchronized ArrayList<Cita> cargarCitas() {
        //El array que contendra todos nuestros productos
        ArrayList<Cita> lista = new ArrayList<Cita>();
        Connection cn = null;
        CallableStatement cl = null;
        ResultSet rs = null;
        try {
            //Nombre del procedimiento almacenado
            String call = "{CALL cargarCitas()}";
            cn = ConexionBD.getConexion();
            cl = cn.prepareCall(call);
            //La sentencia lo almacenamos en un resulset
            rs = cl.executeQuery();
            //Consultamos si hay datos para recorrerlo
            //e insertarlo en nuestro array
            while (rs.next()) {
                Cita cita = new Cita();
                //Obtenemos los valores de la consulta y creamos
                //nuestro objeto usuario
                               
                cita.setIdCita(Integer.parseInt(rs.getString("IdCita")));
                cita.setFechaCita(rs.getString("Fecha"));
                cita.setNombreClienteCita(rs.getString("Nombre")+" "+rs.getString("Apellidos"));
                cita.setDetallesCita(rs.getString("Detalles"));
                cita.setCompletada(Integer.parseInt(rs.getString("Completada")));
                cita.setHoraCita(rs.getString("Hora"));
                cita.setNombreVacunaCita(rs.getString("NombreVacuna"));
                cita.setLugarCita(rs.getString("Direccion"));
                cita.setIdUsuario(Integer.parseInt(rs.getString("IdUsuario")));
                cita.setIdVacuna(Integer.parseInt(rs.getString("IdVacunas")));
                //Lo adicionamos a nuestra lista
                lista.add(cita);
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
     
     
     //**********Guardar cita************
     
      public static String guardarCita(Cita cita) {
        Connection cn = null;
        CallableStatement cl = null;
        String exito = "ok";
        
        try {
            //Nombre del procedimiento almacenado
            String call = "{CALL guardarCita(?,?,?,?,?,?)}";
            cn = ConexionBD.getConexion();
            cl = cn.prepareCall(call);
            
            cl.setString(1, cita.getFechaCita());
            cl.setInt(2, Integer.parseInt(cita.getNombreClienteCita()));
            cl.setString(3, cita.getDetallesCita());
            cl.setInt(4, cita.getCompletada());
            cl.setString(5, cita.getHoraCita());
            cl.setInt(6, Integer.parseInt(cita.getNombreVacunaCita()));
            
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
      
      public static int borrarCita(int idCita) {
        
            Connection cn = null;
            CallableStatement cl = null;
            int exito = 0;
        
        try {
            //Nombre del procedimiento almacenado
            String call = "{CALL eliminarCitas(?)}";
            cn = ConexionBD.getConexion();
            cl = cn.prepareCall(call);
            cl.setInt(1, idCita);
            
       
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
      
     public static String editarCitas(Cita cita) {
        Connection cn = null;
        CallableStatement cl = null;
        String exito = "null";
        
        try {
            //Nombre del procedimiento almacenado
            String call = "{CALL actualizarCita(?,?,?,?,?,?)}";
            cn = ConexionBD.getConexion();
            cl = cn.prepareCall(call);
            cl.setString(1, cita.getFechaCita());
            cl.setInt(2, Integer.parseInt(cita.getNombreClienteCita()));
            cl.setString(3, cita.getDetallesCita());
            cl.setInt(4, cita.getCompletada());
            cl.setString(5, cita.getHoraCita());
            cl.setInt(6, Integer.parseInt(cita.getNombreVacunaCita()));
            
            //La sentencia lo almacenamos en un resulset
            cl.executeQuery();
            //Consultamos si hay datos para recorrerlo
            //e insertarlo en nuestro array
            ConexionBD.cerrarCall(cl);
            ConexionBD.cerrarConexion(cn);
            
            exito="ok";

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
