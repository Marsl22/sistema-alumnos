import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AlumnoService } from '../../services/alumno.service';
import { CursoService } from '../../services/curso.service';
import { AlumnoDTO } from '../../models/alumno.model';
import { CursoDTO } from '../../models/curso.model';

@Component({
  selector: 'app-alumno-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alumno-list.component.html',
  styleUrls: ['./alumno-list.component.css']
})
export class AlumnoListComponent implements OnInit {
  alumnos: AlumnoDTO[] = [];
  cursos: CursoDTO[] = [];
  loading: boolean = false;
  searchTerm: string = '';
  alumnosFiltrados: AlumnoDTO[] = [];

  constructor(
    private alumnoService: AlumnoService,
    private cursoService: CursoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.loading = true;
    
    Promise.all([
      this.alumnoService.getAll().toPromise(),
      this.cursoService.getAll().toPromise()
    ]).then(([alumnos, cursos]) => {
      this.alumnos = alumnos || [];
      this.cursos = cursos || [];
      this.alumnosFiltrados = this.alumnos;
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
    this.buscarAlumnos();
  }

  buscarAlumnos(): void {
    if (!this.searchTerm.trim()) {
      this.alumnosFiltrados = this.alumnos;
      return;
    }

    const term = this.searchTerm.toLowerCase();
    this.alumnosFiltrados = this.alumnos.filter(alumno => 
      alumno.nombre.toLowerCase().includes(term) ||
      alumno.apellidoPaterno.toLowerCase().includes(term) ||
      alumno.apellidoMaterno.toLowerCase().includes(term) ||
      alumno.matricula.toLowerCase().includes(term)
    );
  }

  limpiarBusqueda(): void {
    this.searchTerm = '';
    this.alumnosFiltrados = this.alumnos;
  }

  getNombreCurso(cursoId: number): string {
    const curso = this.cursos.find(c => c.id === cursoId);
    return curso ? curso.nombre : 'Sin curso';
  }

  verDetalle(id: number): void {
    this.router.navigate(['/alumnos/detalle', id]);
  }

  editarAlumno(id: number): void {
    this.router.navigate(['/alumnos/editar', id]);
  }

  eliminarAlumno(id: number): void {
    const alumno = this.alumnos.find(a => a.id === id);
    if (!alumno) return;

    const confirmacion = confirm(
      `¿Estás seguro de eliminar a ${alumno.nombre} ${alumno.apellidoPaterno}?`
    );

    if (confirmacion) {
      this.alumnoService.delete(id).subscribe({
        next: () => {
          alert('Alumno eliminado correctamente');
          this.cargarDatos();
        },
        error: (error) => {
          console.error('Error al eliminar:', error);
          alert('Error al eliminar el alumno');
        }
      });
    }
  }

  nuevoAlumno(): void {
    this.router.navigate(['/alumnos/nuevo']);
  }

  getNombreCompleto(alumno: AlumnoDTO): string {
    return `${alumno.nombre} ${alumno.apellidoPaterno} ${alumno.apellidoMaterno}`;
  }
}