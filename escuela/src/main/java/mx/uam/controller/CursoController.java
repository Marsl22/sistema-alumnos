package mx.uam.controller;

import mx.uam.model.dto.CursoDTO;
import mx.uam.service.CursoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;

import java.util.List;

@RestController
@RequestMapping("/cursos")
@Tag(name = "Curso", description = "Operaciones CRUD para cursos")
public class CursoController {
    @Autowired
    private CursoService cursoService;

    @GetMapping
    @Operation(summary = "Obtener todos los cursos", description = "Retorna una lista de todos los cursos")
    public List<CursoDTO> getAll() {
        return cursoService.findAll();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtener curso por ID", description = "Retorna un curso por su ID")
    public ResponseEntity<CursoDTO> getById(@Parameter(description = "ID del curso") @PathVariable Integer id) {
        CursoDTO dto = cursoService.findById(id);
        if (dto == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(dto);
    }

    @PostMapping
    @Operation(summary = "Crear curso", description = "Crea un nuevo curso")
    public ResponseEntity<CursoDTO> create(@RequestBody CursoDTO dto) {
        CursoDTO created = cursoService.create(dto);
        return ResponseEntity.ok(created);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar curso", description = "Actualiza un curso existente")
    public ResponseEntity<CursoDTO> update(@Parameter(description = "ID del departamento") @PathVariable Integer id, @RequestBody CursoDTO dto) {
        CursoDTO updated = cursoService.update(id, dto);
        if (updated == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar curso", description = "Elimina un curso por su ID")
    public ResponseEntity<Void> delete(@Parameter(description = "ID del curso") @PathVariable Integer id) {
        boolean deleted = cursoService.delete(id);
        if (!deleted) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build();
    }
}
