import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AlumnoService } from '../../services/alumno.service';
import { CursoService } from '../../services/curso.service';
import { AlumnoDTO } from '../../models/alumno.model';
import { CursoDTO } from '../../models/curso.model';

@Component({
  selector: 'app-alumno-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './alumno-form.component.html',
  styleUrls: ['./alumno-form.component.css']
})
export class AlumnoFormComponent implements OnInit {
  alumnoForm: FormGroup;
  isEditMode: boolean = false;
  alumnoId?: number;
  loading: boolean = false;
  cursos: CursoDTO[] = [];
  titulo: string = 'Nuevo Alumno';

  constructor(
    private fb: FormBuilder,
    private alumnoService: AlumnoService,
    private cursoService: CursoService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.alumnoForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      apellidoPaterno: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      apellidoMaterno: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      edad: ['', [Validators.required, Validators.min(1), Validators.max(120)]],
      matricula: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      cursoId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.cargarCursos();

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.alumnoId = +params['id'];
        this.titulo = 'Editar Alumno';
        this.cargarAlumno();
      }
    });
  }

  cargarCursos(): void {
    this.cursoService.getAll().subscribe({
      next: (cursos) => {
        this.cursos = cursos;
      },
      error: (error) => {
        console.error('Error al cargar cursos:', error);
        alert('Error al cargar la lista de cursos');
      }
    });
  }

  cargarAlumno(): void {
    if (this.alumnoId) {
      this.loading = true;
      this.alumnoService.getById(this.alumnoId).subscribe({
        next: (alumno) => {
          this.alumnoForm.patchValue({
            nombre: alumno.nombre,
            apellidoPaterno: alumno.apellidoPaterno,
            apellidoMaterno: alumno.apellidoMaterno,
            edad: alumno.edad,
            matricula: alumno.matricula,
            cursoId: alumno.cursoId
          });
          this.loading = false;
        },
        error: (error) => {
          console.error('Error al cargar alumno:', error);
          alert('Error al cargar los datos del alumno');
          this.loading = false;
          this.volver();
        }
      });
    }
  }

  onSubmit(): void {
    if (this.alumnoForm.valid) {
      this.loading = true;
      const alumno: AlumnoDTO = {
        id: this.alumnoId || 0,
        ...this.alumnoForm.value
      };

      if (this.isEditMode && this.alumnoId) {
        this.alumnoService.update(this.alumnoId, alumno).subscribe({
          next: () => {
            alert('Alumno actualizado correctamente');
            this.volver();
          },
          error: (error) => {
            console.error('Error al actualizar:', error);
            alert('Error al actualizar el alumno. Verifica que la matrícula no esté duplicada.');
            this.loading = false;
          }
        });
      } else {
        this.alumnoService.create(alumno).subscribe({
          next: () => {
            alert('Alumno creado correctamente');
            this.volver();
          },
          error: (error) => {
            console.error('Error al crear:', error);
            alert('Error al crear el alumno. Verifica que la matrícula no esté duplicada.');
            this.loading = false;
          }
        });
      }
    } else {
      this.marcarCamposInvalidos();
      alert('Por favor completa todos los campos requeridos correctamente');
    }
  }

  marcarCamposInvalidos(): void {
    Object.keys(this.alumnoForm.controls).forEach(field => {
      const control = this.alumnoForm.get(field);
      control?.markAsTouched();
    });
  }

  volver(): void {
    this.router.navigate(['/alumnos']);
  }

  isFieldInvalid(field: string): boolean {
    const control = this.alumnoForm.get(field);
    return !!(control && control.invalid && control.touched);
  }

  getErrorMessage(field: string): string {
    const control = this.alumnoForm.get(field);
    
    if (control?.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    if (control?.hasError('minlength')) {
      return `Mínimo ${control.errors?.['minlength'].requiredLength} caracteres`;
    }
    if (control?.hasError('maxlength')) {
      return `Máximo ${control.errors?.['maxlength'].requiredLength} caracteres`;
    }
    if (control?.hasError('min')) {
      return `El valor mínimo es ${control.errors?.['min'].min}`;
    }
    if (control?.hasError('max')) {
      return `El valor máximo es ${control.errors?.['max'].max}`;
    }
    
    return '';
  }
}