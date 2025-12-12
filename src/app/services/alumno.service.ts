import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, catchError } from 'rxjs';
import { AlumnoDTO } from '../models/alumno.model';
import { environment } from '../../environments/environment';


@Injectable({ providedIn: 'root' })
export class AlumnoService {
  private base = `${environment.apiUrl}/alumnos`;
  constructor(private http: HttpClient) {}

  getAll(): Observable<AlumnoDTO[]> {
    return this.http.get<AlumnoDTO[]>(this.base).pipe(catchError(this.handleError));
  }
  getById(id: number) {
    return this.http.get<AlumnoDTO>(`${this.base}/${id}`).pipe(catchError(this.handleError));
  }
  create(emp: AlumnoDTO) {
    return this.http.post<AlumnoDTO>(this.base, emp).pipe(catchError(this.handleError));
  }
  update(id: number, emp: AlumnoDTO) {
    return this.http.put<AlumnoDTO>(`${this.base}/${id}`, emp).pipe(catchError(this.handleError));
  }
  delete(id: number) {
    return this.http.delete(`${this.base}/${id}`).pipe(catchError(this.handleError));
  }
  private handleError(err: any) {
    console.error(err);
    return throwError(() => err);
  }
}
