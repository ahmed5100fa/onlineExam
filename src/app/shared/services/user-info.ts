import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class UserInfo {
  private http = inject(HttpClient)
  getLoggedUserInfo():Observable<any>{
    return this.http.get(`${environment.baseUrl}/auth/profileData`)
  }
}
