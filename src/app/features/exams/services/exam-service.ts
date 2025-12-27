import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExamInter } from '../exam-inter';
import { environment } from '../../../../environment/environment';


@Injectable({
  providedIn: 'root',
})
export class ExamService {
  _http =  inject(HttpClient) ;

  //  this is the correct api but not work well

//    getAllExams(id : string) : Observable<ExamInter>{
//    return  this._http.get<ExamInter>(`https://exam.elevateegy.com/api/v1/exams?subject=${id}`);
//  }


// iam Using this api untell you fix the api

   getAllExams() : Observable<ExamInter>{
   return  this._http.get<ExamInter>(`${environment.baseUrl}/exams`);
 }

}
