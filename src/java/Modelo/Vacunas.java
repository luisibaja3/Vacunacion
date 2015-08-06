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
public class Vacunas {
    
    private int idVacunas;
    private String nombreVacuna;
    private String descripcionVacuna;
    private String tipoVacuna;
    private int activoVacuna;

    public Vacunas() {
    }

    public Vacunas(String nombreVacuna, String descripcionVacuna, String tipoVacuna, int activoVacuna) {
        this.nombreVacuna = nombreVacuna;
        this.descripcionVacuna = descripcionVacuna;
        this.tipoVacuna = tipoVacuna;
        this.activoVacuna = activoVacuna;
    }

    public int getIdVacunas() {
        return idVacunas;
    }

    public void setIdVacunas(int idVacunas) {
        this.idVacunas = idVacunas;
    }

    public String getNombreVacuna() {
        return nombreVacuna;
    }

    public void setNombreVacuna(String nombreVacuna) {
        this.nombreVacuna = nombreVacuna;
    }

    public String getDescripcionVacuna() {
        return descripcionVacuna;
    }

    public void setDescripcionVacuna(String descripcionVacuna) {
        this.descripcionVacuna = descripcionVacuna;
    }

    public String getTipoVacuna() {
        return tipoVacuna;
    }

    public void setTipoVacuna(String tipoVacuna) {
        this.tipoVacuna = tipoVacuna;
    }

    public int getActivoVacuna() {
        return activoVacuna;
    }

    public void setActivoVacuna(int activoVacuna) {
        this.activoVacuna = activoVacuna;
    }
    
}
