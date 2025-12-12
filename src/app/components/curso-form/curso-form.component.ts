import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CursoService } from '../../services/curso.service';
import { CursoDTO } from '../../models/curso.model';

@Component({
  selector: 'app-curso-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './curso-form.component.html',
  styleUrls: ['./curso-form.component.css']
})
export class CursoFormComponent implements OnInit {
  cursoForm: FormGroup;
  isEditMode: boolean = false;
  cursoId?: number;
  loading: boolean = false;
  titulo: string = 'Nuevo Curso';

  constructor(
    private fb: FormBuilder,
    private cursoService: CursoService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.cursoForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(150)]],
      descripcion: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.cursoId = +params['id'];
        this.titulo = 'Editar Curso';
        this.cargarCurso();
      }
    });
  }

  cargarCurso(): void {
    if (this.cursoId) {
      this.loading = true;
      this.cursoService.getById(this.cursoId).subscribe({
        next: (curso) => {
          this.cursoForm.patchValue({
            nombre: curso.nombre,
            descripcion: curso.descripcion
          });
          this.loading = false;
        },
        error: (error) => {
          console.error('Error al cargar curso:', error);
          alert('Error al cargar los datos del curso');
          this.loading = false;
          this.volver();
        }
      });
    }
  }

  onSubmit(): void {
    if (this.cursoForm.valid) {
      this.loading = true;
      const curso: CursoDTO = {
        id: this.cursoId || 0,
        ...this.cursoForm.value
      };

      if (this.isEditMode && this.cursoId) {
        this.cursoService.update(this.cursoId, curso).subscribe({
          next: () => {
            alert('Curso actualizado correctamente');
            this.volver();
          },
          error: (error) => {
            console.error('Error al actualizar:', error);
            alert('Error al actualizar el curso');
            this.loading = false;
          }
        });
      } else {
        this.cursoService.create(curso).subscribe({
          next: () => {
            alert('Curso creado correctamente');
            this.volver();
          },
          error: (error) => {
            console.error('Error al crear:', error);
            alert('Error al crear el curso');
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
    Object.keys(this.cursoForm.controls).forEach(field => {
      const control = this.cursoForm.get(field);
      control?.markAsTouched();
    });
  }

  volver(): void {
    this.router.navigate(['/cursos']);
  }

  isFieldInvalid(field: string): boolean {
    const control = this.cursoForm.get(field);
    return !!(control && control.invalid && control.touched);
  }

  getErrorMessage(field: string): string {
    const control = this.cursoForm.get(field);
    
    if (control?.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    if (control?.hasError('minlength')) {
      return `Mínimo ${control.errors?.['minlength'].requiredLength} caracteres`;
    }
    if (control?.hasError('maxlength')) {
      return `Máximo ${control.errors?.['maxlength'].requiredLength} caracteres`;
    }
    
    return '';
  }
}