import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QuestionInter, Root } from '../Interfaces/question-inter';

@Injectable({
  providedIn: 'root',
})
export class QuestionServ {
  private _http = inject(HttpClient);

  getAllquestions(id : string) : Observable<QuestionInter>{
    return this._http.get<QuestionInter>(`https://exam.elevateegy.com/api/v1/questions?exam=${id}`);
  }

  submitQuestions(data : Root):Observable<any>{
    return this._http.post("https://exam.elevateegy.com/api/v1/questions/check" , data );
  }
}
