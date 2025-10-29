package com.tecsup.HospitalMdb.consultas.service;

import com.tecsup.HospitalMdb.consultas.dao.ConsultaDAO;
import com.tecsup.HospitalMdb.consultas.models.Consulta;
import com.tecsup.HospitalMdb.consultas.models.ConsultaDTO;
import com.tecsup.HospitalMdb.pacientes.dao.PacienteDAO;
import com.tecsup.HospitalMdb.medicos.dao.MedicoDAO;
import com.tecsup.HospitalMdb.citas.dao.CitaDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ConsultaServiceImpl implements ConsultaService {

    @Autowired
    private ConsultaDAO consultaDAO;

    @Autowired
    private PacienteDAO pacienteDAO;

    @Autowired
    private MedicoDAO medicoDAO;

    @Autowired
    private CitaDAO citaDAO;

    @Override
    public List<Consulta> listarTodos() {
        return consultaDAO.findAll();
    }

    @Override
    public Consulta buscarPorId(String id) {
        return consultaDAO.findById(id).orElse(null);
    }

    @Override
    public Consulta guardar(Consulta consulta) {
        return consultaDAO.save(consulta);
    }

    @Override
    public void eliminar(String id) {
        consultaDAO.deleteById(id);
    }

    @Override
    public List<Consulta> buscarPorIdPaciente(String idPaciente) {
        return consultaDAO.findByIdPaciente(idPaciente);
    }

    @Override
    public List<Consulta> buscarPorIdMedico(String idMedico) {
        return consultaDAO.findByIdMedico(idMedico);
    }

    @Override
    public Consulta buscarPorIdCita(String idCita) {
        return consultaDAO.findByIdCita(idCita);
    }

    @Override
    public List<ConsultaDTO> listarTodosConDetalles() {
        return consultaDAO.findAll().stream()
                .map(this::convertirADTO)
                .collect(Collectors.toList());
    }

    private ConsultaDTO convertirADTO(Consulta consulta) {
        ConsultaDTO dto = new ConsultaDTO();
        dto.setId(consulta.getId());
        dto.setFecha(consulta.getFecha());
        dto.setHora(consulta.getHora());
        dto.setMotivoConsulta(consulta.getMotivoConsulta());
        dto.setObservaciones(consulta.getObservaciones());

        pacienteDAO.findById(consulta.getIdPaciente()).ifPresent(p ->
                dto.setNombrePaciente(p.getNombres() + " " + p.getApellidos())
        );

        medicoDAO.findById(consulta.getIdMedico()).ifPresent(m ->
                dto.setNombreMedico(m.getNombres() + " " + m.getApellidos())
        );

        citaDAO.findById(consulta.getIdCita()).ifPresent(c ->
                dto.setNumeroCita(c.getId())
        );

        return dto;
    }
}