package mx.uam.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import mx.uam.model.entity.Curso;


public interface CursoRepository extends JpaRepository<Curso, Integer> {

}
