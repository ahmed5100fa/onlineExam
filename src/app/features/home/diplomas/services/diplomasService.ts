import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DiplomasInterface } from '../interfaces/diplomas-interface';
import { environment } from '../../../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class DiplomasService {
  _http = inject(HttpClient);

  getAllSubjects():Observable<DiplomasInterface>{
    return this._http.get<DiplomasInterface>(`${environment.baseUrl}/subjects`);
  }
}
