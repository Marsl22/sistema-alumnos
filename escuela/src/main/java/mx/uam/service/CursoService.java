package mx.uam.service;

import mx.uam.model.dto.CursoDTO;
import mx.uam.model.entity.Curso;
import mx.uam.repository.CursoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CursoService {
    @Autowired
    private CursoRepository cursoRepository;

    public List<CursoDTO> findAll() {
        return cursoRepository.findAll().stream()
        .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public CursoDTO findById(Integer id) {
        if (id == null) {
            return null;
        }
        Optional<Curso> curso = cursoRepository.findById(id);
        return curso.map(this::toDTO).orElse(null);
    }

    public CursoDTO create(CursoDTO dto) {
        Curso curso = new Curso();
        curso.setNombre(dto.getNombre());
        curso.setDescripcion(dto.getDescripcion());
        Curso saved = cursoRepository.save(curso);
        return toDTO(saved);
    }

    public CursoDTO update(Integer id, CursoDTO dto) {
        if (id == null || dto == null) {
            return null;
        }
        Optional<Curso> cursoOpt = cursoRepository.findById(id);
        if (!cursoOpt.isPresent()) {
            return null;
        }
        Curso curso = cursoOpt.get();
        curso.setNombre(dto.getNombre());
        curso.setDescripcion(dto.getDescripcion());
        Curso updated = cursoRepository.save(curso);
        return toDTO(updated);
    }

    public boolean delete(Integer id) {
        if (id == null || !cursoRepository.existsById(id)) {
            return false;
        }
        cursoRepository.deleteById(id);
        return true;
    }

    private CursoDTO toDTO(Curso curso) {
        CursoDTO dto = new CursoDTO();
        dto.setId(curso.getId());
        dto.setNombre(curso.getNombre());
        dto.setDescripcion(curso.getDescripcion());
        return dto;
    }
}