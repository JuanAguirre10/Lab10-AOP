package com.tecsup.HospitalMdb.citas.service;

import com.tecsup.HospitalMdb.citas.dao.CitaDAO;
import com.tecsup.HospitalMdb.citas.models.Cita;
import com.tecsup.HospitalMdb.citas.models.CitaDTO;
import com.tecsup.HospitalMdb.pacientes.dao.PacienteDAO;
import com.tecsup.HospitalMdb.medicos.dao.MedicoDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CitaServiceImpl implements CitaService {

    @Autowired
    private CitaDAO citaDAO;

    @Autowired
    private PacienteDAO pacienteDAO;

    @Autowired
    private MedicoDAO medicoDAO;

    @Override
    public List<Cita> listarTodos() {
        return citaDAO.findAll();
    }

    @Override
    public Cita buscarPorId(String id) {
        return citaDAO.findById(id).orElse(null);
    }

    @Override
    public Cita guardar(Cita cita) {
        return citaDAO.save(cita);
    }

    @Override
    public void eliminar(String id) {
        citaDAO.deleteById(id);
    }

    @Override
    public List<Cita> buscarPorIdPaciente(String idPaciente) {
        return citaDAO.findByIdPaciente(idPaciente);
    }

    @Override
    public List<Cita> buscarPorIdMedico(String idMedico) {
        return citaDAO.findByIdMedico(idMedico);
    }

    @Override
    public List<Cita> buscarPorEstado(String estado) {
        return citaDAO.findByEstado(estado);
    }

    @Override
    public List<Cita> buscarPorFecha(LocalDate fecha) {
        return citaDAO.findByFecha(fecha);
    }

    @Override
    public List<CitaDTO> listarTodosConDetalles() {
        return citaDAO.findAll().stream()
                .map(this::convertirADTO)
                .collect(Collectors.toList());
    }

    private CitaDTO convertirADTO(Cita cita) {
        CitaDTO dto = new CitaDTO();
        dto.setId(cita.getId());
        dto.setFecha(cita.getFecha());
        dto.setHora(cita.getHora());
        dto.setMotivo(cita.getMotivo());
        dto.setEstado(cita.getEstado());

        pacienteDAO.findById(cita.getIdPaciente()).ifPresent(p ->
                dto.setNombrePaciente(p.getNombres() + " " + p.getApellidos())
        );

        medicoDAO.findById(cita.getIdMedico()).ifPresent(m ->
                dto.setNombreMedico(m.getNombres() + " " + m.getApellidos())
        );

        return dto;
    }
}