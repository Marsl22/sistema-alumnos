package mx.uam.service;

import mx.uam.model.dto.AlumnoDTO;
import mx.uam.model.entity.Alumno;
import mx.uam.repository.AlumnoRepository;
import mx.uam.repository.CursoRepository;
import mx.uam.model.entity.Curso;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AlumnoService {
    @Autowired
    private AlumnoRepository alumnoRepository;
    @Autowired
    private CursoRepository cursoRepository;

    public List<AlumnoDTO> findAll() {
        return alumnoRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public AlumnoDTO findById(Integer id) {
        if (id == null) {
            return null;
        }
        Optional<Alumno> alumno = alumnoRepository.findById(id);
        return alumno.map(this::toDTO).orElse(null);
    }

    public AlumnoDTO create(AlumnoDTO dto) {
        if (dto == null || dto.getCursoId() == null) {
            return null;
        }
        Optional<Curso> cursoOpt = cursoRepository.findById(dto.getCursoId());
        if (!cursoOpt.isPresent()) {
            return null;
        }
        Alumno alumno = new Alumno();
        alumno.setNombre(dto.getNombre());
        alumno.setApellidoPaterno(dto.getApellidoPaterno());
        alumno.setApellidoMaterno(dto.getApellidoMaterno());
        alumno.setEdad(dto.getEdad());
        alumno.setMatricula(dto.getMatricula());
        alumno.setCurso(cursoOpt.get());
        Alumno saved = alumnoRepository.save(alumno);
        return toDTO(saved);
    }

    public AlumnoDTO update(Integer id, AlumnoDTO dto) {
        if (id == null || dto == null || dto.getCursoId() == null) {
            return null;
        }
        Optional<Alumno> alumnoOpt = alumnoRepository.findById(id);
        Optional<Curso> cursoOpt = cursoRepository.findById(dto.getCursoId());
        if (!alumnoOpt.isPresent() || !cursoOpt.isPresent()) {
            return null;
        }
        Alumno alumno = alumnoOpt.get();
        alumno.setNombre(dto.getNombre());
        alumno.setApellidoPaterno(dto.getApellidoPaterno());
        alumno.setApellidoMaterno(dto.getApellidoMaterno());
        alumno.setEdad(dto.getEdad());
        alumno.setMatricula(dto.getMatricula());
        alumno.setCurso(cursoOpt.get());
        Alumno updated = alumnoRepository.save(alumno);
        return toDTO(updated);
    }

    public boolean delete(Integer id) {
        if (id == null || !alumnoRepository.existsById(id)) {
            return false;
        }
        alumnoRepository.deleteById(id);
        return true;
    }

    private AlumnoDTO toDTO(Alumno alumno) {
        AlumnoDTO dto = new AlumnoDTO();
        dto.setId(alumno.getId());
        dto.setNombre(alumno.getNombre());
        dto.setApellidoPaterno(alumno.getApellidoPaterno());
        dto.setApellidoMaterno(alumno.getApellidoMaterno());
        dto.setEdad(alumno.getEdad());
        dto.setMatricula(alumno.getMatricula());
        dto.setCursoId(alumno.getCurso() != null ? alumno.getCurso().getId() : null);
        return dto;
    }
}