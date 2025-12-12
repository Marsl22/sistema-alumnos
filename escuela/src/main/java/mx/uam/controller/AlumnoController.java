package mx.uam.controller;

import mx.uam.model.dto.AlumnoDTO;
import mx.uam.service.AlumnoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;

import java.util.List;

@RestController
@RequestMapping("/alumnos")
@Tag(name = "Alumno", description = "Operaciones CRUD para alumnos")
public class AlumnoController {
    @Autowired
    private AlumnoService alumnoService;

    @GetMapping
    @Operation(summary = "Obtener todos los alumnos", description = "Retorna una lista de todos los alumnos")
    public List<AlumnoDTO> getAll() {
        return alumnoService.findAll();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtener alumno por ID", description = "Retorna un alumno por su ID")
    public ResponseEntity<AlumnoDTO> getById(@Parameter(description = "ID del alumno") @PathVariable Integer id) {
        AlumnoDTO dto = alumnoService.findById(id);
        if (dto == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(dto);
    }

    @PostMapping
    @Operation(summary = "Crear alumno", description = "Crea un nuevo alumno")
    public ResponseEntity<AlumnoDTO> create(@RequestBody AlumnoDTO dto) {
        AlumnoDTO created = alumnoService.create(dto);
        if (created == null) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(created);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar alumno", description = "Actualiza un alumno existente")
    public ResponseEntity<AlumnoDTO> update(@Parameter(description = "ID del alumno") @PathVariable Integer id, @RequestBody AlumnoDTO dto) {
        AlumnoDTO updated = alumnoService.update(id, dto);
        if (updated == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar alumno", description = "Elimina un alumno por su ID")
    public ResponseEntity<Void> delete(@Parameter(description = "ID del alumno") @PathVariable Integer id) {
        boolean deleted = alumnoService.delete(id);
        if (!deleted) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build();
    }
} 
