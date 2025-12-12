import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { AlumnoListComponent } from './app/components/alumno-list/alumno-list.component';
import { AlumnoFormComponent } from './app/components/alumno-form/alumno-form.component';
import { CursoListComponent } from './app/components/curso-list/curso-list.component';
import { CursoFormComponent } from './app/components/curso-form/curso-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/alumnos', pathMatch: 'full' as const },
  { path: 'alumnos', component: AlumnoListComponent },
  { path: 'alumnos/nuevo', component: AlumnoFormComponent },
  { path: 'alumnos/editar/:id', component: AlumnoFormComponent },
  { path: 'cursos', component: CursoListComponent },
  { path: 'cursos/nuevo', component: CursoFormComponent },
  { path: 'cursos/editar/:id', component: CursoFormComponent },
  { path: '**', redirectTo: '/alumnos' }
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient()
  ]
}).catch(err => console.error(err));