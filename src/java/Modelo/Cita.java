/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Modelo;

/**
 *
 * @author lasc
 */
public class Cita {
    private int idCita;//
    private String fechaCita;//
    private String nombreClienteCita;
    private String detallesCita;//
    private int completada;//
    private String horaCita;//
    private String nombreVacunaCita;
    private String lugarCita;

    public Cita() {
    }

    public Cita(String fechaCita, String nombreClienteCita, String detallesCita, int completada, String horaCita, String nombreVacunaCita, String lugarCita) {

        this.fechaCita = fechaCita;
        this.nombreClienteCita = nombreClienteCita;
        this.detallesCita = detallesCita;
        this.completada = completada;
        this.horaCita = horaCita;
        this.nombreVacunaCita = nombreVacunaCita;
        this.lugarCita = lugarCita;
    }

    public int getIdCita() {
        return idCita;
    }

    public void setIdCita(int idCita) {
        this.idCita = idCita;
    }

    public String getFechaCita() {
        return fechaCita;
    }

    public void setFechaCita(String fechaCita) {
        this.fechaCita = fechaCita;
    }

    public String getNombreClienteCita() {
        return nombreClienteCita;
    }

    public void setNombreClienteCita(String nombreClienteCita) {
        this.nombreClienteCita = nombreClienteCita;
    }

    public String getDetallesCita() {
        return detallesCita;
    }

    public void setDetallesCita(String detallesCita) {
        this.detallesCita = detallesCita;
    }

    public int getCompletada() {
        return completada;
    }

    public void setCompletada(int completada) {
        this.completada = completada;
    }

    public String getHoraCita() {
        return horaCita;
    }

    public void setHoraCita(String horaCita) {
        this.horaCita = horaCita;
    }

    public String getNombreVacunaCita() {
        return nombreVacunaCita;
    }

    public void setNombreVacunaCita(String nombreVacunaCita) {
        this.nombreVacunaCita = nombreVacunaCita;
    }

    public String getLugarCita() {
        return lugarCita;
    }

    public void setLugarCita(String lugarCita) {
        this.lugarCita = lugarCita;
    }
}
