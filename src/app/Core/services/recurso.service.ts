import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import IRecurso from '../models/recurso.model';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

const apiUrl = environment.apiUrl + '/recursos';

@Injectable({
  providedIn: 'root',
})
export class RecursoService {
  http = inject(HttpClient);
  createRecurso(data: Partial<IRecurso>): Observable<IRecurso> {
    return this.http.post<IRecurso>(apiUrl, data);
  }

  readRecurso(id: string): Observable<IRecurso> {
    return this.http.get<IRecurso>(`${apiUrl}/${id}`);
  }

  readRecursoByLibro(idLibro: string): Observable<IRecurso[]> {
    return this.http.get<Array<IRecurso>>(`${apiUrl}/libro/${idLibro}`);
  }

  readAllRecurso(): Observable<IRecurso[]> {
    return this.http.get<Array<IRecurso>>(apiUrl);
  }

  updateRecurso(id: string, data: Partial<IRecurso>): Observable<IRecurso> {
    return this.http.put<IRecurso>(`${apiUrl}/${id}`, data);
  }

  deleteRecurso(id: string): Observable<IRecurso> {
    return this.http.delete<IRecurso>(`${apiUrl}/${id}`);
  }
}
