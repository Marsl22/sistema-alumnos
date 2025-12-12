package mx.uam.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import mx.uam.model.entity.Alumno;

public interface AlumnoRepository extends JpaRepository<Alumno, Integer> {

}
