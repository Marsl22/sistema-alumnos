import { Routes } from '@angular/router';
import { AlumnoListComponent } from './components/alumno-list/alumno-list.component';
import { AlumnoFormComponent } from './components/alumno-form/alumno-form.component';
import { CursoListComponent } from './components/curso-list/curso-list.component';
import { CursoFormComponent } from './components/curso-form/curso-form.component';

export const routes: Routes = [
  { path: '', redirectTo: '/alumnos', pathMatch: 'full' },
  { path: 'alumnos', component: AlumnoListComponent },
  { path: 'alumnos/nuevo', component: AlumnoFormComponent },
  { path: 'alumnos/editar/:id', component: AlumnoFormComponent },
  { path: 'cursos', component: CursoListComponent },
  { path: 'cursos/nuevo', component: CursoFormComponent },
  { path: 'cursos/editar/:id', component: CursoFormComponent },
  { path: '**', redirectTo: '/alumnos' }
];
