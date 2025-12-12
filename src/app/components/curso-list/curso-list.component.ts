import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CursoService } from '../../services/curso.service';
import { AlumnoService } from '../../services/alumno.service';
import { CursoDTO } from '../../models/curso.model';
import { AlumnoDTO } from '../../models/alumno.model';

@Component({
  selector: 'app-curso-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './curso-list.component.html',
  styleUrls: ['./curso-list.component.css']
})
export class CursoListComponent implements OnInit {
  cursos: CursoDTO[] = [];
  alumnos: AlumnoDTO[] = [];
  loading: boolean = false;
  searchTerm: string = '';
  cursosFiltrados: CursoDTO[] = [];

  constructor(
    private cursoService: CursoService,
    private alumnoService: AlumnoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.loading = true;
    
    Promise.all([
      this.cursoService.getAll().toPromise(),
      this.alumnoService.getAll().toPromise()
    ]).then(([cursos, alumnos]) => {
      this.cursos = cursos || [];
      this.alumnos = alumnos || [];
      this.cursosFiltrados = this.cursos;
      this.loading = false;
    }).catch(error => {
      console.error('Error al cargar datos:', error);
      alert('Error al cargar los datos');
      this.loading = false;
    });
  }

  onSearchChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm = input.value;
    this.buscarCursos();
  }

  buscarCursos(): void {
    if (!this.searchTerm.trim()) {
      this.cursosFiltrados = this.cursos;
      return;
    }

    const term = this.searchTerm.toLowerCase();
    this.cursosFiltrados = this.cursos.filter(curso => 
      curso.nombre.toLowerCase().includes(term) ||
      curso.descripcion.toLowerCase().includes(term)
    );
  }

  limpiarBusqueda(): void {
    this.searchTerm = '';
    this.cursosFiltrados = this.cursos;
  }

  contarAlumnos(cursoId: number): number {
    return this.alumnos.filter(a => a.cursoId === cursoId).length;
  }

  verDetalle(id: number): void {
    this.router.navigate(['/cursos/detalle', id]);
  }

  editarCurso(id: number): void {
    this.router.navigate(['/cursos/editar', id]);
  }

  eliminarCurso(id: number): void {
    const curso = this.cursos.find(c => c.id === id);
    if (!curso) return;

    const alumnosInscritos = this.contarAlumnos(id);
    if (alumnosInscritos > 0) {
      alert(`No se puede eliminar el curso "${curso.nombre}" porque tiene ${alumnosInscritos} alumno(s) inscrito(s)`);
      return;
    }

    const confirmacion = confirm(`¿Estás seguro de eliminar el curso "${curso.nombre}"?`);

    if (confirmacion) {
      this.cursoService.delete(id).subscribe({
        next: () => {
          alert('Curso eliminado correctamente');
          this.cargarDatos();
        },
        error: (error) => {
          console.error('Error al eliminar:', error);
          alert('Error al eliminar el curso');
        }
      });
    }
  }

  nuevoCurso(): void {
    this.router.navigate(['/cursos/nuevo']);
  }

  verAlumnos(cursoId: number): void {
    const curso = this.cursos.find(c => c.id === cursoId);
    const alumnosCurso = this.alumnos.filter(a => a.cursoId === cursoId);
    
    if (alumnosCurso.length === 0) {
      alert(`El curso "${curso?.nombre}" no tiene alumnos inscritos`);
      return;
    }

    const nombres = alumnosCurso.map(a => 
      `• ${a.nombre} ${a.apellidoPaterno} ${a.apellidoMaterno} (${a.matricula})`
    ).join('\n');

    alert(`Alumnos en "${curso?.nombre}":\n\n${nombres}`);
  }
}