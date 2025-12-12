import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CursoDTO } from '../models/curso.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CursoService {
  private base = `${environment.apiUrl}/cursos`;
  constructor(private http: HttpClient) {}

  getAll(): Observable<CursoDTO[]> {
    return this.http.get<CursoDTO[]>(this.base).pipe(catchError(this.handleError));
  }
  getById(id: number) {
    return this.http.get<CursoDTO>(`${this.base}/${id}`).pipe(catchError(this.handleError));
  }
  create(dep: CursoDTO) {
    return this.http.post<CursoDTO>(this.base, dep).pipe(catchError(this.handleError));
  }
  update(id: number, dep: CursoDTO) {
    return this.http.put<CursoDTO>(`${this.base}/${id}`, dep).pipe(catchError(this.handleError));
  }
  delete(id: number) {
    return this.http.delete(`${this.base}/${id}`).pipe(catchError(this.handleError));
  }
  private handleError(err: any) {
    console.error(err);
    return throwError(() => err);
  }
}

